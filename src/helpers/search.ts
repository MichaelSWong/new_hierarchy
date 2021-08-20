import { NodeModel } from '@minoru/react-dnd-treeview';

/**
 *
 * @param node: NodeModel[]
 * @param term: string
 * @returns => string []
 */
const dfs = (node: NodeModel[], term: string) => {
  // search functionallity
  const nodeIds = node
    .filter((item) => item.text.toLowerCase().includes(term.toLowerCase()))
    .map((item) => item.id);
  const parentIds = node
    .filter((item) => item.text.toLowerCase().includes(term.toLowerCase()))
    .map((item) => item.parent);

  let array3 = nodeIds.concat(parentIds);
  array3 = array3.filter((item, index) => {
    return array3.indexOf(item) === index;
  });

  return array3;
};

/**
 *
 * @param data: NodeModel[]
 * @param matchedIDS: string[]
 * @returns => NodeModel[]
 */
const filter = (data: NodeModel[], matchedIDS: string[]) => {
  return data
    .filter((item) => matchedIDS.indexOf(item.id as string) > -1)
    .map((item) => ({
      ...item,
    }));
};

/**
 *
 * @param data: NodeModel[]
 * @param term: string
 * @returns => NodeModel[]
 */
const searchTerm = (data: NodeModel[], term: string) => {
  const matchedIDS = dfs(data, term);
  return filter(data, matchedIDS as string[]);
};

export default searchTerm;
