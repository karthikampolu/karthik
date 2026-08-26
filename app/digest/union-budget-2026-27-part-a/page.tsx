import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import DataTable from "@/components/ui/data-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Union Budget 2026–27, Part A: Expenditure & the Three Kartavyas — AK",
  description:
    "A collection of information on capital expenditure, fiscal consolidation, and the three Kartavyas from Part A of the Union Budget 2026-27 speech.",
};

const sources = [
  {
    label: "Fiscal deficit analysis",
    href: "https://govtbudget.com/budget-analysis/fiscal-deficit",
  },
  {
    label: "FRBM Act — glossary",
    href: "https://govtbudget.com/budget-glossary/frbm-act",
  },
  {
    label: "Press Information Bureau — Union Budget 2026-27 capex release",
    href: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2270740&reg=3&lang=1",
  },
  {
    label: "HDFC Bank — What is Capital Expenditure",
    href: "https://www.hdfc.bank.in/blogs/demat-account/what-is-capital-expenditure",
  },
  {
    label: "ForumIAS — Capex spending and investment activity",
    href: "https://forumias.com/blog/answered-do-you-agree-that-capex-spending-provides-a-big-boost-to-investment-activity-and-supports-economic-growth-give-reasons-in-support-of-your-answer/",
  },
  {
    label: "Trading Economics — India Manufacturing PMI",
    href: "https://tradingeconomics.com/india/manufacturing-pmi",
  },
  {
    label: "D&B India — Key challenges in Indian manufacturing industries",
    href: "https://www.dnb.co.in/blog/key-challenges-in-indian-manufacturing-industries",
  },
];

const highlights = [
  { value: "4.4%", label: "Fiscal deficit target, 2026-27 (down from 6.4% in 2022-23)" },
  { value: "₹12.2L cr", label: "Public capital expenditure, FY2026-27 (up from ~₹2L cr in FY2014-15)" },
  { value: "₹16,95,768 cr", label: "Fiscal deficit, 2026-27 Budget Estimate" },
  { value: "₹1.4L cr", label: "16th Finance Commission grants to states, FY2026-27" },
  { value: "1,46,572 km", label: "National highway length, March 2026 (+61% since FY14)" },
  { value: "165", label: "Operational airports, 2026 (up from 74 in 2014)" },
  { value: "₹40,000 cr", label: "Electronics Components Manufacturing Scheme outlay" },
  { value: "7", label: "High-Speed Rail corridors announced as \"growth connectors\"" },
];

const h2 = "font-display text-3xl md:text-4xl text-[color:var(--text)] mt-20 mb-6 leading-snug border-t border-[color:var(--border)] pt-12 first:border-t-0 first:pt-0 first:mt-0";
const h3 = "font-display text-2xl text-[color:var(--text)] mt-12 mb-4 leading-snug";
const p = "text-[16px] leading-relaxed text-[color:var(--text-muted)] mb-4";
const ul = "space-y-2 text-[15px] leading-relaxed text-[color:var(--text-muted)] mb-4 list-disc pl-5 marker:text-[color:var(--text-faint)]";

const keyNumbersTable = {
  columns: ["₹ crore", "2024-25 Actuals", "2025-26 BE", "2025-26 RE", "2026-27 BE"],
  rows: [
    ["Revenue Receipts", "30,36,619", "34,20,409", "33,42,323", "35,33,150"],
    ["Capital Receipts", "16,16,249", "16,44,936", "16,22,519", "18,14,165"],
    ["Total Receipts", "46,52,867", "50,65,345", "49,64,842", "53,47,315"],
    ["Total Expenditure", "46,52,867", "50,65,345", "49,64,842", "53,47,315"],
    ["Effective Capital Expenditure", "13,24,609", "15,48,282", "14,03,906", "17,14,523"],
    ["Revenue Deficit", "5,64,296", "5,23,846", "5,26,764", "5,92,344"],
    ["Effective Revenue Deficit", "2,91,640", "96,654", "2,18,613", "99,642"],
    ["Fiscal Deficit", "15,74,431", "15,68,936", "15,58,492", "16,95,768"],
    ["Primary Deficit", "4,58,856", "2,92,598", "2,84,154", "2,91,796"],
  ],
};

export default function UnionBudgetPartAPage() {
  return (
    <Container className="max-w-3xl py-20 md:py-28">
      <Eyebrow>Digest · Economics</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Union Budget 2026–27 — Part A
      </h1>
      <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl">
        A collection of information on government spending and the three
        Kartavyas from Part A of the Union Budget 2026-27 speech.
      </p>

      {/* ---------------- Highlights ---------------- */}
      <h2 className={h2}>Highlights</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {highlights.map((h) => (
          <div
            key={h.label}
            className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4"
          >
            <p className="font-display text-xl text-[color:var(--text)] leading-tight mb-1.5">
              {h.value}
            </p>
            <p className="text-[12.5px] leading-snug text-[color:var(--text-faint)]">
              {h.label}
            </p>
          </div>
        ))}
      </div>

      {/* ================================================================ */}
      {/* PART 1 — WHAT THE BUDGET ANNOUNCED                                */}
      {/* ================================================================ */}
      <h2 className={h2}>Part 1 — What the Budget Announced</h2>


      <DataTable
        caption="Union Budget 2026-27 key numbers, in ₹ crore"
        columns={keyNumbersTable.columns}
        rows={keyNumbersTable.rows}
      />
      <p className="mt-2 text-[13px] text-[color:var(--text-faint)]">
        Source:{" "}
        <a
          href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2270740&reg=3&lang=1"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-fade hover:text-[color:var(--accent)]"
        >
          pib.gov.in
        </a>
        , via{" "}
        <a
          href="https://govtbudget.com/budget-analysis/fiscal-deficit"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-fade hover:text-[color:var(--accent)]"
        >
          govtbudget.com
        </a>
      </p>
<h3 className={h3}>Fiscal Position</h3>
<p className={p}>
  The Effective Revenue Deficit increased sharply from the 2025–26 Budget
  Estimate to the 2025–26 Revised Estimate, largely because the grants for
  creation of capital assets were revised downward. This should not
  automatically be interpreted as a fall in total capital expenditure.
</p>
     



      <h3 className={h3}>First Kartavya — Accelerate and Sustain Economic Growth</h3>
      <p className={p}>Six interventions, summarized:</p>
      <ul className={ul}>
        <li>
          <strong className="text-[color:var(--text)] font-medium">Manufacturing in 7 strategic sectors</strong> — Biopharma SHAKTI (₹10,000 cr/5 yrs), 3 new NIPERs, 1,000+ Clinical Trials sites, India Semiconductor Mission 2.0, the Electronics Components Manufacturing Scheme (up to ₹40,000 cr), Rare Earth Corridors, 3 new Chemical Parks, capital-goods manufacturing (Tool Rooms, CIE, Container Manufacturing), and a slate of textile schemes (Integrated Textile Programme, National Fibre Scheme, Mega Textile Parks, Mahatma Gandhi Gram Swaraj).
        </li>
        <li><strong className="text-[color:var(--text)] font-medium">Reviving legacy industry</strong> — a scheme to modernize 200 older industrial clusters.</li>
        <li><strong className="text-[color:var(--text)] font-medium">Champion SMEs</strong> — a ₹10,000 cr SME Growth Fund, another ₹2,000 cr for the Self-Reliant India Fund, and "Corporate Mitra" training via ICAI/ICSI/ICMAI for smaller towns.</li>
        <li><strong className="text-[color:var(--text)] font-medium">Infrastructure push</strong> — capex to ₹12.2 lakh cr, an Infrastructure Risk Guarantee Fund, CPSE real estate recycled via REITs, new freight corridors, 20 new National Waterways, and seaplane manufacturing incentives.</li>
        <li><strong className="text-[color:var(--text)] font-medium">Energy security</strong> — ₹20,000 cr over 5 years for Carbon Capture Utilization and Storage (CCUS).</li>
        <li><strong className="text-[color:var(--text)] font-medium">City Economic Regions</strong> — ₹5,000 cr per CER, 7 new High-Speed Rail corridors (Mumbai–Pune, Pune–Hyderabad, Hyderabad–Bengaluru, Hyderabad–Chennai, Chennai–Bengaluru, Delhi–Varanasi, Varanasi–Siliguri), a banking-sector review committee, and restructuring of PFC/REC. Plus a ₹100 cr incentive for large municipal bond issuances.</li>
      </ul>

      <h3 className={h3}>Second Kartavya — Fulfil Aspirations and Build Capacity of People</h3>
      <ul className={ul}>
        <li>A High-Powered "Education to Employment and Enterprise" Standing Committee for the services sector.</li>
        <li>100,000 new Allied Health Professionals over 5 years, plus 5 Regional Medical Hubs and 3 new All India Institutes of Ayurveda.</li>
        <li>20,000+ more veterinary professionals, backed by a new loan-linked subsidy scheme for private vet colleges and hospitals.</li>
        <li>AVGC (Animation, Visual Effects, Gaming, Comics) Content Creator Labs in 15,000 schools and 500 colleges.</li>
        <li>5 new University Townships, and a girls' hostel in every district.</li>
        <li>Hospitality upgrades: National Institute of Hospitality, 10,000 tour guides trained, and 15 archaeological sites (Lothal, Dholavira, Rakhigarhi, and others) developed into cultural destinations.</li>
        <li>The Khelo India Mission, to transform sports over the next decade.</li>
      </ul>

      <h3 className={h3}>Third Kartavya — Sabka Sath, Sabka Vikas</h3>
      <ul className={ul}>
        <li><strong className="text-[color:var(--text)] font-medium">Farmer incomes</strong> — 500 reservoirs and Amrit Sarovars, support for high-value crops (coconut, sandalwood, cocoa, cashew), and Bharat-VISTAAR, a new multilingual AI tool for agricultural guidance.</li>
        <li><strong className="text-[color:var(--text)] font-medium">Empowering Divyangjan</strong> — the Divyangjan Kaushal Yojana, training persons with disabilities for roles in IT, AVGC, hospitality, and F&amp;B.</li>
        <li><strong className="text-[color:var(--text)] font-medium">Mental health</strong> — a new NIMHANS-2 in north India, and upgrades to the Ranchi and Tezpur institutes.</li>
        <li><strong className="text-[color:var(--text)] font-medium">Purvodaya &amp; the North-East</strong> — a new East Coast Industrial Corridor, 5 tourism destinations, 4,000 e-buses, and a Buddhist Circuits scheme across 6 states.</li>
      </ul>

      <h3 className={h3}>16th Finance Commission</h3>
      <ul className={ul}>
        <li>₹1.4 lakh crore was given to the states for FY2026-27 as Finance Commission Grants.</li>
      </ul>

      {/* ================================================================ */}
      {/* PART 2 — WHAT WE OBSERVED                                        */}
      {/* ================================================================ */}
      <h2 className={h2}>Part 2 — What We Observed</h2>

      <h3 className={h3}>India's Fiscal Consolidation Path</h3>
      <p className={p}>
        India's fiscal discipline traces back to the{" "}
        <a
          href="https://govtbudget.com/budget-glossary/frbm-act"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-fade text-[color:var(--text)] hover:text-[color:var(--accent)]"
        >
          Fiscal Responsibility and Budget Management (FRBM) Act
        </a>{" "}
        of 2003, which targeted a 3% fiscal deficit and zero revenue deficit.
        India nearly got there by 2007-08 (2.5%), but the 2008 financial
        crisis and then COVID repeatedly blew the deficit back up — to 6.5%
        in 2009-10 and 9.2% by 2020-21.
      </p>
      <p className={p}>
        The current consolidation plan trims the deficit by roughly
        0.5–0.7 points a year: 6.4% (2022-23) → 5.8% (2023-24) → 4.8%
        (2025-26) → 4.4% (2026-27), aiming for the original 3% target by
        2028-30.
      </p>
       <h3 className={h3}>Capital Expenditure</h3>
      <p className={p}>
        Public capital spending has grown from about ₹2 lakh crore in
        FY2014–15 to ₹12.2 lakh crore in FY2026–27, spread across programmes
        like Sagarmala, Bharatmala, PM GatiShakti, PMAY, Jal Jeevan Mission,
        PM Ujjwala Yojana, and UDAN.
      </p>
      <ul className={ul}>
        <li>₹32,000 crore in 2014–15 grew to ₹2.78 lakh crore in FY2026–27 — almost a nine-fold jump.</li>
        <li>Operating airports rose from 74 in 2014 to 165 in 2026.</li>
        <li>
          India now has the world's second-largest road network, at 63.73
          lakh km. National highways grew about 61%, from 91,287 km in FY14
          to 1,46,572 km by March 2026.
        </li>
      </ul>

      <h3 className={h3}>Capex — Risks and Caveats</h3>
      <p className={p}>
        Capex isn't risk-free: it does little good when used to cover
        public-enterprise losses, when it skips health and education, or
        when it's funded by a high fiscal deficit that pushes up inflation
        and shakes investor confidence. It pays off only when backed by a
        supportive regulatory regime and implemented well at every level of
        government.
      </p>
      <p className={p}>
        Further reading —{" "}
        <a
          href="https://www.hdfc.bank.in/blogs/demat-account/what-is-capital-expenditure"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-fade text-[color:var(--text)] hover:text-[color:var(--accent)]"
        >
          what is capital expenditure
        </a>{" "}
        ·{" "}
        <a
          href="https://forumias.com/blog/answered-do-you-agree-that-capex-spending-provides-a-big-boost-to-investment-activity-and-supports-economic-growth-give-reasons-in-support-of-your-answer/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-fade text-[color:var(--text)] hover:text-[color:var(--accent)]"
        >
          does capex spending boost investment activity?
        </a>
      </p>
            <h3 className={h3}>Manufacturing</h3>
      <p className={p}>
        India wants manufacturing to create millions of jobs, move workers
        out of low-productivity farming into better-paying industrial jobs,
        and grow the sector's share of India's GDP.
      </p>
      <p className="text-[13px] text-[color:var(--text-faint)] -mt-2 mb-4">
        Source: Business Today
      </p>

      <h3 className={h3}>Manufacturing — Challenges</h3>
      <p className={p}>
        Key challenges facing Indian manufacturing, per{" "}
        <a
          href="https://www.dnb.co.in/blog/key-challenges-in-indian-manufacturing-industries"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-fade text-[color:var(--text)] hover:text-[color:var(--accent)]"
        >
          D&amp;B India
        </a>
        : a strict regulatory environment, global economic headwinds, low
        R&amp;D spending, and a shortage of skilled workers. India's
        Manufacturing PMI has been trending down over the past few readings —
        see the source below for the live chart.
      </p>

      {/* ---------------- Sources ---------------- */}
      <div className="mt-16 pt-10 border-t border-[color:var(--border)]">
        <h2 className="font-display text-2xl text-[color:var(--text)] mb-5">Sources</h2>
        <p className="text-[14px] text-[color:var(--text-faint)] mb-4">
          Every source referenced above, listed separately. "Business Today"
          was cited as the source for the manufacturing section without a
          specific article link.
        </p>
        <ul className="space-y-2">
          {sources.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-fade text-[14px] text-[color:var(--text-muted)] hover:text-[color:var(--accent)] break-words"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

{/* ---------------- Digest note ---------------- */}
<div className="mt-10 rounded-lg border-l-[3px] border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-5 py-4">
  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--accent)] mb-1.5">
    About this digest
  </p>
  <p className="text-[14px] leading-relaxed text-[color:var(--text)]">
    This digest brings together information, figures, and questions
    collected while studying the Union Budget 2026–27. It is intended
    as a reference to understand and explore the budget, with the
    information organized and condensed for easier reading.
  </p>
</div>
    </Container>
  );
}
