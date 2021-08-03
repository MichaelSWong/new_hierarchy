import React from 'react';
import produce from 'immer';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  Tree,
  DragLayerMonitorProps,
  NodeModel,
} from '@minoru/react-dnd-treeview';
import { makeStyles } from '@material-ui/core/styles';
import nodes from '../data/nodes.data';
import { HierarchyData, HierarchyNodeModel } from '../types';
import styles from './HierarchyNodesForm.module.css';
import CustomNodeForm from '../components/CustomNodeForm';
import CustomDragPreview from '../components/CustomDragPreview';

const useStyles = makeStyles({
  treeRoot: {
    '& li li:nth-of-type(2n + 1)': {
      background: '#ECECEC',
    },
  },
});

export interface MyNodesFormProps {
  name: string;
  nodes: HierarchyNodeModel[];
}

const HierarchyNodesForm = () => {
  const nodeForm: MyNodesFormProps = {
    name: 'Test1',
    nodes,
  };
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: React.useMemo(() => {
      return nodeForm;
    }, [nodeForm]),
  });
  const [treeData, setTreeData] = React.useState<NodeModel[]>(nodeForm.nodes);

  const watchNodes = watch('nodes');
  console.log('WATCH_NODES', watchNodes);
  const classes = useStyles();

  const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree);
  const handleTextChange = (id: NodeModel['id'], value: string) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text: value,
        };
      }

      return node;
    });

    setTreeData(newTree);
  };
  return (
    <div className={classes.treeRoot}>
      <Tree
        tree={treeData}
        rootId='root'
        // @ts-ignore
        render={(node: NodeModel<HierarchyData>, { isOpen, onToggle }) => (
          <CustomNodeForm
            {...{
              control,
              node,
              isOpen,
              onToggle,
              onTextChange: handleTextChange,
            }}
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
      />
    </div>
  );
};

export default HierarchyNodesForm;
