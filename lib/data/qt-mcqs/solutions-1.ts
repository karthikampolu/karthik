import type { ModelAnswer } from "@/lib/exam-prep/types";

/**
 * Worked solutions for the QTTM509 predicted Part B questions (part 1).
 * Every figure was computed by script; rounding is to 2–4 decimals.
 */
export const SOLUTIONS_1: Record<string, ModelAnswer> = {
  "sp-trend-tourists": {
    intro:
      "Let the trend be Y = a + bX. There are 7 years (odd), so take the middle year 1997 as origin: X = year − 1997, which makes ΣX = 0. The normal equations then reduce to a = ΣY/n and b = ΣXY/ΣX².",
    sections: [
      { h: "Step 1: Constants", points: ["n = 7, ΣY = 168, ΣXY = 53, ΣX² = 28.", "a = ΣY/n = 168/7 = 24.", "b = ΣXY/ΣX² = 53/28 = 1.893."] },
      { h: "Step 2: Trend equation", points: ["Y = 24 + 1.893X (origin: 1997; X unit: 1 year; Y: tourist arrivals in millions)."] },
      { h: "Step 3: Trend values", points: ["1994: 24 − 5.68 = 18.32; 1995: 20.21; 1996: 22.11; 1997: 24.00; 1998: 25.89; 1999: 27.79; 2000: 29.68."] },
      { h: "Step 4: Estimate for 2004", points: ["X = 2004 − 1997 = 7.", "Y = 24 + 1.893 × 7 = 24 + 13.25 = 37.25 million."] },
    ],
    table: {
      caption: "Working table",
      columns: ["Year", "Y", "X", "XY", "X²", "Trend Yc"],
      rows: [
        ["1994", "18", "−3", "−54", "9", "18.32"],
        ["1995", "20", "−2", "−40", "4", "20.21"],
        ["1996", "23", "−1", "−23", "1", "22.11"],
        ["1997", "25", "0", "0", "0", "24.00"],
        ["1998", "24", "1", "24", "1", "25.89"],
        ["1999", "28", "2", "56", "4", "27.79"],
        ["2000", "30", "3", "90", "9", "29.68"],
        ["Total", "168", "0", "53", "28", "168"],
      ],
    },
    diagram: "Optional: plot actual Y and the straight trend line against years to show the upward trend.",
    conclusion:
      "Trend: Y = 24 + 1.893X (origin 1997). Tourist arrivals rise by about 1.89 million a year, and the estimate for 2004 is about 37.25 million, assuming the past trend continues.",
  },

  "sp-index-lpf": {
    intro:
      "Laspeyres P₀₁ = Σp₁q₀/Σp₀q₀ × 100 (base-year weights). Paasche P₀₁ = Σp₁q₁/Σp₀q₁ × 100 (current-year weights). Fisher P₀₁ = √(L × P).",
    sections: [
      { h: "Step 1: Totals from the table", points: ["Σp₀q₀ = 4757.1, Σp₁q₀ = 7363.8, Σp₀q₁ = 4914.8, Σp₁q₁ = 7730.0."] },
      { h: "Step 2: Laspeyres", points: ["L = 7363.8/4757.1 × 100 = 154.80."] },
      { h: "Step 3: Paasche", points: ["P = 7730.0/4914.8 × 100 = 157.28."] },
      { h: "Step 4: Fisher", points: ["F = √(154.80 × 157.28) = √24346.9 ≈ 156.03."] },
    ],
    table: {
      caption: "Working table",
      columns: ["Item", "p₀q₀", "p₁q₀", "p₀q₁", "p₁q₁"],
      rows: [
        ["A", "3250.0", "5400.0", "3640.0", "6048.0"],
        ["B", "347.2", "359.6", "414.4", "429.2"],
        ["C", "324.3", "565.8", "366.6", "639.6"],
        ["D", "414.2", "509.2", "261.6", "321.6"],
        ["E", "421.4", "529.2", "232.2", "291.6"],
        ["Total", "4757.1", "7363.8", "4914.8", "7730.0"],
      ],
    },
    conclusion:
      "Laspeyres = 154.80, Paasche = 157.28, Fisher = 156.03. Prices rose by about 56% over the base year. Fisher lies between the two and is preferred because it satisfies the time and factor reversal tests.",
  },

  "sp-skew-kurt-portfolio": {
    intro:
      "Skewness measures the asymmetry of the return distribution (0 = symmetrical). Kurtosis (β₂) measures peakedness and tail heaviness; a normal distribution has β₂ = 3.",
    sections: [
      { h: "(a) Skewness", points: ["Portfolio A (−0.2): slightly negatively skewed. The left tail is a little longer, so occasional below-average (loss) years are somewhat larger than the above-average years; mean is slightly below the median.", "Portfolio B (+0.5): moderately positively skewed. Most years give modest returns, with occasional large gains in the right tail; the mean is pulled above the median."] },
      { h: "(b) Kurtosis", points: ["Portfolio A (3.2): slightly leptokurtic. Returns cluster a little more tightly around the mean, but the tails are fatter than normal, so extreme returns (both gains and losses) are a bit more likely.", "Portfolio B (2.8): slightly platykurtic. A flatter peak and thinner tails, so extreme outcomes are a bit less likely than under a normal distribution."] },
      { h: "(c) Investor decision", points: ["A risk-averse investor who fears large losses would favour B: positive skew (upside surprises) and thin tails (fewer extremes).", "A carries mild crash risk: negative skew combined with fat tails.", "Skewness and kurtosis should be used alongside the mean return and SD (and CV), the investment horizon and the investor's risk appetite, never on their own."] },
    ],
    table: {
      caption: "Summary",
      columns: ["", "Portfolio A", "Portfolio B"],
      rows: [
        ["Skewness", "−0.2: slight negative, small left tail", "+0.5: moderate positive, right tail"],
        ["Kurtosis", "3.2: slightly leptokurtic, fatter tails", "2.8: slightly platykurtic, thinner tails"],
        ["Risk reading", "Mild downside and extreme-event risk", "Upside surprises, fewer extremes"],
      ],
    },
    diagram: "Sketch two curves: A with a slightly longer left tail and a sharper peak; B with a longer right tail and a flatter top, both against a dotted normal curve.",
    conclusion:
      "On shape alone, Portfolio B is more attractive to a cautious investor. The final choice should also weigh average return and overall volatility.",
  },

  "sp-pearson-ad-sales": {
    intro:
      "Karl Pearson's coefficient: r = Σdxdy/√(Σdx² × Σdy²), where dx = X − X̄ and dy = Y − Ȳ. ΣX = 340 and ΣY = 480, so X̄ = 34 and Ȳ = 48.",
    sections: [
      { h: "Step 1: Totals", points: ["Σdx² = 2640, Σdy² = 4160, Σdxdy = 3305."] },
      { h: "Step 2: Substitute", points: ["r = 3305/√(2640 × 4160) = 3305/√10,982,400 = 3305/3313.97 ≈ 0.997."] },
      { h: "Step 3: Interpretation", points: ["r ≈ +0.997: a very high, almost perfect positive linear correlation.", "r² ≈ 0.995: about 99% of the variation in sales is associated with variation in advertising.", "Correlation alone does not prove that advertising causes sales; other factors (season, pricing) may move with both."] },
    ],
    table: {
      caption: "Working table (X̄ = 34, Ȳ = 48)",
      columns: ["Month", "X", "Y", "dx", "dy", "dx²", "dy²", "dxdy"],
      rows: [
        ["1", "10", "20", "−24", "−28", "576", "784", "672"],
        ["2", "15", "25", "−19", "−23", "361", "529", "437"],
        ["3", "20", "30", "−14", "−18", "196", "324", "252"],
        ["4", "25", "35", "−9", "−13", "81", "169", "117"],
        ["5", "30", "40", "−4", "−8", "16", "64", "32"],
        ["6", "35", "50", "1", "2", "1", "4", "2"],
        ["7", "40", "55", "6", "7", "36", "49", "42"],
        ["8", "50", "70", "16", "22", "256", "484", "352"],
        ["9", "55", "75", "21", "27", "441", "729", "567"],
        ["10", "60", "80", "26", "32", "676", "1024", "832"],
        ["Total", "340", "480", "0", "0", "2640", "4160", "3305"],
      ],
    },
    conclusion:
      "r ≈ 0.997. Advertising expenditure and sales revenue are very strongly and positively correlated, so the manager can use advertising as a reliable predictor of sales (e.g., through regression).",
  },

  "sp-fuel-central": {
    intro:
      "n = 16 observations. Mean = Σx/n; median = average of the 8th and 9th values in ascending order; mode from the grouped table.",
    sections: [
      { h: "(a) Mean and median", points: ["Σx = 248.52, so mean = 248.52/16 = 15.53 km/l.", "Ordered: 14.77, 14.89, 14.91, 15.02, 15.05, 15.22, 15.24, 15.27, 15.75, 15.99, 16.01, 16.02, 16.05, 16.11, 16.11, 16.11.", "Median = (15.27 + 15.75)/2 = 15.51 km/l."] },
      { h: "(b) Five equal classes and the mode", points: ["Range = 16.11 − 14.77 = 1.34; width = 1.34/5 ≈ 0.27, rounded up to 0.30 starting at 14.70.", "The modal class is 15.90–16.20 (f = 7).", "Mode = L + (f₁ − f₀)/(2f₁ − f₀ − f₂) × h = 15.90 + (7 − 1)/(14 − 1 − 0) × 0.30 = 15.90 + 0.138 ≈ 16.04 km/l. (Mid-value of the modal class = 16.05; the raw data's most frequent value is 16.11.)"] },
      { h: "(c) Which measure is best?", points: ["The data form two clusters (about 14.8–15.3 and 15.9–16.1) with no extreme outliers.", "The mean (15.53) uses every observation and is best for overall fuel planning (e.g., total fuel for a race distance).", "But mean and median fall in the gap where hardly any car performs, so for describing the typical car the mode (≈ 16.0) is more representative.", "Exam answer: the mean is generally best here because there are no outliers and it uses all values, while noting that the bimodal shape makes the mode informative."] },
    ],
    table: {
      caption: "Grouped frequency table (width 0.30)",
      columns: ["Class (km/l)", "Values", "f"],
      rows: [
        ["14.70–15.00", "14.77, 14.91, 14.89", "3"],
        ["15.00–15.30", "15.05, 15.27, 15.22, 15.24, 15.02", "5"],
        ["15.30–15.60", "—", "0"],
        ["15.60–15.90", "15.75", "1"],
        ["15.90–16.20", "16.11, 16.11, 15.99, 16.01, 16.05, 16.02, 16.11", "7"],
        ["Total", "", "16"],
      ],
    },
    conclusion:
      "Mean = 15.53 km/l, median = 15.51 km/l, modal class 15.90–16.20 (mode ≈ 16.04 km/l). With no outliers the mean is a sound overall measure, but the two clusters suggest two groups of cars, which the manager should investigate.",
  },

  "trend-even-years": {
    intro:
      "Y = a + bX. With 8 years (even), the origin is placed midway between 2020 and 2021, and X is measured in half-year units: X = 2(year − 2020.5), giving −7, −5, …, 5, 7, so ΣX = 0.",
    sections: [
      { h: "Step 1: Constants", points: ["n = 8, ΣY = 420, ΣXY = 300, ΣX² = 168.", "a = 420/8 = 52.5.", "b = 300/168 = 1.786 per half-year, i.e., 3.57 per year."] },
      { h: "Step 2: Trend equation", points: ["Y = 52.5 + 1.786X (origin: 1 January 2021, i.e., midway between 2020 and 2021; X unit: half a year; Y: sales in ₹ lakh)."] },
      { h: "Step 3: Forecast for 2026", points: ["X = 2(2026 − 2020.5) = 11.", "Y = 52.5 + 1.786 × 11 = 52.5 + 19.64 = 72.14 lakh."] },
    ],
    table: {
      caption: "Working table",
      columns: ["Year", "Y", "X", "XY", "X²", "Trend Yc"],
      rows: [
        ["2017", "40", "−7", "−280", "49", "40.00"],
        ["2018", "44", "−5", "−220", "25", "43.57"],
        ["2019", "49", "−3", "−147", "9", "47.14"],
        ["2020", "47", "−1", "−47", "1", "50.71"],
        ["2021", "55", "1", "55", "1", "54.29"],
        ["2022", "60", "3", "180", "9", "57.86"],
        ["2023", "58", "5", "290", "25", "61.43"],
        ["2024", "67", "7", "469", "49", "65.00"],
        ["Total", "420", "0", "300", "168", "420"],
      ],
    },
    conclusion:
      "Trend: Y = 52.5 + 1.786X (half-year units). Sales grow by about ₹3.57 lakh a year, and the forecast for 2026 is about ₹72.14 lakh, if the trend continues.",
  },

  "moving-average": {
    intro:
      "A moving average replaces each value with the average of a fixed number of consecutive values, smoothing out short-term fluctuations to reveal the trend. Odd periods are placed against the middle year; even periods must be centred.",
    sections: [
      { h: "(a) 3-yearly moving averages", points: ["3-year totals (placed at 2014 to 2023): 66, 70, 72, 71, 71, 73, 78, 79, 81, 84.", "Divide each by 3: 22.00, 23.33, 24.00, 23.67, 23.67, 24.33, 26.00, 26.33, 27.00, 28.00."] },
      { h: "(b) 4-yearly centred moving averages", points: ["4-year moving totals (falling between years): 91, 94, 94, 96, 97, 100, 104, 107, 111.", "Centre them by adding pairs: 185, 188, 190, 193, 197, 204, 211, 218 (placed at 2015 to 2022).", "Divide by 8: 23.13, 23.50, 23.75, 24.13, 24.63, 25.50, 26.38, 27.25."] },
    ],
    table: {
      caption: "Moving averages",
      columns: ["Year", "Production", "3-yr total", "3-yr MA", "Centred 4-yr total (2 × 4)", "4-yr centred MA"],
      rows: [
        ["2013", "21", "—", "—", "—", "—"],
        ["2014", "22", "66", "22.00", "—", "—"],
        ["2015", "23", "70", "23.33", "185", "23.13"],
        ["2016", "25", "72", "24.00", "188", "23.50"],
        ["2017", "24", "71", "23.67", "190", "23.75"],
        ["2018", "22", "71", "23.67", "193", "24.13"],
        ["2019", "25", "73", "24.33", "197", "24.63"],
        ["2020", "26", "78", "26.00", "204", "25.50"],
        ["2021", "27", "79", "26.33", "211", "26.38"],
        ["2022", "26", "81", "27.00", "218", "27.25"],
        ["2023", "28", "84", "28.00", "—", "—"],
        ["2024", "30", "—", "—", "—", "—"],
      ],
    },
    diagram: "Plot the actual series and both moving-average lines on one graph; the moving averages are visibly smoother.",
    conclusion:
      "Both moving averages show a steady upward trend in production. The 4-year average is smoother but loses two values at each end, a key limitation of the method.",
  },

  "seasonal-index": {
    intro:
      "Method of simple averages: (1) average each quarter over the years, (2) find the grand average of the quarterly averages, (3) seasonal index = quarterly average/grand average × 100.",
    sections: [
      { h: "Step 1: Quarterly totals and averages", points: ["Totals: Q1 = 156, Q2 = 226, Q3 = 198, Q4 = 188.", "Averages (÷ 4): 39, 56.5, 49.5, 47."] },
      { h: "Step 2: Grand average", points: ["(39 + 56.5 + 49.5 + 47)/4 = 192/4 = 48."] },
      { h: "Step 3: Seasonal indices", points: ["Q1 = 39/48 × 100 = 81.25.", "Q2 = 56.5/48 × 100 = 117.71.", "Q3 = 49.5/48 × 100 = 103.13.", "Q4 = 47/48 × 100 = 97.92.", "Check: total = 400.01 ≈ 400."] },
    ],
    table: {
      caption: "Seasonal indices by simple averages",
      columns: ["Year", "Q1", "Q2", "Q3", "Q4"],
      rows: [
        ["1", "30", "40", "36", "34"],
        ["2", "34", "52", "40", "44"],
        ["3", "40", "58", "54", "48"],
        ["4", "52", "76", "68", "62"],
        ["Total", "156", "226", "198", "188"],
        ["Average", "39", "56.5", "49.5", "47"],
        ["Seasonal index", "81.25", "117.71", "103.13", "97.92"],
      ],
    },
    conclusion:
      "Q2 is the peak quarter (about 18% above an average quarter) and Q1 the weakest (about 19% below). The method assumes no trend; since these sales clearly rise over the years, the ratio-to-trend or ratio-to-moving-average method would give more accurate indices.",
  },

  "spearman-ties": {
    intro:
      "Spearman's rank correlation with ties: R = 1 − 6[ΣD² + Σm(m² − 1)/12]/(n(n² − 1)), where m is the number of items in each tied group. Rank the highest mark as 1.",
    sections: [
      { h: "Step 1: Ranks and ties", points: ["X: 16 occurs three times (positions 7, 8, 9), so each gets rank 8.", "Y: 13 occurs twice (positions 5, 6), so 5.5 each; 6 occurs twice (positions 8, 9), so 8.5 each."] },
      { h: "Step 2: Differences", points: ["ΣD = 0 (check). ΣD² = 41."] },
      { h: "Step 3: Correction factor", points: ["X: m = 3, so 3(9 − 1)/12 = 2.", "Y: m = 2, so 2(4 − 1)/12 = 0.5; second tie, 0.5.", "Total correction = 3."] },
      { h: "Step 4: Substitute", points: ["R = 1 − 6(41 + 3)/(10 × 99) = 1 − 264/990 = 1 − 0.267 = 0.733."] },
    ],
    table: {
      caption: "Ranking table",
      columns: ["X", "Rank X", "Y", "Rank Y", "D", "D²"],
      rows: [
        ["48", "3", "13", "5.5", "−2.5", "6.25"],
        ["33", "5", "13", "5.5", "−0.5", "0.25"],
        ["40", "4", "24", "1", "3", "9"],
        ["9", "10", "6", "8.5", "1.5", "2.25"],
        ["16", "8", "15", "4", "4", "16"],
        ["16", "8", "4", "10", "−2", "4"],
        ["65", "1", "20", "2", "−1", "1"],
        ["24", "6", "9", "7", "−1", "1"],
        ["16", "8", "6", "8.5", "−0.5", "0.25"],
        ["57", "2", "19", "3", "−1", "1"],
        ["Total", "", "", "", "0", "41"],
      ],
    },
    conclusion:
      "R ≈ 0.733: a fairly high positive rank correlation. Students who do well in Statistics tend to do well in Accounts.",
  },

  "regression-lines": {
    intro:
      "Regression of Y on X: Y − Ȳ = bᵧₓ(X − X̄) with bᵧₓ = Σdxdy/Σdx². Regression of X on Y: X − X̄ = bₓᵧ(Y − Ȳ) with bₓᵧ = Σdxdy/Σdy². X̄ = 28/7 = 4 and Ȳ = 98/7 = 14.",
    sections: [
      { h: "Step 1: Coefficients", points: ["Σdx² = 28, Σdy² = 64, Σdxdy = 40.", "bᵧₓ = 40/28 = 1.429.", "bₓᵧ = 40/64 = 0.625."] },
      { h: "Step 2: Regression of Y on X", points: ["Y − 14 = 1.429(X − 4), so Y = 8.29 + 1.43X.", "At X = 9: Y = 14 + 1.429 × 5 = 21.14."] },
      { h: "Step 3: Regression of X on Y", points: ["X − 4 = 0.625(Y − 14), so X = −4.75 + 0.625Y.", "At Y = 20: X = 4 + 0.625 × 6 = 7.75."] },
      { h: "Step 4: Correlation", points: ["r = √(bᵧₓ × bₓᵧ) = √(1.429 × 0.625) = √0.893 ≈ 0.945 (positive, as both b's are positive)."] },
      { h: "Why two lines?", points: ["Y on X minimises errors in Y (use it to estimate Y from X); X on Y minimises errors in X. They coincide only when r = ±1 and meet at (X̄, Ȳ) = (4, 14)."] },
    ],
    table: {
      caption: "Working table (X̄ = 4, Ȳ = 14)",
      columns: ["X", "Y", "dx", "dy", "dx²", "dy²", "dxdy"],
      rows: [
        ["1", "10", "−3", "−4", "9", "16", "12"],
        ["2", "12", "−2", "−2", "4", "4", "4"],
        ["3", "11", "−1", "−3", "1", "9", "3"],
        ["4", "15", "0", "1", "0", "1", "0"],
        ["5", "14", "1", "0", "1", "0", "0"],
        ["6", "17", "2", "3", "4", "9", "6"],
        ["7", "19", "3", "5", "9", "25", "15"],
        ["Total 28", "98", "0", "0", "28", "64", "40"],
      ],
    },
    conclusion:
      "Y = 8.29 + 1.43X and X = −4.75 + 0.625Y. Estimated Y at X = 9 is 21.14; estimated X at Y = 20 is 7.75; r ≈ 0.945, a strong positive relationship.",
  },

  "partial-multiple": {
    intro:
      "Partial correlation measures the relationship between two variables after removing the linear effect of the third. Multiple correlation R₁.₂₃ measures how well X₂ and X₃ together relate to X₁.",
    sections: [
      { h: "r₁₂.₃", points: ["r₁₂.₃ = (r₁₂ − r₁₃r₂₃)/√((1 − r₁₃²)(1 − r₂₃²))", "= (0.8 − 0.6 × 0.5)/√((1 − 0.36)(1 − 0.25)) = 0.5/√(0.64 × 0.75) = 0.5/0.6928 ≈ 0.722."] },
      { h: "r₁₃.₂", points: ["r₁₃.₂ = (r₁₃ − r₁₂r₂₃)/√((1 − r₁₂²)(1 − r₂₃²))", "= (0.6 − 0.8 × 0.5)/√((1 − 0.64)(1 − 0.25)) = 0.2/√(0.36 × 0.75) = 0.2/0.5196 ≈ 0.385."] },
      { h: "R₁.₂₃", points: ["R₁.₂₃² = (r₁₂² + r₁₃² − 2r₁₂r₁₃r₂₃)/(1 − r₂₃²)", "= (0.64 + 0.36 − 0.48)/0.75 = 0.52/0.75 = 0.693.", "R₁.₂₃ = √0.693 ≈ 0.833."] },
    ],
    table: {
      caption: "Summary",
      columns: ["Measure", "Value", "Meaning"],
      rows: [
        ["r₁₂ (simple)", "0.80", "X₁ and X₂, ignoring X₃"],
        ["r₁₂.₃", "0.722", "Still strong after removing X₃"],
        ["r₁₃.₂", "0.385", "Much weaker once X₂ is held constant"],
        ["R₁.₂₃", "0.833", "X₂ and X₃ together explain 69% of X₁"],
      ],
    },
    conclusion:
      "X₂ has a strong independent relationship with X₁ (0.722), while much of X₃'s simple correlation with X₁ works through X₂ (0.6 drops to 0.385). Together they explain about 69% of the variation in X₁ (R = 0.833).",
  },
};
