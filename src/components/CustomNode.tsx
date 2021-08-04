import React, { Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview';
import produce from 'immer';
import {
  HierarchyData,
  HierarchyNodeModel,
  IFunctions,
  IMember,
} from '../types';
import functions from '../data/functions.data';
import UsersData from '../data/users.json';
import LevelsData from '../data/levels.json';
import useFormStyles from '../styling/form.styles';

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
  node: HierarchyNodeModel;
  isOpen: boolean;
  onToggle: (id: NodeModel['id']) => void;
  onTextChange: (
    id: NodeModel['id'],
    text: string,
    level: string,
    endDate: Date | string,
    member: IMember[],
  ) => void;
  setTreeData: Dispatcher<NodeModel<HierarchyData>[]>;
};

const CustomNode: React.FC<Props> = ({
  node,
  onToggle,
  setTreeData,
  onTextChange,
  isOpen,
}: Props) => {
  const { id, text, data } = node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const [checked, setChecked] = useState(false);
  const [endDateCheck, setEndDateCheck] = useState(data?.endDate);
  const [labelLevelName, setLabelLevelName] = useState(data?.level.levelName);
  const [labelUserName, setLabelUserName] = useState(
    data?.member.map((mem) => mem.user),
  );
  const [memberArray, setMemberArray] = useState(data?.member);
  const [labelFunctionName, setLabelFunctionName] = useState(
    data?.member.map((mem) => mem.function.functionName),
  );
  const formClasses = useFormStyles();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleAddNode = (e: React.FormEvent<{ value: unknown }>) => {
    e.preventDefault();

    setTreeData(
      produce((draft) => {
        draft.push({
          id: uuidv4(),
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
                function: {
                  functionName: '',
                  numberOfPosition: 0,
                  owner: true,
                },
                user: '',
                startDate: new Date().toISOString(),
                endDate: undefined,
              },
            ],
          },
        });
      }),
    );

    // const newNode: HierarchyNodeModel = {
    //   id: uuidv4(),
    //   parent: id,
    //   text: 'NEW NODE',
    //   droppable: true,
    //   data: {
    //     isDirtied: true,
    //     startDate: new Date().toISOString(),
    //     endDate: undefined,
    //     level: {
    //       levelName: '',
    //     },
    //     member: [
    //       {
    //         function: { functionName: '', numberOfPosition: 0, owner: true },
    //         user: '',
    //         startDate: new Date().toISOString(),
    //         endDate: undefined,
    //       },
    //     ],
    //   },
    // };
    // const newestTree = [...treeData, newNode];
    // setTreeData(newestTree);
  };

  const handleAddMember = React.useCallback(() => {
    setMemberArray(
      produce((draft) => {
        draft?.push({
          function: {
            functionName: '',
            numberOfPosition: 0,
            owner: true,
          },
          user: '',
          startDate: new Date().toISOString(),
          endDate: undefined,
        });
      }),
    );
  }, []);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(e.target.value);
  };

  const handleChangeLevel = (e: React.ChangeEvent<{ value: unknown }>) => {
    setLabelLevelName(e.target.value as string);
  };

  const handleChangeUser = (
    e: React.ChangeEvent<{ value: unknown }>,
    idx: number,
  ) => {
    const target = e.target.value as string;
    const nextState = produce(memberArray, (draftState) => {
      draftState![idx].user = target;
    });
    const nextStateLabel = produce(labelUserName, (draftState) => {
      draftState![idx] = target;
    });

    setLabelUserName(nextStateLabel);

    setMemberArray(nextState);
  };

  const handleChangeFunction = (
    e: React.ChangeEvent<{ value: IFunctions | unknown }>,
    idx: number,
  ) => {
    setMemberArray(
      produce((draft) => {
        const funcName = functions?.find(
          (func: IFunctions) => func.functionName === e.target.value,
        );
        draft![idx].function = funcName as IFunctions;
      }),
    );
    setLabelFunctionName(
      produce((draft) => {
        draft![idx] = e.target.value as string;
      }),
    );
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setEndDateCheck(new Date().toISOString());
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    onTextChange(
      id,
      labelText,
      labelLevelName as string,
      endDateCheck as Date,
      memberArray as IMember[],
    );
  };

  const dragOverProps = useDragOver(id, isOpen, onToggle);
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justifyContent='flex-start'
      alignItems='flex-start'
      spacing={1}
      {...dragOverProps}
    >
      <Grid item xs='auto' className={isOpen ? classes.arrow : ''}>
        {node.droppable && (
          <Box component='div' onClick={handleToggle}>
            <ArrowRightIcon />
          </Box>
        )}
      </Grid>

      {visibleInput ? (
        <>
          {/* 1.  nodeText: TextField */}
          <Grid item xs='auto' className={formClasses.textfield}>
            <TextField
              label='Name'
              value={labelText}
              onChange={handleChangeText}
            />
          </Grid>
          {/* 2.  levelName: Select Box */}
          <Grid item xs='auto'>
            <FormControl className={formClasses.formControl}>
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

          {memberArray?.map((mem, index) => (
            <Box m={1} component='span' key={`select-boxes-${index}`}>
              <Grid item xs='auto' key={`User-${mem.user}-${index}`}>
                <FormControl className={formClasses.formControl}>
                  <InputLabel id='controlled-user-select-label'>
                    User {index}
                  </InputLabel>
                  <Select
                    labelId='controlled-user-select-label'
                    id={`controlled-user-select${index}`}
                    value={labelUserName?.[index] || ''}
                    // defaultValue={mem.user}
                    onChange={(e) => {
                      handleChangeUser(e, index);
                    }}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {UsersData.map((name, idx) => (
                      <MenuItem key={idx} value={name.userName}>
                        {name.userName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Divider orientation='vertical' flexItem />
              <Grid
                item
                xs='auto'
                key={`Function-${mem.function.functionName}-${index}`}
              >
                <FormControl className={formClasses.formControl}>
                  <InputLabel id='controlled-function-select-label'>
                    Functions {index}
                  </InputLabel>
                  <Select
                    labelId='controlled-function-select-label'
                    id={`controlled-function-select${index}`}
                    value={labelFunctionName?.[index] || ''}
                    onChange={(e) => {
                      handleChangeFunction(e, index);
                    }}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {functions.map((name, idx) => (
                      <MenuItem key={idx} value={name.functionName}>
                        {name.functionName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Box>
          ))}
          {/* //TODO  5.  Function: Select Box */}
          {/* SUBMIT: Finish Editing the item */}

          <Grid item xs='auto'>
            <Tooltip title='Finish'>
              <IconButton
                size='small'
                onClick={handleSubmit}
                disabled={labelText === ''}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          {/* Cancel: Close the edit and don't save */}
          <Grid item xs='auto'>
            <Tooltip title='Cancel'>
              <IconButton
                color='secondary'
                size='small'
                aria-label='close'
                onClick={handleCancel}
              >
                <HighlightOffRoundedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Box m={1}>
            <Grid item xs='auto'>
              <Tooltip title='Add A Member'>
                <IconButton
                  size='small'
                  aria-label='edit node'
                  onClick={handleAddMember}
                >
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Box>
        </>
      ) : (
        <>
          <Grid item xs='auto'>
            <Typography align='center' variant='h6'>
              {node.text}
            </Typography>
          </Grid>
          <Grid item xs='auto'>
            <Tooltip title='Add New Node'>
              <IconButton
                size='small'
                aria-label='edit node'
                onClick={handleAddNode}
              >
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs='auto'>
            <Tooltip title='Edit Node'>
              <IconButton
                size='small'
                aria-label='edit node'
                onClick={handleShowInput}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CustomNode;