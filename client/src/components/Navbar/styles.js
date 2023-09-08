import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  // Your existing styles here
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    color:'white',
    marginBottom:'20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    fontSize:'large',
  },
  brandContainer: {
    display: 'flex',
    width: 'full',
  },
  purple: {
    color:'black',
    backgroundColor: 'white',
  },
  "@media (max-width: 768px)": {
    appBar: {
      padding: '10px 20px', // Adjust padding for smaller screens
    },
    heading: {
      fontSize: '1.8rem', // Reduce font size for smaller screens
    },
    image: {
      marginLeft: '10px', // Adjust margin for the image
    },
    profile: {
      width: '100%', // Expand profile section to full width
      justifyContent: 'center', // Center-align items in the profile section
    },
    userName: {
      fontSize: '2rem', 

    },
  },
}));
