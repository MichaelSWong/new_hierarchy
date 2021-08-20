import React, { useState, useCallback } from 'react';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import materialData from '../data/material.data';
import NODES from '../data/nodes.data';
import { RenderTree } from '../interfaces';
import { finder, finderStarts } from '../helpers/finder';
import SearchBar from '../components/SearchBar';
import { HierarchyNodeModel } from '../types';

const useStyles = makeStyles({
  root: {
    flexGrow: 2,
    maxWidth: 500,
  },
  // searchIcon: {
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  inputRoot: {
    color: 'inherit',
  },
});

const MaterialTree = () => {
  const classes = useStyles();
  const [tree, setTree] = useState<RenderTree>(materialData);
  const [text, setText] = useState('');

  // TODO! UPDATE THIS
  const [data, setData] = useState<HierarchyNodeModel[]>(NODES);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState<HierarchyNodeModel[]>([]);

  const handleAddClick = useCallback(
    (node) => {
      // Object for new node

      // get the node children

      // find the current node
      // update the tree

      setTree(
        produce((draft) => {
          const newId = uuidv4();
          const newNode = { id: newId, name: text, children: [] };

          if (node.id === 'root') {
            draft.children?.push(newNode);
          }
          const currentNode = finder(draft.children, 'id', node.id);
          console.log('currentNode', currentNode?.children);
          console.log('draft.children', draft.children);
          currentNode?.children?.push(newNode);
        }),
      );
    },
    [text],
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      setTree(
        produce((draft) => {
          finderStarts(draft.children, 'name', text);
        }),
      );
    },
    [text],
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data1 = {
      name: 'Test1',
      nodes: tree,
    };
    alert(JSON.stringify(data1));
  };

  React.useEffect(() => {
    console.log('search', search);
    console.log('searchData', searchData);
  }, [search, searchData]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setSearch(str);
    const newArr = data
      // .filter((item: HierarchyNodeModel) =>
      //   item.text.toLowerCase().includes(str.toLowerCase()),
      // )
      .map((item: HierarchyNodeModel) => {
        const newTitle = item.text.replace(
          new RegExp(str),
          (match) => `<mark>${match}</mark>`,
        );

        return {
          ...item,
          text: newTitle,
        };
      });

    setSearchData(newArr);
  };

  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      label={
        <>
          <span aria-hidden='true'>{nodes.name}</span>
          <Tooltip title='Add'>
            <IconButton
              size='small'
              aria-label='add'
              onClick={() => {
                handleAddClick(nodes);
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
    <>
      <div>
        <SearchBar onInput={(e) => handleInput(e)} />
      </div>
      <Typography variant='h6'>Tree</Typography>
      <form>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(tree)}
        </TreeView>
        <Divider />
        <Box m={1}>
          <Button color='primary' fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default MaterialTree;
