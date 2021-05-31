import { Container } from '@material-ui/core';

import AuthContextComponent from './context/AuthContext'
import Routes from './Routes';
import './vendor/styles/reset.css'

function App() {
  return (
    <AuthContextComponent>
      <Container>
        <Routes />
      </Container>
    </AuthContextComponent>

  );
}

export default App;
