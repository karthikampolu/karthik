"use client";

import { createContext, useContext, useMemo } from "react";
import type { GuideContent, Mcq, SetId, UnitId, UnitMeta } from "@/lib/exam-prep/types";

/**
 * The question bank only reaches the browser through these props, which the
 * server passes in after the access code has been checked. Client modules
 * must never import the data files directly (only their types), or the
 * questions would ship in the public JavaScript bundle.
 */
export type PrepData = {
  units: UnitMeta[];
  bySet: Record<SetId, Mcq[]>;
  guide: GuideContent;
};

export type Bank = {
  units: UnitMeta[];
  unitIds: UnitId[];
  bySet: Record<SetId, Mcq[]>;
  /** All unit questions, excluding the sample paper. */
  unitBank: Mcq[];
  guide: GuideContent;
};

const BankContext = createContext<Bank | null>(null);

export function BankProvider({ data, children }: { data: PrepData; children: React.ReactNode }) {
  const bank = useMemo<Bank>(() => {
    const unitIds = data.units.map((u) => u.id);
    return {
      units: data.units,
      unitIds,
      bySet: data.bySet,
      unitBank: unitIds.flatMap((id) => data.bySet[id]),
      guide: data.guide,
    };
  }, [data]);
  return <BankContext.Provider value={bank}>{children}</BankContext.Provider>;
}

export function useBank(): Bank {
  const bank = useContext(BankContext);
  if (!bank) throw new Error("useBank must be used inside <BankProvider>");
  return bank;
}
