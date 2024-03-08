export const processMarkup = (text: string): string => {
  return text
    .split('\n')
    .map((line) => {
      if (line.startsWith('>')) {
        return `<h1>${line.substring(1).trim()}</h1>`;
      } else {
        return line.replace(/\[(.*?)\]/g, '<b>$1</b>');
      }
    })
    .join('\n');
};
