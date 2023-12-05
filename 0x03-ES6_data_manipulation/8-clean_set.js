function cleanSet(set, startString) {
  let result = '';

  for (const value of set) {
    if (value.startsWith(startString)) {
      const trimmedValue = value.substring(startString.length);
      result += (result.length === 0) ? trimmedValue : `-${trimmedValue}`;
    }
  }

  return result;
}

export default cleanSet;
