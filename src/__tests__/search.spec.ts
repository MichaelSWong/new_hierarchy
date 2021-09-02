import searchTerm from '../helpers/search';
import { HierarchyNodeModel } from '../types';
import nodes from './TestConstants';

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(2021, 8, 24));
});

afterAll(() => {
  jest.useFakeTimers();
});

/* eslint-disable no-useless-escape */
describe('searchTerm Function', () => {
  test('it should return nodes according to a search term', () => {
    const output: HierarchyNodeModel[] = [
      {
        id: '928ed576-c0db-4cdf-bf98-735c05577db2',
        text: 'Wholesale',
        parent: 'root',
        droppable: true,
        data: {
          isDirtied: false,
          startDate: '2021-08-24T17:10:15.634Z',
          endDate: null,
          lastUpdate: {
            timeStamp: '2021-08-24T17:12:17.219557400Z',
            user: 'WongM',
            inverseTimeStamp: 30873854861,
          },
          level: {
            levelName: 'Division',
          },
          member: [
            {
              function: {
                functionName: 'Admin',
                terminationDate: null,
                numberOfPosition: 43,
                owner: true,
              },
              user: 'WongM',
              startDate: '2021-08-24T17:10:15.634Z',
              endDate: null,
            },
          ],
        },
      },
      {
        id: '2477ee0b-d229-44f2-8457-e9229acc1418',
        text: `<mark style=\"background: #2769AA; color: white;\">FNB</mark> Region Bank`,
        parent: '928ed576-c0db-4cdf-bf98-735c05577db2',
        droppable: true,
        data: {
          isDirtied: false,
          startDate: '2021-08-24T17:11:19.355Z',
          endDate: null,
          lastUpdate: {
            timeStamp: '2021-08-24T17:12:17.219557400Z',
            user: 'WongM',
            inverseTimeStamp: 30873854861,
          },
          level: {
            levelName: 'Region',
          },
          member: [
            {
              function: {
                functionName: 'Admin',
                terminationDate: null,
                numberOfPosition: 43,
                owner: true,
              },
              user: 'GungorF',
              startDate: '2021-08-24T17:11:19.355Z',
              endDate: null,
            },
          ],
        },
      },
      {
        id: '8b3310f2-7623-4bba-821c-275ebee3ed1e',
        text: `<mark style=\"background: #2769AA; color: white;\">FNB</mark> History Bank`,
        parent: '928ed576-c0db-4cdf-bf98-735c05577db2',
        droppable: true,
        data: {
          isDirtied: false,
          startDate: '2021-08-24T17:11:43.166Z',
          endDate: null,
          lastUpdate: {
            timeStamp: '2021-08-24T17:12:17.219557400Z',
            user: 'WongM',
            inverseTimeStamp: 30873854861,
          },
          level: {
            levelName: 'Region',
          },
          member: [
            {
              function: {
                functionName: 'Banker',
                terminationDate: null,
                numberOfPosition: 123,
                owner: true,
              },
              user: 'WedikandageU',
              startDate: '2021-08-24T17:11:43.166Z',
              endDate: null,
            },
          ],
        },
      },
    ];
    expect(searchTerm(nodes, 'fnb')).toEqual(output);
  });
});
