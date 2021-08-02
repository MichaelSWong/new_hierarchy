import React, { Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview';
import { HierarchyData, HierarchyNodeModel } from './types';
import FunctionsData from './data/functions.json';
import UsersData from './data/users.json';
import LevelsData from './data/levels.json';

const useStyles = makeStyles({
  node: {
    color: '#1967d2',
  },
  arrow: {
    transform: 'rotate(90deg)',
  },
  text: {
    width: '50ch',
  },
});

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type Props = {
  node: NodeModel<HierarchyData>;
  isOpen: boolean;
  isSelected: boolean;
  onToggle: (id: NodeModel['id']) => void;
  onSelect: (node: NodeModel) => void;
  onTextChange: (
    id: NodeModel['id'],
    text: string,
    level: string,
    endDate: Date | string,
  ) => void;
  selectedNode: NodeModel | undefined;
  setSelectedNode: Dispatcher<NodeModel<HierarchyData> | undefined>;
  treeData: NodeModel<HierarchyData>[];
  setTreeData: Dispatcher<NodeModel<HierarchyData>[]>;
};

export const CustomNode: React.FC<Props> = (props) => {
  const { id, text, data } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const [checked, setChecked] = useState(false);
  const [endDateCheck, setEndDateCheck] = useState(data?.endDate);
  const [labelLevelName, setLabelLevelName] = useState(data?.level.levelName);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    props.onSelect(props.node);
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleAddNode = (e: React.FormEvent<{ value: unknown }>) => {
    e.preventDefault();
    props.onSelect(props.node);

    const newNode: HierarchyNodeModel = {
      id: uuidv4(),
      // parent: props.selectedNode!.id,
      parent: id,
      text: 'NEW NODE',
      droppable: true,
      data: {
        isDirtied: true,
        startDate: new Date().toISOString(),
        endDate: undefined,
        level: {
          levelName: '',
        },
        member: [
          {
            function: { functionName: '', numberOfPosition: 0, owner: true },
            user: '',
            startDate: new Date().toISOString(),
            endDate: undefined,
          },
        ],
      },
    };
    const newestTree = [...props.treeData, newNode];
    props.setTreeData(newestTree);
    props.setSelectedNode(undefined);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(e.target.value);
  };

  const handleChangeLevel = (e: React.ChangeEvent<{ value: unknown }>) => {
    setLabelLevelName(e.target.value as string);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setEndDateCheck(new Date().toISOString());
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(
      id,
      labelText,
      labelLevelName as string,
      endDateCheck as Date,
    );
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);
  const classes = useStyles();

  React.useEffect(() => {
    console.log('node', props.node);
    console.log('VISIBLE_INPUT', visibleInput);
    console.log('SELECTED_NODE', props.selectedNode);
    console.log('LABEL_TEXT', labelText);
    console.log('LABEL_LEVEL', labelLevelName);
  }, [props.node, visibleInput, props.selectedNode, labelText, labelLevelName]);

  return (
    <Grid
      container
      direction='row'
      justifyContent='flex-start'
      alignItems='flex-start'
      spacing={1}
      {...dragOverProps}
    >
      <Grid item xs='auto' className={props.isOpen ? classes.arrow : ''}>
        {props.node.droppable && (
          <Box component='div' onClick={handleToggle}>
            <ArrowRightIcon />
          </Box>
        )}
      </Grid>

      {visibleInput ? (
        <>
          {/* 1.  nodeText: TextField */}
          <Grid item xs='auto'>
            <TextField
              label='Name'
              value={labelText}
              onChange={handleChangeText}
            />
          </Grid>
          {/* 2.  levelName: Select Box */}
          <Grid item xs='auto'>
            <FormControl>
              <InputLabel id='controlled-levelName-select-label'>
                Level Name
              </InputLabel>
              <Select
                labelId='controlled-levelName-select-label'
                id='controlled-levelName-select'
                value={labelLevelName}
                onChange={handleChangeLevel}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {LevelsData.map((name, index) => (
                  <MenuItem key={index} value={name.levelName}>
                    {name.levelName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* 3.  endDate: Checkbox */}
          <Grid item xs='auto'>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleChecked} />}
              label='EndDate'
            />
          </Grid>
          {/* //TODO  4.  User: Select Box or TextField */}
          {/* //TODO  5.  Function: Select Box */}
          {/* SUBMIT: Finish Editing the item */}
          <Grid item xs='auto'>
            <IconButton
              size='small'
              onClick={handleSubmit}
              disabled={labelText === ''}
            >
              <CheckIcon />
            </IconButton>
          </Grid>
          {/* Cancel: Close the edit and don't save */}
          <Grid item xs='auto'>
            <IconButton size='small' aria-label='close' onClick={handleCancel}>
              <HighlightOffRoundedIcon />
            </IconButton>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs='auto' className={props.isSelected ? classes.node : ''}>
            <Typography align='center' variant='h6'>
              {props.node.text}
            </Typography>
          </Grid>
          <Grid item xs='auto'>
            <IconButton
              size='small'
              aria-label='edit node'
              onClick={handleAddNode}
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item xs='auto'>
            <IconButton
              size='small'
              aria-label='edit node'
              onClick={handleShowInput}
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};
