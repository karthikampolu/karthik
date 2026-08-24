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
  whyFits: string;
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
      "Nominal data sorts observations into named categories with no inherent order or numeric meaning — labels like a disaster type or a species name. You can count how often each category occurs, but you can't rank, subtract, or average the categories themselves.",
    whyUsed:
      "It's used in statistics to summarize frequencies and proportions across groups (mode, chi-square tests) when the categories themselves carry no quantitative relationship.",
    dataset: {
      name: "U.S. Billion-Dollar Weather and Climate Disasters, by disaster type (2024)",
      sourceName: "NOAA NCEI — Billion-Dollar Weather and Climate Disasters",
      sourceUrl: "https://www.ncei.noaa.gov/access/billions/",
      asOf: "Full year 2024",
    },
    whyFits:
      "\"Disaster type\" (Severe Storm, Tropical Cyclone, Wildfire, …) is a label with no natural ranking — a Winter Storm isn't quantitatively \"more\" or \"less\" than a Wildfire. Only the category name and the count of events per category carry meaning here.",
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
      "Ordinal data has a meaningful order, but the gaps between categories aren't necessarily equal or measurable. You can say one value ranks higher than another, but not by how much.",
    whyUsed:
      "It's used in statistics when you need to rank or compare severity/preference, using tools like the median and rank-based tests, rather than means that assume equal spacing.",
    dataset: {
      name: "Worst U.S. Drought Monitor category currently affecting each state",
      sourceName: "U.S. Drought Monitor (NDMC / NOAA / USDA)",
      sourceUrl: "https://droughtmonitor.unl.edu/CurrentMap/StateDroughtMonitor.aspx",
      asOf: "Data valid August 18, 2026",
    },
    whyFits:
      "The Drought Monitor's categories (None → D0 → D1 → D2 → D3 → D4) are explicitly ordered by severity, but the jump from D1 to D2 isn't the same quantitative \"distance\" as D3 to D4 — the scale ranks conditions without a fixed unit between ranks.",
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
      "Interval data has equal, measurable gaps between values, so addition and subtraction are meaningful — but there's no true zero. Zero doesn't mean \"none of the quantity,\" so ratios aren't meaningful (80°F isn't \"twice as warm\" as 40°F).",
    whyUsed:
      "It's used in statistics wherever means and standard deviations of a continuous quantity are needed, but multiplicative comparisons would be misleading.",
    dataset: {
      name: "Central Park, NY — normal monthly average temperature (1991–2020)",
      sourceName: "National Weather Service, NWS Forecast Office New York, NY",
      sourceUrl: "https://www.weather.gov/okx/CentralParkHistorical",
      asOf: "30-year normals period: 1991–2020",
    },
    whyFits:
      "Fahrenheit temperature has equal-sized degrees, so the 9.1° gap from June to July means the same thing as any other 9.1° gap. But 0°F is an arbitrary point on the scale, not \"no temperature\" — so July (77.5°F) isn't meaningfully \"twice as hot\" as a 38.75°F day.",
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
      "Ratio data has equal intervals and a true, meaningful zero — zero means a total absence of the quantity. That makes ratios meaningful: a value of 200 really is twice as much as 100.",
    whyUsed:
      "It's used in statistics for the widest range of operations — means, ratios, geometric means, coefficients of variation — since every arithmetic comparison is valid.",
    dataset: {
      name: "Real-time streamflow discharge at eight USGS gauging stations",
      sourceName: "USGS National Water Information System (NWIS)",
      sourceUrl: "https://waterdata.usgs.gov/nwis/uv",
      asOf: "August 23, 2026 (provisional, subject to revision)",
    },
    whyFits:
      "Streamflow discharge is measured in cubic feet per second from a true zero (a dry streambed has 0 cfs, not an arbitrary reference point). That true zero is what makes it valid to say the Mississippi's flow is roughly 1,950× Peachtree Creek's — a ratio statement interval data can't support.",
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
