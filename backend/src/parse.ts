import type { Paper, Type } from "./types";

type ParsedPaper = Omit<Paper, "type"> & { type?: Type } // same as Paper, but with optional type
const regex = /^(?<subject>\d{4})\/(?<component>\d{2})\/((?<type>INSERT|PRE)\/)?(?<season>(F\/M|M\/J|O\/N))\/(?<year>\d{2})$/;

function parse(code: string) {
  const matches = regex.exec(code.toUpperCase());

  if (
    !matches ||
    !(
      matches.groups!.subject &&
      matches.groups!.component &&
      matches.groups!.season &&
      matches.groups!.year
    )
  )
    return null;

  return matches.groups! as ParsedPaper;
}

export { parse }
