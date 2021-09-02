import { NodeModel } from '@minoru/react-dnd-treeview';
import { HierarchyData } from '../types';

/**
 *
 * @param data: NodeModel[]
 * @param term: string
 * @returns =>  Set<string>
 */
const depthNodeSearch = (node: NodeModel<HierarchyData>[], term: string) => {
  return node.reduce((newSet: Set<string>, item) => {
    if (item.text.toLowerCase().includes(term.toLowerCase())) {
      newSet.add(item.id as string);
    }
    item.data?.member.reduce((_, itemMember) => {
      if (itemMember.user.toLowerCase().includes(term.toLowerCase())) {
        newSet.add(item.id as string);
      }
      return _;
    }, []);

    return newSet;
  }, new Set<string>());
};

/**
 *
 * @param data: NodeModel[]
 * @param set: Set<string>
 * @returns => string[]
 */
const parentFinder = (node: NodeModel<HierarchyData>[], set: Set<string>) => {
  for (let i = 0; i < set.size; i += 1) {
    for (let j = 0; j < node.length; j += 1) {
      if (set.has(node[j].id as string)) {
        set.add(node[j].parent as string);
      }
    }
  }
  return Array.from(set) as string[];
};

/**
 *
 * @param data: NodeModel[]
 * @param matchedIDS: string[]
 * @returns => NodeModel[]
 */
const filter = (
  data: NodeModel<HierarchyData>[],
  matchedIDS: string[],
  term: string,
) => {
  return data.reduce((newArray: NodeModel<HierarchyData>[], item) => {
    if (matchedIDS.includes(item.id as string)) {
      const newTitle = item.text.replace(
        new RegExp(term, 'gi'),
        (match) =>
          `<mark style="background: #2769AA; color: white;">${match.toUpperCase()}</mark>`,
      );
      newArray.push({
        ...item,
        text: newTitle,
      });
    }
    return newArray;
  }, []);
};

/**
 *
 * @param data: NodeModel[]
 * @param term: string
 * @returns => NodeModel[]
 */
const searchTerm = (data: NodeModel<HierarchyData>[], term: string) => {
  const IDS = depthNodeSearch(data, term);
  const matchedIDS = parentFinder(data, IDS);
  return filter(data, matchedIDS, term);
};

export default searchTerm;
