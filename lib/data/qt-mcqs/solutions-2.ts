import type { ModelAnswer } from "@/lib/exam-prep/types";

/**
 * Worked solutions for the QTTM509 predicted Part B questions (part 2):
 * central tendency, dispersion, skewness, index numbers and theory.
 */
export const SOLUTIONS_2: Record<string, ModelAnswer> = {
  "grouped-central": {
    intro:
      "Use the step-deviation method for the mean (A = 45, h = 10) and the cumulative frequency column for the median, quartiles, deciles and percentiles. N = 50.",
    sections: [
      { h: "Mean", points: ["Σfd′ = −14.", "x̄ = A + (Σfd′/N) × h = 45 + (−14/50) × 10 = 45 − 2.8 = 42.2."] },
      { h: "Median (N/2 = 25th item, class 40–50)", points: ["Median = L + ((N/2 − cf)/f) × h = 40 + ((25 − 20)/16) × 10 = 43.125."] },
      { h: "Mode (modal class 40–50)", points: ["Mode = L + ((f₁ − f₀)/(2f₁ − f₀ − f₂)) × h = 40 + ((16 − 10)/(32 − 10 − 8)) × 10 = 40 + 4.29 = 44.29."] },
      { h: "Partition values", points: ["Q₁ (N/4 = 12.5th, class 30–40): 30 + ((12.5 − 10)/10) × 10 = 32.5.", "Q₃ (3N/4 = 37.5th, class 50–60): 50 + ((37.5 − 36)/8) × 10 = 51.875.", "D₇ (7N/10 = 35th, class 40–50): 40 + ((35 − 20)/16) × 10 = 49.375.", "P₉₀ (90N/100 = 45th, class 60–70): 60 + ((45 − 44)/6) × 10 = 61.67."] },
    ],
    table: {
      caption: "Working table (A = 45, h = 10)",
      columns: ["Wages", "f", "Mid x", "d′", "fd′", "cf"],
      rows: [
        ["10–20", "4", "15", "−3", "−12", "4"],
        ["20–30", "6", "25", "−2", "−12", "10"],
        ["30–40", "10", "35", "−1", "−10", "20"],
        ["40–50", "16", "45", "0", "0", "36"],
        ["50–60", "8", "55", "1", "8", "44"],
        ["60–70", "6", "65", "2", "12", "50"],
        ["Total", "50", "", "", "−14", ""],
      ],
    },
    conclusion:
      "Mean = ₹42.2, median = ₹43.125, mode = ₹44.29 (hundreds); Q₁ = 32.5, Q₃ = 51.875, D₇ = 49.375, P₉₀ = 61.67. Since mean < median < mode, the distribution is slightly negatively skewed.",
  },

  "sd-cv-batsmen": {
    intro:
      "The better run-getter has the higher mean. The more consistent batsman has the lower coefficient of variation, CV = σ/x̄ × 100. σ is used because it is the most reliable absolute measure, and CV because the two means differ.",
    sections: [
      { h: "Batsman A", points: ["Σx = 500, x̄ = 50.", "Σd² = 17,498, σ = √(17,498/10) = √1749.8 = 41.83.", "CV = 41.83/50 × 100 = 83.66%."] },
      { h: "Batsman B", points: ["Σx = 330, x̄ = 33.", "Σd² = 5,462, σ = √(5,462/10) = √546.2 = 23.37.", "CV = 23.37/33 × 100 = 70.82%."] },
      { h: "Decision", points: ["Better run-getter: A (mean 50 > 33).", "More consistent: B (CV 70.82% < 83.66%)."] },
    ],
    table: {
      caption: "Deviation table (x̄A = 50, x̄B = 33)",
      columns: ["Innings", "A", "dA", "dA²", "B", "dB", "dB²"],
      rows: [
        ["1", "12", "−38", "1444", "47", "14", "196"],
        ["2", "115", "65", "4225", "12", "−21", "441"],
        ["3", "6", "−44", "1936", "76", "43", "1849"],
        ["4", "73", "23", "529", "42", "9", "81"],
        ["5", "7", "−43", "1849", "4", "−29", "841"],
        ["6", "19", "−31", "961", "51", "18", "324"],
        ["7", "119", "69", "4761", "37", "4", "16"],
        ["8", "36", "−14", "196", "48", "15", "225"],
        ["9", "84", "34", "1156", "13", "−20", "400"],
        ["10", "29", "−21", "441", "0", "−33", "1089"],
        ["Total", "500", "0", "17498", "330", "0", "5462"],
      ],
    },
    conclusion:
      "A scores more runs on average, but B is more consistent (lower CV). A selector wanting a dependable anchor would prefer B; one wanting big scores would prefer A.",
  },

  "skew-pearson-bowley": {
    intro:
      "Karl Pearson: Sk = (x̄ − Mode)/σ. Bowley: Sk = (Q₃ + Q₁ − 2 Median)/(Q₃ − Q₁). Use step deviations with A = 25 and h = 10. N = 100.",
    sections: [
      { h: "Mean and SD", points: ["Σfd′ = 62, Σfd′² = 260.", "x̄ = 25 + (62/100) × 10 = 31.2.", "σ = 10 × √(260/100 − (62/100)²) = 10 × √(2.60 − 0.3844) = 10 × 1.4885 = 14.88."] },
      { h: "Mode (modal class 20–30)", points: ["Mode = 20 + ((30 − 18)/(60 − 18 − 22)) × 10 = 20 + (12/20) × 10 = 26."] },
      { h: "Median and quartiles", points: ["Median (50th, class 20–30): 20 + ((50 − 23)/30) × 10 = 29.", "Q₁ (25th, class 20–30): 20 + ((25 − 23)/30) × 10 = 20.67.", "Q₃ (75th, class 30–40): 30 + ((75 − 53)/22) × 10 = 40."] },
      { h: "Coefficients", points: ["Karl Pearson: (31.2 − 26)/14.88 = 0.35.", "Bowley: (40 + 20.67 − 58)/(40 − 20.67) = 2.67/19.33 = 0.14."] },
    ],
    table: {
      caption: "Working table (A = 25, h = 10)",
      columns: ["Class", "f", "Mid x", "d′", "fd′", "fd′²", "cf"],
      rows: [
        ["0–10", "5", "5", "−2", "−10", "20", "5"],
        ["10–20", "18", "15", "−1", "−18", "18", "23"],
        ["20–30", "30", "25", "0", "0", "0", "53"],
        ["30–40", "22", "35", "1", "22", "22", "75"],
        ["40–50", "12", "45", "2", "24", "48", "87"],
        ["50–60", "8", "55", "3", "24", "72", "95"],
        ["60–70", "5", "65", "4", "20", "80", "100"],
        ["Total", "100", "", "", "62", "260", ""],
      ],
    },
    diagram: "Sketch a curve with a longer right tail, marking Mode (26) < Median (29) < Mean (31.2).",
    conclusion:
      "Both coefficients are positive, so the distribution is positively skewed. Karl Pearson's value (0.35) is larger than Bowley's (0.14) because it reflects the long right tail through the mean and SD, while Bowley's looks only at the middle 50% of the data.",
  },

  "moments-kurtosis": {
    intro:
      "Central moments: μᵣ = Σ(x − x̄)ʳ/n. Skewness β₁ = μ₃²/μ₂³ (direction from the sign of μ₃); kurtosis β₂ = μ₄/μ₂². Here x̄ = 30/5 = 6.",
    sections: [
      { h: "Moments", points: ["μ₁ = 0/5 = 0 (always).", "μ₂ = 46/5 = 9.2.", "μ₃ = −18/5 = −3.6.", "μ₄ = 610/5 = 122."] },
      { h: "β₁ and γ₁", points: ["β₁ = (−3.6)²/9.2³ = 12.96/778.69 ≈ 0.0166.", "γ₁ = −√0.0166 ≈ −0.13 (negative because μ₃ < 0)."] },
      { h: "β₂ and γ₂", points: ["β₂ = 122/9.2² = 122/84.64 ≈ 1.44.", "γ₂ = β₂ − 3 ≈ −1.56."] },
    ],
    table: {
      caption: "Working table (x̄ = 6)",
      columns: ["x", "d = x − 6", "d²", "d³", "d⁴"],
      rows: [
        ["2", "−4", "16", "−64", "256"],
        ["3", "−3", "9", "−27", "81"],
        ["7", "1", "1", "1", "1"],
        ["8", "2", "4", "8", "16"],
        ["10", "4", "16", "64", "256"],
        ["Total 30", "0", "46", "−18", "610"],
      ],
    },
    conclusion:
      "The distribution is very slightly negatively skewed (β₁ ≈ 0.017, μ₃ < 0) and clearly platykurtic (β₂ ≈ 1.44 < 3): flatter than normal, with thin tails.",
  },

  "cpi-family-budget": {
    intro:
      "Family budget method: CPI = ΣIW/ΣW, where I = p₁/p₀ × 100 is each item's price relative and W is its weight (share of base-year expenditure).",
    sections: [
      { h: "Step 1: Price relatives", points: ["Food 60/40 = 150; Clothing 36/30 = 120; Fuel 25/20 = 125; Rent 70/50 = 140; Misc 30/25 = 120."] },
      { h: "Step 2: Weighted total", points: ["ΣIW = 5250 + 1800 + 1250 + 2800 + 2400 = 13,500; ΣW = 100."] },
      { h: "Step 3: Index", points: ["CPI = 13,500/100 = 135."] },
      { h: "Step 4: Use", points: ["To keep the same standard of living, ₹40,000 × 135/100 = ₹54,000 is needed now.", "Purchasing power of a rupee = 100/135 = ₹0.74 of base-year value."] },
    ],
    table: {
      caption: "Family budget method",
      columns: ["Item", "p₀", "p₁", "I = p₁/p₀ × 100", "W", "IW"],
      rows: [
        ["Food", "40", "60", "150", "35", "5250"],
        ["Clothing", "30", "36", "120", "15", "1800"],
        ["Fuel and lighting", "20", "25", "125", "10", "1250"],
        ["House rent", "50", "70", "140", "20", "2800"],
        ["Miscellaneous", "25", "30", "120", "20", "2400"],
        ["Total", "", "", "", "100", "13500"],
      ],
    },
    conclusion:
      "CPI = 135: the cost of living has risen 35% since the base year. The salary must rise to ₹54,000 to maintain the same real income; food, with the largest weight and steepest rise, drives most of the increase.",
  },

  "fisher-tests": {
    intro:
      "Fisher's ideal index P₀₁ = √(Σp₁q₀/Σp₀q₀ × Σp₁q₁/Σp₀q₁) × 100. Time reversal test: P₀₁ × P₁₀ = 1. Factor reversal test: P₀₁ × Q₀₁ = Σp₁q₁/Σp₀q₀.",
    sections: [
      { h: "Fisher's index", points: ["Σp₀q₀ = 660, Σp₁q₀ = 810, Σp₀q₁ = 698, Σp₁q₁ = 860.", "P₀₁ = √(810/660 × 860/698) = √(1.2273 × 1.2321) = √1.5121 ≈ 1.2297, i.e., 122.97."] },
      { h: "Time reversal test", points: ["P₁₀ = √(Σp₀q₁/Σp₁q₁ × Σp₀q₀/Σp₁q₀) = √(698/860 × 660/810).", "P₀₁ × P₁₀ = √(810/660 × 860/698 × 698/860 × 660/810) = √1 = 1. Satisfied."] },
      { h: "Factor reversal test", points: ["Q₀₁ = √(Σq₁p₀/Σq₀p₀ × Σq₁p₁/Σq₀p₁) = √(698/660 × 860/810) ≈ 1.0597.", "P₀₁ × Q₀₁ = √(810/660 × 860/698 × 698/660 × 860/810) = √((860/660)²) = 860/660 = 1.303.", "Σp₁q₁/Σp₀q₀ = 860/660 = 1.303. Satisfied."] },
    ],
    table: {
      caption: "Working table",
      columns: ["Item", "p₀", "q₀", "p₁", "q₁", "p₀q₀", "p₁q₀", "p₀q₁", "p₁q₁"],
      rows: [
        ["X", "10", "30", "12", "25", "300", "360", "250", "300"],
        ["Y", "8", "15", "10", "20", "120", "150", "160", "200"],
        ["Z", "12", "20", "15", "24", "240", "300", "288", "360"],
        ["Total", "", "", "", "", "660", "810", "698", "860"],
      ],
    },
    conclusion:
      "Fisher's index = 122.97 and it satisfies both the time reversal and factor reversal tests, which Laspeyres (122.73) and Paasche (123.21) do not. That is why it is called the ideal index.",
  },

  "stats-scope-types": {
    intro:
      "Statistics in the plural sense means numerical data (sales figures, census counts); in the singular sense it is the science of collecting, organising, analysing and interpreting data to support decisions under uncertainty.",
    sections: [
      { h: "1. Types of statistical methods", points: ["Descriptive statistics: summarising data with tables, graphs, averages and measures of dispersion, e.g., 'average monthly sales were ₹42 lakh'.", "Inferential statistics: drawing conclusions about a population from a sample (estimation, hypothesis testing), e.g., 'about 62% of all customers prefer the new pack' from a survey of 400."] },
      { h: "2. Importance and scope in business", points: ["Forecasting demand and sales with time series and regression.", "Quality control: sampling inspection and control charts.", "Market research: customer surveys, segmentation, testing advertisements.", "Finance: risk and return analysis, ratio analysis, credit scoring.", "Production and inventory planning; HR: wage structures, performance analysis.", "Economic analysis: index numbers, inflation, business cycles."] },
      { h: "3. Types of data", points: ["Primary (collected first-hand: surveys, interviews) vs secondary (published: RBI bulletins, census).", "Qualitative (attributes: gender, marital status) vs quantitative (measured numbers).", "Discrete (counts: number of defects) vs continuous (measurements: weight, time).", "Cross-sectional (many units at one time) vs time series (one unit over time)."] },
      { h: "4. Levels of measurement", points: ["Nominal (labels: PIN codes), ordinal (ranks: brand preference), interval (no true zero: °C), ratio (true zero: income)."] },
      { h: "5. Limitations", points: ["Deals with aggregates, not individuals; results are true on average; studies only quantifiable aspects; can be misused through biased samples or presentation."] },
    ],
    table: {
      caption: "Descriptive vs inferential statistics",
      columns: ["Basis", "Descriptive", "Inferential"],
      rows: [
        ["Aim", "Summarise the data at hand", "Generalise from sample to population"],
        ["Tools", "Tables, charts, mean, SD", "Estimation, hypothesis tests"],
        ["Example", "Average sales last year", "Share of all customers preferring a pack"],
      ],
    },
    conclusion:
      "Statistics turns raw data into evidence. Used carefully, it reduces uncertainty in almost every business decision, from production to pricing.",
  },

  "classification-tabulation": {
    intro:
      "Classification is the process of arranging data into groups or classes according to common characteristics. Tabulation is the systematic presentation of classified data in rows and columns. Classification comes first; tabulation presents its result.",
    sections: [
      { h: "1. Objectives of classification", points: ["Condense large masses of data; bring out similarities and differences; enable comparison; prepare the ground for tabulation and analysis."] },
      { h: "2. Bases of classification", points: ["Geographical (spatial): by place, e.g., state-wise foodgrain output.", "Chronological (temporal): by time, e.g., sales by year.", "Qualitative: by attributes, e.g., gender, literacy (simple or manifold).", "Quantitative: by a measurable variable in class intervals, e.g., wage groups."] },
      { h: "3. Objectives of tabulation", points: ["Simplify complex data; save space; facilitate comparison; reveal patterns; help reference and further statistical analysis."] },
      { h: "4. Parts of a good table", points: ["Table number; title; head note (units); captions (column headings); stubs (row headings); body (figures); footnote (clarifications); source note."] },
      { h: "5. Types of tables", points: ["By coverage: simple (one-way) vs complex (two-way, manifold).", "By purpose: general purpose (reference) vs special purpose (summary).", "By originality: original (primary) vs derived (percentages, averages)."] },
    ],
    table: {
      caption: "Table 1: Employees by department and gender, 2025 (number of employees)",
      columns: ["Department (stub)", "Male", "Female", "Total"],
      rows: [
        ["Production", "…", "…", "…"],
        ["Marketing", "…", "…", "…"],
        ["Finance", "…", "…", "…"],
        ["HR", "…", "…", "…"],
        ["Total", "…", "…", "…"],
      ],
    },
    diagram: "Draw the blank table with a title above, captions across the top, stubs down the left, and 'Source: company HR records' as a source note below.",
    conclusion:
      "Classification organises data; tabulation presents it clearly. Together they are the bridge between raw data and analysis.",
  },

  "index-problems-uses": {
    intro:
      "An index number is a statistical measure of the relative change in a variable or group of variables (prices, quantities, values) over time or between places, expressed as a percentage of a base period set at 100.",
    sections: [
      { h: "1. Types", points: ["Price indices (CPI, WPI), quantity indices (Index of Industrial Production), value indices (Σp₁q₁/Σp₀q₀)."] },
      { h: "2. Uses", points: ["Economic barometers: show trends in prices, production and trade.", "Deflating: converting money values into real values (real wage = money wage/CPI × 100).", "Wage fixation and dearness allowance linked to CPI.", "Policy: the RBI targets CPI inflation; governments index pensions and tax slabs.", "Business: forecasting, budgeting and comparing performance."] },
      { h: "3. Problems in construction", points: ["Defining the purpose.", "Choosing the base period: a normal year, not too distant.", "Selecting items: representative and adequate in number.", "Price quotations: which markets, wholesale or retail, quality changes.", "Choosing weights: quantities or expenditure shares.", "Choosing the average (AM or GM) and the formula (Laspeyres, Paasche, Fisher)."] },
      { h: "4. Unweighted vs weighted", points: ["Unweighted (simple aggregate, simple average of relatives): all items count equally, which is unrealistic.", "Weighted (Laspeyres, Paasche, Fisher, weighted relatives): items count by importance; Fisher satisfies the time and factor reversal tests."] },
      { h: "5. Limitations", points: ["Based on samples of items; ignore quality changes; reflect an average basket, not every household's experience."] },
    ],
    table: {
      caption: "Unweighted vs weighted indices",
      columns: ["Basis", "Unweighted", "Weighted"],
      rows: [
        ["Importance of items", "Equal", "Reflected by weights"],
        ["Examples", "Simple aggregate, average of relatives", "Laspeyres, Paasche, Fisher"],
        ["Accuracy", "Lower", "Higher, more realistic"],
      ],
    },
    conclusion:
      "Index numbers are indispensable for measuring change, but their reliability depends on careful choices of base, items, weights and formula.",
  },

  "time-series-forecasting": {
    intro:
      "A time series is a set of observations arranged in chronological order. Analysing its components helps understand past behaviour and forecast the future.",
    sections: [
      { h: "1. Components", points: ["Secular trend (T): long-term rise or fall, e.g., growth of digital payments.", "Seasonal (S): patterns within a year, e.g., Diwali sales, monsoon umbrella demand.", "Cyclical (C): multi-year business cycles: prosperity, recession, depression, recovery.", "Irregular (I): random shocks: floods, strikes, pandemics."] },
      { h: "2. Decomposition models", points: ["Additive: Y = T + S + C + I; components independent, measured in original units.", "Multiplicative: Y = T × S × C × I; components interact, so seasonal swings grow with the trend. Used more often in business."] },
      { h: "3. Types and timing of forecasts", points: ["Types by subject: economic, technological, demand.", "Short-term (up to a year): scheduling, inventory. Medium-term (1–3 years): budgets, hiring. Long-term (3+ years): capacity, location, R&D."] },
      { h: "4. Methods", points: ["Qualitative: Delphi, jury of executive opinion, sales force composite, market surveys; suit new products with no history.", "Quantitative: naive, moving averages, exponential smoothing, least squares trend (time series); regression (causal)."] },
      { h: "5. Steps of forecasting", points: ["Define the purpose → set the horizon → select the technique → collect and analyse data → make the forecast → monitor accuracy (MAD, MSE, MAPE) and revise."] },
    ],
    table: {
      caption: "Components at a glance",
      columns: ["Component", "Period", "Example"],
      rows: [
        ["Trend", "Long term", "Rising UPI transactions"],
        ["Seasonal", "Within a year", "Festive-season sales"],
        ["Cyclical", "2–10 years", "Boom and recession"],
        ["Irregular", "Unpredictable", "Flood, strike"],
      ],
    },
    diagram: "Sketch a rising wavy line: the straight dotted line through it is the trend, the regular small waves are seasonal, the long swells are cyclical.",
    conclusion:
      "Separating the components and choosing a suitable model and forecasting method gives better, monitored forecasts for planning.",
  },
};
