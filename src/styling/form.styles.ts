import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      minWidth: 120,
      maxWidth: 120,
    },
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 120,
    },
    buttonMargin: {
      margin: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
    itemList: {
      fontsize: '3rem',
    },
  }),
);

export default useFormStyles;
