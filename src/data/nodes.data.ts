import { HierarchyNodeModel } from '../types';

const nodes: HierarchyNodeModel[] = [
  {
    id: 'f571f132-e1f2-48df-84c8-add614232180',
    parent: 'root',
    text: 'First Parent',
    droppable: true,
    data: {
      isDirtied: true,
      startDate: '2021-05-07T14:54:39.072Z',
      endDate: null,
      lastUpdate: {
        timeStamp: '2021-05-07T14:54:39.072Z',
        user: 'admin',
        inverseTimeStamp: 1469457574,
      },
      level: {
        levelName: 'Division',
      },
      member: [
        {
          function: {
            functionName: 'Banker',
            terminationDate: '2018-01-26T18:30:09.453+00:00',
            owner: true,
            numberOfPosition: 1,
          },
          user: 'Wbs_Global_Admin',
          startDate: '2021-05-07T14:54:39.072Z',
          endDate: null,
        },
        {
          function: {
            functionName: 'Team',
            terminationDate: null,
            owner: true,
            numberOfPosition: 2,
          },
          user: 'WBS_Admin_Test',
          startDate: '2021-05-07T14:54:39.072Z',
          endDate: null,
        },
      ],
    },
  },
  {
    id: '7d0db62d-706f-4737-bcf8-c6bb66254e66',
    parent: 'f571f132-e1f2-48df-84c8-add614232180',
    text: 'Child 1',
    droppable: true,
    data: {
      isDirtied: false,
      startDate: '2021-05-07T14:54:39.072Z',
      endDate: null,
      lastUpdate: {
        timeStamp: '2021-05-07T14:54:39.072Z',
        user: 'admin',
        inverseTimeStamp: 1469457574,
      },
      level: {
        levelName: 'Region',
      },
      member: [
        {
          function: {
            functionName: 'Banker',
            terminationDate: '2018-01-26T18:30:09.453+00:00',
            owner: true,
            numberOfPosition: 1,
          },
          user: 'WBS_Admin_Test',
          startDate: '2021-05-07T14:54:39.072Z',
          endDate: null,
        },
        {
          function: {
            functionName: 'Team',
            terminationDate: null,
            owner: true,
            numberOfPosition: 2,
          },
          user: 'test_externalid3',
          startDate: '2021-05-07T14:54:39.072Z',
          endDate: null,
        },
      ],
    },
  },
  {
    id: '9b23bebd-c22a-431f-84bb-8b753677f770',
    parent: 'f571f132-e1f2-48df-84c8-add614232180',
    text: 'Child 2',
    droppable: true,
    data: {
      isDirtied: true,
      startDate: '2021-05-07T14:54:39.072Z',
      endDate: null,
      lastUpdate: {
        timeStamp: '2021-05-07T14:54:39.072Z',
        user: 'admin',
        inverseTimeStamp: 1469457574,
      },
      level: {
        levelName: 'Region',
      },
      member: [
        {
          function: {
            functionName: 'Banker',
            terminationDate: '2018-01-26T18:30:09.453+00:00',
            owner: true,
            numberOfPosition: 1,
          },
          user: 'test_externalid3',
          startDate: '2021-05-07T14:54:39.072Z',
          endDate: null,
        },
        {
          function: {
            functionName: 'Team',
            terminationDate: null,
            owner: true,
            numberOfPosition: 2,
          },
          user: 'WidjajaD',
          startDate: '2021-05-07T14:54:39.072Z',
          endDate: null,
        },
      ],
    },
  },
  {
    id: '594fe1c0-38dd-49de-9c60-b92abee32e01',
    parent: '7d0db62d-706f-4737-bcf8-c6bb66254e66',
    text: 'Grandchild 1',
    droppable: true,
    data: {
      isDirtied: true,
      startDate: '2021-05-07T14:54:39.072Z',
      endDate: null,
      lastUpdate: {
        timeStamp: '2021-05-07T14:54:39.072Z',
        user: 'admin',
        inverseTimeStamp: 1469457574,
      },
      level: {
        levelName: 'Team',
      },
      member: [
        {
          function: {
            functionName: 'Banker',
            terminationDate: '2018-01-26T18:30:09.453+00:00',
            owner: true,
            numberOfPosition: 1,
          },
          user: 'Wbs_Global_Admin',
          startDate: '2021-05-07T14:54:39.072Z',
          endDate: null,
        },
        {
          function: {
            functionName: 'Team',
            terminationDate: null,
            owner: true,
            numberOfPosition: 2,
          },
          user: 'Wbs_Global_Admin',
          startDate: '2021-05-07T14:54:39.072Z',
          endDate: null,
        },
      ],
    },
  },
];

export default nodes;