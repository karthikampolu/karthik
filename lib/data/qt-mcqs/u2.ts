import type { Row } from "@/lib/exam-prep/types";

/** Unit II: measures of central tendency, partition values and dispersion. */
export const u2: Row[] = [
  // ---------- Arithmetic mean ----------
  ["Arithmetic mean", "e", "The arithmetic mean of 4, 8, 6, 10 and 12 is:", ["8", "6", "10", "40"], 0, "Mean = Σx/n = 40/5 = 8."],
  ["Arithmetic mean", "e", "The sum of deviations of observations from their arithmetic mean is always:", ["Zero", "Minimum but positive", "One", "Equal to the mean"], 0, "Σ(x − x̄) = 0. This is why mean deviation uses absolute values and SD uses squares."],
  ["Arithmetic mean", "m", "The sum of squared deviations is least when deviations are taken from the:", ["Arithmetic mean", "Median", "Mode", "Largest value"], 0, "Σ(x − A)² is minimum when A = x̄. (The sum of absolute deviations is least about the median.)"],
  ["Arithmetic mean", "m", "The mean of 10 observations is 20. One value, 25, was wrongly read as 52. The correct mean is:", ["17.3", "22.7", "20", "18.5"], 0, "Wrong total = 200. Correct total = 200 − 52 + 25 = 173. Correct mean = 173/10 = 17.3."],
  ["Arithmetic mean", "m", "Group A has 40 students with mean marks 60; group B has 60 students with mean 70. The combined mean is:", ["66", "65", "64", "68"], 0, "Combined mean = (40 × 60 + 60 × 70)/100 = (2400 + 4200)/100 = 66."],
  ["Arithmetic mean", "m", "If 5 is added to every observation, the mean:", ["Increases by 5", "Stays the same", "Is multiplied by 5", "Decreases by 5"], 0, "The mean shifts with a change of origin: new mean = old mean + 5. (The SD does not change.)"],
  ["Arithmetic mean", "m", "If every observation is multiplied by 3, the mean:", ["Is multiplied by 3", "Increases by 3", "Is unchanged", "Is divided by 3"], 0, "The mean changes with scale: new mean = 3 × old mean."],
  ["Arithmetic mean", "m", "For grouped data, the step-deviation formula for the mean is:", ["x̄ = A + (Σfd′/N) × h", "x̄ = A − Σfd/N", "x̄ = Σf/N", "x̄ = L + (N/2 − cf)/f × h"], 0, "d′ = (x − A)/h. The last option is the median formula."],
  ["Arithmetic mean", "h", "Classes 10–20 … 60–70 with f = 4, 6, 10, 16, 8, 6 (N = 50). Taking A = 45 and h = 10, Σfd′ = −14. The mean is:", ["42.2", "47.8", "45", "43.6"], 0, "Mean = 45 + (−14/50) × 10 = 45 − 2.8 = 42.2."],
  ["Arithmetic mean", "h", "Mid-points 1, 3, 5, 7, 9 with frequencies 2, 3, 5, 6, 4. The mean is:", ["5.7", "5.5", "6", "4.8"], 0, "Σfx = 2 + 9 + 25 + 42 + 36 = 114, N = 20. Mean = 114/20 = 5.7."],
  ["Weighted mean", "m", "A student scores 70 in a paper with weight 2 and 80 in a paper with weight 3. The weighted mean is:", ["76", "75", "74", "78"], 0, "Weighted mean = Σwx/Σw = (2 × 70 + 3 × 80)/5 = 380/5 = 76."],
  ["Weighted mean", "m", "A weighted mean is preferred to a simple mean when:", ["Items differ in relative importance", "All items are equally important", "Data are qualitative", "There are open-end classes"], 0, "Weights reflect importance, e.g., quantities in an index number or credits in a CGPA."],
  ["Merits of the mean", "e", "Which is a merit of the arithmetic mean?", ["It is based on all observations and suits further algebraic treatment", "It is unaffected by extreme values", "It can be found graphically", "It can be computed for open-end classes without assumptions"], 0, "The mean uses every value and is used in SD, correlation and regression. Its main weakness is sensitivity to extreme values."],
  ["Demerits of the mean", "e", "The main drawback of the arithmetic mean is that it is:", ["Affected by extreme values", "Not rigidly defined", "Not based on all observations", "Impossible to calculate"], 0, "One very large or small value pulls the mean towards it, e.g., one crorepati in a village raises average income."],
  ["Demerits of the mean", "m", "The mean cannot be calculated exactly for a distribution with:", ["Open-end classes", "Equal class widths", "Discrete values", "An even number of items"], 0, "Open-end classes have no mid-point, so an assumption is needed. Median and mode can still be found."],

  // ---------- GM and HM ----------
  ["Geometric and harmonic mean", "m", "The geometric mean of 4 and 9 is:", ["6", "6.5", "5.5", "13"], 0, "GM = √(4 × 9) = √36 = 6."],
  ["Geometric and harmonic mean", "m", "A car goes from A to B at 60 km/h and returns at 40 km/h. The average speed for the round trip is:", ["48 km/h", "50 km/h", "45 km/h", "52 km/h"], 0, "Equal distances, so use the harmonic mean: 2 × 60 × 40/(60 + 40) = 4800/100 = 48 km/h."],
  ["Geometric and harmonic mean", "m", "For any set of positive, unequal values, the relationship between the means is:", ["AM > GM > HM", "HM > GM > AM", "GM > AM > HM", "AM = GM = HM"], 0, "AM ≥ GM ≥ HM, with equality only when all values are equal. For two values, GM² = AM × HM."],
  ["Geometric and harmonic mean", "h", "The geometric mean is the most suitable average for:", ["Average rates of growth, such as population or compound interest", "Average speed over equal distances", "Most common shoe size", "Income distributions with extremes"], 0, "GM averages ratios and percentage changes; it is also used in Fisher's index. HM suits rates such as speed over equal distances."],

  // ---------- Median ----------
  ["Median", "e", "The median of 3, 7, 1, 9, 5 is:", ["5", "7", "3", "25"], 0, "Arrange: 1, 3, 5, 7, 9. The middle (3rd) value is 5."],
  ["Median", "e", "The median of 2, 4, 6, 8, 10, 12 is:", ["7", "6", "8", "42"], 0, "Even n: average of the 3rd and 4th values = (6 + 8)/2 = 7."],
  ["Median", "e", "For ungrouped data, the median is the value of the:", ["((n + 1)/2)th item after arranging in order", "(n/4)th item", "Most frequent item", "Largest item"], 0, "Arrange in ascending order first, then take the ((n + 1)/2)th item."],
  ["Median", "m", "The formula for the median of grouped data is:", ["L + ((N/2 − cf)/f) × h", "L + ((f₁ − f₀)/(2f₁ − f₀ − f₂)) × h", "A + (Σfd/N) × h", "(Q₃ − Q₁)/2"], 0, "L = lower limit of the median class, cf = cumulative frequency before it, f = its frequency, h = width."],
  ["Median", "h", "N = 50. The median class is 40–50 with f = 16, and the cumulative frequency before it is 20. The median is:", ["43.125", "45", "42.5", "41.25"], 0, "Median = 40 + ((25 − 20)/16) × 10 = 40 + 3.125 = 43.125."],
  ["Median", "m", "The median is the best average for:", ["Income or wealth data with extreme values", "Further algebraic treatment", "Finding the most fashionable size", "Averaging growth rates"], 0, "The median depends on position, not size, so a few extreme incomes don't distort it."],
  ["Median", "m", "Which average can be located graphically from ogives?", ["Median", "Mean", "Geometric mean", "Harmonic mean"], 0, "The 'less than' and 'more than' ogives intersect at the median."],
  ["Median", "m", "The median is unaffected by:", ["Extreme values", "The number of observations", "The order of the data", "Changes in the middle values"], 0, "Changing the largest value from 100 to 10,000 does not move the median."],
  ["Median", "h", "Values 5, 8, 11, 14, 100. Replacing 100 with 17 changes:", ["The mean but not the median", "The median but not the mean", "Both mean and median", "Neither"], 0, "The median stays 11. The mean drops from 27.6 to 11."],

  // ---------- Mode ----------
  ["Mode", "e", "The mode of 2, 3, 3, 5, 7, 3, 5 is:", ["3", "5", "4", "7"], 0, "3 occurs three times, more than any other value."],
  ["Mode", "e", "The mode is the value that:", ["Occurs most frequently", "Lies in the middle", "Is the arithmetic average", "Is the largest"], 0, "Mode = the most frequent or most typical value."],
  ["Mode", "m", "The formula for the mode of grouped data is:", ["L + ((f₁ − f₀)/(2f₁ − f₀ − f₂)) × h", "L + ((N/2 − cf)/f) × h", "3 Median + 2 Mean", "(L + S)/2"], 0, "f₁ = modal class frequency, f₀ = the class before, f₂ = the class after."],
  ["Mode", "h", "Modal class 40–50 has f₁ = 16; the classes before and after have f₀ = 10 and f₂ = 8. The mode is:", ["44.29", "45.00", "43.75", "46.25"], 0, "Mode = 40 + ((16 − 10)/(32 − 10 − 8)) × 10 = 40 + (6/14) × 10 = 44.29."],
  ["Mode", "m", "A shoe manufacturer deciding which size to produce most should use the:", ["Mode", "Mean", "Median", "Harmonic mean"], 0, "The most commonly demanded size is the mode; a mean size (e.g., 7.38) is not a real size."],
  ["Mode", "m", "A distribution with two modes is called:", ["Bimodal", "Unimodal", "Symmetric", "Mesokurtic"], 0, "Two peaks: bimodal. More than two: multimodal."],
  ["Mode", "m", "When the mode is ill-defined, it can be found from the empirical relation:", ["Mode = 3 Median − 2 Mean", "Mode = 2 Median − 3 Mean", "Mode = Mean + Median", "Mode = (Mean + Median)/2"], 0, "Karl Pearson's empirical relation for moderately skewed distributions: Mode = 3 Median − 2 Mean."],
  ["Mode", "m", "In a moderately skewed distribution, the mean is 40 and the median is 38. The mode is approximately:", ["34", "36", "42", "44"], 0, "Mode = 3 × 38 − 2 × 40 = 114 − 80 = 34."],
  ["Mode", "h", "In a moderately skewed distribution, the mean is 50 and the mode is 47. The median is approximately:", ["49", "48.5", "48", "51"], 0, "Median = (Mode + 2 Mean)/3 = (47 + 100)/3 = 49."],
  ["Mode", "m", "Which average can be used for qualitative data such as the most popular colour?", ["Mode", "Mean", "Median", "Geometric mean"], 0, "Only the mode applies to nominal data; colours can't be added or ordered."],

  // ---------- Partition values ----------
  ["Quartiles, deciles, percentiles", "e", "Quartiles divide a series into:", ["Four equal parts", "Ten equal parts", "Hundred equal parts", "Two equal parts"], 0, "There are three quartiles (Q₁, Q₂, Q₃). Deciles divide into 10 parts (9 deciles); percentiles into 100 (99 percentiles)."],
  ["Quartiles, deciles, percentiles", "e", "The second quartile (Q₂) is the same as the:", ["Median", "Mean", "Mode", "First decile"], 0, "Q₂ = D₅ = P₅₀ = median."],
  ["Quartiles, deciles, percentiles", "e", "The number of deciles in a distribution is:", ["9", "10", "4", "99"], 0, "Nine cut points (D₁ to D₉) divide the data into ten equal parts."],
  ["Quartiles, deciles, percentiles", "m", "P₂₅ is the same as:", ["Q₁", "Q₃", "D₅", "The median"], 0, "The 25th percentile marks the first quarter: P₂₅ = Q₁. Similarly P₇₅ = Q₃."],
  ["Quartiles, deciles, percentiles", "m", "D₇ is equal to:", ["P₇₀", "P₇", "Q₃", "P₇₅"], 0, "The 7th decile is the 70th percentile."],
  ["Quartiles, deciles, percentiles", "m", "For the data 3, 5, 7, 8, 10, 12, 15, Q₁ and Q₃ are:", ["5 and 12", "7 and 10", "3 and 15", "5 and 10"], 0, "n = 7. Q₁ = ((n + 1)/4)th = 2nd item = 5. Q₃ = (3(n + 1)/4)th = 6th item = 12."],
  ["Quartiles, deciles, percentiles", "h", "N = 50. The Q₁ class is 30–40 with f = 10, and the cumulative frequency before it is 10. Q₁ is:", ["32.5", "35", "31.25", "37.5"], 0, "Q₁ = 30 + ((12.5 − 10)/10) × 10 = 32.5."],
  ["Quartiles, deciles, percentiles", "h", "N = 50. The Q₃ class is 50–60 with f = 8, and the cumulative frequency before it is 36. Q₃ is:", ["51.875", "52.5", "55", "53.25"], 0, "Q₃ position = 3N/4 = 37.5. Q₃ = 50 + ((37.5 − 36)/8) × 10 = 50 + 1.875 = 51.875."],
  ["Quartiles, deciles, percentiles", "m", "A student's score is at the 90th percentile. This means:", ["About 90% of students scored at or below this score", "The student scored 90 marks", "The student got 90% of the questions right", "Only 90 students took the test"], 0, "Percentiles describe relative standing, not raw marks."],
  ["Quartiles, deciles, percentiles", "h", "The general formula for the ith decile in grouped data is:", ["L + ((iN/10 − cf)/f) × h", "L + ((iN/4 − cf)/f) × h", "L + ((iN/100 − cf)/f) × h", "A + (Σfd/N) × h"], 0, "Same structure as the median formula, with iN/10 as the position. Use iN/4 for quartiles and iN/100 for percentiles."],

  // ---------- Dispersion: meaning and significance ----------
  ["Significance of dispersion", "e", "Dispersion measures:", ["The extent to which values are spread around the average", "The most typical value", "The middle value", "The shape of the peak"], 0, "Two series can share a mean of 50 but differ greatly in spread; dispersion captures that."],
  ["Significance of dispersion", "m", "Why is an average alone not enough to describe data?", ["Series with the same mean can have very different variability", "Averages are always wrong", "Averages cannot be calculated for samples", "Averages measure skewness"], 0, "E.g., two machines both average 100 mm, but one varies ±1 mm and the other ±10 mm."],
  ["Significance of dispersion", "m", "In business, a low dispersion in delivery times indicates:", ["Consistency and reliability", "Higher average speed", "Positive skewness", "Seasonal variation"], 0, "Less variation means more predictable, consistent performance."],
  ["Absolute vs relative measures", "m", "Relative measures of dispersion are useful because they:", ["Are unit-free, so series in different units can be compared", "Are always larger than absolute measures", "Need no average", "Ignore extreme values"], 0, "Coefficient of variation, coefficient of range and coefficient of QD are ratios without units."],
  ["Absolute vs relative measures", "m", "Which is a relative measure of dispersion?", ["Coefficient of variation", "Standard deviation", "Range", "Quartile deviation"], 0, "SD, range, QD and MD are absolute (in the data's units). Coefficients are relative."],

  // ---------- Range and QD ----------
  ["Range", "e", "The range of 7, 3, 15, 9 is:", ["12", "8", "15", "34"], 0, "Range = largest − smallest = 15 − 3 = 12."],
  ["Range", "m", "For 12, 18, 25, 30, 40, the coefficient of range is:", ["0.538", "28", "0.7", "1.86"], 0, "Coefficient of range = (L − S)/(L + S) = (40 − 12)/(40 + 12) = 28/52 = 0.538."],
  ["Range", "m", "The main limitation of the range is that it:", ["Depends only on the two extreme values", "Is hard to calculate", "Uses every observation", "Is unit-free"], 0, "Range ignores everything between the extremes and is distorted by a single outlier. It is still used in quality control."],
  ["Quartile deviation", "e", "Quartile deviation (semi-interquartile range) is:", ["(Q₃ − Q₁)/2", "Q₃ − Q₁", "(Q₃ + Q₁)/2", "Q₃/Q₁"], 0, "QD = half the interquartile range."],
  ["Quartile deviation", "m", "If Q₁ = 20 and Q₃ = 40, the coefficient of quartile deviation is:", ["0.333", "10", "0.5", "20"], 0, "Coefficient of QD = (Q₃ − Q₁)/(Q₃ + Q₁) = 20/60 = 0.333. QD itself = 10."],
  ["Quartile deviation", "m", "Quartile deviation is preferred for distributions with:", ["Open-end classes or extreme values", "Only two values", "No middle values", "Normal shape only"], 0, "QD uses the middle 50% of the data, so the extremes don't affect it."],
  ["Mean deviation", "m", "Mean deviation is the least when deviations are taken from the:", ["Median", "Mean", "Mode", "Largest value"], 0, "Σ|x − A| is minimum when A = median."],
  ["Mean deviation", "m", "Mean deviation ignores the signs of deviations, which is:", ["Mathematically illogical and its main weakness", "Its main strength for algebra", "The reason it is used in regression", "Why it is unit-free"], 0, "Ignoring signs makes MD unsuitable for further algebraic treatment; SD squares the deviations instead."],

  // ---------- Standard deviation and variance ----------
  ["Standard deviation", "e", "Standard deviation is the:", ["Square root of the mean of squared deviations from the mean", "Mean of absolute deviations from the median", "Difference between the largest and smallest values", "Half the interquartile range"], 0, "σ = √(Σ(x − x̄)²/n). Its square is the variance."],
  ["Standard deviation", "e", "If the standard deviation is 6, the variance is:", ["36", "6", "12", "2.45"], 0, "Variance is the square of the SD: σ² = 6² = 36."],
  ["Standard deviation", "e", "The standard deviation of 5, 5, 5, 5 is:", ["0", "5", "1", "20"], 0, "All values equal the mean, so every deviation is zero."],
  ["Standard deviation", "m", "The standard deviation of 2, 4, 4, 4, 5, 5, 7, 9 is:", ["2", "4", "5", "1.5"], 0, "Mean = 40/8 = 5. Squared deviations: 9, 1, 1, 1, 0, 0, 4, 16 = 32. Variance = 32/8 = 4, σ = 2."],
  ["Standard deviation", "m", "n = 5, Σx = 50, Σx² = 540. The standard deviation is:", ["2.83", "8", "10", "4"], 0, "σ² = Σx²/n − x̄² = 108 − 100 = 8. σ = √8 = 2.83."],
  ["Standard deviation", "m", "If 10 is added to every observation, the standard deviation:", ["Remains unchanged", "Increases by 10", "Is multiplied by 10", "Becomes zero"], 0, "SD is independent of a change of origin; every value and the mean shift together."],
  ["Standard deviation", "m", "If every observation is multiplied by 3, the variance becomes:", ["9 times the original", "3 times the original", "Unchanged", "Original + 3"], 0, "SD is multiplied by 3, so variance (SD²) is multiplied by 9."],
  ["Standard deviation", "h", "The standard deviation of the first 7 natural numbers is:", ["2", "4", "3.5", "1.73"], 0, "σ = √((n² − 1)/12) = √(48/12) = √4 = 2."],
  ["Standard deviation", "h", "For a normal distribution, QD and MD are approximately:", ["QD ≈ (2/3)σ and MD ≈ (4/5)σ", "QD ≈ σ and MD ≈ 2σ", "QD ≈ (4/5)σ and MD ≈ (2/3)σ", "QD = MD = σ"], 0, "Standard approximations: QD ≈ 0.6745σ ≈ 2σ/3 and MD ≈ 0.7979σ ≈ 4σ/5."],
  ["Standard deviation", "m", "Standard deviation is considered the best measure of dispersion because it:", ["Uses all observations and suits further algebraic treatment", "Is unaffected by extreme values", "Is the easiest to compute", "Ignores the signs of deviations"], 0, "SD is rigidly defined and used in sampling, correlation and regression. Its weakness is sensitivity to extremes."],

  // ---------- Coefficient of variation ----------
  ["Coefficient of variation", "e", "The coefficient of variation is:", ["(σ/x̄) × 100", "(x̄/σ) × 100", "σ²/x̄", "(Q₃ − Q₁)/2"], 0, "CV (Karl Pearson) expresses SD as a percentage of the mean."],
  ["Coefficient of variation", "m", "Series A: mean 50, SD 10. Series B: mean 80, SD 12. Which is more consistent?", ["B, because its CV is 15% against A's 20%", "A, because its SD is smaller", "Both are equally consistent", "Cannot be determined"], 0, "CV A = 10/50 × 100 = 20%. CV B = 12/80 × 100 = 15%. Lower CV means more consistent."],
  ["Coefficient of variation", "m", "The SD is 4 and the CV is 20%. The mean is:", ["20", "5", "80", "0.8"], 0, "CV = σ/x̄ × 100 → 20 = 4/x̄ × 100 → x̄ = 20."],
  ["Coefficient of variation", "m", "The mean is 25 and the CV is 12%. The standard deviation is:", ["3", "2.08", "12", "300"], 0, "σ = CV × x̄/100 = 12 × 25/100 = 3."],
  ["Coefficient of variation", "h", "Batsman A averages 50 runs with SD 41.83; batsman B averages 33 with SD 23.37. Which statement is correct?", ["A is the better scorer; B is more consistent", "A is better and more consistent", "B is better and more consistent", "B is the better scorer; A is more consistent"], 0, "Higher mean: A scores more. CV A = 83.7%, CV B = 70.8%, so B is more consistent."],
  ["Coefficient of variation", "h", "Weights of mice (mean 30 g, SD 3 g) and elephants (mean 4000 kg, SD 200 kg). Comparing variability, you should use:", ["CV, because the units and scales differ; mice vary more (10% vs 5%)", "SD, so elephants vary more", "Range only", "Variance, so elephants vary more"], 0, "SDs in different units cannot be compared. CV mice = 10%, CV elephants = 5%."],
  ["Coefficient of variation", "m", "Comparing the stability of share prices of two companies with very different price levels is best done with:", ["Coefficient of variation", "Range", "Standard deviation alone", "Mode"], 0, "A ₹2,000 share and a ₹50 share have different scales; CV removes that effect."],

  // ---------- Outliers ----------
  ["Outliers", "e", "In statistics, an outlier is:", ["An observation that lies abnormally far from the other values", "The most common value", "The middle value", "Any negative value"], 0, "Outliers may be data errors or genuine but rare cases; either way they must be investigated."],
  ["Outliers", "m", "Which measures are most affected by an outlier?", ["Mean, range and standard deviation", "Median and quartile deviation", "Mode and median", "Q₁ and Q₃"], 0, "These use the actual size of extreme values. The median and IQR are resistant."],
  ["Outliers", "m", "By the IQR rule, a value is an outlier if it lies:", ["Below Q₁ − 1.5 × IQR or above Q₃ + 1.5 × IQR", "Within one SD of the mean", "Between Q₁ and Q₃", "Exactly at the median"], 0, "IQR = Q₃ − Q₁. These fences are also used in box plots."],
  ["Outliers", "h", "Q₁ = 20 and Q₃ = 40. Which value is an outlier by the 1.5 × IQR rule?", ["85", "65", "−5", "55"], 0, "IQR = 20. Fences: 20 − 30 = −10 and 40 + 30 = 70. Only 85 lies outside."],
  ["Outliers", "m", "Using z-scores, an observation is often treated as an outlier when:", ["|z| > 3", "|z| < 1", "z = 0", "z is positive"], 0, "z = (x − x̄)/σ. Values more than 3 SDs from the mean are very rare in a normal distribution."],
  ["Outliers", "h", "A salary dataset has one CEO salary far above the rest. The best summary of the typical salary and its spread is:", ["Median and interquartile range", "Mean and standard deviation", "Mean and range", "Mode and range"], 0, "Resistant measures describe the typical employee without the outlier dominating."],
  ["Outliers", "m", "Which graph shows outliers directly as separate points?", ["Box plot (box-and-whisker)", "Pie chart", "Pictogram", "Ogive"], 0, "Box plots mark values beyond the whisker fences as individual points."],
];
