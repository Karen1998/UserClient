import { FC } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Button, makeStyles, TextField } from '@material-ui/core'
import { SignInFields } from 'src/types/SignInFields';


interface IProps {
  onSubmitHandle: (values: SignInFields) => void,
  loading: boolean;
}

const useStyles = makeStyles(() => ({
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    flex: 1,
    marginBottom: 15,

    '&:last-child': {
      marginBottom: 0
    }
  },

  buttonRoot: {
    marginTop: 25
  }
}))


const SignInSchema = Yup.object().shape({
  login: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required("Password is required"),
});

const SignInFormContainer: FC<IProps> = ({ onSubmitHandle, loading }) => {

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: (values: SignInFields) => {
      onSubmitHandle(values)
    }
  })

  const classes = useStyles();

  return (
    <form
      className={classes.formRoot}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        label="Login"
        name="login"
        value={formik.values.login}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.login) && formik.touched.login}
        helperText={formik.errors.login}
        className={classes.inputRoot}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.password) && formik.touched.password}
        helperText={formik.errors.password}
        className={classes.inputRoot}
      />

      <Button
        variant="contained"
        disabled={!formik.isValid || loading}
        className={classes.buttonRoot}
        type="submit"
      >
        {loading ? (
          'Loading ...'
        ) : (
          'Sign in'
        )}
      </Button>

    </form>
  )
}

export default SignInFormContainer
