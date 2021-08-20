import { NodeModel } from '@minoru/react-dnd-treeview';
import { HierarchyData, HierarchyNodeModel } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
function dfs(node: HierarchyNodeModel, term: string, foundIDS: string[]) {
  // Implement your search functionality
  let isMatching = node.text && node.text.indexOf(term) > -1;

  // if (Array.isArray(node.children)) {
  //   node.children.forEach((child: any) => {
  //     const hasMatchingChild = dfs(child, term, foundIDS);
  //     isMatching = isMatching || hasMatchingChild;
  //   });
  // }
  // isMatching = node.filter((arr: any) => arr.text === term);

  // We will add any item if it matches our search term or if it has a children that matches our term

  if (isMatching && node.id) {
    foundIDS.push(node.id as string);
  }

  console.log('foundIDS', foundIDS);

  return isMatching;
}

function filter(data: any, matchedIDS: any) {
  return data
    .filter((item: any) => matchedIDS.indexOf(item.id) > -1)
    .map((item: any) => ({
      ...item,
      children: item.children ? filter(item.children, matchedIDS) : [],
    }));
}

function search(data: any, term: any) {
  // We wrap data in an object to match the node shape
  const dataNode = {
    children: data,
  };

  const matchedIDS: any = [];
  // find all items IDs that matches our search (or their children does)
  dfs(data, term, matchedIDS);
  console.log('matchedIDS', matchedIDS);

  // filter the original data so that only matching items (and their fathers if they have) are returned
  return filter(data, matchedIDS);
}

export { search, dfs, filter };
