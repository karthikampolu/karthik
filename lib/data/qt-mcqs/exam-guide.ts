import type { GuideContent, PartBQuestion } from "@/lib/exam-prep/types";
import { SOLUTIONS_1 } from "./solutions-1";
import { SOLUTIONS_2 } from "./solutions-2";
import { PAPERS } from "./papers";

const FORMAT = [
  { k: "Paper", v: "QTTM509, Research Methodology-I (business statistics). 70 marks, 3 hours." },
  { k: "Part A", v: "30 MCQs × 1 mark. 0.25 deducted for each wrong answer. The OMR sheet is collected after 90 minutes." },
  { k: "Part B", v: "5 questions × 10 marks. Attempt any 4. If you attempt all 5, only the first four attempted are marked. In the sample, four of the five were full numericals and one was interpretation." },
  { k: "Mapping", v: "Each question is tagged to a Course Outcome (CO1–CO6) and a Bloom level (L1–L6). The sample says this mapping is indicative and will vary." },
];

/** What the 30 sample MCQs looked like. */
const STYLES = [
  {
    name: "Concept and definition",
    share: "roughly 45%",
    tip: "“What is the range of r”, “which is qualitative data”, “β₂ for a mesokurtic curve”. Learn the one-line definitions and the special values (r between −1 and +1, β₂ = 3, base index = 100).",
  },
  {
    name: "Quick calculation",
    share: "roughly 15%",
    tip: "SD from variance, CV from mean and SD, mean of a small grouped table, reading an index of 150. These take under a minute with the formula sheet below. Never skip them.",
  },
  {
    name: "Interpret the number",
    share: "roughly 20%",
    tip: "r = −0.85, a positively skewed sales distribution, index 150. Say what the sign and the size mean in plain words before you look at the options.",
  },
  {
    name: "Business scenario",
    share: "roughly 20%",
    tip: "Surveying all students in three schools (cluster sampling), census data for literacy, ice-cream sales in summer (seasonal), state-wise foodgrain (spatial classification). Match the situation to the term.",
  },
];

/** The numericals to master, in priority order. */
const FOCUS: GuideContent["FOCUS"] = [
  { topic: "Karl Pearson's correlation (r)", unit: "Unit IV", chance: "Very likely", why: "Came in the sample. Learn the deviation-from-mean table (dx, dy, dx², dy², dxdy). Ten rows takes about 15 minutes; interpret r at the end." },
  { topic: "Least squares straight-line trend + forecast", unit: "Unit VI", chance: "Very likely", why: "Came in the sample (odd years). Practise the even-year version too (half-year coding), and always finish with the forecast and the annual increase." },
  { topic: "Laspeyres, Paasche, Fisher (+ TRT/FRT check)", unit: "Unit V", chance: "Very likely", why: "Came in the sample. Four product columns (p₀q₀, p₁q₀, p₀q₁, p₁q₁) give all three indices. A follow-up may ask you to show Fisher satisfies the time and factor reversal tests." },
  { topic: "Mean, median, mode, quartiles of grouped data", unit: "Unit II", chance: "Very likely", why: "Came in the sample (raw data to be grouped). Know the median/quartile/decile formula and the mode formula cold; they reuse the same cumulative frequency column." },
  { topic: "SD and coefficient of variation (consistency)", unit: "Unit II", chance: "Very likely", why: "The classic 'which batsman or plant is more consistent' question. CV decides consistency; mean decides who is better." },
  { topic: "Karl Pearson's and Bowley's skewness", unit: "Unit III", chance: "Very likely", why: "The sample only asked for interpretation, so a calculation is due. One grouped table gives mean, SD, mode, median and quartiles for both coefficients." },
  { topic: "Regression equations (Y on X and X on Y)", unit: "Unit IV", chance: "Very likely", why: "Same table as correlation, plus Σdy². Write both equations, estimate a value, and get r = √(bᵧₓ × bₓᵧ) as a check." },
  { topic: "Spearman's rank correlation with ties", unit: "Unit IV", chance: "Very likely", why: "Short and high-scoring. The only trap is the tie correction m(m² − 1)/12; check that ΣD = 0." },
  { topic: "Moving averages (3-year and centred 4-year)", unit: "Unit VI", chance: "Likely", why: "Mechanical and quick. Remember that even periods must be centred." },
  { topic: "Consumer price index (family budget method)", unit: "Unit V", chance: "Likely", why: "ΣIW/ΣW in one table. Add the real-wage or purchasing-power interpretation." },
  { topic: "Moments, β₁ and β₂", unit: "Unit III", chance: "Possible", why: "Small raw data: compute μ₂, μ₃, μ₄ and classify the curve (lepto, meso, platy)." },
  { topic: "Seasonal indices (simple averages)", unit: "Unit VI", chance: "Possible", why: "Quarter averages ÷ grand average × 100; the indices must total 400." },
  { topic: "Partial and multiple correlation from given r's", unit: "Unit IV", chance: "Possible", why: "Pure formula substitution. Five minutes if you remember the two formulas." },
];

const FORMULAS: GuideContent["FORMULAS"] = [
  {
    group: "Central tendency",
    items: [
      { name: "Mean (step deviation)", f: "x̄ = A + (Σfd′/N) × h" },
      { name: "Median (grouped)", f: "L + ((N/2 − cf)/f) × h" },
      { name: "Quartile / decile / percentile", f: "L + ((iN/4 | iN/10 | iN/100 − cf)/f) × h" },
      { name: "Mode (grouped)", f: "L + ((f₁ − f₀)/(2f₁ − f₀ − f₂)) × h" },
      { name: "Empirical relation", f: "Mode = 3 Median − 2 Mean" },
      { name: "Combined mean", f: "(n₁x̄₁ + n₂x̄₂)/(n₁ + n₂)" },
    ],
  },
  {
    group: "Dispersion",
    items: [
      { name: "Range and its coefficient", f: "L − S;  (L − S)/(L + S)" },
      { name: "Quartile deviation and its coefficient", f: "(Q₃ − Q₁)/2;  (Q₃ − Q₁)/(Q₃ + Q₁)" },
      { name: "Standard deviation", f: "σ = √(Σd²/n) = √(Σx²/n − x̄²)" },
      { name: "SD (grouped, step deviation)", f: "σ = h × √(Σfd′²/N − (Σfd′/N)²)" },
      { name: "Coefficient of variation", f: "CV = (σ/x̄) × 100" },
      { name: "Outlier fences", f: "Q₁ − 1.5 IQR,  Q₃ + 1.5 IQR" },
    ],
  },
  {
    group: "Skewness and kurtosis",
    items: [
      { name: "Karl Pearson", f: "(x̄ − Mode)/σ  or  3(x̄ − Median)/σ" },
      { name: "Bowley", f: "(Q₃ + Q₁ − 2 Median)/(Q₃ − Q₁)" },
      { name: "Moment skewness", f: "β₁ = μ₃²/μ₂³  (sign from μ₃)" },
      { name: "Kurtosis", f: "β₂ = μ₄/μ₂²;  γ₂ = β₂ − 3" },
      { name: "Reading β₂", f: "> 3 lepto · = 3 meso · < 3 platy" },
    ],
  },
  {
    group: "Correlation and regression",
    items: [
      { name: "Karl Pearson's r", f: "Σdxdy/√(Σdx² × Σdy²)" },
      { name: "Spearman (with ties)", f: "1 − 6[ΣD² + Σm(m² − 1)/12]/(n(n² − 1))" },
      { name: "Regression coefficients", f: "bᵧₓ = Σdxdy/Σdx²;  bₓᵧ = Σdxdy/Σdy²" },
      { name: "Regression lines", f: "Y − Ȳ = bᵧₓ(X − X̄);  X − X̄ = bₓᵧ(Y − Ȳ)" },
      { name: "Link", f: "r = ±√(bᵧₓ × bₓᵧ)" },
      { name: "Partial", f: "r₁₂.₃ = (r₁₂ − r₁₃r₂₃)/√((1 − r₁₃²)(1 − r₂₃²))" },
      { name: "Multiple", f: "R₁.₂₃² = (r₁₂² + r₁₃² − 2r₁₂r₁₃r₂₃)/(1 − r₂₃²)" },
    ],
  },
  {
    group: "Index numbers",
    items: [
      { name: "Laspeyres", f: "Σp₁q₀/Σp₀q₀ × 100" },
      { name: "Paasche", f: "Σp₁q₁/Σp₀q₁ × 100" },
      { name: "Fisher", f: "√(L × P)" },
      { name: "Weighted relatives / CPI", f: "ΣIW/ΣW,  I = p₁/p₀ × 100" },
      { name: "Time reversal test", f: "P₀₁ × P₁₀ = 1" },
      { name: "Factor reversal test", f: "P₀₁ × Q₀₁ = Σp₁q₁/Σp₀q₀" },
      { name: "Real wage", f: "money wage/CPI × 100" },
    ],
  },
  {
    group: "Time series and forecasting",
    items: [
      { name: "Least squares trend (ΣX = 0)", f: "a = ΣY/n;  b = ΣXY/ΣX²" },
      { name: "Even years coding", f: "X = 2(year − mid); annual slope = 2b" },
      { name: "Seasonal index (simple averages)", f: "season average/grand average × 100" },
      { name: "Exponential smoothing", f: "Fₜ₊₁ = αAₜ + (1 − α)Fₜ" },
      { name: "Error measures", f: "MAD = Σ|e|/n;  MSE = Σe²/n" },
    ],
  },
];

const PART_B: PartBQuestion[] = [
  // ---------- From the sample paper ----------
  {
    id: "sp-trend-tourists",
    kind: "numerical",
    q: "Tourist arrivals (millions) in India, 1994–2000: 18, 20, 23, 25, 24, 28, 30. Fit a straight-line trend by the method of least squares and estimate arrivals in 2004.",
    unit: "Unit VI",
    chance: "Very likely",
    outline: [
      "Write Y = a + bX and code X = year − 1997 so that ΣX = 0.",
      "Working table: X, Y, XY, X² with totals (ΣY = 168, ΣXY = 53, ΣX² = 28).",
      "a = ΣY/n = 24 and b = ΣXY/ΣX² = 1.893.",
      "Trend equation with origin and units stated.",
      "Trend values for each year (optional but earns presentation marks).",
      "Forecast for 2004 (X = 7) ≈ 37.25 million, with a one-line interpretation.",
    ],
  },
  {
    id: "sp-index-lpf",
    kind: "numerical",
    q: "Calculate Laspeyres', Paasche's and Fisher's price indices: A (6.5, 500 → 10.8, 560), B (2.8, 124 → 2.9, 148), C (4.7, 69 → 8.2, 78), D (10.9, 38 → 13.4, 24), E (8.6, 49 → 10.8, 27) [base price, base quantity → current price, current quantity].",
    unit: "Unit V",
    chance: "Very likely",
    outline: [
      "State the three formulas.",
      "Working table with p₀q₀, p₁q₀, p₀q₁, p₁q₁ for each commodity.",
      "Totals: 4757.1, 7363.8, 4914.8, 7730.0.",
      "Laspeyres ≈ 154.80 and Paasche ≈ 157.28.",
      "Fisher = √(L × P) ≈ 156.03.",
      "Interpretation: prices rose about 55–57%; note Fisher lies between L and P.",
    ],
  },
  {
    id: "sp-skew-kurt-portfolio",
    q: "Portfolio A has skewness −0.2 and kurtosis 3.2; Portfolio B has skewness 0.5 and kurtosis 2.8. (a) Interpret the skewness values. (b) Interpret the kurtosis values against the normal (3). (c) How should an investor use this to choose between them?",
    unit: "Unit III",
    chance: "Likely",
    outline: [
      "Define skewness and kurtosis (β₂, normal = 3) in one line each.",
      "A: slight negative skew, so a small left tail of occasional bigger losses; mean slightly below median.",
      "B: moderate positive skew, so frequent modest returns with occasional large gains.",
      "A (3.2): slightly leptokurtic, so a sharper peak and fatter tails, a bit more extreme-event risk.",
      "B (2.8): slightly platykurtic, so a flatter peak and thinner tails, fewer extremes.",
      "Decision: a risk-averse investor leans to B; consider these alongside mean and SD, and investor goals.",
    ],
  },
  {
    id: "sp-pearson-ad-sales",
    kind: "numerical",
    q: "Advertising expenditure (X, $000) and sales revenue (Y, $000) for 10 months: (10, 20), (15, 25), (20, 30), (25, 35), (30, 40), (35, 50), (40, 55), (50, 70), (55, 75), (60, 80). Find Karl Pearson's coefficient of correlation.",
    unit: "Unit IV",
    chance: "Very likely",
    outline: [
      "Formula r = Σdxdy/√(Σdx² × Σdy²).",
      "Means: X̄ = 34 and Ȳ = 48.",
      "Table: dx, dy, dx², dy², dxdy for all 10 months.",
      "Totals: Σdx² = 2640, Σdy² = 4160, Σdxdy = 3305.",
      "r = 3305/3313.9 ≈ 0.997.",
      "Interpretation: near-perfect positive correlation; r² ≈ 0.99; correlation is not proof of causation.",
    ],
  },
  {
    id: "sp-fuel-central",
    kind: "numerical",
    q: "Fuel consumption (km/l) of a racing team's cars: 14.77, 16.11, 16.11, 15.05, 15.99, 14.91, 15.27, 16.01, 15.75, 14.89, 16.05, 15.22, 16.02, 15.24, 16.11, 15.02. (a) Find the mean and median. (b) Group into five equal classes and find the modal class value. (c) Which measure is best? Explain.",
    unit: "Unit II",
    chance: "Likely",
    outline: [
      "Mean = 248.52/16 = 15.53 km/l.",
      "Arrange in order; median = average of 8th and 9th values = (15.27 + 15.75)/2 = 15.51.",
      "Range 14.77–16.11; choose five equal classes of width 0.30 from 14.70.",
      "Frequency table: 3, 5, 0, 1, 7.",
      "Modal class 15.90–16.20; mode by formula ≈ 16.04 (raw mode 16.11).",
      "Choice of measure: argue from the shape (two clusters, no extreme outliers) and the purpose.",
    ],
  },

  // ---------- New numericals ----------
  {
    id: "trend-even-years",
    kind: "numerical",
    q: "Sales (₹ lakh) of a company, 2017–2024: 40, 44, 49, 47, 55, 60, 58, 67. Fit a linear trend by least squares, find the trend values, and forecast sales for 2026.",
    unit: "Unit VI",
    chance: "Very likely",
    outline: [
      "Even n: origin midway between 2020 and 2021; X = 2(year − 2020.5) in half-years.",
      "Table: X, Y, XY, X²; ΣY = 420, ΣXY = 300, ΣX² = 168.",
      "a = 52.5 and b = 1.786 per half-year (3.57 per year).",
      "Equation with origin and units stated clearly.",
      "Trend values 40.00 … 65.00.",
      "2026: X = 11, so Y ≈ 72.14 lakh; interpret the yearly growth.",
    ],
  },
  {
    id: "moving-average",
    kind: "numerical",
    q: "Production (’000 tonnes), 2013–2024: 21, 22, 23, 25, 24, 22, 25, 26, 27, 26, 28, 30. Compute (a) 3-yearly moving averages and (b) 4-yearly centred moving averages.",
    unit: "Unit VI",
    chance: "Likely",
    outline: [
      "Explain the method and why a moving average smooths fluctuations.",
      "3-year moving totals and averages placed against the middle year.",
      "4-year moving totals placed between years.",
      "Centre them: 2-period totals of the 4-year totals, divided by 8.",
      "Tabulate both series neatly.",
      "Comment: the trend is upward; note values lost at the ends.",
    ],
  },
  {
    id: "seasonal-index",
    kind: "numerical",
    q: "Quarterly sales (₹ lakh) for four years: Year 1 — 30, 40, 36, 34; Year 2 — 34, 52, 40, 44; Year 3 — 40, 58, 54, 48; Year 4 — 52, 76, 68, 62. Compute seasonal indices by the method of simple averages.",
    unit: "Unit VI",
    chance: "Possible",
    outline: [
      "Arrange the data by quarter; find quarter totals 156, 226, 198, 188.",
      "Quarter averages 39, 56.5, 49.5, 47.",
      "Grand average = 48.",
      "Seasonal index = quarter average/grand average × 100.",
      "Indices 81.25, 117.71, 103.13, 97.92 (total 400).",
      "Interpret Q2 as the peak and Q1 as the trough; note the method's no-trend assumption.",
    ],
  },
  {
    id: "spearman-ties",
    kind: "numerical",
    q: "Marks of 10 students in Statistics (X) and Accounts (Y): X — 48, 33, 40, 9, 16, 16, 65, 24, 16, 57; Y — 13, 13, 24, 6, 15, 4, 20, 9, 6, 19. Compute Spearman's rank correlation coefficient.",
    unit: "Unit IV",
    chance: "Very likely",
    outline: [
      "Formula with the tie correction.",
      "Rank X (16 appears three times, so rank 8 each).",
      "Rank Y (13 twice, so 5.5; 6 twice, so 8.5).",
      "Table of D and D²; check ΣD = 0; ΣD² = 41.",
      "Correction = 2 + 0.5 + 0.5 = 3.",
      "R = 1 − 6(44)/990 ≈ 0.733; interpret as fairly high positive agreement.",
    ],
  },
  {
    id: "regression-lines",
    kind: "numerical",
    q: "X: 1, 2, 3, 4, 5, 6, 7 and Y: 10, 12, 11, 15, 14, 17, 19. Obtain the two regression equations, estimate Y when X = 9 and X when Y = 20, and find r.",
    unit: "Unit IV",
    chance: "Very likely",
    outline: [
      "Means X̄ = 4 and Ȳ = 14.",
      "Table: dx, dy, dx², dy², dxdy; totals 28, 64, 40.",
      "bᵧₓ = 40/28 = 1.429 and bₓᵧ = 40/64 = 0.625.",
      "Y on X: Y = 8.29 + 1.43X. X on Y: X = −4.75 + 0.625Y.",
      "Estimates: Y(9) ≈ 21.14 and X(20) = 7.75.",
      "r = √(1.429 × 0.625) ≈ 0.945; explain why there are two lines.",
    ],
  },
  {
    id: "partial-multiple",
    kind: "numerical",
    q: "For three variables, r₁₂ = 0.8, r₁₃ = 0.6 and r₂₃ = 0.5. Compute r₁₂.₃, r₁₃.₂ and R₁.₂₃, and interpret.",
    unit: "Unit IV",
    chance: "Possible",
    outline: [
      "Define partial and multiple correlation.",
      "r₁₂.₃ formula and substitution, giving ≈ 0.722.",
      "r₁₃.₂ formula and substitution, giving ≈ 0.385.",
      "R₁.₂₃² = 0.52/0.75 = 0.693, so R ≈ 0.833.",
      "Interpretation: X₂ remains strongly related after removing X₃; together they explain about 69% of X₁.",
    ],
  },
  {
    id: "grouped-central",
    kind: "numerical",
    q: "Daily wages (₹ ’00) of 50 workers: 10–20: 4, 20–30: 6, 30–40: 10, 40–50: 16, 50–60: 8, 60–70: 6. Calculate the mean, median, mode, Q₁, Q₃, D₇ and P₉₀.",
    unit: "Unit II",
    chance: "Very likely",
    outline: [
      "Table: mid-points, step deviations, fd′, cumulative frequency.",
      "Mean = 45 + (−14/50) × 10 = 42.2.",
      "Median = 40 + (25 − 20)/16 × 10 = 43.125.",
      "Mode = 40 + 6/14 × 10 = 44.29.",
      "Q₁ = 32.5, Q₃ = 51.875, D₇ = 49.375, P₉₀ = 61.67.",
      "Comment: mean < median < mode, so the distribution is slightly negatively skewed.",
    ],
  },
  {
    id: "sd-cv-batsmen",
    kind: "numerical",
    q: "Runs scored by two batsmen in 10 innings — A: 12, 115, 6, 73, 7, 19, 119, 36, 84, 29; B: 47, 12, 76, 42, 4, 51, 37, 48, 13, 0. Who is the better run-getter? Who is more consistent?",
    unit: "Unit II",
    chance: "Very likely",
    outline: [
      "Means: A = 50 and B = 33.",
      "Deviation tables; Σd² = 17,498 for A and 5,462 for B.",
      "σA = 41.83 and σB = 23.37.",
      "CV A = 83.66% and CV B = 70.82%.",
      "Better run-getter: A (higher mean).",
      "More consistent: B (lower CV); explain why CV, not σ, decides.",
    ],
  },
  {
    id: "skew-pearson-bowley",
    kind: "numerical",
    q: "From the distribution 0–10: 5, 10–20: 18, 20–30: 30, 30–40: 22, 40–50: 12, 50–60: 8, 60–70: 5, compute Karl Pearson's and Bowley's coefficients of skewness and compare them.",
    unit: "Unit III",
    chance: "Very likely",
    outline: [
      "Table: mid-points, d′, fd′, fd′², cumulative frequency.",
      "Mean = 31.2 and σ = 14.88.",
      "Mode = 26 (modal class 20–30).",
      "Median = 29, Q₁ = 20.67, Q₃ = 40.",
      "Karl Pearson = (31.2 − 26)/14.88 ≈ 0.35; Bowley = 2.67/19.33 ≈ 0.14.",
      "Both are positive (right tail); explain why the values differ (whole data vs middle 50%).",
    ],
  },
  {
    id: "moments-kurtosis",
    kind: "numerical",
    q: "For the data 2, 3, 7, 8, 10, compute the first four central moments, β₁ and β₂, and comment on skewness and kurtosis.",
    unit: "Unit III",
    chance: "Possible",
    outline: [
      "Mean = 6; deviations −4, −3, 1, 2, 4.",
      "Table of d, d², d³, d⁴; sums 0, 46, −18, 610.",
      "μ₁ = 0, μ₂ = 9.2, μ₃ = −3.6, μ₄ = 122.",
      "β₁ = 12.96/778.69 ≈ 0.0166 (sign negative from μ₃).",
      "β₂ = 122/84.64 ≈ 1.44.",
      "Comment: very slight negative skew; platykurtic (β₂ < 3).",
    ],
  },
  {
    id: "cpi-family-budget",
    kind: "numerical",
    q: "Construct a consumer price index by the family budget method: Food (₹40 → ₹60, weight 35), Clothing (30 → 36, 15), Fuel and lighting (20 → 25, 10), House rent (50 → 70, 20), Miscellaneous (25 → 30, 20). What does the result mean for a salary of ₹40,000 in the base year?",
    unit: "Unit V",
    chance: "Likely",
    outline: [
      "Formula CPI = ΣIW/ΣW with I = p₁/p₀ × 100.",
      "Price relatives 150, 120, 125, 140, 120.",
      "IW column; ΣIW = 13,500 and ΣW = 100.",
      "CPI = 135.",
      "Interpretation: cost of living up 35%; ₹40,000 must become ₹54,000 to keep the same standard.",
      "Mention purchasing power of the rupee = 100/135 = ₹0.74.",
    ],
  },
  {
    id: "fisher-tests",
    kind: "numerical",
    q: "Commodities (p₀, q₀, p₁, q₁): X (10, 30, 12, 25), Y (8, 15, 10, 20), Z (12, 20, 15, 24). Compute Fisher's ideal index and show that it satisfies the time reversal and factor reversal tests.",
    unit: "Unit V",
    chance: "Likely",
    outline: [
      "Products: Σp₀q₀ = 660, Σp₁q₀ = 810, Σp₀q₁ = 698, Σp₁q₁ = 860.",
      "Fisher P₀₁ = √(810/660 × 860/698) × 100 ≈ 122.97.",
      "TRT: P₁₀ = √(698/860 × 660/810); show P₀₁ × P₁₀ = 1.",
      "FRT: Q₀₁ = √(698/660 × 860/810) ≈ 1.0597.",
      "Show P₀₁ × Q₀₁ = 860/660 = 1.303 = value ratio.",
      "Conclude why Fisher is called 'ideal'.",
    ],
  },

  // ---------- Theory (in case a written question appears) ----------
  {
    id: "stats-scope-types",
    q: "Explain the types of statistical methods and the importance and scope of statistics in business decisions. Classify the types of data with examples.",
    unit: "Unit I",
    chance: "Likely",
    outline: [
      "Define statistics (singular and plural senses).",
      "Descriptive vs inferential statistics, with an example of each.",
      "Importance and scope: forecasting, quality control, market research, finance, HR, production planning.",
      "Types of data: primary/secondary, qualitative/quantitative, discrete/continuous, cross-section/time series.",
      "Levels of measurement: nominal, ordinal, interval, ratio.",
      "Limitations of statistics.",
    ],
  },
  {
    id: "classification-tabulation",
    q: "What is classification of data? Explain its bases. Discuss the objectives of tabulation, the parts of a good table and the types of tables, and draft a blank table for employees by department and gender.",
    unit: "Unit I",
    chance: "Likely",
    outline: [
      "Define classification and its objectives.",
      "Bases: geographical, chronological, qualitative, quantitative (with examples).",
      "Define tabulation and its objectives; how it differs from classification.",
      "Parts of a table: number, title, head note, captions, stubs, body, footnote, source note.",
      "Types: simple/complex, one-way/two-way/manifold, general/special purpose, original/derived.",
      "Draw the blank two-way table.",
    ],
  },
  {
    id: "index-problems-uses",
    q: "What are index numbers? Discuss their uses and the problems faced in constructing them. Distinguish between unweighted and weighted indices.",
    unit: "Unit V",
    chance: "Possible",
    outline: [
      "Definition: a measure of relative change; base = 100.",
      "Types: price, quantity, value; CPI and WPI.",
      "Uses: economic barometer, deflating, wage fixation and DA, policy, trend and forecasting.",
      "Problems: purpose, base year, items, price quotations, weights, average, formula.",
      "Unweighted vs weighted (simple aggregate vs Laspeyres/Paasche/Fisher).",
      "Limitations of index numbers.",
    ],
  },
  {
    id: "time-series-forecasting",
    q: "Explain the components of a time series and the additive and multiplicative decomposition models. Discuss the types, timing and steps of forecasting.",
    unit: "Unit VI",
    chance: "Possible",
    outline: [
      "Define time series and its uses.",
      "Components T, S, C, I with business examples.",
      "Additive vs multiplicative model and when each fits.",
      "Types of forecasts (economic, technological, demand) and timing (short, medium, long term).",
      "Methods: qualitative (Delphi, sales force composite) vs quantitative (moving average, smoothing, trend, regression).",
      "Steps of forecasting and monitoring accuracy.",
    ],
  },
];

const ANSWER_TEMPLATE = [
  "Write the formula first, with every symbol defined. The formula alone often earns a mark.",
  "Draw the working table with clear column headings and a totals row; most of the 10 marks are in this table.",
  "Show the substitution step (numbers into the formula), not just the answer.",
  "Box the final answer with units and sensible rounding (2–4 decimals).",
  "End with a one-line interpretation: “r = 0.997 shows a very high positive correlation between advertising and sales.”",
];

const TIME_PLAN = [
  { part: "Part A (30 MCQs)", mins: "35–40 min", note: "Do theory MCQs first (fast), then the calculation ones. The OMR is collected at 90 minutes, so don't leave shading late." },
  { part: "Part B (4 × 10 marks)", mins: "4 × 28 min", note: "Pick the four numericals you can finish fastest. Draw the table before calculating, and use the calculator memory for totals." },
  { part: "Buffer", mins: "15 min", note: "Recheck totals and the interpretation lines. A wrong total costs more marks than a wrong final digit." },
];

const DAYS = [
  { d: "Day 1", t: "Unit II and Unit III numericals", s: "Grouped mean, median, mode and quartiles; SD and CV (batsmen); Karl Pearson and Bowley skewness. Practise Units II and III MCQs." },
  { d: "Day 2", t: "Unit IV: correlation and regression", s: "Pearson's r (sample Q5), Spearman with ties, both regression lines. Practise Unit IV MCQs." },
  { d: "Day 3", t: "Units V and VI numericals", s: "Laspeyres, Paasche, Fisher and the tests; CPI; least squares trend (odd and even years), moving averages, seasonal indices." },
  { d: "Day 4", t: "Unit I theory and every MCQ you got wrong", s: "Classification, tabulation, types of data and diagrams. Then “my wrong ones”. Take Predicted Paper 1 under time." },
  { d: "Day 5", t: "Full dry run", s: "Predicted Paper 2 under time, then the Sample paper set. Read the formula sheet twice. Sleep." },
];

const MARKING_MATH = [
  "A blind guess on a 4-option question is worth about +0.06 in expectation. Not much, but not negative.",
  "Eliminate one option and a guess is worth about +0.17; eliminate two and it's about +0.38. For calculation MCQs, a rough estimate usually rules out two options.",
  "Skip only when you truly have no idea; a skipped question costs nothing and earns nothing.",
];

export const GUIDE: GuideContent = {
  FORMAT,
  STYLES,
  PART_B: PART_B.map((p) => ({ ...p, model: SOLUTIONS_1[p.id] ?? SOLUTIONS_2[p.id] })),
  ANSWER_TEMPLATE,
  TIME_PLAN,
  DAYS,
  MARKING_MATH,
  PAPERS,
  FOCUS,
  FORMULAS,
  BLUEPRINT_NOTE:
    "In the sample, Part A drew from every unit, with Units I, II and V slightly heavier, and all five Part B questions came from Units II–VI. My prediction keeps every unit in play and leans a little toward Units II and IV, which carry the most calculation. The mock tests follow the “My prediction” column.",
  SOURCE_NOTE:
    "These predictions come from the one sample paper and the syllabus. They are an informed guess, not inside information. Every numerical answer here was checked by computer; the methods follow standard business statistics texts (e.g., S.P. Gupta, Levin & Rubin). Where your faculty uses a different convention (rounding, coding of X, n vs n − 1), follow your faculty.",
};
