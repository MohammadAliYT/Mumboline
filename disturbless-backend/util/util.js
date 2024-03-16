const { appendFileSync } = require("fs");
function isEmpty(object) {
  if (object != null || object != undefined) {
    return Object.entries(object).length <= 0;
  }
  return true;
}

function writeLogs(key, data, file) {
  const d = new Date().toJSON().slice(0, 10);
  try {
    appendFileSync(
      file + "-" + d + ".log",
      JSON.stringify({ [key]: data }, undefined, 2) + ",\n"
    );
  } catch (e) {
    console.error(e);
  }
}

function getRandomLabel() {
  return ["Work", "Home", "Friends", "Spam"][Math.trunc(Math.random() * 4)];
}

module.exports = {
  isEmpty,
  writeLogs,
  getRandomLabel,
};
