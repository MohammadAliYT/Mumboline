const handlebarjs = require('handlebars');
const fs = require("fs");

let template = handlebarjs.compile(fs.readFileSync(__dirname + '/email_template.html', 'utf8'));

function buildEmail(data) {
  return template(data);
}

// let data = {
//   SENDER_NUMBER: '+12012345678',
//   DISTURBLESS_NUMBER: '+12012345678',
//   MESSAGE: "Hello World"
// };

// console.log(template(data));

module.exports = {
  buildEmail
}