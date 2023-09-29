const LogColorList = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'bgblack',
  'bgred',
  'bggreen',
  'bgyellow',
  'bgblue',
  'bgmagenta',
  'bgcyan',
  'bgwhite',
  'reset',
  'carriage',
] as const;

type LogColor = typeof LogColorList[number];

export const useColors = () => {
  const colors: Record<LogColor,string> = {
    black: "\u001b[30m",
    red: "\u001b[31m",
    green: "\u001b[32m",
    yellow: "\u001b[33m",
    blue: "\u001b[34m",
    magenta: "\u001b[35m",
    cyan: "\u001b[36m",
    white: "\u001b[37m",
    bgblack: "\u001b[40m",
    bgred: "\u001b[41m",
    bggreen: "\u001b[42m",
    bgyellow: "\u001b[43m",
    bgblue: "\u001b[44m",
    bgmagenta: "\u001b[45m",
    bgcyan: "\u001b[46m",
    bgwhite: "\u001b[47m",
    reset: "\u001b[0m",
    carriage: "\r",
  }

  return {
    ...colors
  }
}