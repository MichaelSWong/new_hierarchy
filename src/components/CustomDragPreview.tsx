import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview';
import { HierarchyData } from '../types';

type Props = {
  monitorProps: DragLayerMonitorProps<HierarchyData>;
};

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    backgroundColor: '#1967d2',
    borderRadius: '4px',
    boxShadow: '0 12px 24px -6px rgba(0,0,0,25), 0 0 0 1px rgba(0,0,0, .08)',
    color: '#fff',
    display: 'inline-grid',
    fontSize: '14px',
    gap: '8px',
    gridTemplateColumns: 'auto auto',
    padding: '4px 8px',
    pointerEvents: 'none',
  },
  label: {
    alignItems: 'center',
    display: 'flex',
  },
});

const CustomDragPreview: React.FC<Props> = ({ monitorProps }: Props) => {
  const { item } = monitorProps;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.label}>{item.text}</div>
    </div>
  );
};

export default CustomDragPreview;
