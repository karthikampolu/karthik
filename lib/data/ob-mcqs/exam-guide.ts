import type { GuideContent, PartBQuestion } from "@/lib/exam-prep/types";
import { MODELS_1 } from "./model-answers-1";
import { MODELS_2 } from "./model-answers-2";
import { PAPERS } from "./papers";

const FORMAT = [
  { k: "Paper", v: "MGNM581, Organizational Behaviour and Human Resource Dynamics-I. 70 marks, 3 hours." },
  { k: "Part A", v: "30 MCQs × 1 mark. 0.25 deducted for each wrong answer. The OMR sheet is collected after 90 minutes." },
  { k: "Part B", v: "5 questions × 10 marks. Attempt any 4. If you attempt all 5, only the first four attempted are marked." },
  { k: "Mapping", v: "Each question is tagged to a Course Outcome (CO1–CO6) and a Bloom level (L1–L6). The sample says this mapping is indicative and will vary." },
];

/** What the 30 sample MCQs looked like. */
const STYLES = [
  {
    name: "Direct definition",
    share: "roughly 40%",
    tip: "“Which best defines values…”, “What does diversity refer to…”. Learn the exact Robbins definitions.",
  },
  {
    name: "Who gave this theory?",
    share: "roughly 15%",
    tip: "Herzberg → two-factor, Alderfer → ERG, Taylor → scientific management, Mayo → Hawthorne. Make a one-page theory-to-name table and revise it daily.",
  },
  {
    name: "Scenario or mini-case",
    share: "roughly 25%",
    tip: "Rachel feeding the cats, the Fayol manager, Flipkart's benefits, the withdrawn team member. Match the situation to the concept (intrinsic motivation, unity of command, OB, empathy).",
  },
  {
    name: "“Which is NOT…”",
    share: "roughly 10%",
    tip: "NOT a contributing discipline, NOT a virtual-workforce challenge. Know the full lists so the odd one stands out.",
  },
  {
    name: "Best action or judgement",
    share: "roughly 10%",
    tip: "“How would you ensure a sustainable approach…”, “Which action best reflects Fayol…”. Eliminate the options that are unethical, illegal or obviously short-term.",
  },
];

const PART_B: PartBQuestion[] = [
  {
    id: "ob-art-science",
    q: "“The study of organizational behaviour is really an art that pretends to be a science.” Argue against this statement and discuss the significance of OB.",
    unit: "Unit II",
    chance: "Very likely",
    outline: [
      "Define OB (Robbins): the impact of individuals, groups and structure on behaviour, applied to improve effectiveness.",
      "Systematic study vs intuition: OB uses research to find consistent patterns in behaviour.",
      "Evidence-based management: decisions grounded in the best available evidence.",
      "Contributing disciplines (psychology, social psychology, sociology, anthropology) bring scientific methods.",
      "Contingency answers ('it depends') reflect complex causes, not a lack of science.",
      "Balanced view: the science gives the findings; applying them well is the art.",
      "Significance: better motivation, leadership, teamwork, diversity and change management; lower turnover and absenteeism; higher productivity and citizenship behaviour.",
    ],
    example: "A research finding that contradicts common sense, such as 'a happy worker is not always a productive worker'.",
  },
  {
    id: "learning-ob-mod",
    q: "Compare and contrast the major theories of learning in OB. How can behaviour modification techniques be used to improve employee performance?",
    unit: "Unit III",
    chance: "Very likely",
    outline: [
      "Define learning: a relatively permanent change in behaviour as a result of experience.",
      "Classical conditioning (Pavlov): passive, reflexive, stimulus–response.",
      "Operant conditioning (Skinner): voluntary behaviour shaped by its consequences.",
      "Social learning (Bandura): observation plus experience; attentional, retention, motor reproduction, reinforcement.",
      "A comparison table: what drives learning, passive or active, a workplace example of each.",
      "Shaping: positive and negative reinforcement, punishment, extinction; the four reinforcement schedules.",
      "OB Mod, 5 steps: identify behaviours → baseline → A-B-C analysis → intervention → evaluate.",
      "Applications: attendance, safety and sales programmes; cautions about ethics and over-focusing on measurable behaviour.",
    ],
  },
  {
    id: "mbo-goal-setting",
    q: "Explain what an MBO programme is and discuss the common elements of MBO programmes and goal-setting theory.",
    unit: "Unit IV",
    chance: "Very likely",
    outline: [
      "MBO (Drucker, 1954): participatively set, tangible, verifiable, measurable goals.",
      "Four elements: goal specificity, participation in decision making, an explicit time period, performance feedback.",
      "Process: organizational → departmental → individual objectives (cascading), action plans, periodic reviews, appraisal and reward.",
      "Goal-setting theory (Locke): specific, difficult goals with feedback raise performance.",
      "Moderators: goal commitment, self-efficacy, task characteristics, national culture.",
      "The link: MBO puts goal-setting theory into practice; use SMART goals.",
      "Benefits and limitations: clarity and motivation vs paperwork, short-termism, unrealistic expectations.",
    ],
  },
  {
    id: "vanessa-tom-case",
    q: "Case: Vanessa (engineering) and Tom (procurement) clash over buying expensive leading-edge parts. As Vice-President, how would you handle this?",
    unit: "Unit VI",
    chance: "Very likely",
    outline: [
      "Diagnose: structural conflict from incompatible goals (on-time, high-quality launch vs cost control). Task conflict is turning into relationship conflict.",
      "Locate it in the conflict process: cognition and personalization have begun ('you always fight me').",
      "Choose a style: collaborating (integrative), because both concerns are legitimate and the relationship matters.",
      "Steps: meet them jointly, hear both sides, find the shared goal of a successful launch within budget.",
      "Agree joint criteria: a pre-approved parts list, cost thresholds, a fast escalation rule, a budget buffer for critical parts.",
      "Involve procurement early in design, align both KPIs, review after one cycle.",
      "Fallbacks: compromise if time is short, competing only if a deadline is critical.",
    ],
  },
  {
    id: "conflict-styles",
    q: "Discuss the different conflict styles in organizational behaviour. How does understanding them help managers resolve workplace conflict? Give a real-life example.",
    unit: "Unit VI",
    chance: "Very likely",
    outline: [
      "Define conflict, its three views (traditional, human relations, interactionist), functional vs dysfunctional conflict.",
      "Types: task, relationship, process.",
      "Thomas-Kilmann grid (assertiveness × cooperativeness): competing, collaborating, compromising, avoiding, accommodating.",
      "When each style fits, and its risks.",
      "How understanding styles helps: diagnosing, choosing the right style, coaching teams, avoiding escalation.",
      "Real-life example: use a well-documented case you know (from the news or your own experience) and name the style used.",
    ],
  },
  {
    id: "motivation-theories",
    q: "Compare early and contemporary theories of motivation. How can managers apply them?",
    unit: "Unit IV",
    chance: "Likely",
    outline: [
      "Early: Maslow, McGregor's X/Y, Herzberg's two-factor, McClelland's three needs.",
      "Contemporary: ERG, goal-setting, equity, expectancy, job characteristics, self-determination.",
      "The motivation process: unsatisfied need → tension → drives → search → satisfied need.",
      "A comparison table (focus, key idea, criticism).",
      "Applications: job enrichment, fair pay, meaningful goals, valued rewards, recognition.",
    ],
  },
  {
    id: "leadership-theories",
    q: "Explain trait, behavioural and contingency theories of leadership.",
    unit: "Unit IV",
    chance: "Likely",
    outline: [
      "Leadership vs management.",
      "Trait theories: the Big Five, EI; they predict emergence more than effectiveness.",
      "Behavioural: Iowa styles, Ohio State (structure, consideration), Michigan, the Managerial Grid.",
      "Contingency: Fiedler, Hersey-Blanchard, path-goal, leader-participation.",
      "Contemporary: transactional vs transformational, LMX, servant and authentic leadership.",
    ],
  },
  {
    id: "personality-ta-johari",
    q: "Explain personality assessment, transactional analysis and the Johari Window as tools for understanding individual behaviour.",
    unit: "Unit III",
    chance: "Likely",
    outline: [
      "Personality: MBTI (16 types), the Big Five (OCEAN), locus of control, Type A/B.",
      "Transactional analysis: Parent-Adult-Child ego states; complementary, crossed and ulterior transactions; life positions; strokes.",
      "Johari Window: open, blind, hidden and unknown areas; widen the open area through disclosure and feedback.",
      "Attribution theory and perceptual shortcuts (halo, stereotyping).",
      "Uses at work: selection, team building, communication, feedback.",
    ],
  },
  {
    id: "management-thought-ai",
    q: "Trace the evolution of management thought from classical to modern approaches, and discuss the role of AI in managerial decision making.",
    unit: "Unit I",
    chance: "Likely",
    outline: [
      "Classical: Taylor, the Gilbreths, Fayol's 14 principles, Weber's bureaucracy.",
      "Neo-classical: the Hawthorne studies, human relations, Barnard, Follett, McGregor.",
      "Modern: quantitative/TQM, systems, contingency.",
      "Decision making: programmed vs nonprogrammed, bounded rationality, biases.",
      "AI in decisions: predictive analytics, augmented intelligence; risks of bias and opacity; human-in-the-loop.",
    ],
  },
  {
    id: "structure-digital",
    q: "Discuss the types of organizational structure and how technology and digital transformation are changing organizational design.",
    unit: "Unit V",
    chance: "Likely",
    outline: [
      "The six elements of design: specialization, departmentalization, chain of command, span, centralization, formalization.",
      "Mechanistic vs organic, plus the contingency factors (strategy, size, technology, environment).",
      "Traditional structures (simple, functional, divisional) and modern ones (team, matrix, project, boundaryless, learning).",
      "Technology: Woodward's research, flatter networked firms, remote work.",
      "Digital transformation: drivers, resistance, Lewin and Kotter, sustainable organizations.",
    ],
  },
  {
    id: "culture-gender",
    q: "How is organizational culture created and sustained? Discuss its role in gender equality and inclusion.",
    unit: "Unit VI",
    chance: "Possible",
    outline: [
      "Define culture; Schein's three levels; Robbins' seven dimensions.",
      "Creation: founders. Sustaining: selection, top management, socialization.",
      "How employees learn culture: stories, rituals, symbols, language.",
      "Gender equality: equal pay, POSH Act 2013, maternity benefits, removing the glass ceiling.",
      "Inclusive culture practices and the business benefits.",
    ],
  },
  {
    id: "engagement-vuca-shrm",
    q: "Discuss employee engagement in the virtual workspace and workforce agility in a VUCA world, with sustainable HRM practices.",
    unit: "Unit VI",
    chance: "Possible",
    outline: [
      "VUCA explained; why agility matters.",
      "Workforce agility: reskilling, cross-functional teams, empowered decisions.",
      "Engagement (Kahn): drivers, benefits.",
      "Virtual work challenges (trust, isolation, proximity bias, fatigue) and practices to address them.",
      "Sustainable and green HRM practices.",
    ],
  },
  {
    id: "manager-skills-roles",
    q: "Explain the skills and roles of a manager. How do they vary across levels of management?",
    unit: "Unit I",
    chance: "Likely",
    outline: [
      "Functions: planning, organizing, leading, controlling.",
      "Levels: first-line, middle, top.",
      "Mintzberg's 10 roles in three groups, with examples.",
      "Katz's technical, human and conceptual skills, and how their importance shifts by level.",
      "Characteristics of management.",
    ],
  },
  {
    id: "ob-model-disciplines",
    q: "Explain the model of organizational behaviour and the disciplines that contribute to OB. Discuss the models of OB.",
    unit: "Unit II",
    chance: "Likely",
    outline: [
      "Robbins' inputs → processes → outcomes at three levels.",
      "Contributing disciplines with what each adds.",
      "Davis's autocratic, custodial, supportive, collegial (and system) models in a table.",
      "Relationship between management and OB.",
    ],
  },
  {
    id: "values-attitudes-satisfaction",
    q: "Discuss values, attitudes and job satisfaction. How do employees respond to job dissatisfaction?",
    unit: "Unit III",
    chance: "Likely",
    outline: [
      "Values: Rokeach terminal and instrumental; Hofstede dimensions.",
      "Attitude components and cognitive dissonance.",
      "Major job attitudes, including the three types of commitment.",
      "Job satisfaction: causes and outcomes.",
      "The EVLN framework, with managerial implications.",
    ],
  },
  {
    id: "perception-attribution",
    q: "Explain perception and attribution theory. What common errors affect judgments of people at work?",
    unit: "Unit III",
    chance: "Possible",
    outline: [
      "Perception and the factors that influence it.",
      "Kelley's three cues and the internal/external rules.",
      "Fundamental attribution error and self-serving bias.",
      "Shortcuts: halo, contrast, stereotyping, selective perception, projection.",
      "Applications and remedies.",
    ],
  },
  {
    id: "power-negotiation",
    q: "Discuss the bases of power and the process of negotiation in organizations.",
    unit: "Unit VI",
    chance: "Likely",
    outline: [
      "French and Raven's five bases; formal vs personal power.",
      "Dependency: importance, scarcity, non-substitutability.",
      "Distributive vs integrative bargaining; BATNA.",
      "The five-step negotiation process and third-party roles.",
      "An example.",
    ],
  },
  {
    id: "motivation-case",
    q: "Case: After a pay freeze, a team of experienced engineers shows low motivation and two members have resigned. As their manager, how would you use motivation theories to respond?",
    unit: "Unit IV",
    chance: "Likely",
    outline: [
      "Diagnose with Herzberg, equity, expectancy and needs theories.",
      "Restore fairness and transparency.",
      "Strengthen motivators through job enrichment and recognition.",
      "Use goal-setting and link rewards to what people value.",
      "Retention steps and follow-up.",
    ],
    example: "Adapt the same structure to any motivation case: diagnose with two or three theories, then act on each.",
  },
];

const ANSWER_TEMPLATE = [
  "Intro (2 lines): define the topic, ideally with the Robbins definition.",
  "Framework: the model or list (stages, theories, styles) as a numbered list or a small table.",
  "Each point: heading + one explaining line + a quick workplace example.",
  "Diagram where it fits (Maslow pyramid, Johari Window, Managerial Grid, conflict-style grid).",
  "Conclusion (2 lines): the takeaway or a recommendation. For case questions, end with what you would do.",
];

const TIME_PLAN = [
  { part: "Part A (30 MCQs)", mins: "40–45 min", note: "Do easy ones first, mark doubtful ones, return at the end. The OMR is collected at 90 min, so never leave it late." },
  { part: "Part B (4 × 10 marks)", mins: "4 × 28 min", note: "Spend the first 2 minutes on the outline, then write. For the case question, diagnose before you prescribe." },
  { part: "Buffer", mins: "15 min", note: "Check Part A shading and add one example to any thin answer." },
];

const DAYS = [
  { d: "Day 1", t: "Unit IV, motivation and leadership (the heaviest unit)", s: "Practice Unit IV by level. Make the theory-to-name table. Outline the MBO/goal-setting and motivation answers." },
  { d: "Day 2", t: "Unit III, individual differences", s: "Practice Unit III. Learn the learning theories and reinforcement schedules, TA, the Johari Window and attribution rules. Outline the learning/OB Mod answer." },
  { d: "Day 3", t: "Units I and II", s: "Practice both. Learn the management thinkers and Mintzberg's roles, the OB models and contributing disciplines. Outline the 'OB is an art' answer. Take Mock 1." },
  { d: "Day 4", t: "Units V and VI, then everything you got wrong", s: "Practice both, then “my wrong ones”. Outline the conflict-styles and Vanessa-Tom case answers. Take Mock 2." },
  { d: "Day 5", t: "Mocks and the sample paper", s: "Do the Sample paper set, then one fresh mock under timing. Read your outlines and the theory-to-name table once more. Sleep." },
];

const MARKING_MATH = [
  "A blind guess on a 4-option question is worth about +0.06 in expectation. Not much, but not negative.",
  "Eliminate one option and a guess is worth about +0.17. Eliminate two and it's about +0.38. So always eliminate first, then answer.",
  "Skip only when you truly have no idea; a skipped question costs nothing and earns nothing.",
];

export const GUIDE: GuideContent = {
  FORMAT,
  STYLES,
  PART_B: PART_B.map((p) => ({ ...p, model: MODELS_1[p.id] ?? MODELS_2[p.id] })),
  ANSWER_TEMPLATE,
  TIME_PLAN,
  DAYS,
  MARKING_MATH,
  PAPERS,
  SOURCE_NOTE:
    "These predictions come from the one sample paper and the syllabus. They are an informed guess, not inside information. The answers here follow Robbins & Coulter (Management) and standard OB texts; where your faculty's notes differ, go with your notes.",
};
