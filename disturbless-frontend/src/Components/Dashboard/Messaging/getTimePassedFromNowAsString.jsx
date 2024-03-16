import moment from "moment";

export function getTimePassedFromNowAsString(unixTime) {
  // Unix time is a Date obj
  var start = moment(unixTime);
  var now = moment();

  return moment.duration(now.diff(start)).humanize();
}
