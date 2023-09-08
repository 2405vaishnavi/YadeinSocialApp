import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    appBarSearch: {
      borderRadius: 4,
      marginBottom: '3rem',
      marginTop: '.3rem',
      marginRight:'1rem',
      display: 'flex',
      padding: '16px',

    },
    pagination: {
      borderRadius: 4,
      marginTop: '1rem',
      padding: '16px',
    },
    gridContainer: {
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column-reverse',
      },
    },

    search:{
      padding:'5px',
    }
  }));