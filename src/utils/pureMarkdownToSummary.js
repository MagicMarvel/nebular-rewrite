// this js is used to delete chars like '#' '~' '-' in markdown code for application's summary
// that's because the summary dose not require this useless chars
export default function tools(s) {
  return s
    .replace("[toc]", "")
    .replace("[TOC]", "")
    .split("*")
    .join("")
    .split("~")
    .join("")
    .split("-")
    .join("")
    .split(">")
    .join("")
    .split("#")
    .join("")
    .split("`")
    .join("");
}
