import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { search } from '../helpers/dfs';

const data = [
  {
    id: 1,
    name: 'Item 1',
    children: [
      {
        id: 2,
        name: 'Subitem 1',
        children: [
          {
            id: 3,
            name: 'Misc 1',
            children: [
              {
                id: 4,
                name: 'Misc 2',
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: 'Subitem 2',
        children: [
          {
            id: 6,
            name: 'Misc 3',
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: 'Item 2',
    children: [
      {
        id: 8,
        name: 'Subitem 1',
        children: [
          {
            id: 9,
            name: 'Misc 1',
          },
        ],
      },
      {
        id: 10,
        name: 'Subitem 2',
        children: [
          {
            id: 11,
            name: 'Misc 4',
          },
          {
            id: 12,
            name: 'Misc 5',
          },
          {
            id: 13,
            name: 'Misc 6',
            children: [
              {
                id: 14,
                name: 'Misc 7',
              },
            ],
          },
        ],
      },
    ],
  },
];
/* eslint-disable @typescript-eslint/no-explicit-any */
const getTreeItemsFromData = (treeItems: any) => {
  return treeItems.map((treeItemData: any) => {
    let children;
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = getTreeItemsFromData(treeItemData.children);
    }
    return (
      /* eslint-disable react/no-children-prop */
      <TreeItem
        key={treeItemData.id}
        nodeId={treeItemData.id}
        label={treeItemData.name}
        children={children}
      />
    );
  });
};

const DataTreeView = ({ treeItems }: any) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {getTreeItemsFromData(treeItems)}
    </TreeView>
  );
};

const MatTree = () => {
  console.log(search(data, 'Subitem 1'));
  return (
    <div className='MatTree'>
      <DataTreeView treeItems={search(data, 'Subitem 1')} />
    </div>
  );
};

export default MatTree;
