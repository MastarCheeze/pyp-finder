# CAIE Past Year Paper Finder :mag:

:globe_with_meridians: Website: https://mastarcheeze.github.io/pyp-finder/

## Synopsis

This website finds previous CAIE exam papers (IGCSE, O Levels and A Levels) using their paper code. It opens the exam
paper PDF file directly in a new tab.

I made this website because I got tired of having to manually search for exam papers in a search engine and clicking
through a dozen links before getting the PDF I want.

Currently, exam papers are retrieved only from [BestExamHelp](https://bestexamhelp.com/), but I have plans to add more
sources in the future.

## API

The API used for the website is hosted using Google Cloud Run and is available publicly at
https://pyp-finder-server-417289630154.asia-east1.run.app.

To use the API, pass the fields `code` and `type` as a query string into the API URL (values passed are case
insensitive).

- `code` - The paper code, commonly found at the bottom of each page in a CAIE exam paper. (e.g. `9709/23/M/J/21`)
- `type` - The type of the paper. Valid values are `qp` for question papers, `ms` for mark schemes, `insert` for inserts
  and `pre` for pre-release material.

The response is returned in JSON format. The fields returned are:

- `success` - `1` if a URL is found and `0` if not.
- `url` - The URL found. This field only exists when `success` is `1`.
- `message` - The error message. This field only exists when `success` is `0`.

> [!note]
>
> If the paper code contains the paper type (e.g. `0509/13/INSERT/M/J/21`), the `type` field is not required. The API
> can deduce the paper type from the code. This coding style is used by CAIE only for inserts and pre-release material.

### Example usage

Query URL:

```url
https://pyp-finder-server-417289630154.asia-east1.run.app/?code=9702/13/M/J/21&type=qp
```

Response:

```json
{
  "success": 1,
  "url": "https://bestexamhelp.com/exam/cambridge-international-a-level/physics-9702/2021/9702_s21_qp_13.pdf"
}
```
