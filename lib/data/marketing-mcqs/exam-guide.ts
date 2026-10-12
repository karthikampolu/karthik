export type PartBQuestion = {
  q: string;
  unit: string;
  /** How likely I think a question on this topic is, from the sample paper and the syllabus. */
  chance: "Very likely" | "Likely" | "Possible";
  /** Skeleton of a full-marks answer: one line per heading you should write about. */
  outline: string[];
  /** A concrete example to anchor the answer. */
  example?: string;
};

export const FORMAT = [
  { k: "Paper", v: "MKTM503, Marketing Management-I. 70 marks, 3 hours." },
  { k: "Part A", v: "30 MCQs × 1 mark. 0.25 deducted for each wrong answer. The OMR sheet is collected after 90 minutes." },
  { k: "Part B", v: "5 questions × 10 marks. Attempt any 4. If you attempt all 5, only the first four attempted are marked." },
  { k: "Mapping", v: "Each question is tagged to a Course Outcome (CO1–CO6) and a Bloom level (L1–L6). The sample says this mapping is indicative and will vary." },
];

/** What the 30 sample MCQs looked like. */
export const STYLES = [
  {
    name: "Direct definition",
    share: "roughly 45%",
    tip: "“What is the term for…”, “Buying motives are…”. Learn the exact textbook term for every definition.",
  },
  {
    name: "“Which is NOT…”",
    share: "roughly 10%",
    tip: "NOT a PLC stage, NOT a consumer product, NOT a consumer role. Know every full list (stages, types, roles) so the odd one jumps out.",
  },
  {
    name: "Scenario or mini-case",
    share: "roughly 25%",
    tip: "Sarah's laptop, Joy's car trouble, FreshFizz, the e-commerce warehouses. Match the situation to the concept (complex buying, information search, logistics).",
  },
  {
    name: "“All of the above”",
    share: "roughly 10%",
    tip: "If two options are clearly right, “all of the above” is usually the answer. Check before you commit.",
  },
  {
    name: "Application and judgement",
    share: "roughly 10%",
    tip: "“Which method is most suitable…”, “most appropriate next step…”. Eliminate the options that are true but don't fit the situation.",
  },
];

export const PART_B: PartBQuestion[] = [
  {
    q: "Explain the new product development process in detail with an example.",
    unit: "Unit V",
    chance: "Very likely",
    outline: [
      "Intro: NPD is the path from idea to launch; most new products fail, so the stages act as filters.",
      "1 Idea generation: customers, R&D, employees, competitors, crowdsourcing.",
      "2 Idea screening: drop poor ideas early (avoid drop-errors and go-errors).",
      "3 Concept development and testing: product idea → product concept → brand image; test with target consumers.",
      "4 Marketing strategy development: target market, positioning, sales/share/profit goals, then price, distribution and budget.",
      "5 Business analysis: sales, cost and profit projections, break-even.",
      "6 Product development: prototype, functional tests and consumer tests.",
      "7 Market testing: test marketing in selected markets before the full launch.",
      "8 Commercialization: when, where, to whom and how to launch.",
      "Close: walk ONE product through all eight stages in a line each.",
    ],
    example: "A protein snack bar or an electric scooter taken through all 8 stages.",
  },
  {
    q: "As CMO of a smartphone company entering a new international market, explain how you would analyse the macro and micro environment, use research, forecast demand and ensure marketing productivity.",
    unit: "Unit II",
    chance: "Very likely",
    outline: [
      "Macro environment (PESTLE): demographic, economic, sociocultural, natural, technological, political-legal.",
      "Micro environment: company, suppliers, distributors, customers, competitors, publics.",
      "Marketing research process: define problem → research plan → collect data (secondary first, then survey, focus groups) → analyse → present → decide.",
      "Demand measurement: total market potential, area market potential, chain-ratio method, market share.",
      "Forecasting: survey of buyers' intentions, sales-force opinion, expert opinion/Delphi, past-sales analysis, market tests, scenario planning for volatile markets.",
      "Marketing productivity: sales analysis, market-share analysis, marketing expense-to-sales ratio, marketing ROI, dashboards.",
    ],
    example: "Entering a market like Indonesia or Brazil, with local competitors and local regulation.",
  },
  {
    q: "Why is the product life cycle an indicator of marketing success? Select five Indian brands that entered decline and were repositioned to extend their life cycle.",
    unit: "Unit V",
    chance: "Very likely",
    outline: [
      "PLC in one line: sales and profit of a product move through introduction, growth, maturity and decline.",
      "Why it signals success: shows where the product stands, what the marketing mix should be, and when to invest, modify or harvest.",
      "Strategy by stage: awareness and trial (introduction), build share (growth), defend share and modify (maturity), harvest or divest (decline).",
      "Ways to extend the cycle: modify the market (new users, new uses, higher usage), modify the product (quality, features, style), modify the marketing mix, reposition.",
      "Five brands, each: decline cause → repositioning move → result.",
      "Close: PLC is a guide, not a law; products can be renewed.",
    ],
    example:
      "Commonly cited Indian cases: Royal Enfield (revived as a premium leisure-riding brand), Maggi (relaunch after the 2015 ban, rebuilt on trust), Bajaj Chetak (returned as an electric scooter), Lifebuoy (from carbolic soap to hygiene and handwashing), Glow & Lovely (renamed from Fair & Lovely). Check each against your own sources and swap in brands you know well.",
  },
  {
    q: "Evaluate the impact of digital marketing on targeting and positioning. How have AI and data analytics changed traditional approaches?",
    unit: "Unit IV + VI",
    chance: "Very likely",
    outline: [
      "Traditional: broad demographic segments, mass media, one-way messages, slow feedback.",
      "Digital targeting: behavioural and real-time data, micro-segments, lookalike audiences, programmatic ads, personalization at scale.",
      "Digital positioning: two-way and dynamic; reviews and social proof shape position; A/B testing refines the value proposition.",
      "AI and analytics: predictive models (churn, next-best-offer), recommendation engines, generative AI for content, chatbots and agentic AI, social listening.",
      "Martech stack: how data, tools and automation connect.",
      "Evaluation: more precision and speed, but privacy, bias, over-targeting and sameness of messaging are risks.",
      "Close: technology sharpens targeting; positioning still needs a clear value proposition.",
    ],
  },
  {
    q: "Imagine yourself as a sales head. What criteria affect your decisions about the different sales channels?",
    unit: "Unit V",
    chance: "Very likely",
    outline: [
      "Channel in one line, and the choices: direct vs indirect, number of levels, intensity (intensive, selective, exclusive).",
      "Customer factors: number, location, buying habits, order size.",
      "Product factors: perishability, bulk, unit value, technical complexity.",
      "Company factors: finances, size, desired control, services the firm can offer.",
      "Intermediary factors: availability, willingness, cost, service quality.",
      "Competition and environment: rivals' channels, economy, law, technology.",
      "Trade-off: cost vs control vs flexibility.",
    ],
    example: "FMCG goes intensive, a luxury watch goes exclusive, industrial machines go direct.",
  },
  {
    q: "Explain the consumer buying decision process and how marketers can influence each stage.",
    unit: "Unit III",
    chance: "Likely",
    outline: [
      "Influences: cultural, social, personal, psychological.",
      "Five stages: problem recognition → information search → evaluation of alternatives → purchase decision → postpurchase behaviour.",
      "Types of buying behaviour: complex, dissonance-reducing, habitual, variety-seeking.",
      "What marketers do at each stage (ads, reviews, comparison tools, easy checkout, follow-up).",
      "Postpurchase: satisfaction, cognitive dissonance, word of mouth.",
    ],
    example: "Buying a laptop or a smartphone.",
  },
  {
    q: "Describe segmentation, targeting and positioning with a suitable example. Write a positioning statement.",
    unit: "Unit IV",
    chance: "Likely",
    outline: [
      "Segmentation bases: geographic, demographic, psychographic, behavioural; business markets too.",
      "Effective segment tests: measurable, substantial, accessible, differentiable, actionable.",
      "Targeting patterns: single-segment, selective, product, market specialization, full coverage; mass, segment, niche, individual.",
      "Positioning: value proposition, frame of reference, points of parity and points of difference.",
      "Positioning statement: For [target], [brand] is the [frame of reference] that [point of difference] because [reason to believe].",
    ],
  },
  {
    q: "Discuss channel conflict and multichannel marketing systems, and how conflict can be managed.",
    unit: "Unit V",
    chance: "Possible",
    outline: [
      "Channel conflict: vertical, horizontal, multichannel.",
      "Causes: goal differences, unclear roles, perception differences, dependence.",
      "Vertical marketing systems: corporate, administered, contractual (franchise).",
      "Managing conflict: superordinate goals, exchange of people, co-optation, diplomacy, mediation, arbitration, legal recourse.",
      "Multichannel: benefits (reach, sales) and risks (conflict, cost).",
    ],
  },
  {
    q: "Trace the evolution of marketing concepts and explain how companies create and deliver customer value.",
    unit: "Unit I",
    chance: "Likely",
    outline: [
      "Production, product, selling, marketing, and holistic/societal concepts, with the focus and the tools of each.",
      "Customer perceived value = total customer benefit − total customer cost.",
      "Satisfaction, loyalty and customer lifetime value.",
      "Value chain (primary and support activities) and the value delivery network.",
      "Marketing mix as the tool: 4Ps and 4Cs.",
    ],
  },
  {
    q: "Explain the steps in setting a price and the main price adaptation strategies.",
    unit: "Unit V",
    chance: "Likely",
    outline: [
      "Six steps: objective → demand → costs → competitors → pricing method → final price.",
      "Methods: markup, target-return, perceived-value, value pricing, going-rate, auction-type.",
      "Adaptation: geographic, discounts and allowances, promotional, differentiated pricing.",
      "Product-mix pricing: product-line, optional-feature, captive-product, two-part, by-product, bundling.",
      "Skimming vs penetration, with when to use each.",
    ],
  },
  {
    q: "Discuss any two contemporary issues in marketing: sustainability, social marketing, neuromarketing, demarketing or generative AI.",
    unit: "Unit VI",
    chance: "Possible",
    outline: [
      "Define each issue in a line.",
      "How it works, with one real example per issue.",
      "Benefits to the firm and to society.",
      "Risks and criticism: greenwashing, ethics, privacy, bias.",
      "Implication for strategy and consumer behaviour (the syllabus outcome CO6).",
    ],
  },
  {
    q: "Explain corporate and division strategic planning, including the BCG matrix, Ansoff matrix and global entry modes.",
    unit: "Unit I",
    chance: "Possible",
    outline: [
      "Levels of planning: corporate, division/business, product.",
      "BCG matrix: stars, cash cows, question marks, dogs, and the action for each.",
      "Ansoff: market penetration, market development, product development, diversification.",
      "Going global: whether, where, how (exporting, licensing, joint venture, direct investment).",
      "Standardize vs adapt the marketing mix.",
    ],
  },
];

export const ANSWER_TEMPLATE = [
  "Intro (2 lines): define the topic.",
  "Framework: the model or list (stages, types, steps) as a numbered list or a small table.",
  "Each point: heading + one explaining line + a quick example.",
  "Diagram or table where it fits (PLC curve, NPD funnel, channel levels).",
  "Conclusion (2 lines): the takeaway or a recommendation.",
];

export const TIME_PLAN = [
  { part: "Part A (30 MCQs)", mins: "40–45 min", note: "Do easy ones first, mark doubtful ones, return at the end. The OMR is collected at 90 min, so never leave it late." },
  { part: "Part B (4 × 10 marks)", mins: "4 × 28 min", note: "Spend the first 2 minutes on the outline, then write." },
  { part: "Buffer", mins: "15 min", note: "Check Part A shading and add one example to any thin answer." },
];

export const DAYS = [
  { d: "Day 1", t: "Unit V, the heaviest unit", s: "Practice Unit V by level: easy → medium → hard. Then outline the NPD, PLC, channel-criteria and pricing answers." },
  { d: "Day 2", t: "Unit III and Unit I", s: "Practice both. Learn the lists: 5 stages, 4 buying types, 8 organizational stages, 5 concepts. Outline the buying-process and value answers." },
  { d: "Day 3", t: "Unit II and Unit IV", s: "Practice both. Outline the market-intelligence and STP answers. Take Mock 1." },
  { d: "Day 4", t: "Unit VI, then everything you got wrong", s: "Practice Unit VI, then “my wrong ones”. Outline the digital/AI answer. Take Mock 2." },
  { d: "Day 5", t: "Mocks and the sample paper", s: "Do the Sample paper set, then one fresh mock under timing. Read your outlines once more. Sleep." },
];

export const MARKING_MATH = [
  "A blind guess on a 4-option question is worth about +0.06 in expectation. Not much, but not negative.",
  "Eliminate one option and a guess is worth about +0.17. Eliminate two and it's about +0.38. So always eliminate first, then answer.",
  "Skip only when you truly have no idea; a skipped question costs nothing and earns nothing.",
];
