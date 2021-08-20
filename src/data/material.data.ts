import { RenderTree } from '../interfaces';

const materialData: RenderTree = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
      children: [],
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
          children: [],
        },
        {
          id: '5',
          name: 'Child - 5',
          children: [
            {
              id: '6',
              name: 'Child - 6',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

export default materialData;
