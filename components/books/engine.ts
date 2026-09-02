/* ------------------------------------------------------------------ *
 *  Mini double-entry accounting engine
 *  Pure functions — every transaction template produces balanced
 *  debit = credit lines, and every report is derived from the journal.
 * ------------------------------------------------------------------ */

export type AcctType = "asset" | "liability" | "equity" | "income" | "expense";

export type Section =
  | "current-asset"
  | "fixed-asset"
  | "current-liability"
  | "long-term-liability"
  | "equity"
  | "income"
  | "cogs"
  | "opex";

export type Account = { id: string; name: string; type: AcctType; section: Section };

export const ACCOUNTS: Account[] = [
  { id: "cash", name: "Cash", type: "asset", section: "current-asset" },
  { id: "bank", name: "Bank", type: "asset", section: "current-asset" },
  { id: "ar", name: "Accounts Receivable", type: "asset", section: "current-asset" },
  { id: "inventory", name: "Inventory", type: "asset", section: "current-asset" },
  { id: "ppe", name: "Equipment", type: "asset", section: "fixed-asset" },
  { id: "ap", name: "Accounts Payable", type: "liability", section: "current-liability" },
  { id: "gst", name: "GST Payable", type: "liability", section: "current-liability" },
  { id: "loan", name: "Bank Loan", type: "liability", section: "long-term-liability" },
  { id: "capital", name: "Owner's Capital", type: "equity", section: "equity" },
  { id: "sales", name: "Sales", type: "income", section: "income" },
  { id: "cogs", name: "Cost of Goods Sold", type: "expense", section: "cogs" },
  { id: "rent", name: "Rent", type: "expense", section: "opex" },
  { id: "salaries", name: "Salaries", type: "expense", section: "opex" },
  { id: "utilities", name: "Utilities", type: "expense", section: "opex" },
  { id: "interest", name: "Interest Expense", type: "expense", section: "opex" },
];

export const acct = (id: string): Account =>
  ACCOUNTS.find((a) => a.id === id) ?? ACCOUNTS[0];

export const isDebitNormal = (t: AcctType) => t === "asset" || t === "expense";

export const EXPENSE_ACCOUNTS = ["rent", "salaries", "utilities", "cogs"] as const;

/* ------------------------------------------------------------------ */

export type Line = { account: string; debit: number; credit: number };

export type TxnType =
  | "capital"
  | "loan"
  | "buy-asset"
  | "invoice"
  | "cash-sale"
  | "receipt"
  | "purchase"
  | "pay-supplier"
  | "expense"
  | "loan-repay";

export type Txn = {
  id: string;
  date: string; // yyyy-mm-dd
  type: TxnType;
  party: string;
  amount: number; // net (pre-GST) for sale/purchase/expense; gross for the rest
  gstRate?: number;
  expenseAccount?: string;
  ref?: string;
  interest?: number;
};

export const TXN_META: Record<
  TxnType,
  { label: string; needsGst?: boolean; needsExpenseAcct?: boolean; needsInterest?: boolean; amountLabel: string; cash: "operating" | "investing" | "financing" | "none" }
> = {
  capital: { label: "Owner's capital introduced", amountLabel: "Amount", cash: "financing" },
  loan: { label: "Bank loan received", amountLabel: "Loan amount", cash: "financing" },
  "loan-repay": { label: "Loan repayment", amountLabel: "Principal repaid", needsInterest: true, cash: "financing" },
  "buy-asset": { label: "Buy equipment", amountLabel: "Cost", cash: "investing" },
  invoice: { label: "Invoice — credit sale", needsGst: true, amountLabel: "Amount (before GST)", cash: "none" },
  "cash-sale": { label: "Cash sale", needsGst: true, amountLabel: "Amount (before GST)", cash: "operating" },
  receipt: { label: "Customer payment received", amountLabel: "Amount received", cash: "operating" },
  purchase: { label: "Purchase of goods (on credit)", needsGst: true, amountLabel: "Amount (before GST)", cash: "none" },
  "pay-supplier": { label: "Payment to supplier", amountLabel: "Amount paid", cash: "operating" },
  expense: { label: "Expense paid", needsGst: true, needsExpenseAcct: true, amountLabel: "Amount (before GST)", cash: "operating" },
};

const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

function rawLines(t: Txn): Line[] {
  const g = t.gstRate ?? 0;
  const tax = r2((t.amount * g) / 100);
  const gross = r2(t.amount + tax);
  const D = (account: string, v: number): Line => ({ account, debit: r2(v), credit: 0 });
  const C = (account: string, v: number): Line => ({ account, debit: 0, credit: r2(v) });

  switch (t.type) {
    case "capital":
      return [D("bank", t.amount), C("capital", t.amount)];
    case "loan":
      return [D("bank", t.amount), C("loan", t.amount)];
    case "buy-asset":
      return [D("ppe", t.amount), C("bank", t.amount)];
    case "invoice":
      return [D("ar", gross), C("sales", t.amount), C("gst", tax)];
    case "cash-sale":
      return [D("bank", gross), C("sales", t.amount), C("gst", tax)];
    case "receipt":
      return [D("bank", t.amount), C("ar", t.amount)];
    case "purchase":
      return [D("cogs", t.amount), D("gst", tax), C("ap", gross)];
    case "pay-supplier":
      return [D("ap", t.amount), C("bank", t.amount)];
    case "expense":
      return [D(t.expenseAccount ?? "rent", t.amount), D("gst", tax), C("bank", gross)];
    case "loan-repay": {
      const int = t.interest ?? 0;
      return [D("loan", t.amount), D("interest", int), C("bank", r2(t.amount + int))];
    }
    default:
      return [];
  }
}

/** Balanced journal lines for a transaction (zero-value lines dropped). */
export function linesFor(t: Txn): Line[] {
  return rawLines(t).filter((l) => l.debit !== 0 || l.credit !== 0);
}

export function linesBalanced(ls: Line[]): boolean {
  const d = r2(ls.reduce((s, l) => s + l.debit, 0));
  const c = r2(ls.reduce((s, l) => s + l.credit, 0));
  return Math.abs(d - c) < 0.01;
}

export const byDate = (a: Txn, b: Txn) =>
  a.date < b.date ? -1 : a.date > b.date ? 1 : a.id < b.id ? -1 : 1;

export const txnTotal = (t: Txn) =>
  r2(linesFor(t).reduce((s, l) => s + l.debit, 0));

/* ------------------------------------------------------------------ */
/*  Balances                                                           */
/* ------------------------------------------------------------------ */

export function balances(txns: Txn[]) {
  const raw = new Map<string, { debit: number; credit: number }>();
  ACCOUNTS.forEach((a) => raw.set(a.id, { debit: 0, credit: 0 }));
  txns.forEach((t) =>
    linesFor(t).forEach((l) => {
      const e = raw.get(l.account);
      if (!e) return;
      e.debit = r2(e.debit + l.debit);
      e.credit = r2(e.credit + l.credit);
    }),
  );
  const signed = new Map<string, number>();
  ACCOUNTS.forEach((a) => {
    const e = raw.get(a.id)!;
    const net = e.debit - e.credit;
    signed.set(a.id, r2(isDebitNormal(a.type) ? net : -net));
  });
  return { raw, signed };
}

export function trialBalance(txns: Txn[]) {
  const { raw } = balances(txns);
  const rows = ACCOUNTS.map((a) => {
    const e = raw.get(a.id)!;
    const net = r2(e.debit - e.credit);
    return { account: a, debit: net > 0 ? net : 0, credit: net < 0 ? -net : 0 };
  }).filter((row) => row.debit !== 0 || row.credit !== 0);
  const debitTotal = r2(rows.reduce((s, row) => s + row.debit, 0));
  const creditTotal = r2(rows.reduce((s, row) => s + row.credit, 0));
  return { rows, debitTotal, creditTotal, balanced: Math.abs(debitTotal - creditTotal) < 0.01 };
}

export type LedgerRow = {
  date: string;
  ref: string;
  desc: string;
  debit: number;
  credit: number;
  balance: number;
};

export function ledger(txns: Txn[], accountId: string) {
  const a = acct(accountId);
  const rows: LedgerRow[] = [];
  let bal = 0;
  [...txns].sort(byDate).forEach((t) => {
    linesFor(t)
      .filter((l) => l.account === accountId)
      .forEach((l) => {
        bal += isDebitNormal(a.type) ? l.debit - l.credit : l.credit - l.debit;
        rows.push({
          date: t.date,
          ref: t.ref || TXN_META[t.type].label,
          desc: t.party,
          debit: l.debit,
          credit: l.credit,
          balance: r2(bal),
        });
      });
  });
  return { account: a, rows, closing: r2(bal) };
}

/* ------------------------------------------------------------------ */
/*  Statements                                                         */
/* ------------------------------------------------------------------ */

export function pnl(txns: Txn[]) {
  const { signed } = balances(txns);
  const revenue = signed.get("sales") ?? 0;
  const cogs = signed.get("cogs") ?? 0;
  const grossProfit = r2(revenue - cogs);
  const opex = ACCOUNTS.filter((a) => a.section === "opex")
    .map((a) => ({ account: a, amount: r2(signed.get(a.id) ?? 0) }))
    .filter((row) => row.amount !== 0);
  const opexTotal = r2(opex.reduce((s, row) => s + row.amount, 0));
  const netProfit = r2(grossProfit - opexTotal);
  return { revenue, cogs, grossProfit, opex, opexTotal, netProfit };
}

export function balanceSheet(txns: Txn[]) {
  const { signed } = balances(txns);
  const netProfit = pnl(txns).netProfit;
  const bySection = (secs: Section[]) =>
    ACCOUNTS.filter((a) => secs.includes(a.section))
      .map((a) => ({ account: a, amount: r2(signed.get(a.id) ?? 0) }))
      .filter((row) => row.amount !== 0);

  const currentAssets = bySection(["current-asset"]);
  const fixedAssets = bySection(["fixed-asset"]);
  const assetsTotal = r2([...currentAssets, ...fixedAssets].reduce((s, r) => s + r.amount, 0));

  const currentLiab = bySection(["current-liability"]);
  const longLiab = bySection(["long-term-liability"]);
  const liabTotal = r2([...currentLiab, ...longLiab].reduce((s, r) => s + r.amount, 0));

  const capital = r2(signed.get("capital") ?? 0);
  const equityTotal = r2(capital + netProfit);

  return {
    currentAssets,
    fixedAssets,
    assetsTotal,
    currentLiab,
    longLiab,
    liabTotal,
    capital,
    retained: netProfit,
    equityTotal,
    check: r2(assetsTotal - liabTotal - equityTotal),
  };
}

export type CashRow = {
  date: string;
  label: string;
  party: string;
  category: "operating" | "investing" | "financing";
  amount: number;
};

export function cashFlow(txns: Txn[]) {
  const delta = (t: Txn) =>
    linesFor(t)
      .filter((l) => l.account === "cash" || l.account === "bank")
      .reduce((s, l) => s + l.debit - l.credit, 0);

  const cat = { operating: 0, investing: 0, financing: 0 };
  const rows: CashRow[] = [];
  [...txns].sort(byDate).forEach((t) => {
    const d = r2(delta(t));
    if (d === 0) return;
    const raw = TXN_META[t.type].cash;
    const category: "operating" | "investing" | "financing" = raw === "none" ? "operating" : raw;
    cat[category] = r2(cat[category] + d);
    rows.push({ date: t.date, label: TXN_META[t.type].label, party: t.party, category, amount: d });
  });
  const net = r2(cat.operating + cat.investing + cat.financing);
  return { ...cat, rows, net, opening: 0, closing: net };
}

/* ------------------------------------------------------------------ */
/*  Ratios                                                             */
/* ------------------------------------------------------------------ */

export type Ratio = {
  id: string;
  name: string;
  value: number;
  unit: "x" | "%" | "days";
  formula: string;
  reading: string;
};

export function ratios(txns: Txn[]): Ratio[] {
  const bs = balanceSheet(txns);
  const pl = pnl(txns);
  const sum = (rows: { amount: number }[]) => rows.reduce((s, r) => s + r.amount, 0);
  const ca = sum(bs.currentAssets);
  const cl = sum(bs.currentLiab);
  const inv = bs.currentAssets.find((r) => r.account.id === "inventory")?.amount ?? 0;
  const ar = bs.currentAssets.find((r) => r.account.id === "ar")?.amount ?? 0;

  return [
    {
      id: "current",
      name: "Current ratio",
      value: cl ? ca / cl : NaN,
      unit: "x",
      formula: "Current assets ÷ Current liabilities",
      reading: "Above ~1.5 means short-term bills are comfortably covered by short-term assets.",
    },
    {
      id: "quick",
      name: "Quick ratio",
      value: cl ? (ca - inv) / cl : NaN,
      unit: "x",
      formula: "(Current assets − Inventory) ÷ Current liabilities",
      reading: "The same test without relying on selling stock. Above ~1 is healthy.",
    },
    {
      id: "gross",
      name: "Gross margin",
      value: pl.revenue ? (pl.grossProfit / pl.revenue) * 100 : NaN,
      unit: "%",
      formula: "Gross profit ÷ Revenue × 100",
      reading: "How much of each sales rupee is left after the direct cost of goods.",
    },
    {
      id: "net",
      name: "Net margin",
      value: pl.revenue ? (pl.netProfit / pl.revenue) * 100 : NaN,
      unit: "%",
      formula: "Net profit ÷ Revenue × 100",
      reading: "Profit left after every expense, per rupee of sales.",
    },
    {
      id: "de",
      name: "Debt to equity",
      value: bs.equityTotal ? bs.liabTotal / bs.equityTotal : NaN,
      unit: "x",
      formula: "Total liabilities ÷ Total equity",
      reading: "How much the business is funded by borrowing versus the owner's money.",
    },
    {
      id: "roe",
      name: "Return on equity",
      value: bs.equityTotal ? (pl.netProfit / bs.equityTotal) * 100 : NaN,
      unit: "%",
      formula: "Net profit ÷ Total equity × 100",
      reading: "The return the business earned on the owner's capital.",
    },
    {
      id: "ardays",
      name: "Receivable days",
      value: pl.revenue ? (ar / pl.revenue) * 365 : NaN,
      unit: "days",
      formula: "Accounts receivable ÷ Revenue × 365",
      reading: "Average days customers take to pay. Lower frees up cash.",
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Chart series                                                       */
/* ------------------------------------------------------------------ */

const monthKey = (d: string) => d.slice(0, 7);
const monthLabel = (k: string) => {
  const [y, m] = k.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-US", { month: "short" });
};

export function monthlyIncomeExpense(txns: Txn[]) {
  const map = new Map<string, { income: number; expense: number }>();
  [...txns].sort(byDate).forEach((t) => {
    const k = monthKey(t.date);
    if (!map.has(k)) map.set(k, { income: 0, expense: 0 });
    const e = map.get(k)!;
    linesFor(t).forEach((l) => {
      const a = acct(l.account);
      if (a.type === "income") e.income = r2(e.income + l.credit - l.debit);
      if (a.type === "expense") e.expense = r2(e.expense + l.debit - l.credit);
    });
  });
  return [...map.entries()].map(([k, v]) => ({ label: monthLabel(k), a: v.income, b: v.expense }));
}

export function cashTrend(txns: Txn[]) {
  let bal = 0;
  const pts: { label: string; value: number }[] = [];
  [...txns].sort(byDate).forEach((t) => {
    linesFor(t)
      .filter((l) => l.account === "cash" || l.account === "bank")
      .forEach((l) => {
        bal = r2(bal + l.debit - l.credit);
      });
    pts.push({ label: t.date.slice(5), value: bal });
  });
  return pts;
}

export function expenseBreakdown(txns: Txn[]) {
  const { signed } = balances(txns);
  return ACCOUNTS.filter((a) => a.type === "expense")
    .map((a) => ({ label: a.name, value: r2(signed.get(a.id) ?? 0) }))
    .filter((r) => r.value > 0);
}

export function assetBreakdown(txns: Txn[]) {
  const { signed } = balances(txns);
  return ACCOUNTS.filter((a) => a.type === "asset")
    .map((a) => ({ label: a.name, value: r2(signed.get(a.id) ?? 0) }))
    .filter((r) => r.value > 0);
}

/* ------------------------------------------------------------------ */
/*  Invoices                                                           */
/* ------------------------------------------------------------------ */

export function invoiceList(txns: Txn[]) {
  const receipts = txns.filter((t) => t.type === "receipt" && t.ref);
  return txns
    .filter((t) => t.type === "invoice")
    .sort(byDate)
    .map((t) => {
      const gross = txnTotal(t);
      const paid = receipts.some((r) => r.ref === t.ref);
      return { txn: t, gross, net: t.amount, gst: r2(gross - t.amount), paid };
    });
}

/* ------------------------------------------------------------------ */
/*  Seed data — a small trading business, Apr–Jul 2026                 */
/* ------------------------------------------------------------------ */

export const SAMPLE_TXNS: Txn[] = [
  { id: "s01", date: "2026-04-01", type: "capital", party: "Owner", amount: 500000 },
  { id: "s02", date: "2026-04-02", type: "loan", party: "State Bank", amount: 200000 },
  { id: "s03", date: "2026-04-05", type: "buy-asset", party: "Dell India", amount: 150000 },
  { id: "s04", date: "2026-04-10", type: "invoice", party: "Acme Corp", amount: 80000, gstRate: 18, ref: "INV-001" },
  { id: "s05", date: "2026-04-15", type: "purchase", party: "Prime Supplies", amount: 42000, gstRate: 18 },
  { id: "s06", date: "2026-04-20", type: "expense", party: "Landlord", amount: 25000, expenseAccount: "rent" },
  { id: "s07", date: "2026-04-28", type: "expense", party: "Payroll", amount: 60000, expenseAccount: "salaries" },
  { id: "s08", date: "2026-05-03", type: "receipt", party: "Acme Corp", amount: 94400, ref: "INV-001" },
  { id: "s09", date: "2026-05-08", type: "invoice", party: "Beta Ltd", amount: 120000, gstRate: 18, ref: "INV-002" },
  { id: "s10", date: "2026-05-12", type: "cash-sale", party: "Walk-in", amount: 30000, gstRate: 18 },
  { id: "s11", date: "2026-05-18", type: "pay-supplier", party: "Prime Supplies", amount: 49560 },
  { id: "s12", date: "2026-05-25", type: "expense", party: "Electricity Board", amount: 8000, expenseAccount: "utilities" },
  { id: "s13", date: "2026-06-02", type: "invoice", party: "Gamma LLP", amount: 95000, gstRate: 18, ref: "INV-003" },
  { id: "s14", date: "2026-06-10", type: "expense", party: "Payroll", amount: 60000, expenseAccount: "salaries" },
  { id: "s15", date: "2026-06-15", type: "expense", party: "Landlord", amount: 25000, expenseAccount: "rent" },
  { id: "s16", date: "2026-06-20", type: "receipt", party: "Beta Ltd", amount: 141600, ref: "INV-002" },
  { id: "s17", date: "2026-07-01", type: "loan-repay", party: "State Bank", amount: 20000, interest: 1500 },
  { id: "s18", date: "2026-07-06", type: "purchase", party: "Prime Supplies", amount: 35000, gstRate: 18 },
];
