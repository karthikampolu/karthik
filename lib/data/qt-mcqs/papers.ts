import type { PredictedPaper } from "@/lib/exam-prep/types";

/**
 * Two full predicted papers. Part A ids were picked to follow the unit
 * blueprint (UNITS[].expected), about 40% easy / 40% medium / 20% hard,
 * with no overlap between papers.
 */
export const PAPERS: PredictedPaper[] = [
  {
    id: "paper-1",
    title: "Predicted Paper 1",
    partA: ["u1-82","u1-51","u1-72","u1-74","u1-19","u2-19","u2-18","u2-31","u2-34","u2-40","u2-21","u3-40","u3-31","u3-17","u3-35","u4-57","u4-75","u4-37","u4-18","u4-11","u4-2","u5-58","u5-35","u5-28","u5-20","u5-2","u6-44","u6-60","u6-3","u6-45"],
    partB: ["grouped-central","skew-pearson-bowley","spearman-ties","fisher-tests","trend-even-years"],
  },
  {
    id: "paper-2",
    title: "Predicted Paper 2",
    partA: ["u1-37","u1-9","u1-20","u1-18","u1-41","u2-84","u2-3","u2-51","u2-25","u2-72","u2-30","u3-41","u3-5","u3-42","u3-43","u4-73","u4-28","u4-51","u4-55","u4-23","u4-16","u5-34","u5-5","u5-25","u5-63","u5-14","u6-25","u6-52","u6-18","u6-28"],
    partB: ["sd-cv-batsmen","moments-kurtosis","regression-lines","cpi-family-budget","moving-average"],
  },
];
