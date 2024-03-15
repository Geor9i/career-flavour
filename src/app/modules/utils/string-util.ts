import { RegexSymbol } from "./types/stringUtilInterface";

export class StringUtil {
  toUpperCase(string: string) {
    if (typeof string === "string") {
      return string.toUpperCase();
    }
    throw new Error("Param is not a string!");
  }

  toLowerCase(string: string) {
    if (typeof string === "string") {
      return string.toLowerCase();
    }
    throw new Error("Param is not a string!");
  }
  toPascalCase(string: string) {
    if (typeof string === "string") {
      return string.slice(0, 1).toUpperCase() + string.toLowerCase().slice(1);
    }
    throw new Error("Param is not a string!");
  }

  /**
   *
   * @param {String} string The string to be filtered
   * @param {String} regexSymbols[].symbol - The regex symbol.
   * @param {Number} regexSymbols[].matches - The match limit for the regex symbol. If not provided or 0, matches any quantity.
   * @param {Boolean} regexSymbols[].remove Keep or Reject matches
   * @returns filtered value
   */
  filterString(string: string, regexSymbols: RegexSymbol[] = []) {
    if (typeof string !== "string") {
      throw new Error(`${string} is not of type String!`);
    }
    const stringSpread = string
      .split("")
      .map((char) => ({ char, matched: false }));

    for (let i = 0; i < stringSpread.length; i++) {
      let { char, matched } = stringSpread[i];
      if (matched) continue;

      for (let s = 0; s < regexSymbols.length; s++) {
        let { symbol, matchLimit, remove } = regexSymbols[s];
        let pattern: RegExp | '' = '';
        const prefix = remove ? '^' : '';
        if (matchLimit === undefined) {
          pattern = new RegExp(
            `[${prefix}${symbol}]`,
            "g"
          );
        } else if ( matchLimit > 0) {
          pattern = new RegExp(
            `[${prefix}${symbol}]{${matchLimit}}`,
            "g"
          );
         } else {
          continue;
         }

        if (!matched) {
          let pass = pattern.test(char);
          if (pass) {
            stringSpread[i].matched = pass;
            if (regexSymbols?.[s]?.matchLimit) {
              (regexSymbols[s].matchLimit as number) -= 1;
            }
            break;
          }
        }
      }
    }
    return stringSpread.map(({ char, matched: match }) => (match ? char : "")).join("");
  }

  format<T>(data: T | T[]): T | T[] {
    if (typeof data === "string") {
      return (data as string).trim().toLowerCase() as T;
    } else if (Array.isArray(data)) {
      return data.map((str) => (str as string).trim().toLowerCase()) as T[];
    }
    return data;
  }

  stringToNumber(string: string) {
    return Number(string.trim().split(",").join("").split("£").join(""));
  }

  replaceString(string: string, textToReplace: string | RegExp, replacementText: string) {
    if (textToReplace instanceof RegExp) {
      while (textToReplace.test(string)) {
        string = string.replace(textToReplace, replacementText);
      }
      return string;
    } else {
      while (string.includes(textToReplace)) {
        string = string.replace(textToReplace, replacementText);
      }
      return string;
    }
  }

  removeSpecialChars(name: string) {
    //Remove special chars
    const specialChars = {
      "!": "",
      '"': "",
      "#": "",
      $: "",
      "%": " ",
      "&": " ",
      "'": "",
      "(": " ",
      ")": " ",
      "*": "",
      "+": "",
      "-": "",
      "/": " ",
      ":": "",
      ";": " ",
      "<": "",
      "=": "",
      ">": "",
      "?": "",
      "@": "",
      "[": "",
      "\\": "",
      "]": "",
      "^": "",
      _: "",
      "`": "",
      "{": "",
      "|": "",
      "}": "",
      "~": "",
      "\n": " ",
      "\t": " ",
      " ": " ",
      "": " ",
    };

    let newString = "";
    for (let i = 0; i < name.length; i++) {
      let char = name[i];

      if (specialChars.hasOwnProperty(char)) {
        char = specialChars[char as keyof typeof specialChars];
      }
      newString += char;
    }
    //Remove excess space
    const pattern = /\s{2,}/g;
    let match;
    while ((match = pattern.exec(newString)) !== null) {
      newString = newString.replace(pattern, " ");
    }
    pattern.lastIndex = 0;
    return newString.trim();
  }

  generateProductId(productName: string) {
    return this.removeSpecialChars(productName)
      .split("")
      .filter((el) => el !== " ")
      .map((el) => el.toLowerCase())
      .join("");
  }
}
