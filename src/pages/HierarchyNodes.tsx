import React, { useState, Dispatch, SetStateAction, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Tree,
  DragLayerMonitorProps,
  NodeModel,
  OpenIdsHandlers,
} from '@minoru/react-dnd-treeview';
import produce from 'immer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { HierarchyData, HierarchyNodeModel, IMember } from '../types';
import CustomNode from '../components/CustomNode';
import CustomDragPreview from '../components/CustomDragPreview';
import styles from './HierarchyNodes.module.css';
import NodesData from '../data/nodes.data';
import SearchBar from '../components/SearchBar';
import searchTerm from '../helpers/search';

const useStyles = makeStyles({
  treeRoot: {
    '& li li:nth-of-type(2n + 1)': {
      background: '#ECECEC',
    },
  },
});

const HierarchyNodes = () => {
  /* eslint-disable @typescript-eslint/indent */
  type Dispatcher<S> = Dispatch<SetStateAction<S>>;
  const [treeData, setTreeData] = useState<
    NodeModel[] | NodeModel<HierarchyData>[]
  >(NodesData);

  // TODO! UPDATE THIS
  const ref = useRef<OpenIdsHandlers>(null);
  // const handleOpenAll = () => ref.current.openAll();
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState<NodeModel[]>([]);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleDrop = (newTree: NodeModel[], { dragSourceId }: any) => {
    let nodeSelected: NodeModel = newTree.find(
      (someObj) => someObj.id === dragSourceId,
    ) as HierarchyNodeModel;
    nodeSelected = {
      ...nodeSelected,

      data: {
        ...(nodeSelected.data as HierarchyData),

        isDirtied: true,
      },
    };

    const filteredTree = newTree.filter((x) => x.id !== dragSourceId);
    const newestTree = [...filteredTree, nodeSelected];
    setTreeData(newestTree);
  };

  const editNode = produce((draft, id, text, level, endDate, memberArray) => {
    const newTree = draft.find((tree: NodeModel) => tree.id === id);
    newTree.text = text;
    newTree.data.isDirtied = true;
    newTree.data.endDate = endDate;
    newTree.data.level = { levelName: level };
    newTree.data.member = memberArray;
  });

  const handleTextChange = (
    id: NodeModel['id'],
    text: string,
    level: string,
    endDate: Date | string,
    member: IMember[],
  ) => {
    const nextState = editNode(treeData, id, text, level, endDate, member);

    setTreeData(nextState);
  };
  const classes = useStyles();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Submit Handler for Insert Nodes
    const data = {
      name: 'Test1',
      nodes: treeData,
    };
    console.log('DATA', data);
  };

  console.log(
    'TREE_DATA_SEARCH_EX',
    treeData.filter((item: NodeModel) =>
      item.text.toLowerCase().includes('gran'.toLowerCase()),
    ),
  );

  // TODO! GET RID OF THIS!!
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref.current?.openAll();
    const str = e.target.value;
    setSearch(str);
    // const newArr = treeData
    //   // .filter((item: NodeModel) =>
    //   //   item.text.toLowerCase().includes(str.toLowerCase()),
    //   // )
    //   .map((item: NodeModel) => {
    //     const newTitle = item.text.replace(
    //       new RegExp(str, 'gi'),
    //       (match) =>
    //         `<mark style="background: #2769AA; color: white;">${match}</mark>`,
    //     );

    //     return {
    //       ...item,
    //       text: newTitle,
    //     };
    //   });

    const newestTree = searchTerm(treeData as NodeModel<HierarchyData>[], str);

    setSearchData(newestTree);
    // setTreeData(newArr);
  };

  React.useEffect(() => {
    console.log('search', search);
    console.log('searchData', searchData);
  }, [search, searchData]);

  return (
    <>
      <div className={classes.treeRoot}>
        <SearchBar onInput={(e) => handleInput(e)} />
        <span>
          {searchData.length > 0 && searchData.length < treeData.length
            ? searchData.length
            : null}
        </span>

        {search.length > 0 ? (
          <Tree
            ref={ref}
            tree={searchData}
            rootId='root'
            // @ts-ignore
            render={(node: NodeModel<HierarchyData>, { isOpen, onToggle }) => (
              <CustomNode
                node={node}
                isOpen={isOpen}
                onToggle={onToggle}
                onTextChange={handleTextChange}
                setTreeData={
                  setTreeData as Dispatcher<NodeModel<HierarchyData>[]>
                }
                setSearchData={
                  setSearchData as Dispatcher<NodeModel<HierarchyData>[]>
                }
                setSearch={setSearch as Dispatcher<string>}
              />
            )}
            // @ts-ignore
            dragPreviewRender={(
              monitorProps: DragLayerMonitorProps<HierarchyData>,
            ) => <CustomDragPreview monitorProps={monitorProps} />}
            onDrop={handleDrop}
            classes={{
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget,
            }}
            sort={false}
            initialOpen
          />
        ) : (
          <Tree
            ref={ref}
            tree={treeData}
            rootId='root'
            // @ts-ignore
            render={(node: NodeModel<HierarchyData>, { isOpen, onToggle }) => (
              <CustomNode
                node={node}
                isOpen={isOpen}
                onToggle={onToggle}
                onTextChange={handleTextChange}
                setTreeData={
                  setTreeData as Dispatcher<NodeModel<HierarchyData>[]>
                }
                setSearchData={
                  setSearchData as Dispatcher<NodeModel<HierarchyData>[]>
                }
                setSearch={setSearch as Dispatcher<string>}
              />
            )}
            // @ts-ignore
            dragPreviewRender={(
              monitorProps: DragLayerMonitorProps<HierarchyData>,
            ) => <CustomDragPreview monitorProps={monitorProps} />}
            onDrop={handleDrop}
            classes={{
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget,
            }}
            sort={false}
            initialOpen
          />
        )}
      </div>
      <Box m={1}>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          type='submit'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default HierarchyNodes;
