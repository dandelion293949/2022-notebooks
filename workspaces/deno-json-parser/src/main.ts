const defWhitespace = [' ', '\t', '\n', '\r'];

const checkArgs = (args: string[]) => {
  if (args.length !== 1 && typeof args[0] === 'string') {
    throw new Error('argument is path string only');
  }

  return args[0];
};

const normalize = (json: string) => json.normalize('NFC');

const parse = (json: string) => {
  let pos = 0;
  // deno-lint-ignore no-explicit-any
  const parseObject = (str: string): Record<string, any> => {
    skipWhitespace(str);
    // deno-lint-ignore no-explicit-any
    let record: Record<string, any> = {};
    while (str.charAt(pos) !== '}') {
      skipWhitespace(str);
      if (str.charAt(pos) !== '"') {
        throwError();
      }
      pos++;
      const key = parseString(str);
      skipWhitespace(str);

      if (str.charAt(pos) !== ':') {
        throwError();
      }
      pos++;
      skipWhitespace(str);

      const value = parseValue(str);
      skipWhitespace(str);
      if (str.charAt(pos) === ',') {
        pos++;
      } else if (str.charAt(pos) !== '}') {
        throwError();
      }

      record = { ...record, ...{ [key]: value } };
    }
    return record;
  };
  const parseValue = (str: string) => {
    skipWhitespace(str);
    if (json.charAt(pos) === '{') {
      pos++;
      const value = parseObject(str);
      skipWhitespace(str);
      if (str.charAt(pos) !== '}') throwError();
      pos++;
      return value;
    } else if (json.charAt(pos) === '[') {
      pos++;
      const value = parseArray(str);
      skipWhitespace(str);
      if (str.charAt(pos) !== ']') throwError();
      pos++;
      return value;
    } else if (json.charAt(pos) === '"') {
      pos++;
      return parseString(str);
    } else if (/[0-9-]/.test(json.charAt(pos))) {
      return parseNumber(str);
    } else {
      throwError();
    }
  };
  const parseArray = (str: string) => {
    skipWhitespace(str);
    // deno-lint-ignore no-explicit-any
    const arr: any[] = [];
    while (str.charAt(pos) !== ']') {
      arr.push(parseValue(str));
      skipWhitespace(str);
      if (str.charAt(pos) === ',') {
        pos++;
      } else if (str.charAt(pos) !== ']') {
        throwError();
      }
    }
    return arr;
  };
  const parseString = (str: string) => {
    const keyStart = pos;
    while (str.charAt(pos) !== '"') {
      pos++;
    }
    pos++;
    return str.slice(keyStart, pos - 1);
  };
  const parseNumber = (str: string) => {
    const start = pos;
    while (/[0-9-]/.test(str.charAt(pos))) {
      pos++;
    }
    pos++;
    return Number(str.slice(start, pos - 1));
  };
  const skipWhitespace = (str: string) => {
    while (defWhitespace.includes(str.charAt(pos))) {
      pos++;
    }
  };
  const throwError = () => {
    throw new Error(`invalid parse position ${pos + 1}`);
  };

  skipWhitespace(json);
  if (!['{', '['].includes(json.charAt(pos))) throwError();

  const parsed = parseValue(json);

  return parsed;

  // return JSON.parse(json);
};

const main = async () => {
  const path = checkArgs(Deno.args);
  const jsonText = await Deno.readTextFile(path);

  try {
    const json = parse(normalize(jsonText));
    console.log(json);
  } catch (err) {
    console.log(err);
  }
  console.log(JSON.parse(jsonText));
};

main();
