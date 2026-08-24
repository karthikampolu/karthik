// Real, sourced datasets used to illustrate the four levels of measurement.
// Every number below is taken directly from the cited government/institutional
// source — nothing here is synthetic or placeholder data.

export type ScaleId = "nominal" | "ordinal" | "interval" | "ratio";

export type ChartType = "category-bar" | "ordinal-bar" | "line" | "dot-strip";

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
      "Interval data has equal, ruler-like steps between values, so adding and subtracting makes sense. But zero is just a point on the scale, not \"none of it\" — so you can't say one value is a multiple of another.",
    whyUsed:
      "Statisticians use it to average and compare continuous values meaningfully — but never as a ratio, since \"zero\" doesn't mean \"nothing\" here.",
    dataset: {
      name: "Central Park, NY — normal monthly average temperature (1991–2020)",
      sourceName: "National Weather Service, NWS Forecast Office New York, NY",
      sourceUrl: "https://www.weather.gov/okx/CentralParkHistorical",
      asOf: "30-year normals period: 1991–2020",
    },
    quickTest:
      "Are the gaps between numbers even and measurable, but \"zero\" doesn't mean \"nothing exists\"? Then it's interval.",
    whyFits: [
      "Every degree Fahrenheit is the same size step — the gap from 63.2° to 72° means exactly what the same 8.8° gap means anywhere else on the scale.",
      "0°F isn't \"no temperature\" — it's just a cold day in North Dakota. It's an arbitrary marker, not an absence.",
      "Because zero is arbitrary, saying \"July is twice as hot as a 38.75° day\" is meaningless — even though July really is 38.75° warmer.",
    ],
    table: {
      columns: ["Month", "Normal Average Temperature (°F)"],
      rows: [
        ["Jan", 33.7],
        ["Mar", 42.8],
        ["May", 63.2],
        ["Jun", 72.0],
        ["Jul", 77.5],
        ["Aug", 76.1],
        ["Oct", 57.9],
        ["Dec", 39.1],
      ],
    },
    chart: {
      type: "line",
      xLabel: "Month",
      yLabel: "Normal avg. temperature (°F)",
      data: [
        { label: "Jan", value: 33.7 },
        { label: "Mar", value: 42.8 },
        { label: "May", value: 63.2 },
        { label: "Jun", value: 72.0 },
        { label: "Jul", value: 77.5 },
        { label: "Aug", value: 76.1 },
        { label: "Oct", value: 57.9 },
        { label: "Dec", value: 39.1 },
      ],
      note: "Y-axis is intentionally not zero-based — 0°F is not \"no temperature,\" so a zero baseline would be misleading here.",
    },
  },
  {
    id: "ratio",
    order: 4,
    name: "Ratio Scale",
    shortLabel: "Ratio",
    definition:
      "Ratio data is like interval data, plus one thing: zero really means \"none of it.\" That true zero is what makes ratios and multiples meaningful — 200 really is twice as much as 100.",
    whyUsed:
      "Statisticians use it for the full toolkit — averages, ratios, percent change, coefficients of variation — since every kind of arithmetic comparison holds up.",
    dataset: {
      name: "Real-time streamflow discharge at eight USGS gauging stations",
      sourceName: "USGS National Water Information System (NWIS)",
      sourceUrl: "https://waterdata.usgs.gov/nwis/uv",
      asOf: "August 23, 2026 (provisional, subject to revision)",
    },
    quickTest:
      "Does zero mean a true, total absence of the thing being measured? Then it's ratio.",
    whyFits: [
      "0 cubic feet per second means an actually dry streambed — a real absence of flow, not just a low reading.",
      "Because zero is real, ratios hold up: the Mississippi's ~174,000 cfs genuinely is about 9,900× Peachtree Creek's 17.5 cfs.",
      "Every basic stat works here — you can average these flows, compare them as percentages, or rank them — nothing is off-limits like it was with temperature.",
    ],
    table: {
      columns: ["USGS Gauging Station", "Discharge (cubic ft/sec)"],
      rows: [
        ["Mississippi River at St. Louis, MO", "174,000"],
        ["Columbia River at The Dalles, OR", "106,000"],
        ["Colorado River at Lees Ferry, AZ", "8,420"],
        ["Connecticut River at Thompsonville, CT", "3,180"],
        ["Souris River near Sherwood, ND", "197"],
        ["Missisquoi River at Swanton, VT", "157"],
        ["Guadalupe River at Comfort, TX", "89.2"],
        ["Peachtree Creek at Atlanta, GA", "17.5"],
      ],
    },
    chart: {
      type: "dot-strip",
      xLabel: "Discharge, log scale (cubic ft/sec)",
      yLabel: "Station",
      data: [
        { label: "Mississippi R. at St. Louis, MO", value: 174000 },
        { label: "Columbia R. at The Dalles, OR", value: 106000 },
        { label: "Colorado R. at Lees Ferry, AZ", value: 8420 },
        { label: "Connecticut R. at Thompsonville, CT", value: 3180 },
        { label: "Souris R. near Sherwood, ND", value: 197 },
        { label: "Missisquoi R. at Swanton, VT", value: 157 },
        { label: "Guadalupe R. at Comfort, TX", value: 89.2 },
        { label: "Peachtree Creek at Atlanta, GA", value: 17.5 },
      ],
      note: "Plotted on a log scale because discharge spans four orders of magnitude — the true zero point still anchors the scale even though it's off this chart.",
    },
  },
];

export function getScale(id: ScaleId) {
  return measurementScales.find((s) => s.id === id);
}
