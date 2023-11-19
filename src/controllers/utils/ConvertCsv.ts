import { isArray, isJson, isObject } from "./Is";

export const convertCsv = <T extends Record<string, unknown>>(csvFile: Express.Multer.File, separator = ';', enterChar = '\r\n') => {
  const convert =(
    from?: BufferEncoding,
    to?: BufferEncoding
  ) => (string: string) => Buffer.from(string, from).toString(to);

  const hexToUtf8 = convert('hex', 'utf8');

  const csvData = hexToUtf8(csvFile.buffer as unknown as string).split(enterChar).filter((row) => row !== "");

  const cols = csvData.at(0)?.split(separator).filter((cell) => cell !== '' );

  if(!cols) return [];

  const data = csvData.slice(1)?.map((row) => {
    const cells = row.split(separator);
    const object: Record<string, unknown> = {};
    cells.forEach((cell, index) => {
      const formattedCell = isJson(cell) ? JSON.parse(cell) : cell;
      object[cols[index]] = cell ? formattedCell : null;
    });

    return object as T;
  });

  return data ?? [];
}
