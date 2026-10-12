import type { ModelAnswer } from "@/lib/exam-prep/types";

/** Model answers for the Marketing predicted Part B questions (part 1). */
export const MODELS_1: Record<string, ModelAnswer> = {
  npd: {
    intro:
      "New product development (NPD) is the structured process a company uses to turn ideas into products that can be launched successfully. Because most new products fail, each stage works as a filter that removes weak ideas before costs rise.",
    sections: [
      { h: "1. Idea generation", points: ["Collect as many ideas as possible from customers (complaints, surveys), R&D, employees, distributors, competitors and crowdsourcing.", "Quantity matters here; judgment comes later."] },
      { h: "2. Idea screening", points: ["Drop ideas that don't fit company objectives, capabilities or market size.", "Avoid drop-errors (rejecting a good idea) and go-errors (letting a poor idea through)."] },
      { h: "3. Concept development and testing", points: ["Turn the idea into a product concept described in consumer terms.", "Test it with target buyers for appeal, clarity, believability and purchase intention."] },
      { h: "4. Marketing strategy development", points: ["Part 1: target market, positioning, first-year sales, share and profit goals.", "Part 2: planned price, distribution and marketing budget. Part 3: long-run sales and profit goals."] },
      { h: "5. Business analysis", points: ["Estimate sales, costs and profits; check break-even and payback against company objectives."] },
      { h: "6. Product development", points: ["Build prototypes and run functional tests (does it work safely?) and consumer tests (do buyers like it?)."] },
      { h: "7. Market testing", points: ["Launch in a few test markets to check the whole marketing plan — product, price, channels and promotion — before national rollout."] },
      { h: "8. Commercialization", points: ["Decide when (timing), where (cities or regions first), to whom (early adopters) and how (launch plan and budget)."] },
      { h: "Example: a high-protein millet snack bar", points: ["Idea from gym-goers' feedback → screened for fit with an existing foods business → concept tested with urban 18–35 fitness-conscious buyers → strategy: premium-value price, quick-commerce and gym distribution → business case shows break-even in under two years → recipe prototypes and taste tests → test launch in two cities → national rollout."] },
    ],
    diagram: "A funnel: many ideas at the top narrowing through the eight stages to one launched product at the bottom.",
    conclusion:
      "A disciplined NPD process lowers the risk of failure by testing assumptions cheaply before heavy investment. Most firms add gate reviews between stages so weak projects are stopped early.",
  },

  "market-intelligence": {
    intro:
      "Market intelligence is the everyday information a firm gathers about developments in its environment. Combined with marketing research and demand forecasting, it tells a company whether and how to enter a new market. As CMO of a smartphone maker entering a new country, I would build the plan in five steps.",
    sections: [
      { h: "1. Analyse the macro environment (PESTLE)", points: ["Demographic: population, age mix, urbanisation, income levels.", "Economic: growth, purchasing power, currency risk, credit availability.", "Socio-cultural: brand trust, features valued (camera, battery, local language).", "Technological: 4G/5G coverage, digital payments. Political-legal: import duties, certification, data-protection rules. Natural: e-waste and recycling norms."] },
      { h: "2. Analyse the micro environment", points: ["Company: our strengths (design, cost, after-sales).", "Suppliers and intermediaries: component supply, telecom carriers, retailers, e-commerce platforms.", "Customers: segments by price band and usage. Competitors: global and local brands, their price and channel strategy. Publics: media, regulators."] },
      { h: "3. Use marketing research to gather consumer insight", points: ["Follow the six-step process: define the problem → plan → collect → analyse → present → decide.", "Start with secondary data (industry reports, trade statistics), then primary research: surveys, focus groups, store observation and online behaviour data."] },
      { h: "4. Measure and forecast demand", points: ["Estimate total market potential (Q = n × q × p) and area potential by city.", "Forecast with buyer-intention surveys, expert opinion (Delphi), past category sales (time series) and a test market; use scenario planning because the market can shift fast."] },
      { h: "5. Ensure marketing productivity", points: ["Set targets and track them on a dashboard: market share, customer acquisition cost, marketing ROI.", "Run sales, market-share and expense-to-sales analysis; move budget toward the channels and campaigns with the best return."] },
    ],
    table: {
      caption: "Illustrative market-potential estimate (assumed numbers)",
      columns: ["Factor", "Assumption", "Value"],
      rows: [
        ["Potential buyers (n)", "Urban users likely to upgrade", "2 crore"],
        ["Purchase rate (q)", "Phones per buyer per year", "0.4"],
        ["Average price (p)", "Mid-range segment", "₹15,000"],
        ["Market potential (Q)", "n × q × p", "₹12,000 crore"],
      ],
    },
    conclusion:
      "Entry decisions should rest on evidence, not instinct: scan the macro and micro environment, test assumptions with research, size and forecast demand, then keep checking productivity so spending follows results.",
  },

  "plc-indian-brands": {
    intro:
      "The product life cycle (PLC) describes how a product's sales and profits move through four stages — introduction, growth, maturity and decline. It is a useful indicator of marketing success because it shows where a product stands and what the marketing mix should do next.",
    sections: [
      { h: "Why the PLC indicates marketing success", points: ["It shows whether a product is gaining, holding or losing ground.", "It links stage to objectives: awareness and trial → maximise share → defend share and profit → cut costs or reposition.", "It warns early of decline, so managers can modify, reposition or harvest instead of being surprised."] },
      { h: "Extending the life cycle", points: ["Modify the market: new users, new uses, higher usage.", "Modify the product: better quality, new features, new style.", "Modify the marketing mix and reposition the brand for a new audience or meaning."] },
      { h: "Indian brands repositioned to extend their life cycle", points: [
        "Royal Enfield: weak sales and quality problems before its turnaround; it improved quality and repositioned the Bullet and Classic as premium leisure motorcycles.",
        "Maggi: withdrawn in 2015 after a food-safety controversy; Nestlé relaunched it with trust-focused communication and recovered.",
        "Bajaj Chetak: the classic scooter was discontinued as buyers moved to motorcycles; Bajaj revived the name in 2020 as an electric scooter.",
        "Lifebuoy: moved from a carbolic-soap image to a family hygiene and germ-protection brand, backed by handwashing campaigns.",
        "Glow & Lovely: Fair & Lovely was renamed in 2020, shifting away from fairness claims toward healthy, glowing skin as attitudes changed.",
      ] },
    ],
    table: {
      caption: "PLC stages at a glance",
      columns: ["Stage", "Sales", "Profit", "Objective", "Typical strategy"],
      rows: [
        ["Introduction", "Low", "Negative", "Awareness and trial", "Basic product, cost-plus price, selective distribution"],
        ["Growth", "Rising fast", "Rising", "Maximise share", "Extensions, penetration price, intensive distribution"],
        ["Maturity", "Peak, slowing", "High", "Defend share and profit", "Diversify models, match competitors' prices"],
        ["Decline", "Falling", "Falling", "Cut cost, milk the brand", "Phase out weak items, reposition or exit"],
      ],
    },
    diagram: "The S-shaped PLC curve: sales (and a profit line below it) against time, with the four stages marked.",
    conclusion:
      "The PLC is a guide, not a fixed law: decline can be reversed. These brands show that repositioning, product renewal and fresh meaning can restart growth. Verify the recent brand facts against your own sources before the exam.",
  },

  "digital-ai-stp": {
    intro:
      "Digital marketing has changed targeting and positioning from broad, slow, one-way decisions into data-driven, real-time, two-way processes. AI and data analytics accelerate this shift.",
    sections: [
      { h: "Impact on targeting", points: ["From demographic segments to behaviour-based micro-segments built from browsing, purchase and location data.", "Real-time targeting: programmatic ads bid for individual impressions; lookalike audiences find people similar to best customers.", "Personalisation at scale: e-commerce apps such as Flipkart or Nykaa tailor home pages and offers to each user."] },
      { h: "Impact on positioning", points: ["Positioning becomes two-way: reviews, ratings and social media shape how a brand is seen.", "Messages can be tested and refined quickly through A/B testing.", "Consistency across channels matters more (omnichannel), because customers see the brand everywhere."] },
      { h: "How AI and analytics change traditional approaches", points: ["Predictive analytics: churn prediction, next-best-offer, lead scoring.", "Recommendation engines and dynamic segments that update as behaviour changes.", "Generative AI: draft copy and creative variations for each segment; chatbots and AI agents for service and conversion.", "Social listening and sentiment analysis show the brand's real position."] },
      { h: "Evaluation", points: ["Benefits: precision, lower wastage, speed, measurable ROI.", "Risks: privacy and consent (India's DPDP Act 2023), algorithmic bias, over-targeting that feels intrusive, dependence on platforms, and similar-looking messaging across brands."] },
    ],
    table: {
      caption: "Traditional vs digital",
      columns: ["Aspect", "Traditional", "Digital / AI-driven"],
      rows: [
        ["Segments", "Broad demographics", "Behavioural micro-segments"],
        ["Media", "TV, print, mass reach", "Programmatic, social, search"],
        ["Feedback", "Slow surveys", "Real-time data and A/B tests"],
        ["Positioning", "One-way, company-led", "Two-way, shaped by reviews"],
      ],
    },
    conclusion:
      "Digital tools make targeting far more precise and positioning more responsive, but they don't replace strategy: a brand still needs a clear value proposition, used responsibly with customer data.",
  },

  "sales-channel-criteria": {
    intro:
      "A sales (marketing) channel is the set of organizations that make a product available to the final buyer. As sales head, I would choose channels by weighing customer, product, company, intermediary, competitive and environmental factors, then evaluate the options on cost, control and flexibility.",
    sections: [
      { h: "Decisions to make", points: ["Direct (own sales force, website) or indirect (wholesalers, retailers, e-commerce).", "Number of levels (zero, one, two, three).", "Intensity: intensive, selective or exclusive distribution."] },
      { h: "1. Customer factors", points: ["Number and location of buyers, how often and how much they buy, where they prefer to shop.", "Service outputs they want: lot size, waiting time, spatial convenience, variety, after-sales service."] },
      { h: "2. Product factors", points: ["Perishable or bulky products need short channels; low-value convenience goods need wide coverage; technical or high-value products need direct or specialist selling."] },
      { h: "3. Company factors", points: ["Financial strength, size, management experience, the control and service level we want to keep."] },
      { h: "4. Intermediary factors", points: ["Availability, willingness to stock, margins demanded, service quality and reach."] },
      { h: "5. Competitive and environmental factors", points: ["Where competitors sell, economic conditions, legal rules, and technology such as quick commerce."] },
      { h: "Evaluating alternatives", points: ["Economic: expected sales vs channel cost.", "Control: how much say we keep over price, display and service.", "Adaptive: ability to change as the market changes."] },
    ],
    table: {
      caption: "Matching product to channel",
      columns: ["Product", "Likely channel", "Intensity"],
      rows: [
        ["Biscuits, soap", "Distributors → kirana, modern trade, quick commerce", "Intensive"],
        ["Washing machines", "Dealers + brand website + e-commerce", "Selective"],
        ["Luxury watches", "Own boutiques and a few authorised dealers", "Exclusive"],
        ["Industrial machinery", "Direct sales force", "Direct"],
      ],
    },
    conclusion:
      "No single channel is best; the right mix fits the customer and product while balancing cost, control and flexibility. I would review channel performance regularly and adjust.",
  },

  "buying-decision-process": {
    intro:
      "The consumer buying decision process describes the stages a buyer goes through before and after a purchase. Cultural, social, personal and psychological factors shape every stage, and marketers can influence each one.",
    sections: [
      { h: "1. Problem recognition", points: ["Triggered by internal stimuli (hunger, a phone that won't hold charge) or external ones (an ad, a friend's new phone).", "Marketer: create awareness of the need (ads showing the problem)."] },
      { h: "2. Information search", points: ["Sources: personal (friends), commercial (ads, salespeople, websites), public (reviews, ratings), experiential (trying it).", "Marketer: be present where buyers search — search ads, review sites, product pages."] },
      { h: "3. Evaluation of alternatives", points: ["Buyers compare brands on the attributes that matter, moving from awareness set to consideration set to choice set.", "Marketer: stress strong attributes, offer comparison tools, demos and trials."] },
      { h: "4. Purchase decision", points: ["Five sub-decisions: brand, dealer, quantity, timing, payment method. Attitudes of others and unexpected situations can intervene.", "Marketer: easy checkout, EMI options, offers, assured delivery."] },
      { h: "5. Postpurchase behaviour", points: ["Satisfaction depends on performance vs expectations; cognitive dissonance is common after costly purchases.", "Marketer: follow-up, warranties, onboarding, review requests."] },
      { h: "Types of buying behaviour", points: ["Complex (high involvement, big brand differences), dissonance-reducing, habitual, variety-seeking. Habitual buyers often skip stages."] },
      { h: "Example: buying a smartphone", points: ["Battery problem → reads reviews and asks friends → shortlists three models on camera and price → buys online on EMI during a sale → posts a review; reassured by the brand's onboarding messages."] },
    ],
    diagram: "Five boxes in a row joined by arrows: problem recognition → information search → evaluation → purchase decision → postpurchase behaviour.",
    conclusion:
      "Understanding the five stages tells marketers where buyers get stuck and what to do at each point. Satisfied buyers then become a source of word of mouth for the next buyer's information search.",
  },

  "stp-positioning": {
    intro:
      "Segmentation, targeting and positioning (STP) is the core of marketing strategy: divide the market into meaningful groups, choose which to serve, and create a distinct place in the minds of those customers.",
    sections: [
      { h: "Segmentation", points: ["Consumer bases: geographic, demographic, psychographic, behavioural (occasion, benefits, user status, usage rate, loyalty).", "Business bases: demographic, operating variables, purchasing approach, situational factors, personal characteristics.", "A good segment is measurable, substantial, accessible, differentiable and actionable."] },
      { h: "Targeting", points: ["Evaluate segments on size and growth, structural attractiveness (Porter's five forces), and fit with company objectives and resources.", "Patterns: single-segment, selective specialisation, product specialisation, market specialisation, full coverage. Approaches: mass, differentiated, niche, individual."] },
      { h: "Positioning", points: ["Choose a frame of reference (the category we compete in).", "Points of parity: what we must match to be credible. Points of difference: what makes us distinct — desirable, deliverable, differentiating.", "State the value proposition clearly."] },
      { h: "Example: an electric scooter brand", points: ["Segment: urban college students and young professionals (demographic + psychographic + benefit: low running cost).", "Target: niche of 18–28 year-olds in metro cities.", "POP: safety, range for city use, service network. POD: swappable batteries at campus stations."] },
    ],
    table: {
      caption: "Positioning statement",
      columns: ["Part", "Example"],
      rows: [
        ["For (target)", "Urban students and young professionals"],
        ["Brand is the (frame of reference)", "Electric scooter"],
        ["That (point of difference)", "Never makes you wait to charge"],
        ["Because (reason to believe)", "Batteries swap in 2 minutes at campus stations"],
      ],
    },
    conclusion:
      "STP turns a large, varied market into a focused strategy. Clear segments, a deliberate target choice and a sharp, believable position make every later marketing-mix decision easier.",
  },

  "channel-conflict": {
    intro:
      "Channel conflict arises when one channel member's actions prevent another from achieving its goals. It is common in multichannel systems and must be managed rather than ignored.",
    sections: [
      { h: "Types of conflict", points: ["Vertical: between levels (manufacturer vs dealers).", "Horizontal: between members at the same level (two dealers in one city).", "Multichannel: between channels selling to the same market (online vs offline)."] },
      { h: "Causes", points: ["Goal incompatibility (high prices vs high volume), unclear roles and territories, different perceptions, intermediaries' dependence on the manufacturer."] },
      { h: "Vertical marketing systems as structural solutions", points: ["Corporate VMS (common ownership), administered VMS (coordinated by the most powerful member), contractual VMS (franchises, cooperatives, voluntary chains)."] },
      { h: "Ways to manage conflict", points: ["Strategic justification and superordinate goals.", "Exchange of employees between levels; co-optation (joint councils).", "Diplomacy, mediation and arbitration; legal recourse only as a last resort."] },
      { h: "Multichannel systems: benefits and risks", points: ["Benefits: wider reach, lower cost per sale, more customisation.", "Risks: conflict, price clashes, harder control."] },
      { h: "Example", points: ["A brand selling online cheaper than its dealers faces multichannel conflict. Remedies: common price parity, online-only models, letting dealers fulfil online orders locally, and sharing online leads with dealers."] },
      { h: "Indian illustration", points: ["FMCG firms running both distributor networks and quick-commerce or B2B ordering apps often face multichannel conflict over margins and prices.", "Common remedies: channel-specific pack sizes, agreed trade schemes, and routing app orders through local distributors."] },
    ],
    conclusion:
      "Some conflict is healthy, but unmanaged conflict damages the whole channel. Clear roles, shared goals and fair rules keep a multichannel system working.",
  },

  "marketing-concepts-value": {
    intro:
      "Marketing thinking has evolved from a focus on production to a holistic focus on customers, society and long-term value. Modern firms win by creating and delivering superior customer value.",
    sections: [
      { h: "Evolution of marketing concepts", points: ["Production concept: affordable, widely available products; focus on efficiency.", "Product concept: quality and features; risk of marketing myopia.", "Selling concept: aggressive selling and promotion.", "Marketing concept: find target customers' needs and satisfy them better than competitors.", "Holistic marketing: relationship, integrated, internal and performance (societal) marketing."] },
      { h: "Creating customer value", points: ["Customer perceived value = total customer benefit − total customer cost (money, time, energy, psychic cost).", "Satisfaction comes when performance meets expectations; loyalty and customer lifetime value follow."] },
      { h: "Delivering value", points: ["Porter's value chain: primary activities (inbound logistics, operations, outbound logistics, marketing and sales, service) and support activities.", "Value delivery network: suppliers, distributors and customers working together.", "Marketing mix as the tool: 4Ps (product, price, place, promotion), seen by customers as the 4Cs."] },
      { h: "Example: Amul", points: ["A cooperative value chain links dairy farmers to consumers; collection, processing and wide distribution deliver consistent quality at affordable prices, building strong customer value and trust."] },
    ],
    table: {
      caption: "Concepts compared",
      columns: ["Concept", "Starting point", "Focus", "Means"],
      rows: [
        ["Production", "Factory", "Efficiency", "Low cost, wide availability"],
        ["Selling", "Factory", "Existing products", "Selling and promotion"],
        ["Marketing", "Target market", "Customer needs", "Integrated marketing"],
        ["Holistic", "Customers and society", "Long-term value", "Relationships, ethics, performance"],
      ],
    },
    conclusion:
      "The shift from 'selling what we make' to 'making what customers value' is the core of modern marketing. Firms that design their value chain around customer value build lasting loyalty.",
  },
};
