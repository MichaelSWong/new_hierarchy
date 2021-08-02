import React, { useState, Dispatch, SetStateAction } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Tree,
  DragLayerMonitorProps,
  NodeModel,
} from '@minoru/react-dnd-treeview';
import { HierarchyData } from './types';
import { CustomNode } from './CustomNode';
import { CustomDragPreview } from './CustomDragPreview';
import theme from './styling/theme';
import styles from './App.module.css';
import NodesData from './data/nodes.json';

const useStyles = makeStyles({
  treeRoot: {
    '& li li:nth-of-type(2n + 1)': {
      background: '#ECECEC',
    },
  },
});

function App() {
  type Dispatcher<S> = Dispatch<SetStateAction<S>>;
  const [treeData, setTreeData] = useState<NodeModel[]>(NodesData);
  const [selectedNode, setSelectedNode] = useState<NodeModel | undefined>(
    undefined,
  );
  const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree);
  const handleSelect = (node: NodeModel) => {
    setSelectedNode(node);
  };
  const handleTextChange = (
    id: NodeModel['id'],
    text: string,
    level: string,
    endDate: Date | string,
  ) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text,
          data: {
            ...(node.data as HierarchyData),
            isDirtied: true,
            endDate,
            level: {
              levelName: level,
            },
          },
        };
      }

      return node;
    });

    setTreeData(newTree);
  };

  React.useEffect(() => {
    console.log('TREE_DATA', treeData);
  }, [treeData]);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.treeRoot}>
        <Tree
          tree={treeData}
          rootId='root'
          //@ts-ignore
          render={(node: NodeModel<HierarchyData>, { isOpen, onToggle }) => (
            <CustomNode
              node={node}
              isOpen={isOpen}
              isSelected={node.id === selectedNode?.id}
              onSelect={handleSelect}
              onToggle={onToggle}
              onTextChange={handleTextChange}
              selectedNode={selectedNode}
              setSelectedNode={
                setSelectedNode as Dispatcher<
                  NodeModel<HierarchyData> | undefined
                >
              }
              treeData={treeData as NodeModel<HierarchyData>[]}
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
    </ThemeProvider>
  );
}

export default App;
