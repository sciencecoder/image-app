import { useState, useEffect, useContext } from 'react';
import { firebaseContext } from '../context/firebase';

// get and set Auth user token from/to localstorage
export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );
  const { firebase } = useContext(firebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);
  // user contains basic user data, uid, email, name, etc
  return { user };
}
