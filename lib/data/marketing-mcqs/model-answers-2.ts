import type { ModelAnswer } from "@/lib/exam-prep/types";

/** Model answers for the Marketing predicted Part B questions (part 2). */
export const MODELS_2: Record<string, ModelAnswer> = {
  pricing: {
    intro:
      "Price is the only element of the marketing mix that produces revenue. Kotler & Keller describe a six-step procedure for setting a price, followed by adapting it to different customers, places and situations.",
    sections: [
      { h: "1. Select the pricing objective", points: ["Survival, maximum current profit, maximum market share (penetration), maximum market skimming, or product-quality leadership."] },
      { h: "2. Determine demand", points: ["Estimate how much people will buy at each price; check price sensitivity (elasticity)."] },
      { h: "3. Estimate costs", points: ["Fixed and variable costs, costs at different volumes, and the experience-curve effect."] },
      { h: "4. Analyse competitors' costs, prices and offers", points: ["Position our price relative to rivals' value."] },
      { h: "5. Select a pricing method", points: ["Markup, target-return, perceived-value, value pricing (EDLP), going-rate, auction-type.", "Worked example: unit cost ₹16, markup 20% on sales → price = 16 ÷ (1 − 0.2) = ₹20."] },
      { h: "6. Select the final price", points: ["Consider psychological pricing, the effect of other marketing activities, company pricing policy and impact on other parties."] },
      { h: "Adapting the price", points: ["Geographic pricing (FOB, uniform delivered, zone).", "Discounts and allowances (cash, quantity, functional, seasonal).", "Promotional pricing (loss leaders, special events, cash rebates).", "Differentiated pricing (customer segment, location, time).", "Product-mix pricing (product-line, optional-feature, captive, two-part, by-product, bundling)."] },
      { h: "Skimming vs penetration", points: ["Skimming: start high when enough buyers will pay a premium and rivals can't enter quickly.", "Penetration: start low when the market is price-sensitive and costs fall with volume — for example, Reliance Jio's very low introductory tariffs in 2016 to win subscribers fast."] },
    ],
    table: {
      caption: "Skimming vs penetration",
      columns: ["Feature", "Skimming", "Penetration"],
      rows: [
        ["Starting price", "High", "Low"],
        ["Goal", "Margin from early adopters", "Market share fast"],
        ["Best when", "Few rivals, high perceived value", "Price-sensitive market, scale economies"],
      ],
    },
    conclusion:
      "Good pricing balances objectives, demand, costs and competition, then adapts to customers and circumstances. Price should reflect the value customers perceive, not just cost.",
  },

  "contemporary-issues": {
    intro:
      "Contemporary marketing goes beyond selling products: firms must respond to environmental limits, social expectations and new technologies. Two important issues are sustainability marketing and generative AI; demarketing shows another modern use of marketing tools.",
    sections: [
      { h: "Sustainability marketing", points: ["Meaning: creating, communicating and delivering value in ways that support social and environmental well-being as well as profit (the triple bottom line).", "Practices: eco-friendly design and packaging, circular-economy models (reuse, repair, recycle), credible eco-labels such as energy-efficiency star ratings.", "Risk: greenwashing — vague or false green claims destroy trust and invite regulatory action."] },
      { h: "Generative AI in marketing", points: ["Uses: drafting copy and creative variations, personalised messages at scale, chatbots and AI agents, faster research.", "Risks: hallucinated or inaccurate claims, bias, copyright and privacy issues, brand-safety problems.", "Good practice: human review of every claim, disclosure where needed, clear data governance."] },
      { h: "Demarketing", points: ["Meaning: discouraging demand temporarily or permanently, generally or from certain customers (Kotler and Levy, 1971).", "Example: water boards and power utilities asking people to cut use during shortages or peak hours."] },
      { h: "Implications for strategy and consumer behaviour", points: ["Buyers increasingly reward responsible brands, but the attitude-behaviour gap means price and convenience still matter.", "Firms must make the responsible choice also the easy, affordable one."] },
    ],
    conclusion:
      "Contemporary issues are reshaping what marketing is for. Brands that combine real sustainability, responsible AI use and honest communication build long-term trust.",
  },

  "strategic-planning": {
    intro:
      "Strategic planning aligns a company's resources with market opportunities. In large firms it happens at the corporate, division, business-unit and product levels.",
    sections: [
      { h: "Corporate and division planning", points: ["Define the corporate mission (market-oriented, realistic, specific, motivating).", "Establish strategic business units (SBUs), assign resources to each, and assess growth opportunities."] },
      { h: "BCG growth-share matrix", points: ["Classifies SBUs by market growth and relative market share.", "Strategies: build (question marks with potential), hold (stars, strong cash cows), harvest (weak cash cows), divest (dogs)."] },
      { h: "Ansoff growth matrix", points: ["Market penetration (existing products, existing markets), market development (existing products, new markets), product development (new products, existing markets), diversification (new products, new markets)."] },
      { h: "SWOT", points: ["Strengths and weaknesses are internal; opportunities and threats are external. Use it to match capabilities to opportunities."] },
      { h: "Global expansion decisions", points: ["Whether to go abroad → which markets → how to enter → marketing programme → organisation.", "Entry modes with rising commitment and risk: indirect export, direct export, licensing, joint venture, direct investment.", "Standardise vs adapt the marketing mix ('think global, act local')."] },
      { h: "Example", points: ["An Indian FMCG firm uses cash from a mature detergent brand (cash cow) to fund a fast-growing skincare line (question mark), and enters the Gulf with existing products (market development)."] },
    ],
    table: {
      caption: "BCG matrix",
      columns: ["", "High relative share", "Low relative share"],
      rows: [
        ["High growth", "Star — invest to hold", "Question mark — build or exit"],
        ["Low growth", "Cash cow — harvest/hold", "Dog — divest"],
      ],
    },
    conclusion:
      "Tools like BCG, Ansoff and SWOT turn strategy into choices about where to invest. The right global entry mode then balances control, risk and resources.",
  },

  "product-levels-mix": {
    intro:
      "A product is anything offered to satisfy a need. Kotler describes it in levels, organises products into a hierarchy, and groups a company's offerings into a product mix that must be managed line by line.",
    sections: [
      { h: "Five product levels (hotel example)", points: ["Core benefit: rest and sleep.", "Basic product: room with bed, bathroom, towels.", "Expected product: clean sheets, working lights, quiet.", "Augmented product: free Wi-Fi, express checkout, room service that exceeds expectations.", "Potential product: future improvements such as app-controlled rooms."] },
      { h: "Product hierarchy", points: ["Need family → product family → product class → product line → product type → brand → item (SKU)."] },
      { h: "Product mix dimensions", points: ["Width: number of product lines. Length: total number of items. Depth: variants of each product. Consistency: how related the lines are.", "Example: 4 lines with 5, 6, 3 and 6 items → width 4, length 20, average line length 5."] },
      { h: "Product-line decisions", points: ["Line stretching: upward (premium), downward (budget), two-way.", "Line filling: more items within the current range.", "Line pruning: dropping weak items. Line featuring and modernisation."] },
      { h: "Product classification", points: ["Consumer goods: convenience, shopping, specialty, unsought. Industrial goods: materials and parts, capital items, supplies and services."] },
    ],
    table: {
      caption: "Product mix example",
      columns: ["Dimension", "Meaning", "Example"],
      rows: [
        ["Width", "Number of lines", "Soaps, shampoos, toothpaste = 3"],
        ["Length", "Total items", "18 items across all lines"],
        ["Depth", "Variants per product", "One toothpaste in 3 sizes × 2 flavours = 6"],
        ["Consistency", "Relatedness of lines", "High: all personal care"],
      ],
    },
    conclusion:
      "Understanding levels shows where to differentiate (usually the augmented product); managing the mix and lines decides where to grow, fill gaps or prune.",
  },

  "organizational-buying": {
    intro:
      "Organizational buying is the decision process by which formal organizations identify their needs and choose among suppliers. It differs sharply from consumer buying in who buys, how and why.",
    sections: [
      { h: "Characteristics of business markets", points: ["Fewer, larger buyers; close supplier relationships; professional purchasing; multiple buying influences.", "Derived demand (driven by consumer demand), inelastic and fluctuating demand, direct purchasing."] },
      { h: "Buying situations", points: ["Straight rebuy (routine reorder), modified rebuy (change specs, prices or supplier), new task (first-time purchase, most complex)."] },
      { h: "The buying centre", points: ["Initiators, users, influencers, deciders, approvers, buyers and gatekeepers."] },
      { h: "Eight stages of the buying process", points: ["Problem recognition → general need description → product specification → supplier search → proposal solicitation → supplier selection → order-routine specification → performance review."] },
      { h: "Influences on business buyers", points: ["Environmental (economy, technology), organizational (policies, systems), interpersonal (authority, status), individual (age, risk attitude)."] },
      { h: "Example", points: ["A hospital buying an MRI machine: radiologists (users) raise the need, specifications are drafted, three suppliers submit proposals, a committee (deciders and approvers) selects one, a service contract is agreed, and performance is reviewed after a year."] },
      { h: "Implications for the marketer", points: ["Map the buying centre and tailor messages: technical proof for users and influencers, cost and ROI evidence for deciders and approvers.", "In straight rebuys, protect the account with consistent quality and delivery; in new-task buying, offer consultation, trials and references."] },
    ],
    table: {
      caption: "Consumer vs organizational buying",
      columns: ["Aspect", "Consumer", "Organizational"],
      rows: [
        ["Buyers", "Many, small", "Few, large"],
        ["Decision makers", "Individual or family", "Buying centre"],
        ["Process", "Informal", "Formal, documented"],
        ["Motives", "Often emotional", "Mainly rational, cost and quality"],
      ],
    },
    conclusion:
      "Selling to organizations means understanding the whole buying centre and process, building relationships, and proving value with evidence.",
  },

  "consumer-behaviour-factors": {
    intro:
      "Consumer behaviour is the study of how people select, buy, use and dispose of products. Four groups of factors — cultural, social, personal and psychological — shape every purchase.",
    sections: [
      { h: "1. Cultural factors", points: ["Culture: the basic values and preferences learned from family and society (festival buying at Diwali).", "Subculture: religion, region, language. Social class: income, occupation, education."] },
      { h: "2. Social factors", points: ["Reference groups: primary (family, friends), secondary, aspirational, dissociative; opinion leaders and influencers.", "Family: of orientation and of procreation. Roles and status."] },
      { h: "3. Personal factors", points: ["Age and life-cycle stage, occupation and economic circumstances, personality and self-concept, lifestyle and values."] },
      { h: "4. Psychological factors", points: ["Motivation (Maslow, Herzberg, Freud), perception (selective attention, distortion, retention), learning, beliefs and attitudes, memory."] },
      { h: "Implications for marketers", points: ["Segment and target using these factors; use influencers for reference-group effects; time campaigns to festivals; design messages that fit attitudes rather than fight them."] },
      { h: "Example: a first car purchase", points: ["Family expectations and festive timing (cultural), friends' advice (social), new job and young family (personal), safety need and brand perceptions (psychological) all shape the final choice."] },
      { h: "Indian illustrations", points: ["Regional-language advertising reaches subcultures; festive offers around Diwali or Onam use cultural timing.", "Influencer content uses reference-group power; EMI and small packs address economic circumstances."] },
    ],
    diagram: "Four boxes (cultural, social, personal, psychological) with arrows pointing to 'Buyer decision'.",
    conclusion:
      "No purchase is driven by one factor alone. Marketers who understand how these four groups combine can segment better and communicate more persuasively.",
  },

  "segmentation-bases": {
    intro:
      "Market segmentation divides a market into groups of buyers with similar needs, characteristics or behaviour, so that each group can be served with a fitting marketing mix.",
    sections: [
      { h: "Bases for segmenting consumer markets", points: ["Geographic: region, city size, climate.", "Demographic: age, gender, income, occupation, life stage, generation.", "Psychographic: lifestyle, personality, values (VALS).", "Behavioural: occasions, benefits sought, user status, usage rate, loyalty, buyer-readiness stage, attitude."] },
      { h: "Bases for segmenting business markets", points: ["Demographic (industry, company size, location), operating variables (technology, user status), purchasing approaches, situational factors (urgency, order size), personal characteristics (loyalty, risk attitude)."] },
      { h: "Criteria for effective segments", points: ["Measurable, substantial, accessible, differentiable and actionable."] },
      { h: "Evaluating and selecting segments", points: ["Segment size and growth, structural attractiveness (Porter's five forces), company objectives and resources."] },
      { h: "Example: a toothpaste brand", points: ["Benefit segments: cavity protection (families), whitening (young professionals), sensitivity relief (older adults), herbal/natural (health-conscious). Each gets its own variant and message."] },
      { h: "Business-market example", points: ["A software company segments SMEs and large enterprises (company size), banking and retail clients (industry), and centralised IT procurement versus department-led buying (purchasing approach), with a different sales approach for each."] },
    ],
    table: {
      caption: "Consumer segmentation bases",
      columns: ["Base", "Variables", "Example"],
      rows: [
        ["Geographic", "Region, city size", "Different packs for metros and rural markets"],
        ["Demographic", "Age, income", "Budget and premium phone models"],
        ["Psychographic", "Lifestyle, values", "Fitness-focused or eco-conscious buyers"],
        ["Behavioural", "Benefits, usage rate", "Heavy users get loyalty rewards"],
      ],
    },
    conclusion:
      "Good segmentation finds groups that differ meaningfully and can be reached profitably. Combining several bases usually gives the sharpest segments.",
  },

  "demand-forecasting": {
    intro:
      "Demand measurement estimates how much a defined customer group will buy in a defined area and period; forecasting predicts future demand. Together they guide production, budgets and targets.",
    sections: [
      { h: "Key terms", points: ["Market demand, market potential (the upper limit), company demand, company sales forecast, market share (company sales ÷ industry sales)."] },
      { h: "Estimating current demand", points: ["Total market potential: Q = n × q × p.", "Area market potential: market-buildup method (business markets) or multiple-factor index method (consumer markets).", "Chain-ratio method: start from a base and apply successive percentages."] },
      { h: "Forecasting methods", points: ["Survey of buyers' intentions.", "Composite of sales-force opinion.", "Expert opinion, including the Delphi method (anonymous experts, several rounds).", "Past-sales analysis: time series (trend, cycle, seasonal, erratic), exponential smoothing.", "Market-test method for new products."] },
      { h: "Worked example", points: ["1 crore potential buyers × 3 units a year × ₹200 average price = ₹600 crore market potential.", "If our sales are ₹60 crore, our share of that potential is 10%."] },
      { h: "Choosing a method", points: ["Stable markets suit time series; new or volatile markets need buyer surveys, expert opinion, test markets and scenario planning."] },
      { h: "Linking forecasts to productivity", points: ["Compare actual sales with the forecast (sales-variance analysis), track market share, and revise forecasts every quarter as new data arrives."] },
    ],
    conclusion:
      "Sound demand measurement turns opportunity into numbers that can be planned against. Using more than one forecasting method and revisiting forecasts often reduces costly errors.",
  },

  "launch-marketing-mix": {
    intro:
      "The marketing mix is the set of controllable tools — product, price, place and promotion — that a firm blends to produce the response it wants. Case: launching a plant-based protein drink in India. The plan below shows the structure; adapt the details to the product named in your exam question.",
    sections: [
      { h: "Positioning first", points: ["Target: urban 20–35 year-olds who work out and want convenient nutrition.", "Positioning: 'the tasty, dairy-free protein drink for busy, active people', with points of parity (protein content, safety) and a point of difference (taste and clean label)."] },
      { h: "Product", points: ["Core benefit: convenient protein. Basic product: 20 g protein, low sugar. Augmented: recyclable packs, QR-linked workout content.", "Line: three flavours, a single-serve bottle and a powder pack."] },
      { h: "Price", points: ["Value pricing slightly below imported brands; an introductory price and trial packs (penetration of trial).", "Psychological price points (₹99 single serve); bundle discounts for packs of six."] },
      { h: "Place", points: ["Launch in metros through quick commerce, e-commerce, modern trade and gyms (selective), expanding to intensive distribution as demand grows."] },
      { h: "Promotion", points: ["Fitness influencers and trainers (reference groups), sampling at gyms and marathons, performance digital ads, an app-based loyalty programme."] },
      { h: "Measuring success", points: ["Trial and repeat rates, distribution reach, customer acquisition cost, share in the protein-drink category."] },
    ],
    table: {
      caption: "Marketing mix summary",
      columns: ["P", "Decision"],
      rows: [
        ["Product", "3 flavours, 20 g protein, recyclable packs"],
        ["Price", "Value price, trial packs, bundles"],
        ["Place", "Quick commerce, e-commerce, gyms, modern trade"],
        ["Promotion", "Influencers, sampling, digital ads, loyalty app"],
      ],
    },
    conclusion:
      "A launch succeeds when all four Ps support one clear position. Start focused, measure trial and repeat, then scale distribution and promotion as demand is proven.",
  },
};
