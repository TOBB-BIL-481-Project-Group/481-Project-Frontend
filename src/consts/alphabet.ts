export const alphabet: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export const shortVariableAlphabet = [
  "a",
  "b",
  "c",
  "k",
  "m",
  "n",
  "q",
  "s",
  "x",
  "y",
  "z",
];

export const megaAlphabet = (() => {
  let caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  caps = caps.concat(caps.map((letter) => letter.toLowerCase()));
  caps = caps.concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  caps = caps.concat(["*", "?", "(", "]", "%", "$"]);
  return caps;
})();

export const stringAlphabet = [
  "faruk",
  "Avci",
  "Zon67",
  "Turkey",
  "string",
  "faruk_avci",
  "HunTR",
  "TCGEN",
  "$$!@#",
];
