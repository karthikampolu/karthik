import type { ModelAnswer } from "@/lib/exam-prep/types";

/** Model answers for the OB predicted Part B questions (part 2). */
export const MODELS_2: Record<string, ModelAnswer> = {
  "structure-digital": {
    intro:
      "Organizational structure is the formal arrangement of jobs within an organization; organizational design is the process of developing or changing it. Technology and digital transformation are reshaping both.",
    sections: [
      { h: "Six elements of design", points: ["Work specialization, departmentalization (functional, product, geographical, process, customer), chain of command, span of control, centralization vs decentralization, formalization."] },
      { h: "Mechanistic vs organic", points: ["Mechanistic: high specialization, rigid departments, narrow spans, centralization, high formalization — suits stable environments.", "Organic: cross-functional teams, free information flow, wide spans, decentralization, low formalization — suits dynamic environments.", "Contingency factors: strategy, size, technology, environmental uncertainty."] },
      { h: "Types of structure", points: ["Traditional: simple (small firms), functional (similar specialties together), divisional (semi-autonomous units for products or regions).", "Contemporary: team, matrix (dual chain of command), project, boundaryless (virtual, network), learning organization."] },
      { h: "Technology and design", points: ["Woodward: unit and process production fit organic structures; mass production fits mechanistic ones.", "Digital tools flatten hierarchies, enable remote and networked work, and automate routine tasks."] },
      { h: "Digital transformation", points: ["Using digital technology to change how the organization operates and delivers value — processes, culture and business models, not just tools.", "Challenges: resistance to change, skills gaps, legacy systems, cost.", "Managing it: Lewin (unfreeze, change, refreeze) or Kotter's eight steps; communication, participation, training; agile teams."] },
      { h: "Sustainable organizations", points: ["Triple bottom line (people, planet, profit), ESG reporting, circular-economy practices, sustainability roles built into the structure."] },
    ],
    table: {
      caption: "Structure types",
      columns: ["Structure", "Strength", "Weakness"],
      rows: [
        ["Functional", "Efficiency from specialization", "Silos, poor coordination"],
        ["Divisional", "Focus on results", "Duplication of resources"],
        ["Matrix", "Flexible use of experts", "Two bosses, power struggles"],
        ["Network", "Agility, low cost", "Less control over partners"],
      ],
    },
    conclusion:
      "No structure suits every firm; the right design fits strategy, size, technology and environment. Digital transformation pushes most organizations toward flatter, more organic and networked designs.",
  },

  "culture-gender": {
    intro:
      "Organizational culture is the shared values, principles, traditions and ways of doing things that influence how members act. A strong, inclusive culture is one of the most powerful ways to advance gender equality at work.",
    sections: [
      { h: "Levels and dimensions", points: ["Schein: artifacts (visible), espoused values (stated), basic underlying assumptions (taken for granted).", "Robbins' seven dimensions: innovation and risk-taking, attention to detail, outcome orientation, people orientation, team orientation, aggressiveness, stability."] },
      { h: "How culture is created", points: ["Founders hire people who share their values, socialize them, and model behaviour that others copy."] },
      { h: "How culture is sustained", points: ["Selection (hire for fit), top management's actions, and socialization (prearrival, encounter, metamorphosis).", "Employees learn it through stories, rituals, material symbols and language."] },
      { h: "Gender equality at the workplace", points: ["Equal pay for equal work (Code on Wages, 2019); protection from harassment (POSH Act, 2013, with an Internal Committee); 26 weeks' paid maternity leave (Maternity Benefit Amendment Act, 2017).", "Barriers: glass ceiling, gender pay gap, unconscious bias, tokenism."] },
      { h: "Building an inclusive culture", points: ["Leaders model inclusive behaviour; transparent pay reviews; structured, bias-aware hiring and promotion; flexible work for all; mentoring and sponsorship; zero tolerance for harassment."] },
      { h: "Benefits", points: ["Wider talent pool, more innovation, better decisions, stronger engagement and employer brand."] },
      { h: "Measuring progress", points: ["Track representation of women at each level, run regular gender pay audits, analyse exit interviews, and report results to leadership so equality goals are visible."] },
    ],
    diagram: "Schein's iceberg: artifacts above the waterline, espoused values at the surface, basic assumptions below.",
    conclusion:
      "Culture is created by founders and sustained through selection, leadership and socialization. When equality is built into that culture, policies become everyday behaviour.",
  },

  "engagement-vuca-shrm": {
    intro:
      "VUCA — volatility, uncertainty, complexity and ambiguity — describes today's business environment. Organizations respond with workforce agility, engagement practices suited to virtual work, and sustainable HRM.",
    sections: [
      { h: "VUCA and workforce agility", points: ["The term came from the US Army War College and was adopted by business strategists.", "Workforce agility: the ability to quickly adapt skills, roles and processes — through reskilling and upskilling, cross-functional teams, empowered decisions and flexible structures.", "Johansen's VUCA Prime: vision, understanding, clarity and agility."] },
      { h: "Employee engagement", points: ["Engagement is an individual's involvement with, satisfaction with and enthusiasm for work. Kahn (1990) described people bringing their physical, cognitive and emotional selves to their roles.", "Engaged employees are more productive and less likely to leave."] },
      { h: "Engagement in the virtual workspace", points: ["Challenges: trust, isolation, communication gaps, time zones, video-call fatigue, proximity bias.", "Practices: regular one-to-ones, clear goals, recognition, asynchronous tools, virtual social time, fair evaluation based on results, hybrid options."] },
      { h: "Sustainable HRM", points: ["HR practices that achieve long-term goals while protecting employee well-being, society and the environment.", "Green HRM: e-recruitment, paperless HR, green training, environmental goals in appraisal; well-being and work-life balance to prevent burnout."] },
      { h: "Example practices", points: ["Internal job boards and short skill sprints build agility; quarterly engagement surveys and monthly pulse checks track remote teams; wellness days and right-to-disconnect norms protect well-being."] },
    ],
    conclusion:
      "In a VUCA world, organizations win by keeping people adaptable, connected and well. Agility, thoughtful virtual engagement and sustainable HRM reinforce one another.",
  },

  "manager-skills-roles": {
    intro:
      "Managers coordinate and oversee the work of others so that activities are completed efficiently and effectively. What they do can be described through functions, roles and skills.",
    sections: [
      { h: "Functions of management", points: ["Planning, organizing, leading, controlling (Robbins), condensed from Fayol's planning, organizing, commanding, coordinating, controlling."] },
      { h: "Levels of managers", points: ["First-line, middle and top managers, each with different emphasis on skills and functions."] },
      { h: "Mintzberg's managerial roles", points: ["Interpersonal: figurehead, leader, liaison.", "Informational: monitor, disseminator, spokesperson.", "Decisional: entrepreneur, disturbance handler, resource allocator, negotiator."] },
      { h: "Katz's managerial skills", points: ["Technical skills: job-specific knowledge — most important for first-line managers.", "Human (interpersonal) skills: working with people — important at all levels.", "Conceptual skills: seeing the organization as a whole — most important for top managers."] },
      { h: "Characteristics of management", points: ["Goal-oriented, universal, continuous, a group activity, dynamic, intangible, and both an art and a science."] },
      { h: "Example: a bank branch manager", points: ["Figurehead at a customer event, monitor while reviewing daily reports, disturbance handler when the core system fails, resource allocator when assigning staff.", "Uses technical skills for credit checks, human skills with staff and customers, and conceptual skills for branch strategy."] },
    ],
    table: {
      caption: "Mintzberg's ten roles",
      columns: ["Category", "Roles", "Example"],
      rows: [
        ["Interpersonal", "Figurehead, leader, liaison", "Opening a new branch"],
        ["Informational", "Monitor, disseminator, spokesperson", "Briefing the team on market news"],
        ["Decisional", "Entrepreneur, disturbance handler, resource allocator, negotiator", "Handling a supplier crisis"],
      ],
    },
    diagram: "A pyramid of top, middle and first-line managers with a bar showing conceptual skills rising and technical skills falling toward the top.",
    conclusion:
      "Functions describe what managers do, roles describe how they spend their time, and skills describe what they need to succeed — the mix shifts with the level of management.",
  },

  "ob-model-disciplines": {
    intro:
      "The basic OB model shows how inputs lead to processes and then to outcomes at the individual, group and organizational levels. OB is built on several behavioural disciplines and has been practised through different models over time.",
    sections: [
      { h: "The OB model (Robbins)", points: ["Inputs: individual (personality, values, diversity), group (structure, roles), organizational (structure, culture).", "Processes: individual (emotions, motivation, perception, decision making), group (communication, leadership, power, conflict), organizational (HRM, change).", "Outcomes: individual (attitudes, task performance, citizenship, withdrawal), group (cohesion, functioning), organizational (productivity, survival)."] },
      { h: "Contributing disciplines", points: ["Psychology: learning, motivation, personality, perception, job satisfaction, selection, stress.", "Social psychology: attitude change, communication, group decision making.", "Sociology: group dynamics, teams, power, conflict, organizational culture and change.", "Anthropology: comparative values and attitudes, cross-cultural analysis, culture."] },
      { h: "Models of OB (Keith Davis)", points: ["Autocratic: power → obedience → dependence on boss → minimum performance.", "Custodial: economic resources → security and benefits → dependence on organization → passive cooperation.", "Supportive: leadership → job performance → participation → awakened drives.", "Collegial: partnership → responsible behaviour → self-discipline → moderate enthusiasm.", "System model: trust and community → psychological ownership → self-motivation → passion and commitment."] },
      { h: "Relationship between management and OB", points: ["Management sets goals and coordinates work; OB supplies the understanding of how people will behave, especially for the leading function."] },
    ],
    table: {
      caption: "Davis's models",
      columns: ["Model", "Basis", "Employee orientation", "Result"],
      rows: [
        ["Autocratic", "Power", "Obedience", "Minimum performance"],
        ["Custodial", "Economic resources", "Security and benefits", "Passive cooperation"],
        ["Supportive", "Leadership", "Job performance", "Awakened drives"],
        ["Collegial", "Partnership", "Responsible behaviour", "Moderate enthusiasm"],
      ],
    },
    diagram: "Three columns — Inputs → Processes → Outcomes — each split into individual, group and organization levels.",
    conclusion:
      "OB integrates several sciences into one model that managers can use. The shift from autocratic toward supportive and collegial models reflects how organizations increasingly rely on commitment rather than control.",
  },

  "values-attitudes-satisfaction": {
    intro:
      "Values are basic convictions about what is right or desirable; attitudes are evaluative statements about objects, people or events. Job satisfaction, the most studied work attitude, shapes performance, turnover and citizenship behaviour.",
    sections: [
      { h: "Values", points: ["Stable and enduring, learned early from family, teachers and culture.", "Rokeach: terminal values (desired end-states) and instrumental values (preferred ways of behaving).", "Hofstede's cultural dimensions: power distance, individualism vs collectivism, masculinity vs femininity, uncertainty avoidance, long-term orientation, indulgence."] },
      { h: "Attitudes", points: ["Three components: cognitive (belief), affective (feeling), behavioural (intention).", "Cognitive dissonance (Festinger): discomfort when attitudes and behaviour conflict, which people try to reduce.", "Major job attitudes: job satisfaction, job involvement, organizational commitment (affective, continuance, normative), perceived organizational support, employee engagement."] },
      { h: "Job satisfaction", points: ["A positive feeling about one's job; the work itself is the strongest driver, pay matters up to a point.", "Outcomes: better performance, citizenship behaviour, customer satisfaction; lower absenteeism and turnover."] },
      { h: "Responses to dissatisfaction (EVLN)", points: ["Exit (active, destructive), voice (active, constructive), loyalty (passive, constructive), neglect (passive, destructive)."] },
      { h: "Managerial implications", points: ["Hire for value fit, design interesting work, treat people fairly, listen to voice, measure satisfaction regularly."] },
      { h: "Example", points: ["An employee who values family time (terminal value) is asked to work every weekend and feels cognitive dissonance. If her voice is ignored, dissatisfaction can turn into exit."] },
    ],
    table: {
      caption: "EVLN framework",
      columns: ["", "Constructive", "Destructive"],
      rows: [
        ["Active", "Voice", "Exit"],
        ["Passive", "Loyalty", "Neglect"],
      ],
    },
    conclusion:
      "Values shape attitudes, and attitudes such as job satisfaction shape behaviour at work. Managers who attend to them improve both performance and retention.",
  },

  "perception-attribution": {
    intro:
      "Perception is the process by which people organize and interpret sensory impressions to give meaning to their environment. Because behaviour is based on perceived reality, not reality itself, perception and attribution errors matter at work.",
    sections: [
      { h: "Factors influencing perception", points: ["The perceiver (attitudes, motives, experience), the target (novelty, appearance), and the situation (time, work and social setting)."] },
      { h: "Attribution theory (Kelley)", points: ["We judge whether behaviour is internally caused (under the person's control) or externally caused (the situation).", "Distinctiveness: different behaviour in different situations → external.", "Consensus: everyone behaves the same way → external.", "Consistency: same behaviour over time → internal."] },
      { h: "Attribution errors", points: ["Fundamental attribution error: overestimating internal causes for others' behaviour.", "Self-serving bias: crediting our own success to ourselves and blaming failure on circumstances."] },
      { h: "Perceptual shortcuts", points: ["Selective perception, halo effect, contrast effect, stereotyping, projection."] },
      { h: "Applications and remedies", points: ["Interviews, performance appraisal, judging effort, and the self-fulfilling prophecy.", "Remedies: structured interviews, multiple raters, objective measures, awareness training, checking the situation before blaming the person."] },
      { h: "Worked example", points: ["An employee misses a deadline. Others met it (low consensus), he misses other deadlines too (low distinctiveness) and does so often (high consistency): an internal attribution is reasonable.", "If the whole team missed it, consensus is high and the cause is more likely external, such as an unrealistic schedule."] },
    ],
    table: {
      caption: "Kelley's attribution rules",
      columns: ["Cue", "If high", "If low"],
      rows: [
        ["Distinctiveness", "External", "Internal"],
        ["Consensus", "External", "Internal"],
        ["Consistency", "Internal", "External"],
      ],
    },
    conclusion:
      "Perception and attribution shape how managers judge people. Recognising common errors leads to fairer appraisals and better decisions.",
  },

  "power-negotiation": {
    intro:
      "Power is the capacity of A to influence the behaviour of B so that B acts in accordance with A's wishes. Negotiation is the process through which two or more parties exchange goods or services and try to agree on the exchange rate. Both are central to handling conflict.",
    sections: [
      { h: "Bases of power (French and Raven)", points: ["Formal: coercive (fear of punishment), reward (ability to give rewards), legitimate (position).", "Personal: expert (skills and knowledge), referent (admiration and identification)."] },
      { h: "Dependency: the key to power", points: ["Power grows when what you control is important, scarce and non-substitutable."] },
      { h: "Bargaining strategies", points: ["Distributive: fixed pie, win-lose, short-term, opposed interests.", "Integrative: expanding pie, win-win, long-term, convergent interests."] },
      { h: "The negotiation process", points: ["Preparation and planning (including your BATNA) → definition of ground rules → clarification and justification → bargaining and problem solving → closure and implementation."] },
      { h: "Third-party roles", points: ["Mediator (facilitates), arbitrator (decides), conciliator (informal link), consultant (problem-solving)."] },
      { h: "Example", points: ["Two departments sharing a fixed budget bargain distributively; reframing around a shared product launch allows integrative solutions such as shared tools or phased spending."] },
      { h: "Power tactics", points: ["Rational persuasion, inspirational appeals, consultation, exchange, personal appeals, ingratiation, pressure and coalitions.", "Rational persuasion and consultation are generally the most effective; pressure is the least."] },
    ],
    table: {
      caption: "Distributive vs integrative bargaining",
      columns: ["Feature", "Distributive", "Integrative"],
      rows: [
        ["Goal", "Get as much of the pie as possible", "Expand the pie"],
        ["Motivation", "Win-lose", "Win-win"],
        ["Relationship", "Short-term", "Long-term"],
      ],
    },
    conclusion:
      "Personal power based on expertise and respect is more lasting than formal power. Integrative bargaining, prepared with a clear BATNA, usually produces better and longer-lasting agreements.",
  },

  "motivation-case": {
    intro:
      "Case: after a pay freeze, a team of experienced engineers shows low motivation and two members have resigned. As their manager, I would use motivation theories to diagnose the problem and respond, since pay alone cannot be the whole answer.",
    sections: [
      { h: "Diagnosis using theory", points: ["Herzberg: pay is a hygiene factor; the freeze created dissatisfaction, but motivators (challenge, recognition, growth) may also be missing.", "Equity (Adams): engineers may compare their pay with peers elsewhere and feel under-rewarded, reducing effort or leaving.", "Expectancy (Vroom): if extra effort no longer leads to rewards they value, instrumentality and valence fall.", "Maslow/ERG: experienced engineers are likely seeking esteem and growth, not just security."] },
      { h: "Actions: restore fairness", points: ["Explain the freeze honestly and its duration; benchmark pay and fix clear inequities first; use non-cash rewards fairly (bonus pool tied to results, extra leave)."] },
      { h: "Actions: strengthen motivators", points: ["Enrich jobs: more autonomy, ownership of whole modules (task identity), challenging assignments, skill development.", "Recognition: visible appreciation for achievements."] },
      { h: "Actions: set goals and link rewards", points: ["Agree specific, challenging goals (goal-setting) with feedback; make sure performance leads to valued outcomes such as promotions, learning budgets and conference opportunities."] },
      { h: "Retention and follow-up", points: ["Stay interviews to learn what each person values; career paths; monitor engagement and attrition monthly."] },
    ],
    conclusion:
      "The pay freeze is a hygiene and equity problem; fixing it requires fairness and transparency. Lasting motivation, though, comes from meaningful, autonomous work, clear goals and rewards people value.",
  },
};
