import fs from 'fs';
import csvParser from 'csv-parser';

export const readCSV = (filePath: string): Promise<any[]> => {
  const data: string[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', (err) => reject(err));
  });
};