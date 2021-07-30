import React, { useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Tree, DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { HierarchyNodeModel } from "./types";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import theme from "./styling/theme";
import styles from "./App.module.css";
import SampleData from "./sample_data.json";

const useStyles = makeStyles({
  treeRoot: {
    "& li li:nth-of-type(2n + 1)": {
      background: "#ECECEC"
    }
  }
});

function App() {
  const [treeData, setTreeData] = useState<HierarchyNodeModel[]>(SampleData);
  const [selectedNode, setSelectedNode] = useState<HierarchyNodeModel | null>(
    null
  );
  const handleDrop = (newTree: HierarchyNodeModel[]) => setTreeData(newTree);
  const handleSelect = (node: HierarchyNodeModel) => {
    setSelectedNode(node);
  };
  const handleTextChange = (
    id: HierarchyNodeModel["id"],
    text: string,
    level: string,
    endDate: Date
  ) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text,
          data: {
            ...node.data,
            isDirtied: true,
            endDate,
            level: {
              levelName: level
            }
          }
        };
      }

      return node;
    });

    setTreeData(newTree);
  };

  React.useEffect(() => {
    console.log("TREE_DATA", treeData);
  }, [treeData]);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.treeRoot}>
        <Tree
          tree={treeData}
          rootId="root"
          render={(node: HierarchyNodeModel, { isOpen, onToggle }) => (
            <CustomNode
              node={node}
              isOpen={isOpen}
              isSelected={node.id === selectedNode?.id}
              onSelect={handleSelect}
              onToggle={onToggle}
              onTextChange={handleTextChange}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              treeData={treeData}
              setTreeData={setTreeData}
            />
          )}
          dragPreviewRender={(
            monitorProps: DragLayerMonitorProps<HierarchyNodeModel>
          ) => <CustomDragPreview monitorProps={monitorProps} />}
          onDrop={handleDrop}
          classes={{
            draggingSource: styles.draggingSource,
            dropTarget: styles.dropTarget
          }}
          sort={false}
          initialOpen
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
