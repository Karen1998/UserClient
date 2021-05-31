import { FC, useContext } from 'react'
import { Box, Typography, Paper, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { AuthContext } from 'src/context/AuthContext'


interface IProps {

}

const Profile: FC<IProps> = () => {
  const authContext = useContext(AuthContext);

  const signOutHandler = () => {
    authContext.utils.signOutHandler();
  }

  return (
    <Box>
      <Box>
        <Typography component="h2" variant="body1">
          Profile page
        </Typography>

        <Box>
          <Button
            color="secondary"
            variant="outlined"
            onClick={signOutHandler}
          >
            Sign out
          </Button>

          <Button
            variant="outlined"
          >
            <Link to="/">
              Home page
            </Link>
          </Button>
        </Box>
      </Box>

      <Box>
        <Paper style={{ padding: 15 }}>
          <Typography>
            User email = {authContext.data.userData?.email}
          </Typography>

          <Typography>
            User first name = {authContext.data.userData?.first_name}
          </Typography>

          <Typography>
            User last name = {authContext.data.userData?.first_name}
          </Typography>

          <Typography>
            User email = {authContext.data.userData?.email}
          </Typography>

          <Typography>
            User phone = {authContext.data.userData?.phone}
          </Typography>
        </Paper>
      </Box>

    </Box>
  )
}

export default Profile
