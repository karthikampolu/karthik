"use client";

import { useState } from "react";
import {
  Calc,
  CompositionBar,
  Field,
  InfoBar,
  ResultCard,
  Segmented,
  Stat,
  YearFlows,
  inr,
  irr,
  npv,
  num,
  pct,
} from "@/components/calculators/calc-kit";

/* ------------------------------------------------------------------ */
/*  Dashboard index                                                    */
/* ------------------------------------------------------------------ */

const categories = [
  {
    id: "cat-personal",
    label: "Personal finance",
    items: [
      { n: "01", id: "sip", name: "SIP future value", one: "What a fixed monthly investment grows to." },
      { n: "02", id: "lumpsum", name: "Lump-sum compounding", one: "What a one-time amount grows to." },
      { n: "03", id: "goal", name: "Goal planner", one: "The monthly saving a target needs." },
      { n: "04", id: "retirement", name: "Retirement planner", one: "Corpus and monthly saving for retirement." },
      { n: "05", id: "swp", name: "Withdrawal plan (SWP)", one: "How long a corpus lasts while you draw from it." },
      { n: "06", id: "cagr", name: "CAGR", one: "The yearly growth rate between two values." },
      { n: "07", id: "inflation", name: "Inflation / buying power", one: "How prices and money change over time." },
    ],
  },
  {
    id: "cat-loans",
    label: "Loans & credit",
    items: [
      { n: "08", id: "emi", name: "Loan EMI", one: "The monthly instalment on a loan." },
      { n: "09", id: "affordability", name: "Loan affordability", one: "The loan an EMI budget can support." },
      { n: "10", id: "ear", name: "Nominal vs effective rate", one: "The real yearly rate after compounding." },
    ],
  },
  {
    id: "cat-valuation",
    label: "Investing & valuation",
    items: [
      { n: "11", id: "capm", name: "Cost of equity (CAPM)", one: "The return shareholders expect for the risk." },
      { n: "12", id: "wacc", name: "WACC", one: "A firm's blended cost of capital." },
      { n: "13", id: "ddm", name: "Dividend discount value", one: "Share value from growing dividends." },
      { n: "14", id: "bond", name: "Bond price", one: "What a bond is worth at a given yield." },
    ],
  },
  {
    id: "cat-corporate",
    label: "Corporate & projects",
    items: [
      { n: "15", id: "npv", name: "NPV", one: "Whether a project adds value, in today's money." },
      { n: "16", id: "irr", name: "IRR", one: "A project's own break-even return rate." },
      { n: "17", id: "payback", name: "Payback period", one: "How long until a project repays its cost." },
      { n: "18", id: "breakeven", name: "Break-even analysis", one: "The sales needed to cover all costs." },
      { n: "19", id: "eoq", name: "Economic order quantity", one: "The order size that minimises inventory cost." },
      { n: "20", id: "ccc", name: "Cash conversion cycle", one: "Days cash is tied up in operations." },
    ],
  },
];

/* ================================================================== */

export default function FinancialCalculators() {
  return (
    <div>
      {/* ---------------- Category nav ---------------- */}
      <div className="mt-8 -mx-4 sm:mx-0 overflow-x-auto">
        <div className="flex gap-2 px-4 sm:px-0">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="whitespace-nowrap rounded-full border border-[color:var(--border-strong)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--text-muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>

      {/* ---------------- Grouped hub ---------------- */}
      <div className="mt-8 space-y-8">
        {categories.map((c) => (
          <div key={c.id}>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--text-faint)] mb-3">
              {c.label}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {c.items.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className="group rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 transition-colors hover:border-[color:var(--accent)]"
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-mono text-[11px] text-[color:var(--accent)]">{h.n}</span>
                    <span className="font-display text-[16px] text-[color:var(--text)] group-hover:underline">
                      {h.name}
                    </span>
                  </div>
                  <p className="text-[13px] leading-snug text-[color:var(--text-faint)]">{h.one}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ================= PERSONAL FINANCE ================= */}
      <CategoryHeading id="cat-personal" label="Personal finance" />
      <SIP />
      <LumpSum />
      <Goal />
      <Retirement />
      <SWP />
      <CAGR />
      <Inflation />

      {/* ================= LOANS & CREDIT ================= */}
      <CategoryHeading id="cat-loans" label="Loans & credit" />
      <EMI />
      <Affordability />
      <EAR />

      {/* ================= INVESTING & VALUATION ================= */}
      <CategoryHeading id="cat-valuation" label="Investing & valuation" />
      <CAPM />
      <WACC />
      <DDM />
      <Bond />

      {/* ================= CORPORATE & PROJECTS ================= */}
      <CategoryHeading id="cat-corporate" label="Corporate & projects" />
      <NPV />
      <IRR />
      <Payback />
      <BreakEven />
      <EOQ />
      <CCC />
    </div>
  );
}

function CategoryHeading({ id, label }: { id: string; label: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 font-display text-3xl md:text-4xl text-[color:var(--text)] mt-24 mb-2 leading-snug border-t-2 border-[color:var(--accent)] pt-8"
    >
      {label}
    </h2>
  );
}

/* two-column input / result layout */
function Grid({ inputs, result }: { inputs: React.ReactNode; result: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5">{inputs}</div>
      {result}
    </div>
  );
}

/* ================================================================== */
/*  01 — SIP future value                                              */
/* ================================================================== */

function SIP() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const i = rate / 100 / 12;
  const n = years * 12;
  const fv = i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = monthly * n;
  const gains = fv - invested;

  return (
    <Calc id="sip" index="01" tag="SIP" title="SIP future value"
      what="A SIP (Systematic Investment Plan) is investing a fixed amount every month. This shows what that pile of monthly investments could grow to at a steady average return.">
      <Grid
        inputs={<>
          <Field label="Monthly investment" value={monthly} onChange={setMonthly} min={500} max={200000} step={500} unit="₹" />
          <Field label="Expected return (per year)" value={rate} onChange={setRate} min={1} max={25} step={0.5} unit="%" />
          <Field label="Time period" value={years} onChange={setYears} min={1} max={40} step={1} unit="yrs" />
        </>}
        result={
          <ResultCard primaryLabel="Estimated value" primaryValue={inr(fv)}>
            <Stat label="You invest" value={inr(invested)} />
            <Stat label="Est. gains" value={inr(gains)} />
            <Stat label="Instalments" value={num(n, 0)} />
          </ResultCard>
        }
      />
      <CompositionBar segments={[
        { label: "Invested", value: invested, tone: "muted" },
        { label: "Gains", value: gains, tone: "accent" },
      ]} />
      <InfoBar
        included={[
          "Monthly investment amount (assumed constant for the whole period).",
          "Expected average annual return, converted to a monthly rate.",
          "Number of years, converted to a number of monthly instalments.",
        ]}
        formula={"FV = P × ( (1 + i)^n − 1 ) / i × (1 + i)"}
        where={["P = monthly investment", "i = annual return ÷ 12 ÷ 100", "n = years × 12", "FV = value at the end"]}
        how={[
          "Each instalment earns compound growth for the months it stays invested — the first one the longest, the last one barely at all.",
          "The bracket ( (1 + i)^n − 1 ) / i sums the growth of every instalment in one step (the future value of an annuity).",
          "The extra × (1 + i) assumes you invest at the start of each month, so every instalment gets one more month of growth.",
          "“You invest” is P × n; “gains” is the rest.",
        ]}
        note="Real returns are not smooth. A single average rate hides market ups and downs, and ignores fund costs and taxes."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  02 — Lump-sum compounding                                          */
/* ================================================================== */

const FREQS = [
  { label: "Yearly", value: 1 },
  { label: "Half-yearly", value: 2 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
];

function LumpSum() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [freq, setFreq] = useState(1);

  const r = rate / 100;
  const fv = principal * Math.pow(1 + r / freq, freq * years);
  const interest = fv - principal;

  return (
    <Calc id="lumpsum" index="02" tag="COMPOUND" title="Lump-sum compounding"
      what="Put in one amount today, leave it untouched, and let it compound. This also covers fixed deposits — just set how often interest is added.">
      <Grid
        inputs={<>
          <Field label="Amount invested today" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} unit="₹" />
          <Field label="Interest / return per year" value={rate} onChange={setRate} min={1} max={20} step={0.25} unit="%" />
          <Field label="Time period" value={years} onChange={setYears} min={1} max={40} step={1} unit="yrs" />
          <Segmented label="Compounding" value={freq} onChange={setFreq} options={FREQS} />
        </>}
        result={
          <ResultCard primaryLabel="Maturity value" primaryValue={inr(fv)}>
            <Stat label="Invested" value={inr(principal)} />
            <Stat label="Interest earned" value={inr(interest)} />
            <Stat label="Growth" value={pct((fv / principal - 1) * 100)} />
          </ResultCard>
        }
      />
      <CompositionBar segments={[
        { label: "Principal", value: principal, tone: "muted" },
        { label: "Interest", value: interest, tone: "accent" },
      ]} />
      <InfoBar
        included={[
          "The one-time amount you invest.",
          "Annual interest or return rate.",
          "How often interest is added back (yearly, half-yearly, quarterly, monthly).",
          "Number of years.",
        ]}
        formula={"FV = P × (1 + r / m)^(m × t)"}
        where={["P = amount invested today", "r = annual rate ÷ 100", "m = compounding times per year", "t = number of years"]}
        how={[
          "Each period adds interest of r / m on the balance so far.",
          "That new balance then earns interest next period — this “interest on interest” is compounding.",
          "Raising (1 + r / m) to the power m × t applies that step for every period at once.",
          "More frequent compounding (bigger m) gives a slightly higher result for the same rate.",
        ]}
        note="Bank FDs usually compound quarterly. This ignores TDS and tax on interest."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  03 — Goal planner                                                  */
/* ================================================================== */

function Goal() {
  const [target, setTarget] = useState(10000000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);

  const i = rate / 100 / 12;
  const n = years * 12;
  const monthly = i === 0 ? target / n : (target * i) / ((Math.pow(1 + i, n) - 1) * (1 + i));
  const invested = monthly * n;
  const gains = target - invested;

  return (
    <Calc id="goal" index="03" tag="GOAL" title="Goal planner"
      what="Start from the amount you want and work backwards: how much to invest every month to reach it in a given time, at an assumed return.">
      <Grid
        inputs={<>
          <Field label="Target amount" value={target} onChange={setTarget} min={100000} max={100000000} step={100000} unit="₹" />
          <Field label="Expected return per year" value={rate} onChange={setRate} min={1} max={20} step={0.5} unit="%" />
          <Field label="Years to reach it" value={years} onChange={setYears} min={1} max={40} step={1} unit="yrs" />
        </>}
        result={
          <ResultCard primaryLabel="Invest per month" primaryValue={inr(monthly)}>
            <Stat label="Target" value={inr(target)} />
            <Stat label="You invest" value={inr(invested)} />
            <Stat label="From growth" value={inr(gains)} />
          </ResultCard>
        }
      />
      <CompositionBar segments={[
        { label: "You invest", value: invested, tone: "muted" },
        { label: "From growth", value: gains, tone: "accent" },
      ]} />
      <InfoBar
        included={["The target amount you want to end with.", "Expected average annual return, as a monthly rate.", "The number of years you have."]}
        formula={"P = FV × i / ( ( (1 + i)^n − 1 ) × (1 + i) )"}
        where={["FV = target amount", "i = annual return ÷ 12 ÷ 100", "n = years × 12", "P = required monthly investment"]}
        how={[
          "This is the SIP future-value formula rearranged to solve for the monthly amount P instead of the end value.",
          "It finds the smallest fixed monthly investment whose compounded total equals your target after n months.",
          "A higher assumed return or a longer horizon lowers the monthly amount needed — often sharply.",
        ]}
        note="If the assumed return does not show up, you fall short. Build in a margin and review yearly."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  04 — Retirement planner                                            */
/* ================================================================== */

function Retirement() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [lifeExp, setLifeExp] = useState(85);
  const [expenseNow, setExpenseNow] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [preReturn, setPreReturn] = useState(11);
  const [postReturn, setPostReturn] = useState(7);

  const yearsToRetire = Math.max(0, retireAge - age);
  const yearsInRetirement = Math.max(0, lifeExp - retireAge);
  const monthlyAtRetire = expenseNow * Math.pow(1 + inflation / 100, yearsToRetire);
  const annualAtRetire = monthlyAtRetire * 12;

  const realR = (1 + postReturn / 100) / (1 + inflation / 100) - 1;
  const corpus =
    Math.abs(realR) < 1e-6
      ? annualAtRetire * yearsInRetirement
      : annualAtRetire * ((1 - Math.pow(1 + realR, -yearsInRetirement)) / realR);

  const i = preReturn / 100 / 12;
  const n = yearsToRetire * 12;
  const monthlyInvest =
    n === 0 ? NaN : i === 0 ? corpus / n : (corpus * i) / ((Math.pow(1 + i, n) - 1) * (1 + i));

  return (
    <Calc id="retirement" index="04" tag="RETIREMENT" title="Retirement planner"
      what="Two questions in one: how large a corpus you need on retirement day to fund your lifestyle through your life expectancy, and how much to invest monthly until then to build it.">
      <Grid
        inputs={<>
          <Field label="Current age" value={age} onChange={setAge} min={18} max={59} step={1} unit="yrs" />
          <Field label="Retirement age" value={retireAge} onChange={setRetireAge} min={40} max={70} step={1} unit="yrs" />
          <Field label="Life expectancy" value={lifeExp} onChange={setLifeExp} min={65} max={100} step={1} unit="yrs" />
          <Field label="Monthly expense (today's ₹)" value={expenseNow} onChange={setExpenseNow} min={10000} max={1000000} step={5000} unit="₹" />
          <Field label="Inflation" value={inflation} onChange={setInflation} min={2} max={12} step={0.5} unit="%" />
          <Field label="Return before retirement" value={preReturn} onChange={setPreReturn} min={4} max={18} step={0.5} unit="%" />
          <Field label="Return after retirement" value={postReturn} onChange={setPostReturn} min={3} max={12} step={0.5} unit="%" />
        </>}
        result={
          <ResultCard primaryLabel="Corpus needed at retirement" primaryValue={inr(corpus)}>
            <Stat label="Invest / month till then" value={inr(monthlyInvest)} />
            <Stat label="Monthly expense at 60" value={inr(monthlyAtRetire)} />
            <Stat label="Years funded" value={num(yearsInRetirement, 0)} />
          </ResultCard>
        }
      />
      <InfoBar
        included={[
          "Ages: current, retirement, and life expectancy.",
          "Today's monthly expense, grown to retirement by inflation.",
          "Assumed return before retirement (accumulation) and after (drawdown).",
        ]}
        formula={
          "Expense at retirement = E × (1 + f)^Y\nReal return  g = (1 + r_post) / (1 + f) − 1\nCorpus = A × ( 1 − (1 + g)^(−N) ) / g\nMonthly SIP = Corpus × i / ( ( (1 + i)^m − 1 ) × (1 + i) )"
        }
        where={[
          "E = today's monthly expense, f = inflation, Y = years to retirement",
          "A = annual expense at retirement (= 12 × grown monthly expense)",
          "N = years in retirement, g = inflation-adjusted post-retirement return",
          "i = pre-retirement monthly return, m = months to retirement",
        ]}
        how={[
          "Grow today's expense to retirement age using inflation.",
          "Use a real (inflation-adjusted) return so the corpus keeps pace with rising costs through retirement.",
          "Value the string of future withdrawals as a present sum on retirement day — that is the corpus.",
          "Finally, solve the SIP formula backwards to find the monthly investment that builds that corpus in time.",
        ]}
        note="A simplified model: it assumes steady returns and inflation, no pension or other income, and nothing left behind."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  05 — SWP longevity                                                 */
/* ================================================================== */

function SWP() {
  const [corpus, setCorpus] = useState(10000000);
  const [withdraw, setWithdraw] = useState(50000);
  const [rate, setRate] = useState(9);
  const [stepUp, setStepUp] = useState(6);

  const i = rate / 100 / 12;
  let bal = corpus;
  let w = withdraw;
  let months = 0;
  let totalOut = 0;
  const CAP = 1200;
  while (bal > 0 && months < CAP) {
    bal = bal * (1 + i) - w;
    if (bal < 0) {
      totalOut += w + bal; // last partial withdrawal
    } else {
      totalOut += w;
    }
    months++;
    if (months % 12 === 0) w = w * (1 + stepUp / 100);
  }
  const depleted = months < CAP;
  const yrs = Math.floor(months / 12);
  const rem = months % 12;
  const sustainable = corpus * i;

  return (
    <Calc id="swp" index="05" tag="SWP" title="Withdrawal plan (SWP)"
      what="You have a corpus and draw a fixed amount every month while the rest stays invested. This shows how many years the corpus lasts, with an optional yearly step-up for inflation.">
      <Grid
        inputs={<>
          <Field label="Starting corpus" value={corpus} onChange={setCorpus} min={500000} max={100000000} step={100000} unit="₹" />
          <Field label="Monthly withdrawal" value={withdraw} onChange={setWithdraw} min={5000} max={1000000} step={5000} unit="₹" />
          <Field label="Return on corpus" value={rate} onChange={setRate} min={4} max={15} step={0.5} unit="%" />
          <Field label="Yearly step-up (inflation)" value={stepUp} onChange={setStepUp} min={0} max={12} step={0.5} unit="%" />
        </>}
        result={
          <ResultCard
            primaryLabel="Corpus lasts"
            primaryValue={depleted ? `${yrs} yrs ${rem} mo` : "50+ yrs"}
          >
            <Stat label="Total withdrawn" value={inr(totalOut)} />
            <Stat label="Withdrawals made" value={num(months, 0)} />
            <Stat label="Never-touch-capital draw" value={`${inr(sustainable)}/mo`} />
          </ResultCard>
        }
      />
      <InfoBar
        included={[
          "Starting corpus.",
          "First monthly withdrawal (and an optional yearly step-up).",
          "Return earned on the remaining balance.",
        ]}
        formula={"Each month:  balance = balance × (1 + i) − withdrawal\n(withdrawal rises by the step-up rate every 12 months)"}
        where={["i = annual return ÷ 12 ÷ 100", "Repeat until the balance hits zero"]}
        how={[
          "Every month the balance first earns one month's return, then the withdrawal is taken out.",
          "With a step-up, the withdrawal grows once a year to keep pace with inflation, which shortens how long the money lasts.",
          "The “never-touch-capital” figure is corpus × monthly return — withdraw only that and the corpus is untouched.",
        ]}
        note="Assumes a constant return. A bad run of early returns (sequence risk) can deplete a corpus far faster than the average suggests."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  06 — CAGR                                                          */
/* ================================================================== */

function CAGR() {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(250000);
  const [years, setYears] = useState(5);

  const cagr = years > 0 && initial > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : NaN;
  const absReturn = initial > 0 ? (final / initial - 1) * 100 : NaN;

  return (
    <Calc id="cagr" index="06" tag="CAGR" title="CAGR — compound annual growth rate"
      what="CAGR turns any start value, end value, and time span into one smooth yearly growth rate: “at what steady rate would this have grown to get from A to B?”">
      <Grid
        inputs={<>
          <Field label="Initial value" value={initial} onChange={setInitial} min={1000} max={10000000} step={1000} unit="₹" />
          <Field label="Final value" value={final} onChange={setFinal} min={1000} max={50000000} step={1000} unit="₹" />
          <Field label="Number of years" value={years} onChange={setYears} min={1} max={40} step={1} unit="yrs" />
        </>}
        result={
          <ResultCard primaryLabel="CAGR" primaryValue={pct(cagr)}>
            <Stat label="Total return" value={pct(absReturn)} />
            <Stat label="Gain" value={inr(final - initial)} />
            <Stat label="Multiple" value={`${num(final / initial)}×`} />
          </ResultCard>
        }
      />
      <InfoBar
        included={["The starting value.", "The ending value.", "The number of years between them."]}
        formula={"CAGR = (Final ÷ Initial)^(1 / years) − 1"}
        where={["Final ÷ Initial = the growth multiple", "^(1 / years) = the per-year root of that multiple", "− 1 = turn the multiple back into a rate"]}
        how={[
          "Divide the final value by the initial value to get the total growth multiple (e.g. 2.5×).",
          "Take the years-th root of that multiple — the constant yearly factor that would produce it.",
          "Subtract 1 to express that factor as a percentage growth rate.",
        ]}
        note="CAGR smooths over volatility — the real path may have been far bumpier. It assumes no money added or withdrawn along the way."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  07 — Inflation                                                     */
/* ================================================================== */

function Inflation() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const f = Math.pow(1 + rate / 100, years);
  const futureCost = amount * f;
  const futureWorth = amount / f;

  return (
    <Calc id="inflation" index="07" tag="INFLATION" title="Inflation & buying power"
      what="Inflation makes the same money buy less over time. This shows both sides: what today's expense will cost later, and what a future sum is really worth in today's money.">
      <Grid
        inputs={<>
          <Field label="Amount (today's money)" value={amount} onChange={setAmount} min={1000} max={10000000} step={1000} unit="₹" />
          <Field label="Inflation rate per year" value={rate} onChange={setRate} min={1} max={15} step={0.5} unit="%" />
          <Field label="Number of years" value={years} onChange={setYears} min={1} max={40} step={1} unit="yrs" />
        </>}
        result={
          <ResultCard primaryLabel={`Cost in ${years} years`} primaryValue={inr(futureCost)}>
            <Stat label="Today's cost" value={inr(amount)} />
            <Stat label="Extra needed" value={inr(futureCost - amount)} />
            <Stat label={`₹${num(amount, 0)} then, worth now`} value={inr(futureWorth)} />
          </ResultCard>
        }
      />
      <InfoBar
        included={["An amount in today's money.", "An assumed average yearly inflation rate.", "The number of years to project."]}
        formula={"Future cost   = PV × (1 + i)^n\nToday's worth = FV ÷ (1 + i)^n"}
        where={["PV = amount in today's money", "i = inflation rate ÷ 100", "n = number of years", "FV = a nominal future amount"]}
        how={[
          "Prices compound like interest: each year multiplies the level by (1 + i).",
          "Over n years the level is multiplied by (1 + i)^n — that scales today's cost up to its future figure.",
          "Dividing instead of multiplying runs it the other way: it discounts a future amount back to today's buying power.",
        ]}
        note="Inflation is uneven across goods and years. Official CPI is an average basket and may not match your spending."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  08 — Loan EMI                                                      */
/* ================================================================== */

function EMI() {
  const [amount, setAmount] = useState(2000000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(20);

  const r = rate / 100 / 12;
  const n = years * 12;
  const emi = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - amount;

  return (
    <Calc id="emi" index="08" tag="LOAN" title="Loan EMI"
      what="EMI is the fixed amount you pay every month on a loan. Each payment covers that month's interest first, and the rest chips away at the amount borrowed.">
      <Grid
        inputs={<>
          <Field label="Loan amount" value={amount} onChange={setAmount} min={50000} max={20000000} step={50000} unit="₹" />
          <Field label="Interest rate per year" value={rate} onChange={setRate} min={5} max={24} step={0.1} unit="%" />
          <Field label="Loan tenure" value={years} onChange={setYears} min={1} max={30} step={1} unit="yrs" />
        </>}
        result={
          <ResultCard primaryLabel="Monthly EMI" primaryValue={inr(emi)}>
            <Stat label="Principal" value={inr(amount)} />
            <Stat label="Total interest" value={inr(interest)} />
            <Stat label="Total payment" value={inr(total)} />
          </ResultCard>
        }
      />
      <CompositionBar segments={[
        { label: "Principal", value: amount, tone: "muted" },
        { label: "Interest", value: interest, tone: "accent" },
      ]} />
      <InfoBar
        included={["Loan amount (the principal).", "Annual interest rate, converted to a monthly rate.", "Tenure in years, converted to a number of monthly payments."]}
        formula={"EMI = P × r × (1 + r)^n / ( (1 + r)^n − 1 )"}
        where={["P = loan amount", "r = annual rate ÷ 12 ÷ 100", "n = years × 12"]}
        how={[
          "The lender wants the same fixed payment each month so the loan is fully cleared after n months.",
          "The formula is that payment — the amount whose present value, discounted at r over n months, equals the loan P.",
          "Early EMIs are mostly interest; later EMIs are mostly principal, but the EMI amount stays constant.",
          "Total interest = (EMI × n) − P.",
        ]}
        note="Assumes a fixed rate and no prepayment, processing fees, or missed payments."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  09 — Loan affordability                                            */
/* ================================================================== */

function Affordability() {
  const [emiBudget, setEmiBudget] = useState(30000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(20);

  const r = rate / 100 / 12;
  const n = years * 12;
  const maxLoan = r === 0 ? emiBudget * n : (emiBudget * (1 - Math.pow(1 + r, -n))) / r;
  const totalPay = emiBudget * n;
  const interest = totalPay - maxLoan;

  return (
    <Calc id="affordability" index="09" tag="LOAN" title="Loan affordability"
      what="Work backwards from the EMI you can comfortably pay each month to the largest loan that fits it, at a given rate and tenure.">
      <Grid
        inputs={<>
          <Field label="EMI you can afford" value={emiBudget} onChange={setEmiBudget} min={2000} max={500000} step={1000} unit="₹" />
          <Field label="Interest rate per year" value={rate} onChange={setRate} min={5} max={24} step={0.1} unit="%" />
          <Field label="Loan tenure" value={years} onChange={setYears} min={1} max={30} step={1} unit="yrs" />
        </>}
        result={
          <ResultCard primaryLabel="Loan you can take" primaryValue={inr(maxLoan)}>
            <Stat label="Total you'll pay" value={inr(totalPay)} />
            <Stat label="Of which interest" value={inr(interest)} />
            <Stat label="Payments" value={num(n, 0)} />
          </ResultCard>
        }
      />
      <CompositionBar segments={[
        { label: "Loan (principal)", value: maxLoan, tone: "muted" },
        { label: "Interest", value: interest, tone: "accent" },
      ]} />
      <InfoBar
        included={["The monthly EMI you can afford.", "The loan's annual interest rate.", "The tenure you'd take it for."]}
        formula={"Loan = EMI × ( 1 − (1 + r)^(−n) ) / r"}
        where={["EMI = affordable monthly payment", "r = annual rate ÷ 12 ÷ 100", "n = years × 12"]}
        how={[
          "This is the EMI formula solved for the loan amount P instead of the EMI.",
          "It is the present value of n equal future payments discounted at the monthly rate — i.e. how much you can borrow today.",
          "A longer tenure or lower rate raises the loan a given EMI supports, but usually increases total interest.",
        ]}
        note="Lenders also cap the EMI at roughly 40–55% of your net monthly income and check your credit profile."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  10 — Nominal vs effective rate                                     */
/* ================================================================== */

function EAR() {
  const [nominal, setNominal] = useState(12);
  const [freq, setFreq] = useState(12);

  const ear = (Math.pow(1 + nominal / 100 / freq, freq) - 1) * 100;
  const cont = (Math.exp(nominal / 100) - 1) * 100;

  return (
    <Calc id="ear" index="10" tag="RATE" title="Nominal vs effective rate"
      what="A “12% per annum” rate compounded monthly actually earns more than 12% a year. The effective annual rate (EAR) is the true yearly figure once compounding is counted.">
      <Grid
        inputs={<>
          <Field label="Nominal rate (per year)" value={nominal} onChange={setNominal} min={1} max={36} step={0.25} unit="%" />
          <Segmented label="Compounding" value={freq} onChange={setFreq} options={[
            { label: "Yearly", value: 1 },
            { label: "Half-yearly", value: 2 },
            { label: "Quarterly", value: 4 },
            { label: "Monthly", value: 12 },
            { label: "Daily", value: 365 },
          ]} />
        </>}
        result={
          <ResultCard primaryLabel="Effective annual rate" primaryValue={pct(ear)}>
            <Stat label="Nominal rate" value={pct(nominal)} />
            <Stat label="Compounding gain" value={pct(ear - nominal)} />
            <Stat label="If continuous" value={pct(cont)} />
          </ResultCard>
        }
      />
      <InfoBar
        included={["The stated (nominal) annual rate.", "How often it compounds in a year."]}
        formula={"EAR = (1 + r / m)^m − 1"}
        where={["r = nominal annual rate ÷ 100", "m = compounding periods per year"]}
        how={[
          "Split the nominal rate into m equal slices of r / m.",
          "Apply all m slices with compounding — (1 + r / m)^m — to get the yearly growth factor.",
          "Subtract 1 for the effective rate. More frequent compounding widens the gap over the nominal rate.",
        ]}
        note="Use EAR to compare offers quoted on different compounding bases (e.g. an FD vs a bond)."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  11 — CAPM cost of equity                                           */
/* ================================================================== */

function CAPM() {
  const [rf, setRf] = useState(7);
  const [beta, setBeta] = useState(1.1);
  const [erp, setErp] = useState(6);

  const ke = rf + beta * erp;

  return (
    <Calc id="capm" index="11" tag="CAPM" title="Cost of equity (CAPM)"
      what="The Capital Asset Pricing Model estimates the return equity investors require: the risk-free rate plus a premium for the stock's market risk, scaled by its beta.">
      <Grid
        inputs={<>
          <Field label="Risk-free rate" value={rf} onChange={setRf} min={2} max={10} step={0.1} unit="%" />
          <Field label="Beta (market risk)" value={beta} onChange={setBeta} min={0} max={2.5} step={0.05} unit="β" />
          <Field label="Equity risk premium" value={erp} onChange={setErp} min={3} max={10} step={0.25} unit="%" />
        </>}
        result={
          <ResultCard primaryLabel="Cost of equity" primaryValue={pct(ke)}>
            <Stat label="Risk-free base" value={pct(rf)} />
            <Stat label="Risk premium (β × ERP)" value={pct(beta * erp)} />
            <Stat label="Implied market return" value={pct(rf + erp)} />
          </ResultCard>
        }
      />
      <InfoBar
        included={[
          "Risk-free rate — usually the 10-year government bond yield.",
          "Beta — how much the stock moves relative to the market (1 = moves with it).",
          "Equity risk premium — the extra return the market is expected to earn over the risk-free rate.",
        ]}
        formula={"Ke = Rf + β × (Rm − Rf)   =   Rf + β × ERP"}
        where={["Rf = risk-free rate", "β = stock beta", "Rm − Rf = ERP = equity risk premium"]}
        how={[
          "Start with the return you could get risk-free.",
          "Add compensation for market risk: the market's premium, multiplied by how sensitive this stock is (its beta).",
          "A beta above 1 means more risk than the market and a higher required return; below 1, the reverse.",
        ]}
        note="Beta and the ERP are estimates and vary by source and period. CAPM is a starting point, not a precise number."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  12 — WACC                                                          */
/* ================================================================== */

function WACC() {
  const [equity, setEquity] = useState(700);
  const [debt, setDebt] = useState(300);
  const [ke, setKe] = useState(14);
  const [kd, setKd] = useState(9);
  const [tax, setTax] = useState(25);

  const v = equity + debt;
  const we = v > 0 ? equity / v : NaN;
  const wd = v > 0 ? debt / v : NaN;
  const afterTaxKd = kd * (1 - tax / 100);
  const wacc = we * ke + wd * afterTaxKd;

  return (
    <Calc id="wacc" index="12" tag="WACC" title="WACC — weighted average cost of capital"
      what="A firm funds itself with equity and debt, each with its own cost. WACC blends them by their share of total capital — it's the minimum return a project must clear to be worthwhile.">
      <Grid
        inputs={<>
          <Field label="Equity value" value={equity} onChange={setEquity} min={0} max={5000} step={10} unit="₹cr" />
          <Field label="Debt value" value={debt} onChange={setDebt} min={0} max={5000} step={10} unit="₹cr" />
          <Field label="Cost of equity" value={ke} onChange={setKe} min={5} max={25} step={0.25} unit="%" />
          <Field label="Cost of debt (pre-tax)" value={kd} onChange={setKd} min={4} max={18} step={0.25} unit="%" />
          <Field label="Tax rate" value={tax} onChange={setTax} min={0} max={45} step={1} unit="%" />
        </>}
        result={
          <ResultCard primaryLabel="WACC" primaryValue={pct(wacc)}>
            <Stat label="Equity weight" value={pct(we * 100)} />
            <Stat label="Debt weight" value={pct(wd * 100)} />
            <Stat label="After-tax cost of debt" value={pct(afterTaxKd)} />
          </ResultCard>
        }
      />
      <CompositionBar segments={[
        { label: "Equity", value: equity, tone: "muted" },
        { label: "Debt", value: debt, tone: "accent" },
      ]} />
      <InfoBar
        included={[
          "Market value of equity and of debt (sets the weights).",
          "Cost of equity (e.g. from CAPM) and pre-tax cost of debt.",
          "Corporate tax rate — interest on debt is tax-deductible.",
        ]}
        formula={"WACC = (E/V) × Ke + (D/V) × Kd × (1 − Tax)"}
        where={["E, D = value of equity and debt", "V = E + D", "Ke, Kd = cost of equity and debt", "Tax = corporate tax rate"]}
        how={[
          "Work out each source's share of total capital — the weights E/V and D/V.",
          "Multiply each weight by its cost and add them up.",
          "Debt's cost is reduced by (1 − tax) because interest lowers the firm's tax bill (the “tax shield”).",
        ]}
        note="Use market values, not book values, for the weights. WACC assumes the capital mix stays roughly constant."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  13 — Dividend discount value                                       */
/* ================================================================== */

function DDM() {
  const [d1, setD1] = useState(10);
  const [g, setG] = useState(5);
  const [r, setR] = useState(12);

  const valid = r > g;
  const value = valid ? d1 / ((r - g) / 100) : NaN;
  const yieldPct = valid ? (d1 / value) * 100 : NaN;

  return (
    <Calc id="ddm" index="13" tag="DDM" title="Dividend discount value (Gordon growth)"
      what="Values a share as the present value of a dividend that grows forever at a steady rate. Simple, and a useful sanity check for stable, dividend-paying companies.">
      <Grid
        inputs={<>
          <Field label="Next year's dividend (per share)" value={d1} onChange={setD1} min={1} max={500} step={1} unit="₹" />
          <Field label="Dividend growth rate" value={g} onChange={setG} min={0} max={12} step={0.25} unit="%" />
          <Field label="Required return" value={r} onChange={setR} min={6} max={20} step={0.25} unit="%" />
        </>}
        result={
          <ResultCard primaryLabel="Intrinsic value / share" primaryValue={valid ? inr(value) : "—"}>
            <Stat label="Dividend yield" value={valid ? pct(yieldPct) : "—"} />
            <Stat label="Growth" value={pct(g)} />
            <Stat label="Required return" value={pct(r)} />
          </ResultCard>
        }
      />
      <InfoBar
        included={[
          "Next year's expected dividend per share.",
          "The rate that dividend is expected to grow at, forever.",
          "The required return (often the cost of equity).",
        ]}
        formula={"Value = D₁ / (r − g)"}
        where={["D₁ = dividend one year out", "r = required return (decimal)", "g = perpetual growth rate (decimal)", "requires r > g"]}
        how={[
          "A dividend growing at g forever, discounted at r, collapses to the simple fraction D₁ / (r − g).",
          "A smaller gap between r and g means a much higher value — the model is very sensitive near r = g.",
          "If g is greater than or equal to r the formula breaks (infinite value) and no result is shown.",
        ]}
        note="Only sensible for mature firms with stable, predictable dividend growth. Not for non-payers or high-growth names."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  14 — Bond price                                                    */
/* ================================================================== */

function Bond() {
  const [face, setFace] = useState(1000);
  const [coupon, setCoupon] = useState(8);
  const [years, setYears] = useState(5);
  const [ytm, setYtm] = useState(7);
  const [freq, setFreq] = useState(2);

  const n = years * freq;
  const c = (face * coupon) / 100 / freq;
  const y = ytm / 100 / freq;
  const price =
    y === 0 ? c * n + face : c * ((1 - Math.pow(1 + y, -n)) / y) + face / Math.pow(1 + y, n);
  const currentYield = (face * coupon) / 100 / price * 100;

  return (
    <Calc id="bond" index="14" tag="BOND" title="Bond price"
      what="A bond's fair price is the present value of its future coupons plus its face value at maturity, discounted at the market yield. Price moves opposite to yield.">
      <Grid
        inputs={<>
          <Field label="Face (par) value" value={face} onChange={setFace} min={100} max={100000} step={100} unit="₹" />
          <Field label="Coupon rate (per year)" value={coupon} onChange={setCoupon} min={0} max={15} step={0.25} unit="%" />
          <Field label="Years to maturity" value={years} onChange={setYears} min={1} max={30} step={1} unit="yrs" />
          <Field label="Market yield (YTM)" value={ytm} onChange={setYtm} min={1} max={15} step={0.1} unit="%" />
          <Segmented label="Coupon frequency" value={freq} onChange={setFreq} options={[
            { label: "Annual", value: 1 },
            { label: "Semi-annual", value: 2 },
            { label: "Quarterly", value: 4 },
          ]} />
        </>}
        result={
          <ResultCard primaryLabel="Bond price" primaryValue={inr(price)}>
            <Stat label={price >= face ? "Premium" : "Discount"} value={inr(Math.abs(price - face))} />
            <Stat label="Current yield" value={pct(currentYield)} />
            <Stat label="Coupon / year" value={inr((face * coupon) / 100)} />
          </ResultCard>
        }
      />
      <InfoBar
        included={[
          "Face value — paid back at maturity.",
          "Coupon rate and how often it pays.",
          "Years to maturity.",
          "Market yield (YTM) — the return investors currently demand.",
        ]}
        formula={"Price = C × ( 1 − (1 + y)^(−n) ) / y  +  F / (1 + y)^n"}
        where={["C = coupon per period = F × coupon rate ÷ frequency", "y = market yield ÷ frequency", "n = years × frequency", "F = face value"]}
        how={[
          "Each coupon is discounted back to today; the annuity term does all of them at once.",
          "The face value repaid at maturity is discounted back separately.",
          "If the market yield equals the coupon rate, price equals face. Yield above coupon → discount; below → premium.",
        ]}
        note="Ignores accrued interest, credit risk, and taxes. Assumes coupons are reinvested at the same yield."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  15 — NPV                                                           */
/* ================================================================== */

function NPV() {
  const [outlay, setOutlay] = useState(1000000);
  const [rate, setRate] = useState(12);
  const [flows, setFlows] = useState<number[]>([300000, 300000, 300000, 300000, 300000]);

  const value = npv(rate / 100, outlay, flows);
  const pi = outlay > 0 ? (value + outlay) / outlay : NaN;
  const undisc = flows.reduce((a, b) => a + b, 0);

  return (
    <Calc id="npv" index="15" tag="NPV" title="Net Present Value"
      what="NPV discounts every future cash flow of a project back to today and subtracts the upfront cost. Positive NPV means the project is expected to add value.">
      <Grid
        inputs={<>
          <Field label="Upfront investment (year 0)" value={outlay} onChange={setOutlay} min={10000} max={100000000} step={10000} unit="₹" />
          <Field label="Discount rate" value={rate} onChange={setRate} min={1} max={30} step={0.5} unit="%" />
          <YearFlows values={flows} onChange={setFlows} />
        </>}
        result={
          <ResultCard primaryLabel="NPV" primaryValue={inr(value)}>
            <Stat label="Verdict" value={value >= 0 ? "Adds value" : "Destroys value"} />
            <Stat label="Profitability index" value={num(pi)} />
            <Stat label="Undiscounted inflows" value={inr(undisc)} />
          </ResultCard>
        }
      />
      <InfoBar
        included={["The upfront investment (year 0 outflow).", "The discount rate (often the WACC or hurdle rate).", "The expected cash inflow for each future year."]}
        formula={"NPV = −C₀ + Σ  CFₜ / (1 + r)^t"}
        where={["C₀ = upfront investment", "CFₜ = cash flow in year t", "r = discount rate ÷ 100", "t = 1 … n"]}
        how={[
          "Each year's cash flow is divided by (1 + r)^t to state it in today's money — later cash is worth less.",
          "Add up all those present values and subtract the upfront cost.",
          "NPV > 0: the project earns more than the discount rate. The profitability index (PV of inflows ÷ outlay) shows value per rupee invested.",
        ]}
        note="Results are only as good as the cash-flow forecasts and the discount rate. Small rate changes can flip the verdict."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  16 — IRR                                                           */
/* ================================================================== */

function IRR() {
  const [outlay, setOutlay] = useState(1000000);
  const [hurdle, setHurdle] = useState(12);
  const [flows, setFlows] = useState<number[]>([250000, 300000, 350000, 400000, 300000]);

  const rate = irr(outlay, flows);
  const npvAtHurdle = npv(hurdle / 100, outlay, flows);

  return (
    <Calc id="irr" index="16" tag="IRR" title="Internal Rate of Return"
      what="IRR is the discount rate at which a project's NPV is exactly zero — its built-in annual return. Compare it to your hurdle rate: above it, accept; below it, reject.">
      <Grid
        inputs={<>
          <Field label="Upfront investment (year 0)" value={outlay} onChange={setOutlay} min={10000} max={100000000} step={10000} unit="₹" />
          <Field label="Hurdle rate (for comparison)" value={hurdle} onChange={setHurdle} min={1} max={30} step={0.5} unit="%" />
          <YearFlows values={flows} onChange={setFlows} />
        </>}
        result={
          <ResultCard primaryLabel="IRR" primaryValue={pct(rate)}>
            <Stat label="Verdict vs hurdle" value={Number.isFinite(rate) ? (rate >= hurdle ? "Accept" : "Reject") : "—"} />
            <Stat label="NPV at hurdle rate" value={inr(npvAtHurdle)} />
            <Stat label="Hurdle rate" value={pct(hurdle)} />
          </ResultCard>
        }
      />
      <InfoBar
        included={["The upfront investment.", "The yearly cash inflows.", "A hurdle rate (WACC or required return) to judge the IRR against."]}
        formula={"Find r such that:  −C₀ + Σ CFₜ / (1 + r)^t = 0"}
        where={["C₀ = upfront investment", "CFₜ = cash flow in year t", "r = IRR (solved for, not given)"]}
        how={[
          "There is no direct formula — the rate is found by trial: pick a rate, compute NPV, adjust, repeat until NPV is ≈ 0.",
          "This calculator uses a bisection search between −95% and +500%.",
          "IRR ≥ hurdle rate means the project clears its cost of capital.",
        ]}
        note="IRR misbehaves when cash flows change sign more than once (multiple IRRs) and can rank mutually exclusive projects wrongly — cross-check with NPV."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  17 — Payback period                                               */
/* ================================================================== */

function Payback() {
  const [outlay, setOutlay] = useState(1000000);
  const [rate, setRate] = useState(10);
  const [flows, setFlows] = useState<number[]>([250000, 300000, 300000, 350000, 400000]);

  const paybackOf = (series: number[]) => {
    let cum = 0;
    for (let t = 0; t < series.length; t++) {
      const next = cum + series[t];
      if (next >= outlay) return t + (outlay - cum) / series[t];
      cum = next;
    }
    return NaN;
  };
  const simple = paybackOf(flows);
  const discounted = paybackOf(flows.map((cf, t) => cf / Math.pow(1 + rate / 100, t + 1)));

  return (
    <Calc id="payback" index="17" tag="PAYBACK" title="Payback period"
      what="How many years until a project's cash inflows repay its upfront cost. The discounted version counts the time value of money too.">
      <Grid
        inputs={<>
          <Field label="Upfront investment" value={outlay} onChange={setOutlay} min={10000} max={100000000} step={10000} unit="₹" />
          <Field label="Discount rate (for discounted payback)" value={rate} onChange={setRate} min={1} max={30} step={0.5} unit="%" />
          <YearFlows values={flows} onChange={setFlows} />
        </>}
        result={
          <ResultCard primaryLabel="Simple payback" primaryValue={Number.isFinite(simple) ? `${num(simple)} yrs` : "Not recovered"}>
            <Stat label="Discounted payback" value={Number.isFinite(discounted) ? `${num(discounted)} yrs` : "Not recovered"} />
            <Stat label="Total inflows" value={inr(flows.reduce((a, b) => a + b, 0))} />
            <Stat label="Years modelled" value={num(flows.length, 0)} />
          </ResultCard>
        }
      />
      <InfoBar
        included={["The upfront investment.", "Yearly cash inflows.", "A discount rate for the discounted version."]}
        formula={"Payback = full years to recover C₀  +  (unrecovered amount ÷ next year's cash flow)"}
        where={["C₀ = upfront investment", "Discounted version first divides each CFₜ by (1 + r)^t"]}
        how={[
          "Add up cash flows year by year until the running total reaches the upfront cost.",
          "Interpolate within the final year for a fractional answer.",
          "Discounted payback shrinks each cash flow for timing first, so it is always ≥ the simple payback.",
        ]}
        note="Payback ignores everything after the cut-off and (in the simple version) the time value of money. Use it alongside NPV, not instead of it."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  18 — Break-even analysis                                           */
/* ================================================================== */

function BreakEven() {
  const [fixed, setFixed] = useState(500000);
  const [price, setPrice] = useState(200);
  const [variable, setVariable] = useState(120);
  const [expected, setExpected] = useState(10000);

  const contribution = price - variable;
  const valid = contribution > 0;
  const bepUnits = valid ? fixed / contribution : NaN;
  const bepRevenue = valid ? bepUnits * price : NaN;
  const mos = valid && expected > 0 ? ((expected - bepUnits) / expected) * 100 : NaN;

  return (
    <Calc id="breakeven" index="18" tag="BREAK-EVEN" title="Break-even analysis"
      what="The sales volume at which total revenue exactly covers fixed plus variable costs — profit is zero. Below it you lose money; above it, each unit's contribution is profit.">
      <Grid
        inputs={<>
          <Field label="Fixed costs (per period)" value={fixed} onChange={setFixed} min={10000} max={50000000} step={10000} unit="₹" />
          <Field label="Selling price per unit" value={price} onChange={setPrice} min={1} max={100000} step={1} unit="₹" />
          <Field label="Variable cost per unit" value={variable} onChange={setVariable} min={0} max={100000} step={1} unit="₹" />
          <Field label="Expected sales (units)" value={expected} onChange={setExpected} min={0} max={1000000} step={100} unit="u" />
        </>}
        result={
          <ResultCard primaryLabel="Break-even (units)" primaryValue={valid ? num(bepUnits, 0) : "—"}>
            <Stat label="Break-even revenue" value={valid ? inr(bepRevenue) : "—"} />
            <Stat label="Contribution / unit" value={inr(contribution)} />
            <Stat label="Margin of safety" value={valid ? pct(mos) : "—"} />
          </ResultCard>
        }
      />
      <InfoBar
        included={["Fixed costs for the period.", "Selling price per unit.", "Variable cost per unit.", "Expected unit sales (for the margin of safety)."]}
        formula={"Break-even units = Fixed costs ÷ (Price − Variable cost)\nMargin of safety = (Expected − Break-even) ÷ Expected"}
        where={["Price − Variable cost = contribution margin per unit", "requires a positive contribution margin"]}
        how={[
          "Each unit sold contributes (price − variable cost) toward the fixed costs.",
          "Divide fixed costs by that contribution to get the units needed to fully cover them.",
          "The margin of safety shows how far expected sales sit above break-even before losses begin.",
        ]}
        note="Assumes price and unit costs are constant across the volume range, and a single product (or a fixed sales mix)."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  19 — Economic order quantity                                       */
/* ================================================================== */

function EOQ() {
  const [demand, setDemand] = useState(12000);
  const [orderCost, setOrderCost] = useState(1500);
  const [holding, setHolding] = useState(40);

  const eoq = holding > 0 ? Math.sqrt((2 * demand * orderCost) / holding) : NaN;
  const ordersPerYear = eoq > 0 ? demand / eoq : NaN;
  const totalCost = Math.sqrt(2 * demand * orderCost * holding);
  const cycleDays = ordersPerYear > 0 ? 365 / ordersPerYear : NaN;

  return (
    <Calc id="eoq" index="19" tag="EOQ" title="Economic order quantity"
      what="The order size that minimises the sum of ordering costs (more orders = more cost) and holding costs (bigger orders = more stock to store).">
      <Grid
        inputs={<>
          <Field label="Annual demand (units)" value={demand} onChange={setDemand} min={100} max={1000000} step={100} unit="u" />
          <Field label="Cost per order" value={orderCost} onChange={setOrderCost} min={50} max={100000} step={50} unit="₹" />
          <Field label="Holding cost / unit / year" value={holding} onChange={setHolding} min={1} max={10000} step={1} unit="₹" />
        </>}
        result={
          <ResultCard primaryLabel="Order quantity (EOQ)" primaryValue={num(eoq, 0)}>
            <Stat label="Orders per year" value={num(ordersPerYear)} />
            <Stat label="Days between orders" value={num(cycleDays, 0)} />
            <Stat label="Total inventory cost / yr" value={inr(totalCost)} />
          </ResultCard>
        }
      />
      <InfoBar
        included={["Annual demand in units.", "The fixed cost of placing one order.", "The cost to hold one unit in stock for a year."]}
        formula={"EOQ = √ ( 2 × D × S / H )"}
        where={["D = annual demand", "S = cost per order", "H = holding cost per unit per year"]}
        how={[
          "Ordering cost per year falls as orders get bigger (fewer of them); holding cost per year rises (more average stock).",
          "Total cost is lowest where those two curves cross — the square-root formula is that point.",
          "At the EOQ, annual ordering cost and annual holding cost are equal, each being half the total.",
        ]}
        note="The classic model assumes steady demand, a fixed lead time, no stock-outs, and no bulk discounts."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  20 — Cash conversion cycle                                         */
/* ================================================================== */

function CCC() {
  const [dio, setDio] = useState(60);
  const [dso, setDso] = useState(45);
  const [dpo, setDpo] = useState(30);

  const operating = dio + dso;
  const ccc = operating - dpo;

  return (
    <Calc id="ccc" index="20" tag="CCC" title="Cash conversion cycle"
      what="The number of days between paying suppliers for inventory and collecting cash from customers. Lower is better — a negative cycle means suppliers effectively fund your operations.">
      <Grid
        inputs={<>
          <Field label="Days inventory outstanding (DIO)" value={dio} onChange={setDio} min={0} max={365} step={1} unit="d" />
          <Field label="Days sales outstanding (DSO)" value={dso} onChange={setDso} min={0} max={365} step={1} unit="d" />
          <Field label="Days payable outstanding (DPO)" value={dpo} onChange={setDpo} min={0} max={365} step={1} unit="d" />
        </>}
        result={
          <ResultCard primaryLabel="Cash conversion cycle" primaryValue={`${num(ccc, 0)} days`}>
            <Stat label="Operating cycle (DIO + DSO)" value={`${num(operating, 0)} days`} />
            <Stat label="Supplier financing (DPO)" value={`${num(dpo, 0)} days`} />
            <Stat label="Reads as" value={ccc <= 0 ? "Suppliers fund you" : "Cash tied up"} />
          </ResultCard>
        }
      />
      <InfoBar
        included={[
          "DIO — average days stock sits before it is sold.",
          "DSO — average days customers take to pay.",
          "DPO — average days you take to pay suppliers.",
        ]}
        formula={"CCC = DIO + DSO − DPO"}
        where={[
          "DIO = 365 × average inventory ÷ COGS",
          "DSO = 365 × average receivables ÷ revenue",
          "DPO = 365 × average payables ÷ COGS",
        ]}
        how={[
          "DIO + DSO is the operating cycle: buy stock, sell it, then wait to be paid.",
          "Subtract DPO because the delay in paying suppliers is time your cash is not committed.",
          "What's left is how many days of working capital the business must finance itself.",
        ]}
        note="Best read as a trend and against industry peers. Retailers and marketplaces often run a negative cycle by design."
      />
    </Calc>
  );
}
