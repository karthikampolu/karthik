import type { UnitMeta } from "@/lib/exam-prep/types";

export const UNITS: UnitMeta[] = [
  {
    id: "u1",
    short: "Unit I",
    name: "Statistics, classification and tabulation",
    co: "CO1",
    syllabus:
      "Types of statistical methods, importance and scope of statistics in business decisions, types of data. Classification of data, bases of classification, tabulation, objectives of tabulation, parts and types of tables, diagrammatic presentation of data.",
    expected: 5,
    inSample: 6,
  },
  {
    id: "u2",
    short: "Unit II",
    name: "Central tendency and dispersion",
    co: "CO2",
    syllabus:
      "Mean, median, mode, quartiles, percentiles, deciles. Significance of measuring dispersion, range, standard deviation, coefficient of variation, concept of outlier.",
    expected: 6,
    inSample: 6,
  },
  {
    id: "u3",
    short: "Unit III",
    name: "Skewness and kurtosis",
    co: "CO3",
    syllabus:
      "Meaning and significance of skewness in business decisions, Karl Pearson's coefficient of skewness, Bowley's coefficient of skewness. Measures of kurtosis and their implications in business decisions.",
    expected: 4,
    inSample: 4,
  },
  {
    id: "u4",
    short: "Unit IV",
    name: "Correlation and regression",
    co: "CO4",
    syllabus:
      "Meaning, Karl Pearson's coefficient of correlation, rank correlation, multiple correlation, partial correlation, regression analysis, simple linear regression, multiple regression, estimation of coefficients, basics of non-linear regression.",
    expected: 6,
    inSample: 5,
  },
  {
    id: "u5",
    short: "Unit V",
    name: "Index numbers",
    co: "CO5",
    syllabus:
      "Types and uses of index numbers, methods of construction, unweighted vs weighted price indexes, consumer price indexes, problems in the construction of index numbers.",
    expected: 5,
    inSample: 6,
  },
  {
    id: "u6",
    short: "Unit VI",
    name: "Forecasting and time series",
    co: "CO6",
    syllabus:
      "Types and timing of forecasts, forecasting methods, objectives and steps of time series forecasting, time series decomposition models, quantitative forecasting methods, time series analysis.",
    expected: 4,
    inSample: 3,
  },
];
