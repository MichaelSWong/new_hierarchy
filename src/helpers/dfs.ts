/* eslint-disable @typescript-eslint/no-explicit-any */
function dfs(node: any, term: string, foundIDS: number[]) {
  // Implement your search functionality
  let isMatching = node.name && node.name.indexOf(term) > -1;

  if (Array.isArray(node.children)) {
    node.children.forEach((child: any) => {
      const hasMatchingChild = dfs(child, term, foundIDS);
      isMatching = isMatching || hasMatchingChild;
    });
  }

  // We will add any item if it matches our search term or if it has a children that matches our term
  if (isMatching && node.id) {
    foundIDS.push(node.id);
  }

  console.log('ISMATCHING', isMatching);
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
  console.log('MATCHEDIDS1', matchedIDS);
  dfs(dataNode, term, matchedIDS);

  console.log('MATCHEDIDS2', matchedIDS);

  // filter the original data so that only matching items (and their fathers if they have) are returned
  return filter(data, matchedIDS);
}

export { search, dfs, filter };
