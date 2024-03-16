function calculateSkip(lowerBound) { 
  if (lowerBound == undefined)
    return 0;
  else
    return (Number(lowerBound));
}

function calculateLimit(upperBound) {
  if (upperBound == undefined)
    return 5;
  else
    return (Number(upperBound) + 1);
}

exports.calculateSkip = calculateSkip;
exports.calculateLimit = calculateLimit;
