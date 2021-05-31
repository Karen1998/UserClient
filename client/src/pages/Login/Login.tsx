import { FC, useContext, useEffect, useState } from 'react'
import { Box, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { config } from 'src/config'
import SignInFormContainer from 'src/containers/SignInFormContainer'
import { SignInFields } from 'src/types/SignInFields'
import { AuthContext } from 'src/context/AuthContext'

interface IProps { }

const Login: FC<IProps> = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { push } = useHistory();

  const signInHandler = (values: SignInFields) => {
    setLoading(true);

    const fd = new FormData();
    fd.append('login', values.login);
    fd.append('password', values.password);

    fetch(config.api + '/signin', {
      method: 'POST',
      body: fd
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          const { user, token, exp } = res;

          authContext.utils.initUserData(user);
          localStorage.setItem('token', token);
          localStorage.setItem('exp', exp);
          localStorage.setItem('userData', JSON.stringify(user));
          push('/profile')
        }
      })
      .finally(() => setLoading(false))
  }


  // Delete sign in data on mount
  useEffect(() => {
    authContext.utils.signOutHandler();
  }, [])

  return (
    <Box
      display="flex"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box alignSelf="center">
        <Paper>
          <SignInFormContainer
            onSubmitHandle={signInHandler}
            loading={loading}
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default Login
