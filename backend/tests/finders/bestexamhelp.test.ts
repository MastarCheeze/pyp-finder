import { describe, it } from "node:test";
import assert from "node:assert";

import { parse } from "../../src/parse";
import type { Paper } from "../../src/types";
import finder from "../../src/finders/bestexamhelp";

describe("BestExamHelp url finder", () => {
  // prettier-ignore
  const tests = [
    // o level
    ["7100/23/M/J/21", "QP", "https://bestexamhelp.com/exam/cambridge-o-level/commerce-7100/2021/7100_s21_qp_23.pdf"],
    ["2281/22/M/J/21", "MS", "https://bestexamhelp.com/exam/cambridge-o-level/economics-2281/2021/2281_s21_ms_22.pdf"],
    ["4040/22/O/N/22", "QP", "https://bestexamhelp.com/exam/cambridge-o-level/statistics-4040/2022/4040_w22_qp_22.pdf"],
    ["1123/11/M/J/24", "QP", "https://bestexamhelp.com/exam/cambridge-o-level/english-language-1123/2024/1123_s24_qp_11.pdf"],
    ["5090/41/M/J/23", "MS", "https://bestexamhelp.com/exam/cambridge-o-level/biology-5090/2023/5090_s23_ms_41.pdf"],
    ["1123/22/INSERT/O/N/23", "INSERT", "https://bestexamhelp.com/exam/cambridge-o-level/english-language-1123/2023/1123_w23_in_22.pdf"],
    ["1123/22/O/N/23", "INSERT", "https://bestexamhelp.com/exam/cambridge-o-level/english-language-1123/2023/1123_w23_in_22.pdf"],
    ["2210/22/PRE/O/N/19", "PRE", "https://bestexamhelp.com/exam/cambridge-o-level/computer-science-2210/2019/2210_w19_pm_22.pdf"],
    // igcse
    ["0508/02/M/J/23", "QP", "https://bestexamhelp.com/exam/cambridge-igcse/arabic-first-language-0508/2023/0508_s23_qp_02.pdf"],
    ["0493/21/O/N/20", "MS", "https://bestexamhelp.com/exam/cambridge-igcse/islamiyat-0493/2020/0493_w20_ms_21.pdf"],
    ["0501/02/M/J/19", "QP", "https://bestexamhelp.com/exam/cambridge-igcse/french-first-language-0501/2019/0501_s19_qp_02.pdf"],
    ["0502/12/M/J/23", "MS", "https://bestexamhelp.com/exam/cambridge-igcse/spanish-first-language-0502/2023/0502_s23_ms_12.pdf"],
    ["0509/13/INSERT/M/J/21", "INSERT", "https://bestexamhelp.com/exam/cambridge-igcse/chinese-first-language-0509/2021/0509_s21_in_13.pdf"],
    ["0411/11/PRE/O/N/22", "PRE", "https://bestexamhelp.com/exam/cambridge-igcse/drama-0411/2022/0411_w22_pm_11.pdf"],
    // igcse (9-1)
    ["0972/62/M/J/22", "QP", "https://bestexamhelp.com/exam/cambridge-igcse-9-1/physics-0972/2022/0972_s22_qp_62.pdf"],
    ["0987/21/M/J/24", "MS", "https://bestexamhelp.com/exam/cambridge-igcse-9-1/economics-0987/2024/0987_s24_ms_21.pdf"],
    ["0980/42/M/J/22", "QP", "https://bestexamhelp.com/exam/cambridge-igcse-9-1/mathematics-0980/2022/0980_s22_qp_42.pdf"],
    ["0973/61/M/J/21", "MS", "https://bestexamhelp.com/exam/cambridge-igcse-9-1/sciences-co-ordinated-0973/2021/0973_s21_ms_61.pdf"],
    ["7184/01/INSERT/M/J/23", "INSERT", "https://bestexamhelp.com/exam/cambridge-igcse-9-1/arabic-first-language-7184/2023/7184_s23_in_01.pdf"],
    ["0984/22/PRE/O/N/19", "PRE", "https://bestexamhelp.com/exam/cambridge-igcse-9-1/computer-science-0984/2019/0984_w19_pm_22.pdf"],
    ["0994/12/PRE/M/J/22", "PRE", "https://bestexamhelp.com/exam/cambridge-igcse-9-1/drama-0994/2022/0994_s22_pm_12.pdf"],
    // a level
    ["9713/32/M/J/15", "QP", "https://bestexamhelp.com/exam/cambridge-international-a-level/applied-information-and-communication-technology-9713/2015/9713_s15_qp_32.pdf"],
    ["9708/32/F/M/18", "MS", "https://bestexamhelp.com/exam/cambridge-international-a-level/economics-9708/2018/9708_m18_ms_32.pdf"],
    ["9489/31/M/J/22", "QP", "https://bestexamhelp.com/exam/cambridge-international-a-level/history-9489/2022/9489_s22_qp_31.pdf"],
    ["9231/22/O/N/16", "MS", "https://bestexamhelp.com/exam/cambridge-international-a-level/mathematics-further-9231/2016/9231_w16_ms_22.pdf"],
    ["9618/23/INSERT/M/J/23", "INSERT", "https://bestexamhelp.com/exam/cambridge-international-a-level/computer-science-9618/2023/9618_s23_in_23.pdf"],
  ] as const;

  for (const test of tests) {
    it(test[0], () => {
      const paper = parse(test[0]);
      assert(paper !== null);
      paper.type = test[1];

      const result = finder(paper as Paper);
      assert(result.success === true);
      assert.equal(result.url, test[2]);
    });
  }
});
