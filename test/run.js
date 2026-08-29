const fs = require('fs');
const css = fs.readFileSync(__dirname + '/../styles/login.css', 'utf8');
const m = css.match(/.btn-primarys*{[^}]*}/s);
if (!m) { console.error('FAIL: .btn-primary rule missing'); process.exit(1); }
if (/width:s*d{3,}px/.test(m[0])) {
  console.error('FAIL: .btn-primary still uses a fixed 3-digit px width:
' + m[0]);
  process.exit(1);
}
console.log('PASS: login button width is responsive');
