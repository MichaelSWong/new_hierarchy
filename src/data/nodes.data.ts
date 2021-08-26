import { HierarchyNodeModel } from '../types';

const nodes: HierarchyNodeModel[] = [
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
    text: 'FNB Region Bank',
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
    text: 'FNB History Bank',
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
  {
    id: 'd2dc33ff-5106-4beb-958f-95639cd6f158',
    text: 'Time Warner',
    parent: '2477ee0b-d229-44f2-8457-e9229acc1418',
    droppable: true,
    data: {
      isDirtied: false,
      startDate: '2021-08-24T17:12:41.127Z',
      endDate: null,
      lastUpdate: {
        timeStamp: '2021-08-24T18:03:07.447340800Z',
        user: 'WongM',
        inverseTimeStamp: 30873851811,
      },
      level: {
        levelName: 'Team',
      },
      member: [
        {
          function: {
            functionName: 'Admin',
            terminationDate: null,
            numberOfPosition: 43,
            owner: true,
          },
          user: 'AlagesanS',
          startDate: '2021-08-24T17:12:41.127Z',
          endDate: null,
        },
      ],
    },
  },
  {
    id: '2c0813c1-f819-4d03-af95-2ced38c1cc67',
    text: 'Xfinity',
    parent: 'd2dc33ff-5106-4beb-958f-95639cd6f158',
    droppable: true,
    data: {
      isDirtied: false,
      startDate: '2021-08-24T18:03:43.218Z',
      endDate: null,
      lastUpdate: {
        timeStamp: '2021-08-24T18:04:12.940250600Z',
        user: 'WongM',
        inverseTimeStamp: 30873851746,
      },
      level: {
        levelName: 'Team',
      },
      member: [
        {
          function: {
            functionName: 'Banker',
            terminationDate: null,
            numberOfPosition: 123,
            owner: true,
          },
          user: 'WidjajaD',
          startDate: '2021-08-24T18:03:43.218Z',
          endDate: null,
        },
      ],
    },
  },
  {
    id: '5399492a-8efa-4dd5-b291-436f514ed6b8',
    text: 'Peacook',
    parent: '2c0813c1-f819-4d03-af95-2ced38c1cc67',
    droppable: true,
    data: {
      isDirtied: false,
      startDate: '2021-08-24T19:39:28.346Z',
      endDate: null,
      lastUpdate: {
        timeStamp: '2021-08-24T19:39:49.521380600Z',
        user: 'WongM',
        inverseTimeStamp: 30873846009,
      },
      level: {
        levelName: 'Team',
      },
      member: [
        {
          function: {
            functionName: 'Banker',
            terminationDate: null,
            numberOfPosition: 123,
            owner: true,
          },
          user: 'MitchellM',
          startDate: '2021-08-24T19:39:28.346Z',
          endDate: null,
        },
      ],
    },
  },
  {
    id: 'd7eecc36-eb8c-49d9-9904-f475ea0b8e00',
    text: 'Zebra',
    parent: '5399492a-8efa-4dd5-b291-436f514ed6b8',
    droppable: true,
    data: {
      isDirtied: false,
      startDate: '2021-08-24T19:39:28.346Z',
      endDate: null,
      lastUpdate: {
        timeStamp: '2021-08-24T19:39:49.521380600Z',
        user: 'WongM',
        inverseTimeStamp: 30873846009,
      },
      level: {
        levelName: 'Team',
      },
      member: [
        {
          function: {
            functionName: 'Banker',
            terminationDate: null,
            numberOfPosition: 123,
            owner: true,
          },
          user: 'MitchellM',
          startDate: '2021-08-24T19:39:28.346Z',
          endDate: null,
        },
      ],
    },
  },
];

export default nodes;
