import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import materialData from '../data/material.data';
import { RenderTree } from '../interfaces';

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const MaterialTree = () => {
  const classes = useStyles();
  const [tree, setTree] = useState(materialData);

  const handleClick = (
    /* eslint-disable  @typescript-eslint/indent */
    e:
      | React.KeyboardEvent<HTMLSpanElement>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>,
    n: RenderTree,
  ) => {
    e.preventDefault();
    console.log(n);
  };

  const handleAdd = (n: RenderTree) => {
    const newNode = { id: '10', name: 'Child - 10' };
    n.children!.push(newNode);
    console.log(n);
    // filter by that node
    // push that new node
  };

  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      label={
        <>
          <span
            aria-hidden='true'
            onKeyDown={(e) => {
              handleClick(e, nodes);
            }}
            onClick={(e) => {
              handleClick(e, nodes);
            }}
          >
            {nodes.name}
          </span>
          <Tooltip title='Add'>
            <IconButton
              size='small'
              aria-label='add'
              onClick={() => {
                handleAdd(nodes);
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton size='small' aria-label='edit'>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      }
      key={nodes.id}
      nodeId={nodes.id}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(tree)}
    </TreeView>
  );
};

export default MaterialTree;
