import { FC } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Button, makeStyles, TextField } from '@material-ui/core'
import { ISignUpFiles } from 'src/types/SignUpFields';


interface IProps {
  onSubmitHandle: (values: ISignUpFiles) => void
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

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required("Password is required"),
  changepassword: Yup.string().when("password", {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    )
  }),
  phone: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
});


const SignUpFormContainer: FC<IProps> = ({ onSubmitHandle }) => {
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      changepassword: '',
      phone: ''
    },
    validationSchema: SignupSchema,
    onSubmit: (values: ISignUpFiles) => {
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
        label="First name"
        name="first_name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.first_name) && formik.touched.first_name}
        helperText={formik.errors.first_name}
        className={classes.inputRoot}
      />

      <TextField
        label="Last name"
        name="last_name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={classes.inputRoot}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.email) && formik.touched.email}
        helperText={formik.errors.email}
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

      <TextField
        label="Confirm password"
        name="changepassword"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.errors.changepassword) && formik.touched.changepassword}
        helperText={formik.errors.changepassword}
        className={classes.inputRoot}
      />

      <TextField
        label="Phone"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={classes.inputRoot}
      />

      {/* <Button
        variant="contained"
        className={classes.buttonRoot}
        disabled={!formik.isValid}
      >
        Sign Up
      </Button> */}

    </form>
  )
}

export default SignUpFormContainer
