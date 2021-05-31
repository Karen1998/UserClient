import React, { FC, useContext } from 'react'
import { Redirect, Route, useLocation } from "react-router-dom";

import { AuthContext } from 'src/context/AuthContext';


interface IProps {
  component: Function
}

const PrivateRoute: FC<IProps> = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  return (
    <Route {...rest}>
      {authContext.data.isAuthenticated ?
        <Component />
        :
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    </Route>
  )
}

export default PrivateRoute
