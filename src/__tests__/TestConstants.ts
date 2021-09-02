import { NodeModel } from '@minoru/react-dnd-treeview';
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
];

export default nodes;
