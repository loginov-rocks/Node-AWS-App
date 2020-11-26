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
    {
      count: '40',
      description: 'Description 4',
      price: '400',
      title: 'Title 4',
    },
    {
      count: '50',
      description: 'Description 5',
      price: '500',
      title: 'Title 5',
    },
    {
      count: '60',
      description: 'Description 6',
      price: '600',
      title: 'Title 6',
    },
    {
      count: '70',
      description: 'Description 7',
      price: '700',
      title: 'Title 7',
    },
    {
      count: '80',
      description: 'Description 8',
      price: '800',
      title: 'Title 8',
    },
    {
      count: '90',
      description: 'Description 9',
      price: '900',
      title: 'Title 9',
    },
  ]);
});
