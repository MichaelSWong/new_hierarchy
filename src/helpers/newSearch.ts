import { NodeModel } from '@minoru/react-dnd-treeview';
import { HierarchyData } from '../types';

/**
 *
 * @param data: NodeModel[]
 * @param term: string
 * @param foundIDS: string[]
 * @returns => NodeModel[]
 */
const depthNodeSearch = (
  node: NodeModel<HierarchyData>[],
  term: string,
  foundIDS: string[],
) => {
  node.forEach((item) => {
    if (item.text.toLowerCase().includes(term.toLowerCase())) {
      foundIDS.push(item.id as string);
    }
  });
  console.log('function_DEPTHNODESEARCH', foundIDS);
  return foundIDS;
};

const findParents = (node: NodeModel<HierarchyData>[], term: string) => {
  const nodeIdArray = node.map((item) => item.id);
  const matchedIDS: string[] = [];
  const depth = depthNodeSearch(node, term, matchedIDS);
  const itersection = node.filter((element) =>
    depth.includes(element.id as string),
  );
  /* eslint-disable no-restricted-syntax */
  for (const i in node) {
    if (depth.includes(node[i].id as string)) {
      console.log('i', i);
      depth.push(node[i].parent as string);
      return depth;
    }
  }
  return depth;
};

const newFilter = (node: NodeModel<HierarchyData>[], term: string) => {
  const matches: string[] = [];
  if (!Array.isArray(node)) return matches;

  node.forEach(function (i) {
    if (i.text.toLowerCase().includes(term.toLowerCase())) {
      matches.push(i.id as string, i.parent as string);
    }
    matches.forEach(function (x) {
      if (x === i.id || x === i.parent) {
        matches.push(i.parent as string);
      }
    });
  });
  console.log('MATCHES_Length', matches.length);
  console.log('MATCHES', matches);
  return matches;
};

const newLength = (node: NodeModel<HierarchyData>[], term: string) => {
  const matches: string[] = [];
  const { length } = matches;
  if (!Array.isArray(node)) return matches;
  // const myNewArray = node.reduce(function (accumulator, current) {
  //   return accumulator;
  // }, []);

  const IDS = node
    .filter((item) => item.text.toLowerCase().includes(term.toLowerCase()))
    .map(
      (item) =>
        // const newItem = [];
        // newItem.push(item.id, item.parent);
        // return newItem;
        item.id,
    );

  const newArray = node.reduce(function (newArr: string[], item) {
    if (item.text.toLowerCase().includes(term.toLowerCase())) {
      newArr.push(item.id as string, item.parent as string);
    }
    return newArr;
  }, []);
  console.log('newArray', newArray);
  console.log('IDS', IDS);
  return IDS;
};

const newReducer = (
  node: NodeModel<HierarchyData>[],
  term: string,
): string[] => {
  return node.reduce(function (newArr: string[], item) {
    if (item.parent === 'root') newArr.push(item.id as string);
    if (item.text.toLowerCase().includes(term.toLowerCase())) {
      newArr.push(item.id as string, item.parent as string);
    }
    return newArr;
  }, []);
};

const reducerParents = (node: NodeModel<HierarchyData>[], term: string) => {
  const reducerP = newReducer(node, term);
  console.log('REDUCERP_PARENT', reducerP);
  const lon = reducerP.length;
  // return node.some((item) => reducerP.includes(item as string));
  /* eslint-disable @typescript-eslint/no-loop-func */

  const fullArray = node.reduce(function (arr: string[], item) {
    if (reducerP.includes((item.id as string) || (item.parent as string))) {
      arr.push(item.id as string, item.parent as string);
    }
    console.log('ARR', arr);
    return arr;
  }, []);

  const unique = fullArray.filter((item, index) => {
    return fullArray.indexOf(item) === index;
  });
  return unique;
};

const flatten = (node: NodeModel<HierarchyData>[], term: string) => {
  const reducerP = newReducer(node, term);
  console.log('REDUCERP_PARENT', reducerP);
  console.log('REDUCERP_PARENT_NODE', node);

  let lon = reducerP.length;
  // return node.some((item) => reducerP.includes(item as string));
  /* eslint-disable @typescript-eslint/no-loop-func */

  const fullArray = node.reduce(function (arr: string[], item) {
    if (reducerP.includes((item.id as string) || (item.parent as string))) {
      console.log('LENGTH_LON', lon);
      reducerP.push(item.id as string, item.parent as string);
      arr.push(item.id as string, item.parent as string);
      lon -= 1;
    }
    node.reduce(function (newArr: string[], ite) {
      if (reducerP.includes((ite.id as string) || (ite.parent as string))) {
        newArr.push(ite.id as string, ite.parent as string);
        arr.push(ite.id as string, ite.parent as string);
      }
      return newArr;
    }, []);
    // console.log('ARR', arr);
    // console.log('REDUCVERFULLARRAY', reducerP);
    return arr;
  }, []);

  const unique = fullArray.filter((item, index) => {
    return fullArray.indexOf(item) === index;
  });
  return unique;
};

const forArray = (node: NodeModel<HierarchyData>[], term: string) => {
  const reducerP = newReducer(node, term);
  console.log('FORARRAY_REDUCER_P_START', reducerP);
  const matchedIDS: string[] = [];
  for (let i = 0; i < reducerP.length; i += 1) {
    for (let j = 0; j < node.length; j += 1) {
      if (reducerP[j] === node[j].id) {
        console.log(`Reducer${i}`, reducerP[i]);
        console.log(`NODE${j}`, node[j].id as string);
        console.log(
          `REDUCER_P_TRUE/FALSE: ${i}`,
          reducerP.includes(node[j].id as string),
        );

        if (reducerP.includes(node[j].id as string)) {
          reducerP.push(node[j].parent as string);
          console.log('REDUCER_P_LENGTH', reducerP.length);
          matchedIDS.push(node[j].id as string, node[j].parent as string);
        }
      }
    }
  }
  const unique = matchedIDS.filter((item, index) => {
    return matchedIDS.indexOf(item) === index;
  });
  console.log('FORARRAY_REDUCER_P_END', reducerP);
  return unique;
};

export {
  depthNodeSearch,
  findParents,
  newFilter,
  newLength,
  newReducer,
  reducerParents,
  flatten,
  forArray,
};
