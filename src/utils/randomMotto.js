const f = [
  "富强",
  "民主",
  "文明",
  "和谐",
  "自由",
  "平等",
  "公正",
  "法治",
  "爱国",
  "敬业",
  "诚信",
  "友善",
];

export default function foo() {
  return f[Math.round(Math.random() * 10)];
}