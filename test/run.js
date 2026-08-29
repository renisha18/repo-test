const fs = require("fs");
const css = fs.readFileSync(__dirname + "/../styles/login.css", "utf8");

const block = css.match(/\.btn-primary\s*\{[^}]*\}/s);
if (!block) {
  console.error("FAIL: .btn-primary rule missing");
  process.exit(1);
}
if (/width:\s*\d{3,}px/.test(block[0])) {
  console.error("FAIL: .btn-primary still uses a fixed 3-digit px width");
  console.error(block[0]);
  process.exit(1);
}
console.log("PASS: login button width is responsive");
