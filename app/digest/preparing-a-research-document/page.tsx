import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import DataTable from "@/components/ui/data-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preparing a Research or Project Document — AK",
  description:
    "A simple, step-by-step guide to writing a research, project, or class-assessment document that matches a standard marking rubric — from picking a question to data, statistics, charts, references, and honest AI use.",
};

const h2 =
  "font-display text-3xl md:text-4xl text-[color:var(--text)] mt-20 mb-6 leading-snug border-t border-[color:var(--border)] pt-12 first:border-t-0 first:pt-0 first:mt-0";
const h3 = "font-display text-2xl text-[color:var(--text)] mt-12 mb-4 leading-snug";
const p = "text-[16px] leading-relaxed text-[color:var(--text-muted)] mb-4";
const ul =
  "space-y-2 text-[15px] leading-relaxed text-[color:var(--text-muted)] mb-4 list-disc pl-5 marker:text-[color:var(--text-faint)]";
const ol =
  "space-y-2 text-[15px] leading-relaxed text-[color:var(--text-muted)] mb-4 list-decimal pl-5 marker:text-[color:var(--text-faint)]";
const strong = "text-[color:var(--text)] font-medium";

const steps = [
  { value: "01", label: "Introduction — say what the topic is and why it matters" },
  { value: "02", label: "Review of Literature — sum up what others found, and cite them" },
  { value: "03", label: "Variables & Data — list what you measured and where it came from" },
  { value: "04", label: "Descriptive Statistics — work out the numbers, then explain them" },
  { value: "05", label: "Charts — a few clear ones, each tied to the text" },
  { value: "06", label: "Conclusion — sum up, then give clear next steps" },
];

const rubricMap = {
  columns: ["Rubric part", "Where it goes in your document", "Quick check"],
  rows: [
    [
      "(a) Introduction",
      "Section 1 — background, why it matters, the question, your aims, what you cover",
      "After one page, can a stranger say what your question is?",
    ],
    [
      "(b) Review of Literature",
      "Section 2 — 3 to 5 themes, each summed up; the gap you fill; a reference list",
      "Is every claim cited? Does the section end by naming the gap?",
    ],
    [
      "(c) Variables & Data",
      "Section 3 — a table (name, meaning, unit, source) and a reason for each one",
      "For every variable, can you say in one line why it is there?",
    ],
    [
      "(d) Descriptive Statistics",
      "Section 4 — a summary table (mean, median, spread, min, max, growth) and a written read-out",
      "Does each number have a sentence saying what it means?",
    ],
    [
      "(e) Charts",
      "Section 5 — 3 or 4 charts, each with a caption and a mention in the text",
      "Take a chart out. Does the point weaken? If not, drop it.",
    ],
    [
      "(f) Conclusion & Recommendations",
      "Section 6 — sum up against your aims, then clear, doable steps",
      "Do the steps come from your own numbers, not general opinion?",
    ],
  ],
};

const skeleton = [
  ["Title page", "Title, your name, roll number, course, date."],
  ["Abstract (150–200 words)", "One line each: the problem, the data, the method, the main result, what it means."],
  ["1. Introduction", "Background → why it matters → the question → aims (numbered) → what you cover and what you don't."],
  ["2. Review of Literature", "3 to 5 short themed parts, each summing up a few sources; end by naming the gap you fill."],
  ["3. Variables & Data", "Unit of study, time period, a variable table, one short reason per variable, data sources, limits."],
  ["4. Descriptive Statistics", "The data table, the summary table, then 4 to 6 numbered points explaining the numbers."],
  ["5. Charts", "A trend chart, a make-up chart, a compare chart; a short line on how they help the argument."],
  ["6. Conclusion & Recommendations", "Answer each aim; give 4 to 6 clear steps; say what the study could not do and what comes next."],
  ["References", "Every source you cited, in one style (APA 7th), A to Z."],
  ["Appendix", "Raw data, notes on how you worked out the numbers, a checklist to refresh the data."],
];

const references = {
  learn: [
    {
      label:
        "The Craft of Research — Booth, Colomb, Williams and others (Univ. of Chicago Press)",
      href: "https://press.uchicago.edu/ucp/books/book/chicago/C/bo23521678.html",
      note: "The classic beginner book on turning a topic into a question and then a draft.",
    },
    {
      label: "How to Write a Great Research Paper — Simon Peyton Jones (talk + slides)",
      href: "https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/",
      note: "About 45 minutes, free. The best start if you only have one evening.",
    },
    {
      label: "How to Write a Publishable Paper as a Class Assignment — Gary King",
      href: "https://gking.harvard.edu/papers",
      note: "Written for coursework: how to keep the scope small, how to lay it out, common mistakes.",
    },
    {
      label: "Economical Writing — Deirdre McCloskey",
      href: "https://press.uchicago.edu/ucp/books/book/chicago/E/bo27193786.html",
      note: "Short, plain advice on clear writing. Pairs well with Strunk & White's Elements of Style.",
    },
    {
      label: "Purdue OWL — APA Style (7th edition) guide",
      href: "https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_style_introduction.html",
      note: "Free and full of examples. Use it for in-text citations and the reference list.",
    },
  ],
  tools: [
    {
      label: "Zotero — free reference manager",
      href: "https://www.zotero.org/",
      note: "Add the browser button on day one. It saves your sources and builds the reference list for you.",
    },
    {
      label: "Overleaf — write in LaTeX in the browser (optional)",
      href: "https://www.overleaf.com/learn",
      note: "Only if your course asks for LaTeX. The \"Learn\" pages are a good tutorial. Word is fine otherwise.",
    },
    {
      label: "APA Style — How to cite ChatGPT and other AI",
      href: "https://apastyle.apa.org/blog/how-to-cite-chatgpt",
      note: "The proper way to cite and declare AI output. Check your own school's AI rules first.",
    },
  ],
  models: [
    {
      label: "RBI Bulletin — monthly articles",
      href: "https://www.rbi.org.in/Scripts/BS_ViewBulletin.aspx",
      note: "A good model for clean tables and captioned charts. Copy the layout, not the length.",
    },
    {
      label: "SEBI — Handbook of Statistics on the Indian Securities Market",
      href: "https://www.sebi.gov.in/sebi_data/commondocs/",
      note: "Shows how to present a dataset: meanings, tables, and time charts side by side.",
    },
    {
      label:
        "FII Flows to India: Nature and Causes — R. Chakrabarti (2001)",
      href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=649852",
      note: "A short, readable study: question, data, simple analysis, conclusion.",
    },
    {
      label:
        "Determinants of Foreign Institutional Investment in India — Rai & Bhanumurthy (2004)",
      href: "https://www.nipfp.org.in/publications/working-papers/",
      note: "Another compact example of the exact shape a rubric rewards.",
    },
  ],
  data: [
    { label: "RBI Database on the Indian Economy (DBIE)", href: "https://data.rbi.org.in/" },
    { label: "MOSPI — Ministry of Statistics data", href: "https://www.mospi.gov.in/" },
    { label: "NSDL FPI Monitor — foreign investor flows and holdings", href: "https://www.fpi.nsdl.co.in/" },
    { label: "World Bank Open Data", href: "https://data.worldbank.org/" },
    { label: "Our World in Data", href: "https://ourworldindata.org/" },
    { label: "Kaggle Datasets", href: "https://www.kaggle.com/datasets" },
  ],
};

export default function PreparingResearchDocumentPage() {
  return (
    <Container className="max-w-3xl py-20 md:py-28">
      <Eyebrow>Digest · Method</Eyebrow>
      <h1 className="font-display text-4xl md:text-5xl text-[color:var(--text)] leading-tight mb-4">
        Preparing a Research or Project Document
      </h1>
      <p className="text-[17px] leading-relaxed text-[color:var(--text-muted)] max-w-2xl">
        Most class assessments and project reports are marked with a rubric that
        has the same six parts: an introduction, a review of past work, a note
        on your data, some statistics, a few charts, and a conclusion with next
        steps. This is a simple, step-by-step guide to writing each part well,
        plus a ready-to-use outline and a short list of things a beginner can
        actually read.
      </p>

      {/* ---------------- The six steps at a glance ---------------- */}
      <h2 className={h2}>The six parts, in short</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {steps.map((s) => (
          <div
            key={s.value}
            className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4"
          >
            <p className="font-mono text-[12px] text-[color:var(--accent)] mb-1.5">
              {s.value}
            </p>
            <p className="text-[12.5px] leading-snug text-[color:var(--text-faint)]">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ================================================================ */}
      {/* BEFORE YOU WRITE                                                 */}
      {/* ================================================================ */}
      <h2 className={h2}>Do this before you start writing</h2>
      <p className={p}>
        An hour of setup here saves you days later. Do these five things first,
        in order:
      </p>
      <ol className={ol}>
        <li>
          <span className={strong}>Turn your topic into a question.</span> A
          topic (&ldquo;foreign investment in India&rdquo;) has no answer. A
          question (&ldquo;How did foreign investors&rsquo; holdings in India
          change between 2013 and 2025, and what does that mean for the banks
          that hold those assets?&rdquo;) does. Write it in one sentence and
          keep it in front of you.
        </li>
        <li>
          <span className={strong}>Get the data before you commit.</span> Open
          the real source, download one file, and check it has the numbers, the
          years, and the units you need. Most projects go wrong because the
          data is not there in a usable form &mdash; find that out on day one,
          not in week three.
        </li>
        <li>
          <span className={strong}>Set up a reference manager.</span> Install
          Zotero and its browser button. Save every source the moment you read
          it. Never keep citations in your head or a rough note.
        </li>
        <li>
          <span className={strong}>Pick one citation style and one template.</span>{" "}
          APA 7th is a safe choice unless you are told otherwise. Set the page
          up &mdash; margins, headings, page numbers, a table style &mdash;
          before you write any content.
        </li>
        <li>
          <span className={strong}>Make the outline first.</span> Create the six
          headings now as empty sections. You are filling a known shape, not
          inventing one.
        </li>
      </ol>

      {/* ================================================================ */}
      {/* STEP 1 — INTRODUCTION                                            */}
      {/* ================================================================ */}
      <h2 className={h2}>Step 1 — Introduction</h2>
      <p className={p}>
        <span className={strong}>What the marker wants:</span> a short, clear
        introduction that says what the topic is, why you are doing it, and what
        it covers &mdash; and gives the reader a reason to care.
      </p>
      <p className={p}>Write it in four small moves:</p>
      <ul className={ul}>
        <li>
          <span className={strong}>Background</span> &mdash; two or three
          sentences of context. Explain any term the reader needs right here.
        </li>
        <li>
          <span className={strong}>Why it matters</span> &mdash; who is
          affected, how big the thing is, what decision depends on the answer.
          This is the sentence that earns the &ldquo;holds the reader&rsquo;s
          interest&rdquo; marks.
        </li>
        <li>
          <span className={strong}>The question</span> &mdash; one sentence that
          names exactly what you are trying to find out.
        </li>
        <li>
          <span className={strong}>Aims and scope</span> &mdash; a numbered list
          of two to four aims, then a sentence on what the study covers and, just
          as important, what it leaves out.
        </li>
      </ul>
      <p className={p}>
        <span className={strong}>Common mistakes:</span> a page of general
        history before the question shows up; no clear aims; no scope, so the
        reader cannot tell what a full answer looks like. Keep the whole thing
        to about one page.
      </p>

      {/* ================================================================ */}
      {/* STEP 2 — LITERATURE REVIEW                                       */}
      {/* ================================================================ */}
      <h2 className={h2}>Step 2 — Review of Literature</h2>
      <p className={p}>
        <span className={strong}>What the marker wants:</span> a focused summary
        of past work &mdash; the main themes, how the studies connect, where
        they disagree &mdash; with correct, consistent citations, ending in a
        clear statement of the gap you fill.
      </p>
      <ul className={ul}>
        <li>
          <span className={strong}>Group by theme, not by paper.</span> Three to
          five short parts, each one pulling a few sources together. If one
          paragraph starts &ldquo;Author (year) found &hellip;&rdquo; and the
          next starts &ldquo;Another author (year) found &hellip;&rdquo;, that is
          a list, not a review.
        </li>
        <li>
          <span className={strong}>Say what it adds up to.</span> What does past
          work agree on, argue about, and never look at?
        </li>
        <li>
          <span className={strong}>Cite everything.</span> Every fact gets an
          in-text citation. Use one style. Let Zotero build the list so it stays
          consistent.
        </li>
        <li>
          <span className={strong}>End with the gap.</span> The last paragraph
          must say, in plain words, what is missing and how your study fills it.
          That one sentence links this section to your work.
        </li>
        <li>
          <span className={strong}>A small table helps.</span> Theme,
          main sources, main point &mdash; it shows the summary at a glance and
          is easy to mark.
        </li>
      </ul>
      <p className={p}>
        <span className={strong}>How much to read:</span> for a class
        assessment, about 8 to 15 real sources. Prefer journal articles,
        working papers from bodies like NIPFP or the RBI, and official
        statistics over blogs and news.
      </p>

      {/* ================================================================ */}
      {/* STEP 3 — VARIABLES & DATASET                                     */}
      {/* ================================================================ */}
      <h2 className={h2}>Step 3 — Variables and Data</h2>
      <p className={p}>
        <span className={strong}>What the marker wants:</span> clear, relevant
        variables and a well-described dataset, with a reason for each variable.
      </p>
      <h3 className={h3}>Describe the data</h3>
      <ul className={ul}>
        <li>What each row stands for (a country in a year? a firm in a month? a person?).</li>
        <li>The time period and how often it is measured, and why that window.</li>
        <li>The source, named exactly.</li>
        <li>How you cleaned or changed the data.</li>
        <li>Known limits &mdash; missing values, estimates, gaps in the series.</li>
      </ul>
      <h3 className={h3}>Put the variables in a table</h3>
      <p className={p}>
        One row per variable, with columns for name, meaning, unit, and source.
        Then, below the table, one short paragraph per variable that answers a
        single question: <em>why is this variable here?</em> Tie it to an aim or
        to the past work. A variable with no reason should be removed.
      </p>
      <p className={p}>
        <span className={strong}>Common mistakes:</span> vague meanings
        (&ldquo;market performance&rdquo; instead of &ldquo;NIFTY 50 closing
        level on 31 March&rdquo;); variables that appear in the analysis but not
        the table; no source; no reason.
      </p>

      {/* ================================================================ */}
      {/* STEP 4 — DESCRIPTIVE STATISTICS                                  */}
      {/* ================================================================ */}
      <h2 className={h2}>Step 4 — Descriptive Statistics</h2>
      <p className={p}>
        <span className={strong}>What the marker wants:</span> a full set of
        basic statistics <em>and</em> a clear, useful explanation of them &mdash;
        not just a table.
      </p>
      <h3 className={h3}>Work out a full set</h3>
      <ul className={ul}>
        <li>
          <span className={strong}>Middle:</span> mean, median (and mode for
          category data).
        </li>
        <li>
          <span className={strong}>Spread:</span> standard deviation, variance,
          range, and the coefficient of variation (SD &divide; mean) for
          comparing series of different sizes.
        </li>
        <li>
          <span className={strong}>Shape:</span> skewness (is it lopsided?), and
          kurtosis if it matters.
        </li>
        <li>
          <span className={strong}>Extremes:</span> the smallest and largest
          values, each with the year it happened.
        </li>
        <li>
          <span className={strong}>Growth, for data over time:</span> year-on-year
          growth, the compound growth rate over the whole period, and how many
          years fell.
        </li>
        <li>
          <span className={strong}>Links:</span> a correlation table if you have
          several number variables.
        </li>
      </ul>
      <p className={p}>
        Put these in one clean summary table. Round the same way everywhere.
        State the units in the caption.
      </p>
      <h3 className={h3}>Then explain the numbers</h3>
      <p className={p}>
        This is where most marks are won or lost. For each number that stands
        out, write a sentence saying what it <em>means</em>: &ldquo;a
        coefficient of variation near 0.5 means the series swings a lot, so
        income built on it will jump around from year to year.&rdquo; Point out
        the trend, the turning points, and the odd values, and say what they
        mean for your question. Number these points so the reader can follow
        them.
      </p>
      <p className={p}>
        <span className={strong}>Common mistakes:</span> a table with no words
        around it; stating the number (&ldquo;the mean is 37&rdquo;) without
        saying what it tells us; ignoring an obvious outlier.
      </p>

      {/* ================================================================ */}
      {/* STEP 5 — DIAGRAMS                                                */}
      {/* ================================================================ */}
      <h2 className={h2}>Step 5 — Charts</h2>
      <p className={p}>
        <span className={strong}>What the marker wants:</span> clear, correct
        charts that make a point better than words alone, and that connect to
        the text.
      </p>
      <ul className={ul}>
        <li>
          <span className={strong}>Match the chart to the job.</span> Change
          over time &rarr; line chart. Make-up of a whole &rarr; stacked bar.
          Comparing groups &rarr; bar chart. Link between two things &rarr;
          scatter. Skip pie charts with more than four slices, and skip 3-D
          effects.
        </li>
        <li>
          <span className={strong}>Label everything.</span> Axis names with
          units, a caption that states the point, and a source line.
        </li>
        <li>
          <span className={strong}>Mention each chart in the text.</span>{" "}
          &ldquo;As Figure 2 shows, the debt share speeds up after 2023.&rdquo;
          A chart the text never names looks like decoration.
        </li>
        <li>
          <span className={strong}>Fewer, better.</span> Three or four charts
          that each make a point beat ten that repeat the table. If dropping a
          chart costs nothing, drop it.
        </li>
        <li>
          <span className={strong}>Keep it honest.</span> Start bar-chart axes
          at zero. Do not cut the axis to make a small change look big.
        </li>
      </ul>

      {/* ================================================================ */}
      {/* STEP 6 — CONCLUSION & RECOMMENDATIONS                            */}
      {/* ================================================================ */}
      <h2 className={h2}>Step 6 — Conclusion and Recommendations</h2>
      <p className={p}>
        <span className={strong}>What the marker wants:</span> a strong
        conclusion that pulls the findings together and answers your aims, then
        clear, doable steps based on what you found.
      </p>
      <ul className={ul}>
        <li>
          <span className={strong}>Sum up, don&rsquo;t repeat.</span> Go aim by
          aim: for each one from the introduction, say what you found. No new
          data or citations here.
        </li>
        <li>
          <span className={strong}>Base each step on your own numbers.</span>{" "}
          Every recommendation should point back to a result in Section 4 or 5,
          not to general opinion. &ldquo;Because debt holdings grew fastest and
          stay put longer (Section 4, point 3), the bank should build its
          bond-handling service now&rdquo; &mdash; specific, and earned.
        </li>
        <li>
          <span className={strong}>Be concrete.</span> Who does what, by when,
          measured how. Vague advice (&ldquo;firms should be more
          efficient&rdquo;) scores low.
        </li>
        <li>
          <span className={strong}>Say what you could not do.</span> A short,
          honest paragraph on the limits of the study and what a follow-up would
          add.
        </li>
      </ul>

      {/* ================================================================ */}
      {/* RUBRIC MAP                                                       */}
      {/* ================================================================ */}
      <h2 className={h2}>Match the rubric to your document</h2>
      <p className={p}>
        Before you hand it in, check each rubric part against the section that
        covers it, and run the quick check.
      </p>
      <DataTable
        caption="How each rubric part maps to a section of the document"
        columns={rubricMap.columns}
        rows={rubricMap.rows}
      />

      {/* ================================================================ */}
      {/* FORMATTING & SUBMISSION                                          */}
      {/* ================================================================ */}
      <h2 className={h2}>Formatting and handing it in</h2>
      <ul className={ul}>
        <li>
          <span className={strong}>Order:</span> title page, abstract, numbered
          sections in rubric order, references, appendix. Add a contents page
          once it runs past about 8 pages.
        </li>
        <li>
          <span className={strong}>Tables and charts:</span> number them (Table
          1, Figure 1), give each one a caption and a source line, and mention
          each in the text.
        </li>
        <li>
          <span className={strong}>Citations:</span> one style all the way
          through, in the text and in the list. Let the reference manager
          format it.
        </li>
        <li>
          <span className={strong}>Length:</span> follow the brief. If there is
          none, this kind of assessment is usually 2,500 to 4,000 words plus
          tables.
        </li>
        <li>
          <span className={strong}>Honesty:</span> quote rarely and always with
          credit; put things in your own words; run a plagiarism check; keep
          your raw data and working file &mdash; you may be asked to redo a
          number. AI has its own rules &mdash; see the next section.
        </li>
        <li>
          <span className={strong}>File:</span> save as PDF, name it{" "}
          <code className="font-mono text-[13px] text-[color:var(--text)]">
            Course_Topic_RollNo.pdf
          </code>
          , and open it once on another device to check nothing moved.
        </li>
        <li>
          <span className={strong}>Proofread last:</span> read it out loud,
          check every number against your working file, and make sure the aims
          in Section 1 match the findings in Section 6.
        </li>
      </ul>

      {/* ================================================================ */}
      {/* AI, PLAGIARISM & RESPONSIBLE USE                                 */}
      {/* ================================================================ */}
      <h2 className={h2}>AI, copying, and using AI the right way</h2>
      <p className={p}>
        These are two different problems, and a document can fail on either one.
      </p>
      <ul className={ul}>
        <li>
          <span className={strong}>Plagiarism (copying)</span> means showing
          someone else&rsquo;s words, ideas, data, or structure as your own with
          no credit &mdash; whether it comes from a classmate, a website, a
          paper, or an AI tool. Copying a paragraph from a journal without
          quote marks and a citation is copying. Pasting an AI paragraph and
          handing it in as your writing is <em>also</em> copying, because the
          thinking is not yours and there is no credit.
        </li>
        <li>
          <span className={strong}>Misusing AI</span> is wider: handing in
          analysis you did not do, letting a tool make up data or citations, or
          using AI in a way your school has not allowed. The real test is
          authorship &mdash; <em>can you explain, defend, and redo every part of
          this document?</em>
        </li>
      </ul>

      <h3 className={h3}>Where AI really helps</h3>
      <p className={p}>
        As long as your school allows it, these uses are usually fine, because
        you stay the author and can check the output:
      </p>
      <ul className={ul}>
        <li>Turning a vague topic into a clear question.</li>
        <li>Explaining an idea or a statistic that you then confirm from a textbook.</li>
        <li>Suggesting an outline that you fill in yourself.</li>
        <li>Fixing grammar and tightening writing <em>that you wrote</em>.</li>
        <li>Helping fix your analysis code, or explaining an error message.</li>
        <li>Summing up a paper <em>you have actually read</em>, to help you study.</li>
      </ul>

      <h3 className={h3}>Where AI gets you into trouble</h3>
      <ul className={ul}>
        <li>
          <span className={strong}>Fake citations.</span> Tools invent
          real-looking references &mdash; real names, real journals, a link that
          goes nowhere. Every reference must be one you opened yourself.
        </li>
        <li>
          <span className={strong}>Made-up data or results.</span> Never let a
          tool create numbers, a dataset, or the statistics. Work them out
          yourself from the real source and keep the file.
        </li>
        <li>
          <span className={strong}>Handing off the explanation.</span> Reading
          <em> your</em> results and giving the next steps are the parts being
          marked. If a tool wrote them, there is nothing of yours to mark.
        </li>
        <li>
          <span className={strong}>A review of things you did not read.</span> A
          summary of sources you never opened will get them wrong and will cite
          things that do not say what you claim.
        </li>
        <li>
          <span className={strong}>Word-for-word text.</span> Pasting tool
          output into the document, even after small edits, with no quote marks
          and no citation.
        </li>
      </ul>

      <h3 className={h3}>A simple checklist for using AI</h3>
      <ol className={ol}>
        <li>
          <span className={strong}>Read the rules first.</span> Schools differ
          &mdash; some ban AI, some allow it if you say so, some allow it only
          for certain tasks. If it is unclear, ask the teacher in writing and
          keep the reply.
        </li>
        <li>
          <span className={strong}>Stay the author.</span> Do not hand in a
          sentence you could not have written and cannot defend if asked.
        </li>
        <li>
          <span className={strong}>Check everything.</span> Test every fact,
          number, and citation against the real source before it goes in.
        </li>
        <li>
          <span className={strong}>Do your own analysis.</span> The data, the
          statistics, and the charts are yours. Keep the raw data and the
          working file.
        </li>
        <li>
          <span className={strong}>Say so if required.</span> Add a short note
          &mdash; for example: &ldquo;I used [tool, version] on [date] to
          [outline the introduction / fix grammar]. All analysis, explanation,
          and final text are my own.&rdquo;
        </li>
        <li>
          <span className={strong}>Cite AI if you quote or closely copy it.</span>{" "}
          APA treats it like software, for example{" "}
          <code className="font-mono text-[13px] text-[color:var(--text)]">
            OpenAI. (2026). ChatGPT (Aug 2026 version) [Large language model].
            https://chat.openai.com
          </code>
          , with the prompt described in the text or an appendix.
        </li>
        <li>
          <span className={strong}>Keep a record.</span> Save your drafts and,
          if you can, your prompts. Then you can show how the document was made.
        </li>
        <li>
          <span className={strong}>Run the plagiarism / AI check</span> your
          course gives you, and read the report, not just the score.
        </li>
      </ol>
      <p className={p}>
        <span className={strong}>One quick test before you hand in any
        paragraph:</span> <em>Could I redo this, say it out loud, and point to
        the source behind every claim?</em> If not, it is not ready.
      </p>

      {/* ================================================================ */}
      {/* EXAMPLE SKELETON                                                 */}
      {/* ================================================================ */}
      <h2 className={h2}>A ready-to-use outline</h2>
      <p className={p}>
        Start from this. Each line is a heading and what goes under it. A full
        example fills every section with real data and a short explanation.
      </p>
      <div className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] divide-y divide-[color:var(--border)]">
        {skeleton.map(([head, body]) => (
          <div key={head} className="px-5 py-4">
            <p className="font-mono text-[12.5px] text-[color:var(--text)] mb-1">
              {head}
            </p>
            <p className="text-[13.5px] leading-relaxed text-[color:var(--text-faint)]">
              {body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[14px] text-[color:var(--text-faint)]">
        A good topic to practise on:{" "}
        <em>
          &ldquo;How foreign investors&rsquo; holdings in India changed, and
          what shifted between shares and bonds, from 2013 to 2025.&rdquo;
        </em>{" "}
        It has a clean public dataset (NSDL FPI Monitor), an easy
        shares-vs-bonds angle, and enough years for statistics and three or four
        charts.
      </p>

      {/* ================================================================ */}
      {/* REFERENCES FOR BEGINNERS                                         */}
      {/* ================================================================ */}
      <h2 className={h2}>Things a beginner can actually read</h2>

      <h3 className={h3}>Learn how to write research</h3>
      <ul className="space-y-3 mb-4">
        {references.learn.map((r) => (
          <li key={r.href}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-fade text-[15px] text-[color:var(--text)] hover:text-[color:var(--accent)] break-words"
            >
              {r.label}
            </a>
            <p className="text-[13.5px] leading-relaxed text-[color:var(--text-faint)] mt-0.5">
              {r.note}
            </p>
          </li>
        ))}
      </ul>

      <h3 className={h3}>Reference managers and style</h3>
      <ul className="space-y-3 mb-4">
        {references.tools.map((r) => (
          <li key={r.href}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-fade text-[15px] text-[color:var(--text)] hover:text-[color:var(--accent)] break-words"
            >
              {r.label}
            </a>
            <p className="text-[13.5px] leading-relaxed text-[color:var(--text-faint)] mt-0.5">
              {r.note}
            </p>
          </li>
        ))}
      </ul>

      <h3 className={h3}>Papers and reports to copy the style of</h3>
      <p className={p}>
        Read these for <em>shape</em> as much as content &mdash; notice how
        short the introduction is, how the data section is set out, how charts
        sit next to the text.
      </p>
      <ul className="space-y-3 mb-4">
        {references.models.map((r) => (
          <li key={r.href}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-fade text-[15px] text-[color:var(--text)] hover:text-[color:var(--accent)] break-words"
            >
              {r.label}
            </a>
            <p className="text-[13.5px] leading-relaxed text-[color:var(--text-faint)] mt-0.5">
              {r.note}
            </p>
          </li>
        ))}
      </ul>

      <h3 className={h3}>Free datasets to practise on</h3>
      <ul className={ul}>
        {references.data.map((r) => (
          <li key={r.href}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-fade text-[color:var(--text-muted)] hover:text-[color:var(--accent)] break-words"
            >
              {r.label}
            </a>
          </li>
        ))}
      </ul>

      {/* ---------------- Digest note ---------------- */}
      <div className="mt-16 rounded-lg border-l-[3px] border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-5 py-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--accent)] mb-1.5">
          About this digest
        </p>
        <p className="text-[14px] leading-relaxed text-[color:var(--text)]">
          A plain, working method for research and project documents, built
          around the six-part rubric most class assessments use. Put together
          while doing coursework and kept here as a checklist to come back to.
        </p>
      </div>
    </Container>
  );
}
