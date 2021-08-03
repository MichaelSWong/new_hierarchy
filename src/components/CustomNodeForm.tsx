import React from 'react';
import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { Controller, useFieldArray, Control } from 'react-hook-form';
import { HierarchyData, HierarchyNodeModel } from '../types';
import useFormStyles from '../styling/form.styles';
import { MyNodesFormProps } from '../pages/HierarchyNodesForm';

type Props = {
  node: NodeModel<HierarchyData>;
  isOpen: boolean;
  onToggle: (id: NodeModel['id']) => void;
  onTextChange: (id: NodeModel['id'], value: string) => void;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  control: Control<MyNodesFormProps> | undefined;
};

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

const CustomNodeForm: React.FC<Props> = ({
  node,
  isOpen,
  onToggle,
  onTextChange,
  control,
}: Props) => {
  const formClasses = useFormStyles();
  const classes = useStyles();
  const { id, text, data } = node;
  const index = 1;
  const [visibleInput, setVisibleInput] = React.useState(false);
  const dragOverProps = useDragOver(id, isOpen, onToggle);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `nodes.${index}.data.member`,
  });

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id);
  };
  const handleShowInput = () => {
    setVisibleInput(true);
  };
  const handleCancel = () => {
    setVisibleInput(false);
  };
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
          {fields.map((item, k) => {
            return (
              <>
                <Grid item xs='auto'>
                  <Controller
                    render={({ field }) => (
                      <TextField {...field} variant='outlined' />
                    )}
                    name={`nodes.${index}.data.member.${k}.user`}
                    control={control}
                    // @ts-ignore
                    defaultValue={item.user}
                  />
                </Grid>
              </>
            );
          })}
          <Grid item xs='auto'>
            <IconButton size='small' aria-label='close' onClick={handleCancel}>
              <HighlightOffRoundedIcon />
            </IconButton>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs='auto'>
            <Typography align='center' variant='h6'>
              {node.text}
            </Typography>
          </Grid>
          <Grid item xs='auto'>
            <IconButton
              size='small'
              aria-label='edit node'
              // onClick={handleAddNode}
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

export default CustomNodeForm;
