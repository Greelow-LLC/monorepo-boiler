export const formatStringIntoTwoLetters = (str: string): string => {
  const initials =
    str.length > 2
      ? str.slice(0, 2)
      : str.length === 1
      ? str.concat(str[0])
      : str;

  return initials.toUpperCase();
};

export const formatCapitalizeFirstWord = (value: string) => {
  return typeof value === 'string'
    ? value?.charAt(0).toUpperCase() + value?.slice(1)
    : value;
};

export const replaceWith_ = (str: string) => str && str.replace(' ', '_');

export const separateCamelCaseString = (str: string) => {
  const separatedString = str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());

  //lowercase words after first one
  return separatedString
    .split(' ')
    .map((item, index) => (index > 0 ? item.toLowerCase() : item))
    .join(' ')
    .toString();
};
