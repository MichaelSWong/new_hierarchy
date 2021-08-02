import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      minWidth: 220,
      maxWidth: 220,
    },
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 200,
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
