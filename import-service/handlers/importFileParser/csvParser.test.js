import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';

const fixture = path.resolve('__fixtures__/import-test.csv');

it('parses CSV file', async () => {
  const result = await new Promise((resolve, reject) => {
    const dataArray = [];

    fs.createReadStream(fixture)
        .pipe(csvParser())
        .on('error', error => {
          reject(error);
        })
        .on('data', data => {
          dataArray.push(data);
        })
        .on('end', () => {
          resolve(dataArray);
        });
  });

  expect(result).toStrictEqual([
    {
      count: '10',
      description: 'Description 1',
      price: '100',
      title: 'Title 1',
    },
    {
      count: '20',
      description: 'Description 2',
      price: '200',
      title: 'Title 2',
    },
    {
      count: '30',
      description: 'Description 3',
      price: '300',
      title: 'Title 3',
    },
  ]);
});
