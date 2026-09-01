"use client";

import { useState } from "react";
import {
  Calc,
  CompositionBar,
  Field,
  InfoBar,
  ResultCard,
  Stat,
  inr,
  num,
  pct,
} from "@/components/calculators/calc-kit";

/* ------------------------------------------------------------------ */
/*  Hub index                                                          */
/* ------------------------------------------------------------------ */

const hub = [
  { n: "01", id: "sip", name: "SIP future value", one: "What a fixed monthly investment grows to." },
  { n: "02", id: "lumpsum", name: "Lump-sum compounding", one: "What a one-time amount grows to." },
  { n: "03", id: "emi", name: "Loan EMI", one: "The monthly instalment on a loan." },
  { n: "04", id: "goal", name: "Goal planner", one: "The monthly saving a target needs." },
  { n: "05", id: "cagr", name: "CAGR", one: "The yearly growth rate between two values." },
  { n: "06", id: "inflation", name: "Inflation / buying power", one: "How prices and money change over time." },
];

/* ================================================================== */

export default function FinancialCalculators() {
  return (
    <div>
      {/* ---------------- Hub grid ---------------- */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {hub.map((h) => (
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

      <SIP />
      <LumpSum />
      <EMI />
      <Goal />
      <CAGR />
      <Inflation />
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
    <Calc
      id="sip"
      index="01"
      tag="SIP"
      title="SIP future value"
      what="A SIP (Systematic Investment Plan) is investing a fixed amount every month. This shows what that pile of monthly investments could grow to, assuming a steady average return."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <Field label="Monthly investment" value={monthly} onChange={setMonthly} min={500} max={200000} step={500} unit="₹" />
          <Field label="Expected return (per year)" value={rate} onChange={setRate} min={1} max={25} step={0.5} unit="%" />
          <Field label="Time period" value={years} onChange={setYears} min={1} max={40} step={1} unit="yrs" />
        </div>
        <ResultCard primaryLabel="Estimated value" primaryValue={inr(fv)}>
          <Stat label="You invest" value={inr(invested)} />
          <Stat label="Est. gains" value={inr(gains)} />
          <Stat label="Instalments" value={num(n, 0)} />
        </ResultCard>
      </div>

      <CompositionBar
        segments={[
          { label: "Invested", value: invested, tone: "muted" },
          { label: "Gains", value: gains, tone: "accent" },
        ]}
      />

      <InfoBar
        included={[
          "Monthly investment amount (assumed constant for the whole period).",
          "Expected average annual return, converted to a monthly rate.",
          "Number of years, converted to a number of monthly instalments.",
        ]}
        formula={"FV = P × ( (1 + i)^n − 1 ) / i × (1 + i)"}
        where={[
          "P = monthly investment",
          "i = annual return ÷ 12 ÷ 100  (monthly rate)",
          "n = years × 12  (number of instalments)",
          "FV = value at the end",
        ]}
        how={[
          "Each instalment earns compound growth for the months it stays invested — the first one the longest, the last one barely at all.",
          "The bracket ( (1 + i)^n − 1 ) / i adds up the growth of every instalment in one step (the future value of an annuity).",
          "The extra × (1 + i) assumes you invest at the start of each month, so every instalment gets one more month of growth.",
          "“You invest” is simply P × n; “gains” is the rest.",
        ]}
        note="Real returns are not smooth. A single average rate hides the ups and downs of actual markets, and ignores fund costs and taxes."
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
    <Calc
      id="lumpsum"
      index="02"
      tag="COMPOUND"
      title="Lump-sum compounding"
      what="Put in one amount today, leave it untouched, and let it compound. This also covers fixed deposits — just set how often interest is added."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <Field label="Amount invested today" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} unit="₹" />
          <Field label="Interest / return per year" value={rate} onChange={setRate} min={1} max={20} step={0.25} unit="%" />
          <Field label="Time period" value={years} onChange={setYears} min={1} max={40} step={1} unit="yrs" />
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-faint)] mb-2">
              Compounding
            </p>
            <div className="flex flex-wrap gap-2">
              {FREQS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFreq(f.value)}
                  className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors ${
                    freq === f.value
                      ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                      : "border-[color:var(--border-strong)] text-[color:var(--text-muted)] hover:border-[color:var(--accent)]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <ResultCard primaryLabel="Maturity value" primaryValue={inr(fv)}>
          <Stat label="Invested" value={inr(principal)} />
          <Stat label="Interest earned" value={inr(interest)} />
          <Stat label="Growth" value={pct((fv / principal - 1) * 100)} />
        </ResultCard>
      </div>

      <CompositionBar
        segments={[
          { label: "Principal", value: principal, tone: "muted" },
          { label: "Interest", value: interest, tone: "accent" },
        ]}
      />

      <InfoBar
        included={[
          "The one-time amount you invest.",
          "Annual interest or return rate.",
          "How often interest is added back (yearly, half-yearly, quarterly, monthly).",
          "Number of years.",
        ]}
        formula={"FV = P × (1 + r / m)^(m × t)"}
        where={[
          "P = amount invested today",
          "r = annual rate ÷ 100",
          "m = compounding times per year",
          "t = number of years",
        ]}
        how={[
          "Each period adds interest of r / m on the balance so far.",
          "That new balance then earns interest next period — this “interest on interest” is compounding.",
          "Raising (1 + r / m) to the power m × t applies that step for every period in one go.",
          "More frequent compounding (bigger m) gives a slightly higher result for the same rate.",
        ]}
        note="Bank FDs usually compound quarterly. This ignores TDS and tax on interest."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  03 — Loan EMI                                                      */
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
    <Calc
      id="emi"
      index="03"
      tag="LOAN"
      title="Loan EMI"
      what="EMI is the fixed amount you pay every month on a loan — home, car, or personal. Each payment covers that month's interest first, and the rest chips away at the amount borrowed."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <Field label="Loan amount" value={amount} onChange={setAmount} min={50000} max={20000000} step={50000} unit="₹" />
          <Field label="Interest rate per year" value={rate} onChange={setRate} min={5} max={24} step={0.1} unit="%" />
          <Field label="Loan tenure" value={years} onChange={setYears} min={1} max={30} step={1} unit="yrs" />
        </div>
        <ResultCard primaryLabel="Monthly EMI" primaryValue={inr(emi)}>
          <Stat label="Principal" value={inr(amount)} />
          <Stat label="Total interest" value={inr(interest)} />
          <Stat label="Total payment" value={inr(total)} />
        </ResultCard>
      </div>

      <CompositionBar
        segments={[
          { label: "Principal", value: amount, tone: "muted" },
          { label: "Interest", value: interest, tone: "accent" },
        ]}
      />

      <InfoBar
        included={[
          "Loan amount (the principal borrowed).",
          "Annual interest rate, converted to a monthly rate.",
          "Tenure in years, converted to a number of monthly payments.",
        ]}
        formula={"EMI = P × r × (1 + r)^n / ( (1 + r)^n − 1 )"}
        where={[
          "P = loan amount",
          "r = annual rate ÷ 12 ÷ 100  (monthly rate)",
          "n = years × 12  (number of EMIs)",
        ]}
        how={[
          "The lender wants the same fixed payment each month such that the loan is fully cleared after n months.",
          "The formula is that fixed payment — it is the amount whose present value, discounted at rate r over n months, equals the loan P.",
          "Early EMIs are mostly interest; later EMIs are mostly principal, but the EMI amount itself stays constant.",
          "Total interest = (EMI × n) − P.",
        ]}
        note="Assumes a fixed rate and no prepayment, processing fees, or missed payments."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  04 — Goal planner (reverse SIP)                                    */
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
    <Calc
      id="goal"
      index="04"
      tag="GOAL"
      title="Goal planner"
      what="Start from the amount you want and work backwards: how much do you need to invest every month to reach it in a given time, at an assumed return?"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <Field label="Target amount" value={target} onChange={setTarget} min={100000} max={100000000} step={100000} unit="₹" />
          <Field label="Expected return per year" value={rate} onChange={setRate} min={1} max={20} step={0.5} unit="%" />
          <Field label="Years to reach it" value={years} onChange={setYears} min={1} max={40} step={1} unit="yrs" />
        </div>
        <ResultCard primaryLabel="Invest per month" primaryValue={inr(monthly)}>
          <Stat label="Target" value={inr(target)} />
          <Stat label="You invest" value={inr(invested)} />
          <Stat label="From growth" value={inr(gains)} />
        </ResultCard>
      </div>

      <CompositionBar
        segments={[
          { label: "You invest", value: invested, tone: "muted" },
          { label: "From growth", value: gains, tone: "accent" },
        ]}
      />

      <InfoBar
        included={[
          "The target amount you want to end with.",
          "Expected average annual return, as a monthly rate.",
          "The number of years you have.",
        ]}
        formula={"P = FV × i / ( ( (1 + i)^n − 1 ) × (1 + i) )"}
        where={[
          "FV = target amount",
          "i = annual return ÷ 12 ÷ 100",
          "n = years × 12",
          "P = required monthly investment",
        ]}
        how={[
          "This is the SIP future-value formula rearranged to solve for the monthly amount P instead of the end value.",
          "It finds the smallest fixed monthly investment whose compounded total equals your target after n months.",
          "A higher assumed return or a longer horizon lowers the monthly amount needed — often sharply.",
        ]}
        note="If the assumed return does not show up, you fall short. Build in a margin and review the plan yearly."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  05 — CAGR                                                          */
/* ================================================================== */

function CAGR() {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(250000);
  const [years, setYears] = useState(5);

  const cagr = years > 0 && initial > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : NaN;
  const absReturn = initial > 0 ? (final / initial - 1) * 100 : NaN;

  return (
    <Calc
      id="cagr"
      index="05"
      tag="CAGR"
      title="CAGR — compound annual growth rate"
      what="CAGR turns any start value, end value, and time span into a single smooth yearly growth rate. It answers: “at what steady rate would this have grown to get from A to B?”"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <Field label="Initial value" value={initial} onChange={setInitial} min={1000} max={10000000} step={1000} unit="₹" />
          <Field label="Final value" value={final} onChange={setFinal} min={1000} max={50000000} step={1000} unit="₹" />
          <Field label="Number of years" value={years} onChange={setYears} min={1} max={40} step={1} unit="yrs" />
        </div>
        <ResultCard primaryLabel="CAGR" primaryValue={pct(cagr)}>
          <Stat label="Total return" value={pct(absReturn)} />
          <Stat label="Gain" value={inr(final - initial)} />
          <Stat label="Multiple" value={`${num(final / initial)}×`} />
        </ResultCard>
      </div>

      <InfoBar
        included={[
          "The starting value.",
          "The ending value.",
          "The number of years between them.",
        ]}
        formula={"CAGR = (Final ÷ Initial)^(1 / years) − 1"}
        where={[
          "Final ÷ Initial = the growth multiple",
          "^(1 / years) = the per-year root of that multiple",
          "− 1 = convert the multiple back to a growth rate",
        ]}
        how={[
          "Divide the final value by the initial value to get the total growth multiple (e.g. 2.5×).",
          "Take the years-th root of that multiple — the constant yearly factor that would produce it.",
          "Subtract 1 to express that factor as a percentage growth rate.",
        ]}
        note="CAGR smooths over volatility — the path may have been far bumpier. It also assumes no money was added or withdrawn along the way."
      />
    </Calc>
  );
}

/* ================================================================== */
/*  06 — Inflation / buying power                                      */
/* ================================================================== */

function Inflation() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const f = Math.pow(1 + rate / 100, years);
  const futureCost = amount * f; // what today's basket will cost later
  const futureWorth = amount / f; // what a future amount is worth today

  return (
    <Calc
      id="inflation"
      index="06"
      tag="INFLATION"
      title="Inflation & buying power"
      what="Inflation makes the same money buy less over time. This shows both sides: what today's expense will cost later, and what a future sum is really worth in today's money."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <Field label="Amount (today's money)" value={amount} onChange={setAmount} min={1000} max={10000000} step={1000} unit="₹" />
          <Field label="Inflation rate per year" value={rate} onChange={setRate} min={1} max={15} step={0.5} unit="%" />
          <Field label="Number of years" value={years} onChange={setYears} min={1} max={40} step={1} unit="yrs" />
        </div>
        <ResultCard primaryLabel={`Cost in ${years} years`} primaryValue={inr(futureCost)}>
          <Stat label="Today's cost" value={inr(amount)} />
          <Stat label="Extra needed" value={inr(futureCost - amount)} />
          <Stat label={`₹${num(amount, 0)} then, worth now`} value={inr(futureWorth)} />
        </ResultCard>
      </div>

      <InfoBar
        included={[
          "An amount in today's money.",
          "An assumed average yearly inflation rate.",
          "The number of years to project.",
        ]}
        formula={"Future cost   = PV × (1 + i)^n\nToday's worth = FV ÷ (1 + i)^n"}
        where={[
          "PV = amount in today's money",
          "i = inflation rate ÷ 100",
          "n = number of years",
          "FV = a nominal amount in the future",
        ]}
        how={[
          "Prices compound just like interest: each year multiplies the level by (1 + i).",
          "Over n years the price level is multiplied by (1 + i)^n — that scales today's cost up to its future figure.",
          "Dividing instead of multiplying runs it the other way: it discounts a future amount back to what it can buy today.",
        ]}
        note="Inflation is uneven across goods and years. Official CPI is an average basket and may not match your personal spending."
      />
    </Calc>
  );
}
