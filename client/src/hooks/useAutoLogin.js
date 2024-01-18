import { useContext, useEffect } from 'react';
import AuthContext from '../Context/AuthContext';

const useAutoLogin = () => {
    const { setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("token")) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); 
};

export default useAutoLogin;
