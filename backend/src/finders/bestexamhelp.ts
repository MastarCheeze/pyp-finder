import type { Finder, Paper } from "../types";

const urlTemplate =
  "https://bestexamhelp.com/exam/{exam}/{subjectName}-{subjectCode}/20{year}/{subjectCode}_{seasonLetter}{year}_{type}_{component}.pdf";

const subjectMap: Record<string, Record<string, string>> = {
  "cambridge-o-level": {
    "7707": "accounting",
    "5090": "biology",
    "7115": "business-studies",
    "3204": "bengali",
    "7094": "bangladesh-studies",
    "5070": "chemistry",
    "7100": "commerce",
    "2210": "computer-science",
    "7010": "computer-studies",
    "2281": "economics",
    "1123": "english-language",
    "4024": "mathematics-d",
    "4037": "mathematics-additional",
    "5054": "physics",
    "7110": "principles-of-accounts",
    "2059": "pakistan-studies",
    "4040": "statistics",
  },
  "cambridge-igcse": {
    "0452": "accounting",
    "0508": "arabic-first-language",
    "0400": "art-and-design",
    "0600": "agriculture",
    "0610": "biology",
    "0450": "business-studies",
    "0620": "chemistry",
    "0478": "computer-science",
    "0509": "chinese-first-language",
    "0411": "drama",
    "0455": "economics",
    "0500": "english-first-language",
    "0524": "english-first-language-us",
    "0475": "english-literature",
    "0680": "environmental-management",
    "0454": "enterprise",
    "0648": "food-and-nutrition",
    "0501": "french-first-language",
    "0460": "geography",
    "0457": "global-perspectives",
    "0470": "history",
    "0493": "islamiyat",
    "0580": "mathematics",
    "0606": "mathematics-additional",
    "0607": "mathematics-international",
    "0410": "music",
    "0696": "malay-first-language",
    "0625": "physics",
    "0413": "physical-education",
    "0490": "religious-studies",
    "0653": "science-combined",
    "0654": "sciences-co-ordinated",
    "0495": "sociology",
    "0502": "spanish-first-language",
    "0471": "travel-and-tourism",
  },
  "cambridge-igcse-9-1": {
    "0985": "accounting",
    "7184": "arabic-first-language",
    "0989": "art-and-design",
    "0970": "biology",
    "0986": "business-studies",
    "0971": "chemistry",
    "0984": "computer-science",
    "0994": "drama",
    "0987": "economics",
    "0990": "english-first-language",
    "0992": "english-literature",
    "0976": "geography",
    "0977": "history",
    "0980": "mathematics",
    //"0978": "music", // link broken on website
    "0972": "physics",
    "0995": "physical-education",
    "0973": "sciences-co-ordinated",
  },
  "cambridge-international-a-level": {
    "9706": "accounting",
    "9713": "applied-information-and-communication-technology",
    "9700": "biology",
    "9609": "business",
    "9707": "business-studies",
    "9701": "chemistry",
    "9618": "computer-science",
    "9608": "computer-science",
    "9691": "computing",
    "9708": "economics",
    "9489": "history",
    "9488": "islamic-studies",
    "9084": "law",
    "9709": "mathematics",
    "9231": "mathematics-further",
    "9607": "media-studies",
    "9702": "physics",
    "9990": "psychology",
    "9698": "psychology",
    "9699": "sociology",
  },
};

const seasonMap = {
  "F/M": "m",
  "M/J": "s",
  "O/N": "w",
};

const typeMap = {
  QP: "qp",
  MS: "ms",
  INSERT: "in",
  PRE: "pm",
};

const finder: Finder = function (paper: Paper) {
  let exam = null;
  for (const iExam in subjectMap) {
    if (subjectMap[iExam][paper.subject] !== undefined) {
      exam = iExam;
      break;
    }
  }
  if (exam === null) return { success: false, message: `Cannot find subject code ${paper.subject}` };

  let url = urlTemplate;
  url = url.replaceAll("{exam}", exam);
  url = url.replaceAll("{subjectName}", subjectMap[exam][paper.subject]);
  url = url.replaceAll("{subjectCode}", paper.subject);
  url = url.replaceAll("{year}", paper.year);
  url = url.replaceAll("{seasonLetter}", seasonMap[paper.season]);
  url = url.replaceAll("{type}", typeMap[paper.type]);
  url = url.replaceAll("{component}", paper.component);
  url = url.replaceAll("{component}", paper.component);

  return { success: true, url: url };
};

export default finder;
