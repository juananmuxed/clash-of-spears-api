export const convertCsv = <T extends Record<string, unknown>>(csvFile: Express.Multer.File, separator = ',', enterChar = '\n') => {
  const convert =(
    from?: BufferEncoding,
    to?: BufferEncoding
  ) => (string: string) => Buffer.from(string, from).toString(to);

  const hexToUtf8 = convert('hex', 'utf8');

  const csvData = hexToUtf8(csvFile.buffer as unknown as string).split(enterChar).filter((row) => row !== "");

  const cols = csvData.at(0)?.split(separator).filter((cell) => cell !== '' );
  const rows = csvData.slice(1);
  if(!cols) return [];

  const data = rows?.map((row) => {
    const cells = row.split(separator).filter((cell) => cell !== '' );
    const object: Record<string, string> = {};
    cells.forEach((cell, index) => {
      object[cols[index]] = cell;
    });

    return object as T;
  })

  return data ?? [];
}
