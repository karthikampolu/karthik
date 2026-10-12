import type { UnitMeta } from "./types";

export const UNITS: UnitMeta[] = [
  {
    id: "u1",
    short: "Unit I",
    name: "Marketing management & strategy",
    co: "CO1",
    syllabus:
      "Scope of marketing, core concepts, evolution of modern marketing and orientations, marketing mix, creating customer value, value chain, corporate and division strategic planning, global expansion decisions.",
    expected: 5,
    inSample: 5,
  },
  {
    id: "u2",
    short: "Unit II",
    name: "Capturing marketing insights",
    co: "CO2",
    syllabus:
      "Market intelligence, macro and micro environment, forecasting and demand measurement, marketing research, measuring marketing productivity.",
    expected: 4,
    inSample: 4,
  },
  {
    id: "u3",
    short: "Unit III",
    name: "Consumer behaviour",
    co: "CO3",
    syllabus:
      "Consumer roles, factors influencing buying motives, buying decision process, business vs consumer market, organizational buying process, sustainable consumer behaviour.",
    expected: 5,
    inSample: 7,
  },
  {
    id: "u4",
    short: "Unit IV",
    name: "Segmentation, targeting & positioning",
    co: "CO4",
    syllabus:
      "Bases for segmenting consumer and business markets, evaluating and selecting segments, targeting, positioning and value proposition, frame of reference, POP/POD, Martech and positioning.",
    expected: 5,
    inSample: 4,
  },
  {
    id: "u5",
    short: "Unit V",
    name: "Product, pricing & distribution",
    co: "CO5",
    syllabus:
      "Product characteristics and classification, hierarchy, systems and mixes, life cycle, new product development, pricing environment, setting and adapting price, channel functions, multichannel systems, channel management, sales and ROI analytics.",
    expected: 9,
    inSample: 10,
  },
  {
    id: "u6",
    short: "Unit VI",
    name: "Contemporary issues in marketing",
    co: "CO6",
    syllabus:
      "Sustainability marketing, social marketing, generative and agentic AI in marketing, consumer psychology and neuromarketing, demarketing, Nordic culture.",
    expected: 2,
    inSample: 0,
  },
];

export const UNIT_BY_ID = Object.fromEntries(UNITS.map((u) => [u.id, u])) as Record<
  UnitMeta["id"],
  UnitMeta
>;
