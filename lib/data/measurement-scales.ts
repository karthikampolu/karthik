// Real, sourced datasets used to illustrate the four levels of measurement.
// Every number below is taken directly from the cited government/institutional
// source — nothing here is synthetic or placeholder data.

export type ScaleId = "nominal" | "ordinal" | "interval" | "ratio";

export type ChartType = "category-bar" | "ordinal-bar" | "histogram";

export type ScaleTable = {
  columns: string[];
  rows: (string | number)[][];
};

export type ScaleChart = {
  type: ChartType;
  xLabel: string;
  yLabel: string;
  /** Ordered category labels for ordinal charts, low → high. */
  categoryOrder?: string[];
  data: { label: string; value: number }[];
  note?: string;
};

export type ScaleEntry = {
  id: ScaleId;
  order: number;
  name: string;
  shortLabel: string;
  definition: string;
  whyUsed: string;
  dataset: {
    name: string;
    sourceName: string;
    sourceUrl: string;
    asOf: string;
  };
  /** A one-line yes/no test the reader can apply to any dataset. */
  quickTest: string;
  /** 2-3 short, concrete reasons this dataset passes that test. */
  whyFits: string[];
  table: ScaleTable;
  chart: ScaleChart;
};

export const measurementScales: ScaleEntry[] = [
  {
    id: "nominal",
    order: 1,
    name: "Nominal Scale",
    shortLabel: "Nominal",
    definition:
      "Nominal data is just names for groups — labels with no order and no numbers attached. Think \"eye color\" or \"country.\" The only thing you can really do with it is count how many fall into each group.",
    whyUsed:
      "Statisticians use it to answer \"how many of each?\" questions — counts, percentages, and the mode (most common group) — never an average.",
    dataset: {
      name: "U.S. Billion-Dollar Weather and Climate Disasters, by disaster type (2024)",
      sourceName: "NOAA NCEI — Billion-Dollar Weather and Climate Disasters",
      sourceUrl: "https://www.ncei.noaa.gov/access/billions/",
      asOf: "Full year 2024",
    },
    quickTest:
      "Could you rearrange these categories in any order without losing information? If yes, it's nominal.",
    whyFits: [
      "\"Wildfire,\" \"Flooding,\" \"Winter Storm\" are just names — none of them is naturally \"before\" or \"after\" another.",
      "The only valid math here is counting: 17 severe storms happened, 1 wildfire did. You can't average \"Wildfire\" and \"Flooding.\"",
      "Swap the row order in the table above — nothing about the data changes. That's the tell.",
    ],
    table: {
      columns: ["Disaster Type", "Separate Billion-Dollar Events (2024)"],
      rows: [
        ["Severe Storm", 17],
        ["Tropical Cyclone", 5],
        ["Winter Storm", 2],
        ["Flooding", 1],
        ["Drought / Heat Wave", 1],
        ["Wildfire", 1],
      ],
    },
    chart: {
      type: "category-bar",
      xLabel: "Disaster type",
      yLabel: "Number of events",
      data: [
        { label: "Severe Storm", value: 17 },
        { label: "Tropical Cyclone", value: 5 },
        { label: "Winter Storm", value: 2 },
        { label: "Flooding", value: 1 },
        { label: "Drought / Heat Wave", value: 1 },
        { label: "Wildfire", value: 1 },
      ],
    },
  },
  {
    id: "ordinal",
    order: 2,
    name: "Ordinal Scale",
    shortLabel: "Ordinal",
    definition:
      "Ordinal data can be ranked low to high, but the space between ranks isn't a fixed, equal amount. Think \"1st, 2nd, 3rd place\" — you know the order, not how far apart they finished.",
    whyUsed:
      "Statisticians use it to compare rank and find the middle value (median) — but never a mathematical average, since the steps between ranks aren't guaranteed equal.",
    dataset: {
      name: "Worst U.S. Drought Monitor category currently affecting each state",
      sourceName: "U.S. Drought Monitor (NDMC / NOAA / USDA)",
      sourceUrl: "https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx",
      asOf: "Data valid August 18, 2026",
    },
    quickTest:
      "Is there a clear order, but the gap between steps isn't a fixed, countable amount? Then it's ordinal.",
    whyFits: [
      "The categories have a real order: None is better than D0, which is better than D1, all the way to D4.",
      "But \"D1 to D2\" isn't the same size jump as \"D3 to D4\" — there's no ruler measuring the distance between drought categories.",
      "You can say Texas (D4) is worse off than Georgia (D1) — just not \"how many times worse,\" the way you could with a plain number.",
    ],
    table: {
      columns: ["State", "Worst Category Currently Observed"],
      rows: [
        ["New Mexico", "D4 — Exceptional Drought"],
        ["Texas", "D4 — Exceptional Drought"],
        ["Arizona", "D2 — Severe Drought"],
        ["Kansas", "D2 — Severe Drought"],
        ["California", "D2 — Severe Drought"],
        ["Iowa", "D2 — Severe Drought"],
        ["Georgia", "D1 — Moderate Drought"],
      ],
    },
    chart: {
      type: "ordinal-bar",
      xLabel: "State",
      yLabel: "Drought severity rank",
      categoryOrder: ["None", "D0", "D1", "D2", "D3", "D4"],
      data: [
        { label: "New Mexico", value: 5 },
        { label: "Texas", value: 5 },
        { label: "Arizona", value: 3 },
        { label: "Kansas", value: 3 },
        { label: "California", value: 3 },
        { label: "Iowa", value: 3 },
        { label: "Georgia", value: 2 },
      ],
    },
  },
  {
    id: "interval",
    order: 3,
    name: "Interval Scale",
    shortLabel: "Interval",
    definition:
      "Interval data sits on a scale with equal, ruler-like steps, so adding and subtracting makes sense. But zero is just a point on that ruler, not \"none of it\" — so you can't say one value is a multiple of another. This is also where the name comes from: statisticians sort continuous data like this into equal-width \"class intervals\" (30–40°, 40–50°, and so on) and count how many observations land in each one.",
    whyUsed:
      "Statisticians use it to average and compare continuous values meaningfully, and to bucket them into equal-width classes for a frequency table — but never as a ratio, since \"zero\" doesn't mean \"nothing\" here.",
    dataset: {
      name: "Central Park, NY — normal monthly average temperature (1991–2020), grouped into 10° classes",
      sourceName: "National Weather Service, NWS Forecast Office New York, NY",
      sourceUrl: "https://www.weather.gov/okx/CentralParkHistorical",
      asOf: "30-year normals period: 1991–2020",
    },
    quickTest:
      "Are the gaps between numbers even and measurable, but \"zero\" doesn't mean \"nothing exists\"? Then it's interval.",
    whyFits: [
      "Every degree Fahrenheit is the same size step, so it's fair to carve the year into equal 10° classes — 30–40°, 40–50°, and so on — the way you would with any interval data.",
      "0°F isn't \"no temperature,\" it's just a cold day in North Dakota — an arbitrary marker, not an absence. That's fine for building classes; it just means you can't say one class is \"twice as warm\" as another.",
      "Notice New York's months split almost evenly between the cold classes (Dec–Feb) and the hot ones (Jun–Aug), with spring and fall doing the bridging — that shape is the whole point of grouping into classes.",
    ],
    table: {
      columns: ["Temperature Class (°F)", "Months in This Class", "Count"],
      rows: [
        ["30 – 40°", "Jan (33.7°), Feb (35.9°), Dec (39.1°)", 3],
        ["40 – 50°", "Mar (42.8°), Nov (48.0°)", 2],
        ["50 – 60°", "Apr (53.7°), Oct (57.9°)", 2],
        ["60 – 70°", "May (63.2°), Sep (69.2°)", 2],
        ["70 – 80°", "Jun (72.0°), Jul (77.5°), Aug (76.1°)", 3],
      ],
    },
    chart: {
      type: "histogram",
      xLabel: "Temperature class (°F)",
      yLabel: "Number of months",
      data: [
        { label: "30–40°", value: 3 },
        { label: "40–50°", value: 2 },
        { label: "50–60°", value: 2 },
        { label: "60–70°", value: 2 },
        { label: "70–80°", value: 3 },
      ],
      note: "Bars touch — that's histogram convention, because the classes are continuous, equal-width slices of one scale (only possible because this is interval data), not separate categories.",
    },
  },
  {
    id: "ratio",
    order: 4,
    name: "Ratio Scale",
    shortLabel: "Ratio",
    definition:
      "Ratio data is like interval data, plus one thing: zero really means \"none of it.\" That true zero is what makes ratios and multiples meaningful — 200 really is twice as much as 100. Like interval data, it can also be sorted into equal-width classes and counted — the classic ratio-scale example being \"how many rivers fall into each size class.\"",
    whyUsed:
      "Statisticians use it for the full toolkit — averages, ratios, percent change, coefficients of variation, and equal-width frequency classes — since every kind of arithmetic comparison holds up, all the way down to a true zero.",
    dataset: {
      name: "Real-time streamflow discharge at eight USGS gauging stations, grouped by size class",
      sourceName: "USGS National Water Information System (NWIS)",
      sourceUrl: "https://waterdata.usgs.gov/nwis/uv",
      asOf: "August 23, 2026 (provisional, subject to revision)",
    },
    quickTest:
      "Does zero mean a true, total absence of the thing being measured? Then it's ratio.",
    whyFits: [
      "0 cubic feet per second means an actually dry streambed — a real absence of flow, not an arbitrary reference point like 0°F was.",
      "Because zero is real, ratios hold up: the Mississippi's ~174,000 cfs genuinely is about 9,900× Peachtree Creek's 17.5 cfs — a comparison that only makes sense with a true zero underneath it.",
      "The classes below span factors of ten precisely because a true zero lets you multiply your way up the scale — there's no equivalent \"×10 class\" you could build on the drought-severity ranks.",
    ],
    table: {
      columns: ["Discharge Class (cfs)", "Stations in This Class", "Count"],
      rows: [
        ["10 – 100", "Peachtree Creek, GA (17.5); Guadalupe R., TX (89.2)", 2],
        ["100 – 1,000", "Missisquoi R., VT (157); Souris R., ND (197)", 2],
        ["1,000 – 10,000", "Connecticut R., CT (3,180); Colorado R., AZ (8,420)", 2],
        ["10,000 – 100,000", "— no stations in this range —", 0],
        ["100,000 – 1,000,000", "Columbia R., OR (106,000); Mississippi R., MO (174,000)", 2],
      ],
    },
    chart: {
      type: "histogram",
      xLabel: "Discharge class, log scale (cfs)",
      yLabel: "Number of stations",
      data: [
        { label: "10–100", value: 2 },
        { label: "100–1K", value: 2 },
        { label: "1K–10K", value: 2 },
        { label: "10K–100K", value: 0 },
        { label: "100K–1M", value: 2 },
      ],
      note: "These 8 stations happen to split neatly into small creeks and major rivers, with an empty class in between — a real gap this dataset shows, not a rounding artifact.",
    },
  },
];

export function getScale(id: ScaleId) {
  return measurementScales.find((s) => s.id === id);
}
