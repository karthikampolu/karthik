"use client";

import { useEffect, useMemo, useState } from "react";
import { inr, num, pct } from "@/components/calculators/calc-kit";
import { GroupedBar, LineChart, Donut } from "@/components/books/charts";
import {
  ACCOUNTS,
  EXPENSE_ACCOUNTS,
  SAMPLE_TXNS,
  TXN_META,
  acct,
  balanceSheet,
  balances,
  byDate,
  cashFlow,
  cashTrend,
  expenseBreakdown,
  assetBreakdown,
  invoiceList,
  ledger,
  linesBalanced,
  linesFor,
  monthlyIncomeExpense,
  pnl,
  ratios,
  trialBalance,
  type Txn,
  type TxnType,
} from "@/components/books/engine";

const LS_KEY = "digitalised-accounting:txns:v1";

const GROUPS: { label: string; items: { id: string; name: string }[] }[] = [
  { label: "", items: [{ id: "overview", name: "Overview" }] },
  { label: "Entry", items: [{ id: "new", name: "New transaction" }, { id: "invoices", name: "Invoices" }] },
  { label: "Books", items: [{ id: "journal", name: "Journal" }, { id: "ledger", name: "Ledger" }, { id: "trial", name: "Trial balance" }] },
  { label: "Statements", items: [{ id: "pnl", name: "Profit & Loss" }, { id: "bs", name: "Balance sheet" }, { id: "cf", name: "Cash flow" }] },
  { label: "Analysis", items: [{ id: "ratios", name: "Ratios" }, { id: "charts", name: "Charts" }] },
];
const FLAT = GROUPS.flatMap((g) => g.items);

const th = "px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-faint)] border-b border-[color:var(--border)] whitespace-nowrap";
const td = "px-3 py-2 text-[13px] text-[color:var(--text)] border-b border-[color:var(--border)] align-top";
const tdr = td + " text-right tabular-nums whitespace-nowrap";

function Money({ v, bold }: { v: number; bold?: boolean }) {
  return (
    <span className={`tabular-nums ${v < -0.005 ? "text-[#b3261e]" : ""} ${bold ? "font-medium" : ""}`}>
      {inr(v)}
    </span>
  );
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
      {title && <p className="font-display text-[17px] text-[color:var(--text)] mb-3">{title}</p>}
      {children}
    </div>
  );
}

function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[color:var(--border)]">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

function Badge({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] ${
        ok ? "bg-[color:var(--accent-soft)] text-[color:var(--accent)]" : "bg-[#fbeae8] text-[#b3261e]"
      }`}
    >
      {children}
    </span>
  );
}

/* ================================================================== */

export default function MiniBooks() {
  const [txns, setTxns] = useState<Txn[]>(SAMPLE_TXNS);
  const [view, setView] = useState("overview");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load persisted entries after mount (deferred so SSR/first paint stay on
    // the sample data and hydration matches).
    let cancelled = false;
    let stored: Txn[] | null = null;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) stored = parsed as Txn[];
      }
    } catch {
      /* ignore */
    }
    queueMicrotask(() => {
      if (cancelled) return;
      if (stored) setTxns(stored);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(txns));
    } catch {
      /* ignore */
    }
  }, [txns, loaded]);

  const tb = useMemo(() => trialBalance(txns), [txns]);
  const bs = useMemo(() => balanceSheet(txns), [txns]);
  const current = FLAT.find((f) => f.id === view) ?? FLAT[0];

  const reset = () => setTxns(SAMPLE_TXNS);

  return (
    <div className="mt-10 lg:grid lg:grid-cols-[14rem_1fr] lg:gap-10">
      {/* sidebar */}
      <nav aria-label="Sections" className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-1">
        {GROUPS.map((g, gi) => (
          <div key={gi} className="mb-5">
            {g.label && (
              <p className="px-3 mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-faint)]">
                {g.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const active = it.id === view;
                return (
                  <li key={it.id}>
                    <button
                      type="button"
                      onClick={() => setView(it.id)}
                      aria-current={active ? "page" : undefined}
                      className={`w-full rounded-lg px-3 py-2 text-left text-[13.5px] transition-colors ${
                        active
                          ? "bg-[color:var(--accent-soft)] text-[color:var(--text)] font-medium"
                          : "text-[color:var(--text-muted)] hover:bg-[color:var(--surface)] hover:text-[color:var(--text)]"
                      }`}
                    >
                      {it.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* main */}
      <div className="min-w-0">
        {/* mobile picker */}
        <div className="lg:hidden mb-6">
          <label htmlFor="bk-view" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-faint)]">
            Section
          </label>
          <select
            id="bk-view"
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="w-full rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-3 py-2.5 text-[14px] text-[color:var(--text)]"
          >
            {GROUPS.map((g, gi) => (
              <optgroup key={gi} label={g.label || "General"}>
                {g.items.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl md:text-3xl text-[color:var(--text)]">{current.name}</h2>
          <div className="flex items-center gap-2">
            <Badge ok={tb.balanced && Math.abs(bs.check) < 0.01}>
              {tb.balanced && Math.abs(bs.check) < 0.01 ? "Books balanced" : "Out of balance"}
            </Badge>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-[color:var(--border-strong)] px-3 py-1.5 text-[12px] text-[color:var(--text-muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              Reset data
            </button>
          </div>
        </div>

        {view === "overview" && <Overview txns={txns} />}
        {view === "new" && <NewTxn txns={txns} setTxns={setTxns} />}
        {view === "invoices" && <Invoices txns={txns} setTxns={setTxns} />}
        {view === "journal" && <Journal txns={txns} />}
        {view === "ledger" && <LedgerView txns={txns} />}
        {view === "trial" && <TrialBalanceView txns={txns} />}
        {view === "pnl" && <PnLView txns={txns} />}
        {view === "bs" && <BalanceSheetView txns={txns} />}
        {view === "cf" && <CashFlowView txns={txns} />}
        {view === "ratios" && <RatiosView txns={txns} />}
        {view === "charts" && <ChartsView txns={txns} />}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Overview                                                           */
/* ================================================================== */

function Overview({ txns }: { txns: Txn[] }) {
  const { signed } = balances(txns);
  const p = pnl(txns);
  const cash = (signed.get("bank") ?? 0) + (signed.get("cash") ?? 0);
  const tiles = [
    { label: "Cash & bank", value: inr(cash) },
    { label: "Receivables", value: inr(signed.get("ar") ?? 0) },
    { label: "Payables", value: inr(signed.get("ap") ?? 0) },
    { label: "Net profit", value: inr(p.netProfit) },
  ];
  const recent = [...txns].sort(byDate).slice(-6).reverse();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-faint)] mb-1.5">{t.label}</p>
            <p className="font-display text-[22px] text-[color:var(--text)] tabular-nums">{t.value}</p>
          </div>
        ))}
      </div>

      <Card title="Income vs expense by month">
        <GroupedBar data={monthlyIncomeExpense(txns)} aLabel="Income" bLabel="Expense" />
      </Card>

      <Card title="Recent transactions">
        <ul className="divide-y divide-[color:var(--border)]">
          {recent.map((t) => {
            const total = linesFor(t).reduce((s, l) => s + l.debit, 0);
            return (
              <li key={t.id} className="flex items-center justify-between gap-3 py-2.5 text-[13px]">
                <span className="text-[color:var(--text-faint)] font-mono text-[11px] w-20 shrink-0">{t.date}</span>
                <span className="flex-1 text-[color:var(--text)]">
                  {TXN_META[t.type].label} <span className="text-[color:var(--text-faint)]">· {t.party}</span>
                </span>
                <span className="tabular-nums">{inr(total)}</span>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

/* ================================================================== */
/*  New transaction                                                    */
/* ================================================================== */

const TXN_ORDER: TxnType[] = [
  "invoice", "cash-sale", "receipt", "purchase", "pay-supplier", "expense", "capital", "loan", "loan-repay", "buy-asset",
];

function NewTxn({ txns, setTxns }: { txns: Txn[]; setTxns: React.Dispatch<React.SetStateAction<Txn[]>> }) {
  const nextInv = () => `INV-${String(txns.filter((t) => t.type === "invoice").length + 1).padStart(3, "0")}`;
  const [form, setForm] = useState({
    type: "invoice" as TxnType,
    date: "2026-07-12",
    party: "",
    amount: "",
    gstRate: "18",
    expenseAccount: "rent",
    interest: "0",
    ref: nextInv(),
  });
  const meta = TXN_META[form.type];

  const draft: Txn = {
    id: "preview",
    date: form.date,
    type: form.type,
    party: form.party || "—",
    amount: Number(form.amount) || 0,
    gstRate: meta.needsGst ? Number(form.gstRate) || 0 : undefined,
    expenseAccount: meta.needsExpenseAcct ? form.expenseAccount : undefined,
    interest: meta.needsInterest ? Number(form.interest) || 0 : undefined,
    ref: form.type === "invoice" ? form.ref : undefined,
  };
  const preview = linesFor(draft);
  const balanced = linesBalanced(preview) && preview.length > 0;
  const dr = preview.reduce((s, l) => s + l.debit, 0);
  const cr = preview.reduce((s, l) => s + l.credit, 0);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const add = () => {
    if (!draft.amount || !balanced) return;
    setTxns((p) => [...p, { ...draft, id: "t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5) }]);
    setForm((f) => ({ ...f, amount: "", party: "", ref: `INV-${String(txns.filter((t) => t.type === "invoice").length + 2).padStart(3, "0")}` }));
  };

  const inputCls = "w-full rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-3 py-2 text-[14px] text-[color:var(--text)]";
  const labelCls = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className={labelCls}>Transaction type</label>
          <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputCls}>
            {TXN_ORDER.map((t) => (
              <option key={t} value={t}>
                {TXN_META[t].label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Date</label>
            <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>{form.type === "expense" || form.type === "pay-supplier" || form.type === "purchase" ? "Party (supplier)" : form.type === "capital" ? "Owner" : "Party (customer)"}</label>
            <input value={form.party} onChange={(e) => set("party", e.target.value)} placeholder="Name" className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>{meta.amountLabel}</label>
            <input type="number" inputMode="decimal" value={form.amount} onChange={(e) => set("amount", e.target.value)} placeholder="0" className={inputCls} />
          </div>
          {meta.needsGst && (
            <div>
              <label className={labelCls}>GST rate %</label>
              <input type="number" value={form.gstRate} onChange={(e) => set("gstRate", e.target.value)} className={inputCls} />
            </div>
          )}
          {meta.needsExpenseAcct && (
            <div>
              <label className={labelCls}>Expense account</label>
              <select value={form.expenseAccount} onChange={(e) => set("expenseAccount", e.target.value)} className={inputCls}>
                {EXPENSE_ACCOUNTS.map((id) => (
                  <option key={id} value={id}>
                    {acct(id).name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {meta.needsInterest && (
            <div>
              <label className={labelCls}>Interest paid</label>
              <input type="number" value={form.interest} onChange={(e) => set("interest", e.target.value)} className={inputCls} />
            </div>
          )}
          {form.type === "invoice" && (
            <div>
              <label className={labelCls}>Invoice no.</label>
              <input value={form.ref} onChange={(e) => set("ref", e.target.value)} className={inputCls} />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={add}
          disabled={!draft.amount || !balanced}
          className="w-full rounded-lg bg-[color:var(--accent)] px-4 py-2.5 text-[14px] text-white disabled:opacity-40"
        >
          Add entry
        </button>
      </div>

      {/* auto-matched preview */}
      <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-[16px] text-[color:var(--text)]">Auto-matched entry</p>
          <Badge ok={balanced}>{balanced ? "Dr = Cr ✓" : "unbalanced"}</Badge>
        </div>
        <TableWrap>
          <thead>
            <tr>
              <th className={th}>Account</th>
              <th className={th + " text-right"}>Debit</th>
              <th className={th + " text-right"}>Credit</th>
            </tr>
          </thead>
          <tbody>
            {preview.map((l, i) => (
              <tr key={i}>
                <td className={td}>{acct(l.account).name}</td>
                <td className={tdr}>{l.debit ? inr(l.debit) : ""}</td>
                <td className={tdr}>{l.credit ? inr(l.credit) : ""}</td>
              </tr>
            ))}
            <tr>
              <td className={td + " font-medium"}>Total</td>
              <td className={tdr + " font-medium"}>{inr(dr)}</td>
              <td className={tdr + " font-medium"}>{inr(cr)}</td>
            </tr>
          </tbody>
        </TableWrap>
        <p className="mt-3 text-[12.5px] leading-relaxed text-[color:var(--text-faint)]">
          The system picks the accounts and the sides for you from the transaction type. Every
          template is built so total debit equals total credit — that is the &ldquo;auto
          matching&rdquo;. All reports below update the moment you add an entry.
        </p>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Invoices                                                           */
/* ================================================================== */

function Invoices({ txns, setTxns }: { txns: Txn[]; setTxns: React.Dispatch<React.SetStateAction<Txn[]>> }) {
  const list = invoiceList(txns);
  const [open, setOpen] = useState<string | null>(null);

  const markPaid = (ref: string, party: string, gross: number) => {
    setTxns((p) => [
      ...p,
      {
        id: "t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        date: "2026-07-15",
        type: "receipt",
        party,
        amount: gross,
        ref,
      },
    ]);
  };

  if (!list.length) return <p className="text-[14px] text-[color:var(--text-muted)]">No invoices yet. Add one from New transaction.</p>;

  return (
    <div className="space-y-3">
      {list.map(({ txn, gross, net, gst, paid }) => (
        <div key={txn.id} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]">
          <button
            type="button"
            onClick={() => setOpen(open === txn.id ? null : txn.id)}
            className="flex w-full items-center justify-between gap-3 p-4 text-left"
          >
            <span className="flex items-center gap-3">
              <span className="font-mono text-[12px] text-[color:var(--accent)]">{txn.ref}</span>
              <span className="text-[14px] text-[color:var(--text)]">{txn.party}</span>
              <span className="font-mono text-[11px] text-[color:var(--text-faint)]">{txn.date}</span>
            </span>
            <span className="flex items-center gap-3">
              <span className="tabular-nums text-[14px]">{inr(gross)}</span>
              <Badge ok={paid}>{paid ? "Paid" : "Unpaid"}</Badge>
            </span>
          </button>
          {open === txn.id && (
            <div className="border-t border-[color:var(--border)] p-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="font-display text-[18px] text-[color:var(--text)]">Invoice {txn.ref}</p>
                  <p className="text-[12.5px] text-[color:var(--text-faint)]">Date {txn.date}</p>
                </div>
                <div className="text-right text-[12.5px] text-[color:var(--text-muted)]">
                  <p className="text-[color:var(--text-faint)]">Billed to</p>
                  <p className="text-[color:var(--text)]">{txn.party}</p>
                </div>
              </div>
              <TableWrap>
                <thead>
                  <tr>
                    <th className={th}>Description</th>
                    <th className={th + " text-right"}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={td}>Goods / services</td>
                    <td className={tdr}>{inr(net)}</td>
                  </tr>
                  <tr>
                    <td className={td}>GST @ {txn.gstRate}%</td>
                    <td className={tdr}>{inr(gst)}</td>
                  </tr>
                  <tr>
                    <td className={td + " font-medium"}>Total due</td>
                    <td className={tdr + " font-medium"}>{inr(gross)}</td>
                  </tr>
                </tbody>
              </TableWrap>
              <div className="mt-4 flex items-center gap-3">
                {!paid && (
                  <button
                    type="button"
                    onClick={() => markPaid(txn.ref!, txn.party, gross)}
                    className="rounded-lg bg-[color:var(--accent)] px-3.5 py-2 text-[13px] text-white"
                  >
                    Mark as paid (record receipt)
                  </button>
                )}
                <span className="text-[12px] text-[color:var(--text-faint)]">
                  Posting: Dr Accounts Receivable {inr(gross)} · Cr Sales {inr(net)} · Cr GST Payable {inr(gst)}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Journal                                                            */
/* ================================================================== */

function Journal({ txns }: { txns: Txn[] }) {
  const rows = [...txns].sort(byDate);
  return (
    <TableWrap>
      <thead>
        <tr>
          <th className={th}>Date</th>
          <th className={th}>Entry</th>
          <th className={th}>Account</th>
          <th className={th + " text-right"}>Debit</th>
          <th className={th + " text-right"}>Credit</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => {
          const ls = linesFor(t);
          return ls.map((l, i) => (
            <tr key={t.id + i}>
              <td className={td + " font-mono text-[11px] text-[color:var(--text-faint)]"}>{i === 0 ? t.date : ""}</td>
              <td className={td}>
                {i === 0 ? (
                  <>
                    <span className="text-[color:var(--text)]">{t.ref || TXN_META[t.type].label}</span>
                    <span className="block text-[11px] text-[color:var(--text-faint)]">{t.party}</span>
                  </>
                ) : (
                  ""
                )}
              </td>
              <td className={td + (l.credit ? " pl-6" : "")}>{acct(l.account).name}</td>
              <td className={tdr}>{l.debit ? inr(l.debit) : ""}</td>
              <td className={tdr}>{l.credit ? inr(l.credit) : ""}</td>
            </tr>
          ));
        })}
      </tbody>
    </TableWrap>
  );
}

/* ================================================================== */
/*  Ledger                                                             */
/* ================================================================== */

function LedgerView({ txns }: { txns: Txn[] }) {
  const [id, setId] = useState("bank");
  const l = ledger(txns, id);
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-faint)]">Account</label>
        <select
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-3 py-2 text-[14px] text-[color:var(--text)]"
        >
          {ACCOUNTS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <TableWrap>
        <thead>
          <tr>
            <th className={th}>Date</th>
            <th className={th}>Particulars</th>
            <th className={th + " text-right"}>Debit</th>
            <th className={th + " text-right"}>Credit</th>
            <th className={th + " text-right"}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {l.rows.map((r, i) => (
            <tr key={i}>
              <td className={td + " font-mono text-[11px] text-[color:var(--text-faint)]"}>{r.date}</td>
              <td className={td}>
                {r.ref} <span className="text-[color:var(--text-faint)]">· {r.desc}</span>
              </td>
              <td className={tdr}>{r.debit ? inr(r.debit) : ""}</td>
              <td className={tdr}>{r.credit ? inr(r.credit) : ""}</td>
              <td className={tdr}>{inr(r.balance)}</td>
            </tr>
          ))}
          <tr>
            <td className={td + " font-medium"} colSpan={4}>
              Closing balance — {l.account.name}
            </td>
            <td className={tdr + " font-medium"}>{inr(l.closing)}</td>
          </tr>
        </tbody>
      </TableWrap>
    </div>
  );
}

/* ================================================================== */
/*  Trial balance                                                      */
/* ================================================================== */

function TrialBalanceView({ txns }: { txns: Txn[] }) {
  const t = trialBalance(txns);
  return (
    <div className="space-y-3">
      <TableWrap>
        <thead>
          <tr>
            <th className={th}>Account</th>
            <th className={th + " text-right"}>Debit</th>
            <th className={th + " text-right"}>Credit</th>
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r) => (
            <tr key={r.account.id}>
              <td className={td}>{r.account.name}</td>
              <td className={tdr}>{r.debit ? inr(r.debit) : ""}</td>
              <td className={tdr}>{r.credit ? inr(r.credit) : ""}</td>
            </tr>
          ))}
          <tr>
            <td className={td + " font-medium"}>Total</td>
            <td className={tdr + " font-medium"}>{inr(t.debitTotal)}</td>
            <td className={tdr + " font-medium"}>{inr(t.creditTotal)}</td>
          </tr>
        </tbody>
      </TableWrap>
      <Badge ok={t.balanced}>
        {t.balanced ? "Debit total = Credit total" : "Totals do not match"}
      </Badge>
    </div>
  );
}

/* ================================================================== */
/*  P&L                                                                */
/* ================================================================== */

function Row({ label, value, bold, indent }: { label: string; value: number; bold?: boolean; indent?: boolean }) {
  return (
    <tr>
      <td className={td + (indent ? " pl-6" : "") + (bold ? " font-medium" : "")}>{label}</td>
      <td className={tdr + (bold ? " font-medium" : "")}>
        <Money v={value} bold={bold} />
      </td>
    </tr>
  );
}

function PnLView({ txns }: { txns: Txn[] }) {
  const p = pnl(txns);
  return (
    <div className="max-w-xl">
      <TableWrap>
        <tbody>
          <Row label="Revenue" value={p.revenue} bold />
          <Row label="Cost of goods sold" value={-p.cogs} indent />
          <Row label="Gross profit" value={p.grossProfit} bold />
          {p.opex.map((o) => (
            <Row key={o.account.id} label={o.account.name} value={-o.amount} indent />
          ))}
          <Row label="Total operating expenses" value={-p.opexTotal} />
          <Row label="Net profit" value={p.netProfit} bold />
        </tbody>
      </TableWrap>
      <p className="mt-3 text-[12.5px] text-[color:var(--text-faint)]">
        Net margin {pct(p.revenue ? (p.netProfit / p.revenue) * 100 : NaN)} · Gross margin{" "}
        {pct(p.revenue ? (p.grossProfit / p.revenue) * 100 : NaN)}
      </p>
    </div>
  );
}

/* ================================================================== */
/*  Balance sheet                                                      */
/* ================================================================== */

function BalanceSheetView({ txns }: { txns: Txn[] }) {
  const b = balanceSheet(txns);
  const list = (rows: { account: { id: string; name: string }; amount: number }[]) =>
    rows.map((r) => <Row key={r.account.id} label={r.account.name} value={r.amount} indent />);

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
      <Card title="Assets">
        <TableWrap>
          <tbody>
            <tr>
              <td className={td + " font-medium"} colSpan={2}>
                Current assets
              </td>
            </tr>
            {list(b.currentAssets)}
            <tr>
              <td className={td + " font-medium"} colSpan={2}>
                Fixed assets
              </td>
            </tr>
            {list(b.fixedAssets)}
            <Row label="Total assets" value={b.assetsTotal} bold />
          </tbody>
        </TableWrap>
      </Card>
      <Card title="Liabilities & equity">
        <TableWrap>
          <tbody>
            <tr>
              <td className={td + " font-medium"} colSpan={2}>
                Liabilities
              </td>
            </tr>
            {list(b.currentLiab)}
            {list(b.longLiab)}
            <Row label="Total liabilities" value={b.liabTotal} />
            <tr>
              <td className={td + " font-medium"} colSpan={2}>
                Equity
              </td>
            </tr>
            <Row label="Owner's capital" value={b.capital} indent />
            <Row label="Retained earnings (period profit)" value={b.retained} indent />
            <Row label="Total equity" value={b.equityTotal} />
            <Row label="Total liabilities & equity" value={b.liabTotal + b.equityTotal} bold />
          </tbody>
        </TableWrap>
      </Card>
      <div className="md:col-span-2">
        <Badge ok={Math.abs(b.check) < 0.01}>
          {Math.abs(b.check) < 0.01 ? "Assets = Liabilities + Equity" : `Off by ${inr(b.check)}`}
        </Badge>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Cash flow                                                          */
/* ================================================================== */

function CashFlowView({ txns }: { txns: Txn[] }) {
  const c = cashFlow(txns);
  const groups: { key: "operating" | "investing" | "financing"; label: string }[] = [
    { key: "operating", label: "Operating activities" },
    { key: "investing", label: "Investing activities" },
    { key: "financing", label: "Financing activities" },
  ];
  return (
    <div className="max-w-2xl">
      <TableWrap>
        <tbody>
          {groups.map((g) => (
            <FragmentRows key={g.key} label={g.label} rows={c.rows.filter((r) => r.category === g.key)} subtotal={c[g.key]} />
          ))}
          <Row label="Net change in cash" value={c.net} bold />
          <Row label="Opening cash" value={c.opening} indent />
          <Row label="Closing cash" value={c.closing} bold />
        </tbody>
      </TableWrap>
    </div>
  );
}

function FragmentRows({
  label,
  rows,
  subtotal,
}: {
  label: string;
  rows: { date: string; label: string; party: string; amount: number }[];
  subtotal: number;
}) {
  return (
    <>
      <tr>
        <td className={td + " font-medium"} colSpan={2}>
          {label}
        </td>
      </tr>
      {rows.map((r, i) => (
        <tr key={i}>
          <td className={td + " pl-6"}>
            <span className="font-mono text-[11px] text-[color:var(--text-faint)]">{r.date}</span> {r.label}{" "}
            <span className="text-[color:var(--text-faint)]">· {r.party}</span>
          </td>
          <td className={tdr}>
            <Money v={r.amount} />
          </td>
        </tr>
      ))}
      <Row label={`Net ${label.toLowerCase()}`} value={subtotal} indent />
    </>
  );
}

/* ================================================================== */
/*  Ratios                                                             */
/* ================================================================== */

function RatiosView({ txns }: { txns: Txn[] }) {
  const rs = ratios(txns);
  const fmt = (v: number, unit: string) =>
    !Number.isFinite(v) ? "—" : unit === "%" ? pct(v) : unit === "days" ? `${num(v, 0)} days` : `${num(v)}×`;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rs.map((r) => (
        <div key={r.id} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-[14px] text-[color:var(--text)]">{r.name}</p>
            <p className="font-display text-[20px] text-[color:var(--text)] tabular-nums">{fmt(r.value, r.unit)}</p>
          </div>
          <p className="mt-1 font-mono text-[11px] text-[color:var(--text-faint)]">{r.formula}</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-[color:var(--text-muted)]">{r.reading}</p>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Charts                                                             */
/* ================================================================== */

function ChartsView({ txns }: { txns: Txn[] }) {
  return (
    <div className="space-y-6">
      <Card title="Income vs expense by month">
        <GroupedBar data={monthlyIncomeExpense(txns)} aLabel="Income" bLabel="Expense" />
      </Card>
      <Card title="Cash balance over time">
        <LineChart data={cashTrend(txns)} />
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Where the money went (expenses)">
          <Donut data={expenseBreakdown(txns)} />
        </Card>
        <Card title="What the business owns (assets)">
          <Donut data={assetBreakdown(txns)} />
        </Card>
      </div>
    </div>
  );
}
