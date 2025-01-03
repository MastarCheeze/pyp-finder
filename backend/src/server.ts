import express from "express";
import cors from "cors";
import { parse } from "./parse.js";
import finder from "./finders/bestexamhelp.js";
import type { Paper, Type } from "./types.js";

async function urlExists(url: string) {
  const res = await fetch(url, { method: "HEAD" });
  return res.status === 200;
}

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  // input validation
  if (req.query.code === undefined) {
    res.status(200).json({ success: 0, message: "Paper code not provided" });
    return;
  }

  const paper = parse(req.query.code.toString());
  if (paper === null) {
    res.status(200).json({ success: 0, message: "Invalid paper code" });
    return;
  }

  if (paper.type === undefined) {
    if (req.query.type === undefined) {
      res.status(200).json({ success: 0, message: "Paper type not provided" });
      return;
    }

    const type = req.query.type.toString().toUpperCase();
    if (!["QP", "MS", "INSERT", "PRE"].includes(type)) {
      res.status(200).json({ success: 0, message: "Invalid paper type" });
      return;
    }

    paper.type = type as Type;
  }

  // get paper url
  const ret = finder(paper as Paper);
  if (!ret.success) {
    res.status(200).json({ success: 0, message: ret.message });
    return;
  }

  // check if url exists
  if (!(await urlExists(ret.url))) {
    res.status(200).json({ success: 0, message: "Could not find paper" });
    return;
  }

  // success, return url
  res.status(200).json({ success: 1, url: ret.url });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
