export function generateId(length = 32) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
  let str = '';
  let i;
  for (i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
export function processString(options) {
  let key = 0;
  function processInputWithRegex({ regex, action }, input) {
    let result = null;
    const output = [];
    while ((result = regex.exec(input)) !== null) {
      let index = result.index;
      const match = result[0];
      output.push(input.substring(0, index));
      output.push(action(++key, result));
      input = input.substring(index + match.length, input.length + 1);
      regex.lastIndex = 0;
    }
    output.push(input);
    return output;
  }
  return (input) => {
    if (!options || !Array.isArray(options) || !options.length) {
      return input;
    }
    options.forEach((option) => {
      return (input = processInputWithRegex(option, input));
    });
    return input;
  };
}
