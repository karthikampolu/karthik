import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import DataTable from "@/components/ui/data-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Union Budget 2026–27, Part A: Expenditure & the Three Kartavyas — AK",
  description:
    "Notes on capital expenditure, fiscal consolidation, and the three Kartavyas from Part A of the Union Budget 2026-27 speech.",
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
const h4 = "font-mono text-[13px] uppercase tracking-wide text-[color:var(--accent)] mt-6 mb-2";
const p = "text-[16px] leading-relaxed text-[color:var(--text-muted)] mb-4";
const ul = "space-y-2 text-[15px] leading-relaxed text-[color:var(--text-muted)] mb-4 list-disc pl-5 marker:text-[color:var(--text-faint)]";
const nestedUl = "space-y-1.5 mt-2 mb-2 list-[circle] pl-5 marker:text-[color:var(--text-faint)]";

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
      <Eyebrow>Blog · Economics</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Union Budget 2026–27 — Part A
      </h1>
      <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl">
        My notes on government spending and the three Kartavyas from Part A
        of the Union Budget 2026-27 speech.
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

      <h3 className={h3}>Fiscal Position</h3>
      <p className={p}>
        The Effective Revenue Deficit jumped in the Revised Estimates. The
        main reason: the government cut how much it had set aside as grants
        for building capital assets. That doesn't automatically mean total
        capital spending fell, though.
      </p>
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

      <h3 className={h3}>Capital Expenditure</h3>
      <p className={p}>
        Public capital spending has grown from about ₹2 lakh crore in
        FY2014–15 to ₹12.2 lakh crore in FY2026–27. Big programmes like
        Sagarmala, Bharatmala, PM GatiShakti, PMAY, Jal Jeevan Mission, PM
        Ujjwala Yojana, and UDAN have all expanded access to infrastructure.
      </p>
      <ul className={ul}>
        <li>₹32,000 crore in 2014–15 grew to ₹2.78 lakh crore in FY2026–27 — almost a nine-fold jump.</li>
        <li>Operating airports rose from 74 in 2014 to 165 in 2026.</li>
        <li>
          India now has the world's second-largest road network, at 63.73
          lakh km. National highways alone grew by about 61%, from 91,287 km
          in FY14 to 1,46,572 km by March 2026.
        </li>
      </ul>

      <h3 className={h3}>Manufacturing</h3>
      <p className={p}>
        India wants manufacturing to do three things: create millions of
        jobs, move workers out of low-productivity farming into
        better-paying industrial jobs, and grow the sector's share of
        India's GDP.
      </p>
      <p className="text-[13px] text-[color:var(--text-faint)] -mt-2 mb-4">
        Source: Business Today
      </p>

      <h3 className={h3}>First Kartavya — Accelerate and Sustain Economic Growth</h3>
      <p className={p}>Six interventions, under this Kartavya:</p>

      <h4 className={h4}>1. Scaling up manufacturing in 7 strategic and frontier sectors</h4>
      <ul className={ul}>
        <li>Biopharma SHAKTI (Strategy for Healthcare Advancement through Knowledge, Technology and Innovation): a new plan with ₹10,000 crore over 5 years to turn India into a global hub for biopharma manufacturing.</li>
        <li>A new biopharma-focused network: 3 brand-new National Institutes of Pharmaceutical Education and Research (NIPER), plus upgrades to 7 existing ones.</li>
        <li>Over 1,000 accredited India Clinical Trials sites will be set up.</li>
        <li>India Semiconductor Mission (ISM) 2.0: a new push to make chip-making equipment and materials, build India's own full-stack chip designs, and strengthen supply chains — backed by industry-led research and training centres.</li>
        <li>The Electronics Components Manufacturing Scheme gets a bigger budget: ₹40,000 crore.</li>
        <li>New dedicated Rare Earth Corridors for Odisha, Kerala, Andhra Pradesh, and Tamil Nadu — states rich in these minerals — to boost mining, processing, research, and manufacturing there.</li>
        <li>A new scheme will help states set up 3 dedicated Chemical Parks, chosen through a competitive process, built on a ready-to-use, cluster-based industrial park model.</li>
        <li>
          Strengthening capital goods capability:
          <ul className={nestedUl}>
            <li>2 Hi-Tech Tool Rooms, run by public sector companies (CPSEs), will use automation to locally design, test, and manufacture high-precision components at scale and at lower cost.</li>
            <li>A new scheme (CIE) will boost domestic manufacturing of high-value, technologically advanced construction and infrastructure equipment.</li>
            <li>A new Container Manufacturing scheme, backed by over ₹10,000 crore over 5 years, aims to build a globally competitive container-making industry in India.</li>
          </ul>
        </li>
        <li>A new Integrated Programme for the Textile Sector.</li>
        <li>The National Fibre Scheme will support India's natural fibres — silk, wool, jute — plus man-made and new-age fibres, aiming for self-reliance.</li>
        <li>The Textile Expansion and Employment Scheme will modernize traditional textile clusters — funding new machinery, better technology, and shared testing and certification centres.</li>
        <li>Mega Textile Parks will be built through a competitive process, focused on adding value to technical textiles.</li>
        <li>The Mahatma Gandhi Gram Swaraj initiative will support khadi, handloom, and handicrafts.</li>
        <li>A new initiative will help these industries connect to global markets, build their branding, and get support with training, skilling, and quality of production.</li>
      </ul>

      <h4 className={h4}>2. Rejuvenating legacy industrial sectors</h4>
      <ul className={ul}>
        <li>A new scheme will revive 200 older industrial clusters, upgrading their infrastructure and technology to make them more cost-competitive and efficient.</li>
      </ul>

      <h4 className={h4}>3. Creating "Champion SMEs" and supporting micro enterprises</h4>
      <ul className={ul}>
        <li>A new ₹10,000 crore SME Growth Fund will back small businesses with the potential to grow into industry leaders, chosen against set criteria.</li>
        <li>The Self-Reliant India Fund gets another ₹2,000 crore, to keep helping micro enterprises access risk capital.</li>
        <li>Institutes like ICAI, ICSI, and ICMAI will design short, hands-on courses to train a new group of "Corporate Mitras" — especially in smaller towns (Tier-II and Tier-III).</li>
      </ul>

      <h4 className={h4}>4. Delivering a powerful push to infrastructure</h4>
      <ul className={ul}>
        <li>Public capital spending will rise to ₹12.2 lakh crore in FY2026-27.</li>
        <li>A new Infrastructure Risk Guarantee Fund will make private developers more confident about taking on infrastructure projects.</li>
        <li>The government will speed up the sale of CPSEs' (central public sector enterprises') unused real estate through dedicated REITs (real estate investment trusts).</li>
        <li>
          To make cargo transport more eco-friendly:
          <ul className={nestedUl}>
            <li>New Dedicated Freight Corridors will connect Dankuni in the east to Surat in the west.</li>
            <li>
              20 new National Waterways will open over the next 5 years — starting with NW-5 in Odisha, linking the mineral-rich Talcher-Angul belt and industrial hubs like Kalinga Nagar to the ports of Paradeep and Dhamra.
              <ul className={nestedUl}>
                <li>New Training Institutes will act as regional centres of excellence to build up the workforce for this.</li>
                <li>A ship repair ecosystem for inland waterways will be set up in Varanasi and Patna.</li>
              </ul>
            </li>
            <li>A new Coastal Cargo Promotion Scheme aims to shift more cargo away from road and rail — growing the share of inland waterways and coastal shipping from 6% to 12% by 2047.</li>
          </ul>
        </li>
        <li>
          New incentives will support Indian-made seaplanes, to improve last-mile and remote connectivity and boost tourism.
          <ul className={nestedUl}>
            <li>A Seaplane VGF (Viability Gap Funding) Scheme will help fund seaplane operations.</li>
          </ul>
        </li>
      </ul>

      <h4 className={h4}>5. Ensuring long-term energy security and stability</h4>
      <ul className={ul}>
        <li>₹20,000 crore over 5 years will go toward Carbon Capture Utilization and Storage (CCUS) technology.</li>
      </ul>

      <h4 className={h4}>6. Developing City Economic Regions</h4>
      <ul className={ul}>
        <li>Each City Economic Region (CER) gets ₹5,000 crore over 5 years, distributed through a competitive, results-based funding model.</li>
        <li>
          Seven new High-Speed Rail corridors will connect cities as "growth connectors":
          <ul className={nestedUl}>
            <li>Mumbai–Pune</li>
            <li>Pune–Hyderabad</li>
            <li>Hyderabad–Bengaluru</li>
            <li>Hyderabad–Chennai</li>
            <li>Chennai–Bengaluru</li>
            <li>Delhi–Varanasi</li>
            <li>Varanasi–Siliguri</li>
          </ul>
        </li>
        <li>A new "High Level Committee on Banking for Viksit Bharat" will review the banking sector and align it with India's next stage of growth — while protecting financial stability, inclusion, and consumers.</li>
        <li>The Power Finance Corporation and Rural Electrification Corporation will be restructured to run at a bigger scale and more efficiently, as part of the public sector NBFCs (non-banking financial companies).</li>
        <li>The government will review the Foreign Exchange Management (Non-debt Instruments) Rules, to make the framework for foreign investment more modern and easier to use.</li>
      </ul>

      <h4 className={h4}>Municipal Bonds</h4>
      <ul className={ul}>
        <li>Cities that issue a municipal bond worth more than ₹1,000 crore in one go will get a ₹100 crore incentive — meant to encourage bigger, higher-value bonds.</li>
      </ul>

      <h3 className={h3}>Second Kartavya — Fulfil Aspirations and Build Capacity of People</h3>
      <ul className={ul}>
        <li>A new High-Powered "Education to Employment and Enterprise" Standing Committee will recommend how to make the services sector a bigger driver of Viksit Bharat.</li>
      </ul>

      <h4 className={h4}>Creation of Professionals for Viksit Bharat</h4>
      <ul className={ul}>
        <li>
          Existing Allied Health Professional (AHP) institutions will be upgraded, and new ones set up in both private and government sectors.
          <ul className={nestedUl}>
            <li>100,000 new Allied Health Professionals will be trained over the next 5 years.</li>
          </ul>
        </li>
        <li>5 new Regional Medical Hubs will help position India as a medical tourism destination.</li>
      </ul>

      <h4 className={h4}>AYUSH</h4>
      <ul className={ul}>
        <li>3 new All India Institutes of Ayurveda will be set up.</li>
      </ul>

      <h4 className={h4}>Animal Husbandry</h4>
      <ul className={ul}>
        <li>
          The government aims to add over 20,000 more veterinary professionals.
          <ul className={nestedUl}>
            <li>A new loan-linked subsidy scheme will help set up private veterinary and para-vet colleges, veterinary hospitals, diagnostic labs, and breeding facilities.</li>
          </ul>
        </li>
      </ul>

      <h4 className={h4}>Orange Economy</h4>
      <ul className={ul}>
        <li>The Indian Institute of Creative Technologies, Mumbai, will help set up AVGC (Animation, Visual Effects, Gaming, and Comics) Content Creator Labs in 15,000 secondary schools and 500 colleges.</li>
      </ul>

      <h4 className={h4}>Education</h4>
      <ul className={ul}>
        <li>
          5 new University Townships will be built near major industrial and logistics corridors.
          <ul className={nestedUl}>
            <li>Every district will get one new girls' hostel, funded through VGF (Viability Gap Funding) or capital support.</li>
          </ul>
        </li>
      </ul>

      <h4 className={h4}>Tourism</h4>
      <ul className={ul}>
        <li>
          The National Council for Hotel Management and Catering Technology will be upgraded into a National Institute of Hospitality.
          <ul className={nestedUl}>
            <li>A pilot programme will train 10,000 tour guides across 20 tourist sites, through a 12-week hybrid course run with an IIM.</li>
            <li>A new National Destination Digital Knowledge Grid will digitally document India's cultural, spiritual, and heritage sites.</li>
          </ul>
        </li>
      </ul>

      <h4 className={h4}>Heritage and Culture Tourism</h4>
      <ul className={ul}>
        <li>15 archaeological sites — including Lothal, Dholavira, Rakhigarhi, Adichanallur, Sarnath, Hastinapur, and Leh Palace — will be developed into full cultural destinations.</li>
      </ul>

      <h4 className={h4}>Sports</h4>
      <ul className={ul}>
        <li>The Khelo India Mission will guide a decade-long transformation of India's sports sector.</li>
      </ul>

      <h3 className={h3}>Third Kartavya — Sabka Sath, Sabka Vikas</h3>
      <p className={p}>Focuses on four areas:</p>

      <h4 className={h4}>1. Increasing Farmer Incomes</h4>
      <ul className={ul}>
        <li>A new push will jointly develop 500 reservoirs and Amrit Sarovars.</li>
      </ul>

      <h4 className={h4}>High Value Agriculture</h4>
      <ul className={ul}>
        <li>The government will support high-value crops like coconut, sandalwood, cocoa, and cashew in coastal regions.</li>
        <li>A new Coconut Promotion Scheme aims to boost coconut production and productivity.</li>
      </ul>

      <h4 className={h4}>Bharat-VISTAAR (Virtually Integrated System to Access Agricultural Resources)</h4>
      <ul className={ul}>
        <li>Bharat-VISTAAR is a new multilingual AI tool that brings the AgriStack portals and ICAR's farming guidance together into one AI-powered system.</li>
      </ul>

      <h4 className={h4}>2. Empowering Divyangjan</h4>
      <ul className={ul}>
        <li>The Divyangjan Kaushal Yojana will train persons with disabilities for task-based roles in IT, AVGC, hospitality, and food and beverage sectors.</li>
      </ul>

      <h4 className={h4}>3. Commitment to Mental Health and Trauma Care</h4>
      <ul className={ul}>
        <li>
          A new NIMHANS-2 will be set up in north India.
          <ul className={nestedUl}>
            <li>The National Mental Health Institutes in Ranchi and Tezpur will be upgraded into Regional Apex Institutions.</li>
          </ul>
        </li>
      </ul>

      <h4 className={h4}>4. Focus on the Purvodaya States and the North-Eastern Region</h4>
      <ul className={ul}>
        <li>
          A new East Coast Industrial Corridor will be developed, anchored around a well-connected node at Durgapur, alongside 5 new tourism destinations across the 5 Purvodaya states and 4,000 new e-buses.
          <ul className={nestedUl}>
            <li>A new scheme will develop Buddhist Circuits across Arunachal Pradesh, Sikkim, Assam, Manipur, Mizoram, and Tripura.</li>
          </ul>
        </li>
      </ul>

      <h3 className={h3}>16th Finance Commission</h3>
      <ul className={ul}>
        <li>₹1.4 lakh crore was given to the states for FY2026-27 as Finance Commission Grants, following the 16th Finance Commission's recommendations.</li>
      </ul>

      {/* ================================================================ */}
      {/* PART 2 — WHAT WE OBSERVED                                        */}
      {/* ================================================================ */}
      <h2 className={h2}>Part 2 — What We Observed</h2>

      <h3 className={h3}>India's Fiscal Consolidation Path</h3>
      <p className={p}>
        India's fiscal discipline really comes down to one law: the{" "}
        <a
          href="https://govtbudget.com/budget-glossary/frbm-act"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-fade text-[color:var(--text)] hover:text-[color:var(--accent)]"
        >
          Fiscal Responsibility and Budget Management (FRBM) Act
        </a>
        . Parliament passed it in 2003 to force the government to stick to a
        rulebook. The original goal was simple: bring the fiscal deficit
        down to 3% of GDP, and get rid of the revenue deficit completely.
      </p>
      <p className={p}>
        India nearly got there. By 2007-08, the fiscal deficit had fallen to
        2.5% of GDP — under the 3% target. Then the 2008 global financial
        crisis hit, and the government opened up spending again, rightly.
        The deficit jumped back up to 6.5% in 2009-10. It took a slow, steady
        grind through the early 2010s to bring it back down, and by 2018-19
        India was at 3.4%.
      </p>
      <p className={p}>
        COVID knocked the plan off track again. The deficit shot up from
        3.4% in 2018-19 to 9.2% within just two years. Back in 2017, the NK
        Singh Committee had already recommended building an escape clause
        into the FRBM framework for extraordinary situations — and the
        pandemic was exactly that kind of situation.
      </p>
      <p className={p}>
        The current government now has a new plan: cut the deficit by about
        0.5–0.7 percentage points every year. The numbers so far back that
        up — 6.4% in 2022-23, 5.8% in 2023-24, 4.8% in 2025-26, and 4.4% in
        2026-27. At this rate, India could hit the 3% target by 2028-29 or
        2029-30 — assuming nothing unexpected happens along the way.
      </p>

      <h3 className={h3}>Capex — Risks and Caveats</h3>
      <p className={p}>Capital expenditure isn't risk-free. Here's what can go wrong:</p>
      <ul className={ul}>
        <li>Using capex to cover losses at public enterprises doesn't actually help the economy.</li>
        <li>If capex skips important areas like health and education, its benefits stay limited.</li>
        <li>
          Spending heavily on capex while running a high fiscal deficit
          brings its own risks — higher inflation, a bigger current account
          deficit, and pressure on financial stability, all of which can
          shake investor confidence.
        </li>
        <li>Capex only works well if it's backed by a regulatory environment that actually supports it.</li>
        <li>It has to be carried out well at every level — central, state, and local — or the outcome suffers.</li>
      </ul>
      <p className={p}>
        Capex is a powerful tool for driving growth and pulling in
        investment. But the money has to be well spent and backed by other
        policies — otherwise it won't deliver what it's supposed to.
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
          was cited in my notes as the source for the manufacturing section
          without a specific article link.
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

      {/* ---------------- AI usage note ---------------- */}
      <div className="mt-10 rounded-lg border-l-[3px] border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-5 py-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--accent)] mb-1.5">
          A note on how this was made
        </p>
        <p className="text-[14px] leading-relaxed text-[color:var(--text)]">
          The research, figures, and questions above are my own notes on the
          budget speech. AI (Claude) was used to structure this write-up and
          rewrite my notes in simpler language — it did not add its own
          facts, analysis, or opinions to the content.
        </p>
      </div>
    </Container>
  );
}
