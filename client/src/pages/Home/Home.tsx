import React, { FC, useContext, useRef, useState } from 'react'
import { Box, TextField, Button, Paper, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { config } from 'src/config';
import { AuthContext } from 'src/context/AuthContext';

interface IProps {
}

type Data = {
  status: boolean;
  user: {
    first_name: string;
    last_name: string;
    phone: string;
  } | null
}

const useStyles = makeStyles((theme) => ({
  navigationPanelRoot: {
    display: 'flex',
    padding: 5,
    marginBottom: 25,
    backgroundColor: theme.palette.secondary.main
  },
  navigationPanelItem: {
    padding: 5,
    color: theme.palette.primary.dark,
    marginRight: 10
  },
  searchBarRoot: {
    padding: 10
  }
}))

const Home: FC<IProps> = () => {
  const [data, setData] = useState<Data>({ status: false, user: null })
  const authContext = useContext(AuthContext);
  const valueRef = useRef('');

  const searchHandler = () => {
    let url = new URL(config.api + '/find');
    url.searchParams.append('email', valueRef.current);

    fetch(String(url), {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(response => response.json())
      .then((data: Data) => setData(data))
  }

  console.log(data)

  const classes = useStyles();

  return (
    <Box>

      <Box className={classes.navigationPanelRoot}>
        <Link to="/login" className={classes.navigationPanelItem}>
          Login
        </Link>

        <Link to="/profile" className={classes.navigationPanelItem}>
          Profile
        </Link>
      </Box>

      <Paper className={classes.searchBarRoot}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TextField
            onChange={({ target }) => valueRef.current = target.value}
            variant="outlined"
            placeholder="Type user email"
          />

          <Button
            disabled={!authContext.data.userData}
            onClick={searchHandler}
          >
            Search
          </Button>
        </Box>
      </Paper>

      {!authContext.data.userData && (
        <Box marginTop="20px">
          <Paper style={{
            padding: 20
          }}>
            <Typography color="secondary">
              You need to sign in if you want to see the result
            </Typography>
          </Paper>
        </Box>
      )}

      {data.status && (
        <Box marginTop="25px">
          {data.user ? (
            <Paper style={{ padding: 15 }}>
              <Typography>First name - {data.user.first_name}</Typography>
              <Typography>Last name - {data.user.last_name}</Typography>
              <Typography>Phone - {data.user.phone}</Typography>
            </Paper>
          ) : (
            <Typography>No such user</Typography>
          )}
        </Box>
      )}


    </Box>
  )
}

export default Home
