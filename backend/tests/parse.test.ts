import { describe, it } from "node:test";
import assert from "node:assert";
import { parse } from "../src/parse";

describe("Paper code parsing", () => {
  const passTests = [
    ["9702/23/M/J/23", "9702", "23", null, "M/J", "23"],
    ["9618/11/o/n/23", "9618", "11", null, "O/N", "23"],
    ["0620/22/F/M/20", "0620", "22", null, "F/M", "20"],
    ["1123/22/INSERT/O/N/23", "1123", "22", "INSERT", "O/N", "23"],
    ["2210/22/PRE/O/N/19", "2210", "22", "PRE", "O/N", "19"],
  ] as const;

  for (const test of passTests) {
    it(test[0], () => {
      const paper = parse(test[0]);
      assert.notEqual(paper, null);
      assert.equal(paper!.subject, test[1]);
      assert.equal(paper!.component, test[2]);
      if (test[3] !== null) assert.equal(paper!.type, test[3]);
      assert.equal(paper!.season, test[4]);
      assert.equal(paper!.year, test[5]);
    });
  }

  const failTests = ["banana", "9702/23/23", "890/23/F/M/19", "0625/M/J/21", "23/543/6", "9709/13/A/B/24"];
  for (const test of failTests) {
    it(test, () => {
      assert.equal(parse(test), null);
    });
  }
});
