import type { ModelAnswer } from "@/lib/exam-prep/types";

/** Model answers for the OB predicted Part B questions (part 1). */
export const MODELS_1: Record<string, ModelAnswer> = {
  "ob-art-science": {
    intro:
      "Organizational behaviour (OB) is a field of study that investigates the impact individuals, groups and structure have on behaviour within organizations, for the purpose of applying such knowledge toward improving an organization's effectiveness (Robbins). The claim that OB is 'an art pretending to be a science' does not hold, for the reasons below.",
    sections: [
      { h: "1. OB relies on systematic study, not opinion", points: ["It examines relationships, looks for cause and effect, and draws conclusions from scientific evidence gathered under controlled conditions.", "Behaviour is not random: there are fundamental consistencies that make it reasonably predictable."] },
      { h: "2. Intuition is often wrong", points: ["Many research findings contradict common sense — for example, a happy worker is not always more productive. Systematic study corrects such beliefs."] },
      { h: "3. It is built on scientific disciplines", points: ["Psychology, social psychology, sociology and anthropology contribute tested theories and research methods (experiments, surveys, field studies)."] },
      { h: "4. Evidence-based management", points: ["Managers increasingly base decisions on the best available evidence, which is exactly what OB research provides."] },
      { h: "5. 'It depends' is not a weakness", points: ["OB gives contingency answers because behaviour has many situational causes. Physics and medicine also give conditional answers; that is still science."] },
      { h: "A balanced view", points: ["OB is a science of probabilities: the findings come from research; applying them to a particular person or team requires judgment — that is where the 'art' lies."] },
      { h: "Significance of OB", points: ["Helps managers understand, predict and influence behaviour.", "Improves motivation, leadership, communication and teamwork.", "Helps manage diversity, change and conflict.", "Reduces absenteeism and turnover; raises productivity, job satisfaction and citizenship behaviour.", "Supports ethical, positive work environments."] },
    ],
    table: {
      caption: "Intuition vs systematic study",
      columns: ["Intuition", "Systematic study"],
      rows: [
        ["Gut feeling, personal experience", "Data gathered under controlled conditions"],
        ["Prone to bias", "Tests and corrects beliefs"],
        ["Hard to generalise", "Finds consistent patterns"],
      ],
    },
    conclusion:
      "OB is a behavioural science whose findings are produced systematically and applied with judgment. Its value lies in making organizations more effective and workplaces better for people.",
  },

  "learning-ob-mod": {
    intro:
      "Learning is any relatively permanent change in behaviour that occurs as a result of experience. Three major theories explain how it happens, and behaviour modification (OB Mod) applies them to improve performance.",
    sections: [
      { h: "1. Classical conditioning (Pavlov)", points: ["A neutral stimulus paired with an unconditioned stimulus produces a conditioned response (bell + meat → salivation).", "Passive and reflexive; explains simple responses such as anxiety at the sight of an auditor."] },
      { h: "2. Operant conditioning (Skinner)", points: ["Behaviour is a function of its consequences: reinforced behaviour is repeated, unreinforced behaviour fades.", "Voluntary and learned; explains most workplace behaviour."] },
      { h: "3. Social learning (Bandura)", points: ["People learn by observing others (models) as well as by direct experience.", "Four processes: attentional, retention, motor reproduction, reinforcement."] },
      { h: "Shaping behaviour", points: ["Positive reinforcement (praise), negative reinforcement (removing something unpleasant), punishment, extinction.", "Schedules: continuous or intermittent — fixed-interval (salary), variable-interval (surprise checks), fixed-ratio (piece rate), variable-ratio (commission)."] },
      { h: "Behaviour modification (OB Mod) — five steps", points: ["1. Identify critical, performance-related behaviours.", "2. Develop baseline data.", "3. Identify behavioural consequences through functional (A-B-C) analysis.", "4. Develop and apply an intervention (reinforce desired behaviour).", "5. Evaluate performance improvement."] },
      { h: "Using it to improve performance", points: ["Attendance bonuses, safety programmes with recognition, sales commissions, recognition for meeting quality targets.", "Cautions: focus on observable behaviour, treat people fairly, and avoid manipulative or punitive use."] },
    ],
    table: {
      caption: "Learning theories compared",
      columns: ["Theory", "How learning happens", "Workplace example"],
      rows: [
        ["Classical", "Association of stimuli", "Nervousness when the boss calls a meeting"],
        ["Operant", "Consequences of behaviour", "Bonus for meeting targets"],
        ["Social", "Observing models", "New joiner copies a top performer"],
      ],
    },
    diagram: "OB Mod as a five-step loop: identify → baseline → A-B-C analysis → intervene → evaluate.",
    conclusion:
      "Operant and social learning best explain workplace behaviour. Used thoughtfully, OB Mod turns these principles into measurable performance gains.",
  },

  "mbo-goal-setting": {
    intro:
      "Management by Objectives (MBO), popularised by Peter Drucker in 1954, is a programme that emphasises participatively set goals that are tangible, verifiable and measurable. It is the practical application of goal-setting theory.",
    sections: [
      { h: "How MBO works", points: ["Organizational objectives are translated into objectives for each unit and individual (cascading).", "Managers and employees agree goals together, plan actions, review progress regularly, and evaluate and reward results."] },
      { h: "Four common elements of MBO", points: ["Goal specificity: clear, concise statements of expected accomplishments.", "Participation in decision making: goals are set jointly, not imposed.", "An explicit time period for each goal.", "Performance feedback, so people can monitor and correct their progress."] },
      { h: "Goal-setting theory (Edwin Locke)", points: ["Specific goals increase performance; difficult goals, once accepted, lead to higher performance than easy ones; feedback improves performance further.", "Moderators: goal commitment, self-efficacy, task characteristics (simpler, familiar tasks) and national culture."] },
      { h: "Link between MBO and goal-setting", points: ["MBO operationalises the theory: specific goals, participation, deadlines and feedback. SMART goals (specific, measurable, achievable, relevant, time-bound) are the practical form."] },
      { h: "Benefits and limitations", points: ["Benefits: clarity, alignment, motivation, objective appraisal.", "Limitations: paperwork, short-term focus, unrealistic expectations, weak top-management commitment, rigidity in fast-changing settings."] },
      { h: "Example", points: ["A sales team's company goal of 15% growth cascades to each region and then to each salesperson, with quarterly reviews and a bonus tied to agreed targets."] },
    ],
    diagram: "Cascading objectives: company goal at the top, branching to division, department and individual goals.",
    conclusion:
      "Specific, challenging, participatively set goals with feedback raise performance. MBO is how organizations put that principle into everyday practice.",
  },

  "vanessa-tom-case": {
    intro:
      "Vanessa (lead engineer) and Tom (procurement) are in a recurring conflict: conflict is a process that begins when one party perceives that another has negatively affected something the first party cares about. As Vice-President, I would diagnose the cause, choose an appropriate conflict-handling style, and change the system so it doesn't recur.",
    sections: [
      { h: "1. Diagnosis", points: ["Structural cause: incompatible goals built into their roles — Vanessa is rewarded for innovative, on-time products; Tom for keeping costs down.", "It began as task conflict (which parts to buy) and is turning into relationship conflict ('you always fight me').", "In Robbins' conflict process it has reached cognition and personalization, and behaviour is escalating."] },
      { h: "2. Choose the style: collaborating", points: ["Both concerns are legitimate and the relationship matters long term, so a collaborating (integrative, win-win) approach fits best.", "Compromise is a fallback if time is short; competing (deciding myself) only if the project deadline is about to be missed."] },
      { h: "3. Steps I would take", points: ["Meet them together; let each explain their constraints without blame.", "Agree a superordinate goal: launching the product on time within an agreed budget.", "Set joint criteria: a pre-approved parts list, cost thresholds for leading-edge parts, and a 48-hour escalation route to me for exceptions.", "Create a small budget buffer for critical new components."] },
      { h: "4. Fix the system", points: ["Involve procurement early in the design phase.", "Align KPIs so both share responsibility for cost and launch timing.", "Hold short weekly coordination meetings; review after one product cycle."] },
      { h: "5. Communication and follow-up", points: ["Acknowledge both points of view publicly; recognise cooperation when it happens; check that the relationship conflict is cooling."] },
    ],
    table: {
      caption: "Options considered",
      columns: ["Style", "Outcome here"],
      rows: [
        ["Avoiding", "Delays continue; resentment grows"],
        ["Competing (side with one)", "Short-term fix; the other side disengages"],
        ["Compromising", "Acceptable, but may cut quality or budget"],
        ["Collaborating", "Shared criteria; durable solution"],
      ],
    },
    conclusion:
      "This is a functional disagreement over goals that has become personal. Collaboration plus structural changes (shared goals, early involvement, clear criteria) resolves the current clash and prevents the next one.",
  },

  "conflict-styles": {
    intro:
      "Conflict is a process that begins when one party perceives that another has negatively affected, or is about to affect, something it cares about. Understanding conflict-handling styles lets managers choose a deliberate response instead of reacting.",
    sections: [
      { h: "Views and types of conflict", points: ["Views: traditional (all conflict is bad), human relations (natural and inevitable), interactionist (some conflict is necessary).", "Types: task, relationship and process conflict. Functional conflict improves performance; dysfunctional conflict harms it."] },
      { h: "The five styles (Thomas-Kilmann)", points: ["Competing — assertive, uncooperative: win at the other's expense; useful in emergencies or for unpopular but necessary decisions.", "Collaborating — assertive, cooperative: find a solution that fully satisfies both; best when both concerns are too important to compromise.", "Compromising — middle ground: each side gives up something; useful under time pressure.", "Avoiding — unassertive, uncooperative: withdraw; useful for trivial issues or when emotions need to cool.", "Accommodating — unassertive, cooperative: put the other's interests first; useful to preserve a relationship or when you're wrong."] },
      { h: "How understanding the styles helps managers", points: ["Diagnose what kind of conflict it is and how important the issue and relationship are.", "Pick a style that fits instead of using one habitual style.", "Coach team members on their own default styles; keep task conflict healthy and stop it turning personal."] },
      { h: "Real-life example", points: ["Use a case you know well — from news coverage, an internship or a college fest team. Structure it as: the conflict, the style the manager used, why it fit, and the outcome. Example structure: two departments clashed over shared resources; the manager brought them together, identified the shared goal and agreed allocation rules (collaborating), and the dispute stopped recurring."] },
    ],
    diagram: "A 2×2 grid: assertiveness on the vertical axis, cooperativeness on the horizontal; competing top-left, collaborating top-right, avoiding bottom-left, accommodating bottom-right, compromising in the centre.",
    conclusion:
      "No single style is always best. Effective managers match the style to the stakes, the relationship and the time available, aiming to keep conflict functional.",
  },

  "motivation-theories": {
    intro:
      "Motivation is the process that accounts for an individual's intensity, direction and persistence of effort toward attaining a goal (Robbins). Theories fall into early (mostly need-based) and contemporary (process and job-based) groups.",
    sections: [
      { h: "The motivation process", points: ["Unsatisfied need → tension → drives → search behaviour → satisfied need → reduction of tension."] },
      { h: "Early theories", points: ["Maslow: physiological, safety, social, esteem, self-actualization; a satisfied need stops motivating.", "McGregor: Theory X (people dislike work, need control) vs Theory Y (people can be self-directed).", "Herzberg: hygiene factors prevent dissatisfaction; motivators (achievement, recognition, the work itself) create satisfaction.", "McClelland: needs for achievement, power and affiliation."] },
      { h: "Contemporary theories", points: ["Alderfer's ERG: existence, relatedness, growth; frustration-regression.", "Goal-setting (Locke): specific, difficult goals with feedback.", "Equity (Adams): people compare outcome/input ratios with others.", "Expectancy (Vroom): motivation = expectancy × instrumentality × valence.", "Job characteristics model (Hackman and Oldham) and self-determination theory."] },
      { h: "Applying them", points: ["Recognise individual differences; tie rewards to performance; make rewards valued and fair.", "Enrich jobs (variety, autonomy, feedback); set clear, challenging goals; don't rely on money alone."] },
    ],
    table: {
      caption: "Early vs contemporary",
      columns: ["Theory", "Key idea", "Managerial use"],
      rows: [
        ["Maslow", "Hierarchy of needs", "Meet the next unmet need"],
        ["Herzberg", "Hygiene vs motivators", "Enrich the job, not just pay"],
        ["Goal-setting", "Specific, hard goals", "SMART targets with feedback"],
        ["Equity", "Fairness of rewards", "Transparent, fair pay"],
        ["Expectancy", "E × I × V", "Make goals reachable and rewards valued"],
      ],
    },
    diagram: "Maslow's pyramid with five levels, physiological at the base.",
    conclusion:
      "Early theories explain what people need; contemporary theories explain how motivation works in practice. Managers get the best results by combining them.",
  },

  "leadership-theories": {
    intro:
      "Leadership is the ability to influence a group toward the achievement of a vision or set of goals. Leadership theories evolved from asking who leaders are (traits), to what they do (behaviours), to what works when (contingency).",
    sections: [
      { h: "Leadership vs management", points: ["Management copes with complexity (planning, organizing, controlling); leadership copes with change (direction, alignment, inspiration). Not every manager is a leader."] },
      { h: "Trait theories", points: ["Look for personal qualities: extraversion, conscientiousness, openness, emotional intelligence.", "Traits predict who emerges as a leader better than who is effective; they ignore the situation."] },
      { h: "Behavioural theories", points: ["Iowa studies: autocratic, democratic, laissez-faire.", "Ohio State: initiating structure and consideration. Michigan: employee-oriented vs production-oriented.", "Blake and Mouton's Managerial Grid: 9,9 team management is the ideal."] },
      { h: "Contingency theories", points: ["Fiedler: match the leader's style (measured by LPC) to the situation (leader-member relations, task structure, position power).", "Hersey and Blanchard: telling, selling, participating, delegating according to follower readiness.", "House's path-goal: directive, supportive, participative or achievement-oriented to clear the path to goals.", "Vroom and Yetton: how much participation in decisions."] },
      { h: "Contemporary approaches", points: ["Transactional (exchange of rewards) vs transformational (inspiring followers beyond self-interest), LMX (in- and out-groups), charismatic, servant and authentic leadership."] },
    ],
    table: {
      caption: "Approaches compared",
      columns: ["Approach", "Question asked", "Example"],
      rows: [
        ["Trait", "Who is a leader?", "Big Five, EI"],
        ["Behavioural", "What do leaders do?", "Structure and consideration"],
        ["Contingency", "What works when?", "Fiedler, Hersey-Blanchard"],
        ["Contemporary", "How do leaders inspire?", "Transformational, servant"],
      ],
    },
    diagram: "The Managerial Grid: concern for people (vertical) vs concern for production (horizontal), with 1,1, 1,9, 9,1, 5,5 and 9,9 marked.",
    conclusion:
      "There is no single best leader. Effective leaders combine credible traits with the right behaviours, adapted to the situation and their followers.",
  },

  "personality-ta-johari": {
    intro:
      "Individuals differ in personality, in how they communicate and in how well they know themselves. Personality assessment, transactional analysis (TA) and the Johari Window are three tools that help managers understand and work with these differences.",
    sections: [
      { h: "Personality assessment", points: ["Personality is the sum of ways an individual reacts to and interacts with others; it is shaped by heredity and environment.", "MBTI: four dichotomies (E/I, S/N, T/F, J/P) giving 16 types — popular for self-awareness.", "Big Five (OCEAN): openness, conscientiousness, extraversion, agreeableness, emotional stability; conscientiousness best predicts job performance.", "Other traits: locus of control, self-monitoring, Type A/B, Machiavellianism, proactive personality."] },
      { h: "Transactional analysis (Eric Berne)", points: ["Ego states: Parent (taught), Adult (thought, rational), Child (felt).", "Transactions: complementary (expected response, smooth), crossed (unexpected ego state, conflict), ulterior (hidden message).", "Life positions: I'm OK–You're OK is healthiest. Strokes are units of recognition."] },
      { h: "Johari Window (Luft and Ingham, 1955)", points: ["Open (known to self and others), Blind (known to others only), Hidden (known to self only), Unknown.", "Widen the open area through self-disclosure (shrinks hidden) and seeking feedback (shrinks blind)."] },
      { h: "Uses at work", points: ["Selection and person-job fit, team composition, coaching, feedback culture, and resolving communication breakdowns (crossed transactions)."] },
    ],
    table: {
      caption: "Johari Window",
      columns: ["", "Known to self", "Not known to self"],
      rows: [
        ["Known to others", "Open", "Blind"],
        ["Not known to others", "Hidden", "Unknown"],
      ],
    },
    diagram: "Draw the 2×2 Johari Window and, separately, two people's P-A-C circles with arrows showing a complementary and a crossed transaction.",
    conclusion:
      "These tools turn individual differences from a source of friction into something managers can understand and use, improving communication, teamwork and development.",
  },

  "management-thought-ai": {
    intro:
      "Management thought has evolved from a focus on efficiency, through attention to people, to systems and situational thinking. Today artificial intelligence is changing how managers make decisions.",
    sections: [
      { h: "Classical approaches", points: ["Scientific management (Taylor): the 'one best way', time study, scientific selection, differential pay; the Gilbreths' motion study; Gantt charts.", "General administrative theory (Fayol): five functions and 14 principles such as unity of command and scalar chain.", "Bureaucracy (Weber): division of labour, hierarchy, rules, impersonality, merit."] },
      { h: "Neo-classical (behavioural) approaches", points: ["Hawthorne studies (Elton Mayo): social and psychological factors affect productivity; the human relations movement.", "Mary Parker Follett (integration), Chester Barnard (acceptance theory of authority), McGregor (Theory X and Y)."] },
      { h: "Modern approaches", points: ["Quantitative / management science and TQM (Deming, Juran).", "Systems approach: the organization as an open system of interrelated parts.", "Contingency approach: the right practice depends on the situation."] },
      { h: "AI in managerial decision making", points: ["Supports programmed decisions with predictive analytics, forecasting and pattern recognition across large data.", "Augmented intelligence: AI informs, humans decide — especially for unstructured, value-laden decisions.", "Risks: algorithmic bias, lack of transparency, privacy and accountability. Remedy: human-in-the-loop oversight and good data governance."] },
    ],
    table: {
      caption: "Evolution at a glance",
      columns: ["Era", "Key thinkers", "Focus"],
      rows: [
        ["Classical", "Taylor, Fayol, Weber", "Efficiency, structure"],
        ["Neo-classical", "Mayo, Follett, Barnard", "People and groups"],
        ["Modern", "Deming, systems, contingency", "Systems and situations"],
        ["Digital", "AI and analytics", "Data-driven decisions"],
      ],
    },
    conclusion:
      "Each school built on the limits of the last. AI is the newest layer: it makes decisions faster and more data-driven, but human judgment and ethics remain central.",
  },
};
