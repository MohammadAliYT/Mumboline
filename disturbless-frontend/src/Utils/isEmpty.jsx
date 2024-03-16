export function isEmpty(object) {
  if (object != null || object != undefined) {
    return Object.entries(object).length <= 0;
  }
  return true;
}
