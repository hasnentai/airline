import { container, title, primaryColor } from "../../material-kit-react.js";

const RegistrationPageStyle = theme => ({
    root: {
        height: '100vh',
      },
      image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundPosition: 'center',
       
      },
      radioButton: {
        display: 'flex',
        flex: 'wrap',
        flexDirection: 'row'

      },
      paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      }
});

export default RegistrationPageStyle;
