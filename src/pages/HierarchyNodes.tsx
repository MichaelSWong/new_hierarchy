import React, { useState, Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Tree,
  DragLayerMonitorProps,
  NodeModel,
} from '@minoru/react-dnd-treeview';
import produce from 'immer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { HierarchyData, HierarchyNodeModel, IMember } from '../types';
import CustomNode from '../components/CustomNode';
import CustomDragPreview from '../components/CustomDragPreview';
import styles from './HierarchyNodes.module.css';
import NodesData from '../data/nodes.json';

const useStyles = makeStyles({
  treeRoot: {
    '& li li:nth-of-type(2n + 1)': {
      background: '#ECECEC',
    },
  },
});

const HierarchyNodes = () => {
  type Dispatcher<S> = Dispatch<SetStateAction<S>>;
  const [treeData, setTreeData] = useState<NodeModel[]>(NodesData);
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

  return (
    <>
      <div className={classes.treeRoot}>
        <Tree
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
