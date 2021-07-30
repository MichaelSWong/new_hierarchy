import React, { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

import { useDragOver } from "@minoru/react-dnd-treeview";
import { HierarchyNodeModel } from "./types";

const useStyles = makeStyles({
  node: {
    color: "#1967d2"
  },
  arrow: {
    transform: "rotate(90deg)"
  },
  text: {
    width: "50ch"
  }
});

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type Props = {
  node: HierarchyNodeModel;
  isOpen: boolean;
  isSelected: boolean;
  onToggle: (id: HierarchyNodeModel["id"]) => void;
  onSelect: (node: HierarchyNodeModel) => void;
  onTextChange: (
    id: HierarchyNodeModel["id"],
    text: string,
    level: string,
    endDate: Date | string
  ) => void;
  selectedNode: HierarchyNodeModel | null;
  setSelectedNode: Dispatcher<HierarchyNodeModel | null>;
  treeData: HierarchyNodeModel[];
  setTreeData: Dispatcher<HierarchyNodeModel[]>;
};

export const CustomNode: React.FC<Props> = (props) => {
  const {
    id,
    text,
    data: { level, endDate }
  } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const [checked, setChecked] = useState(false);
  const [endDateCheck, setEndDateCheck] = useState(endDate);
  const [labelLevelName, setLabelLevelName] = useState(level.levelName);

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
      text: "NEW NODE",
      droppable: true,
      data: {
        isDirtied: true,
        startDate: new Date().toISOString(),
        endDate: null,
        level: {
          levelName: ""
        },
        member: [
          {
            function: { functionName: "", numberOfPosition: 0, owner: true },
            user: "",
            startDate: new Date().toISOString(),
            endDate: null
          }
        ]
      }
    };
    const newestTree = [...props.treeData, newNode];
    props.setTreeData(newestTree);
    props.setSelectedNode(null);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(e.target.value);
  };

  const handleChangeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelLevelName(e.target.value);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setEndDateCheck(new Date().toISOString());
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText, labelLevelName, endDateCheck);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);
  const classes = useStyles();

  React.useEffect(() => {
    console.log("node", props.node);
    console.log("VISIBLE_INPUT", visibleInput);
    console.log("SELECTED_NODE", props.selectedNode);
    console.log("LABEL_TEXT", labelText);
    console.log("LABEL_LEVEL", labelLevelName);
  }, [props.node, visibleInput, props.selectedNode, labelText, labelLevelName]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
      {...dragOverProps}
    >
      <Grid item xs="auto" className={props.isOpen ? classes.arrow : ""}>
        {props.node.droppable && (
          <Box component="div" onClick={handleToggle}>
            <ArrowRightIcon />
          </Box>
        )}
      </Grid>

      {visibleInput ? (
        <>
          <Grid item xs="auto">
            <TextField
              label="Name"
              value={labelText}
              onChange={handleChangeText}
            />
          </Grid>
          <Grid item xs="auto">
            <TextField
              label="Level"
              value={labelLevelName}
              onChange={handleChangeLevel}
            />
          </Grid>
          <Grid item xs="auto">
            <Checkbox checked={checked} onChange={handleChecked} />
          </Grid>
          <Grid item xs="auto">
            <IconButton
              size="small"
              onClick={handleSubmit}
              disabled={labelText === ""}
            >
              <CheckIcon />
            </IconButton>
          </Grid>
          <Grid item xs="auto">
            <IconButton size="small" aria-label="close" onClick={handleCancel}>
              <HighlightOffRoundedIcon />
            </IconButton>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs="auto" className={props.isSelected ? classes.node : ""}>
            <Typography align="center" variant="h6">
              {props.node.text}
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <IconButton
              size="small"
              aria-label="edit node"
              onClick={handleAddNode}
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item xs="auto">
            <IconButton
              size="small"
              aria-label="edit node"
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
