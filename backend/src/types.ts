// QP - question paper
// MS - mark scheme
// INSERT - insert paper (for language papers)
// PRE - pre release material (for drama and old computer science papers)
type Type = "QP" | "MS" | "INSERT" | "PRE";

// F/M - February/March
// M/J - May/June (summer)
// O/N - October/November (winter)
type Season = "F/M" | "M/J" | "O/N";

// Representation of a question paper, mark scheme or other types of material
type Paper = {
  subject: string; // 4 digit subject code
  component: string; // 2 digit component/variant
  season: Season; // season
  year: string; // 2 digit year
  type: Type; // type of paper
}

// function that finds the URL of the paper given the Paper object
interface Finder {
  (paper: Paper): { success: true; url: string } | { success: false; message: string };
}

export { Type, Paper, Finder };
