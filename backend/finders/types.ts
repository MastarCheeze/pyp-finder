type SeasonCode = "F/M" | "M/J" | "O/N";
type PaperType = "qp" | "ms" | "in";

interface FindPaper {
  /**
   * @param subjectCode - 4 digit subject code
   * @param component - Component and variant of the paper
   * @param seasonCode - Season of the paper (F/M, M/J, O/N)
   * @param year - Year of the paper
   * @param type - Type of paper to search for (question paper, mark scheme, insert)
   */
  (
    subjectCode: string,
    component: string,
    seasonCode: SeasonCode,
    year: string,
    type: PaperType,
  ): string;
}

export { SeasonCode, PaperType, FindPaper };
