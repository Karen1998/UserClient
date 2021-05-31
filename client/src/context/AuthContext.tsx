import { FC, createContext, useState, useEffect } from 'react'


type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface IContext {
  data: {
    isAuthenticated: boolean;
    userData: UserData | null
  },
  utils: { [key: string]: Function }
}

const initialDataContext: {
  isAuthenticated: boolean;
  userData: UserData | null
} = {
  isAuthenticated: false,
  userData: null
}

export const AuthContext = createContext<IContext>({
  data: initialDataContext,
  utils: {}
});

const AuthContextComponent: FC = ({ children }) => {
  const [state, setState] = useState(initialDataContext);
  const [loaded, setLoaded] = useState(false);

  const toggleStatus = (status: boolean) => {
    setState((prevState) => ({
      ...prevState,
      isAuthenticated: status
    }));
  }

  const initUserData = (data: UserData) => {
    setState({
      isAuthenticated: true,
      userData: {
        ...data
      }
    });
  }

  const signOutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');

    setState({
      userData: null,
      isAuthenticated: false
    });
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      toggleStatus(true);
    }

    if (localStorage.getItem('userData')) {
      initUserData(JSON.parse(localStorage.getItem('userData') as string))
    }

    if (localStorage.getItem('exp')) {
      let checkExp = Number(localStorage.getItem('exp')) - new Date().getTime();

      if (checkExp < 0) {
        signOutHandler();
      }
    } else {
      signOutHandler();
    }

    setLoaded(true)
  }, []);


  return (
    <AuthContext.Provider value={{
      data: state,
      utils: {
        toggleStatus,
        initUserData,
        signOutHandler
      }
    }}>
      {loaded && children}
    </AuthContext.Provider>
  )
}

export default AuthContextComponent
