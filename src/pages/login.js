import { useHistory, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { firebaseContext } from '../context/firebase';
import * as ROUTES from '../constants/routes';
// the login page
/*
    use react sate hook for functional components
  */
export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(firebaseContext);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = emailAddress === '' || password === '';
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      setEmailAddress('');
      setPassword('');
      history.push(ROUTES.DASHBOARD);
    } catch(error) {
      setEmailAddress('');
      setPassword('');

      setError(error.message);
      console.log('Error caught @ handlelogin line 25', error)
    }
  };
  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-width-md items-center h-screen">
      <div className="flex w-3/5">
        <div className="flex flex-col">
          <img
            src="/images/iphone-with-profile.jpg"
            alt="Iphone profile pick"
          />
        </div>
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-grey-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img src="images/logo.png" alt="instagram logo" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
        </div>
        <form onSubmit={handleLogin} method="POST">
          <input
            aria-label="enter your email address"
            type="input"
            placeholder="email address"
            className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
            onChange={({ target }) => setEmailAddress(target.value)}
          />
          <input
            aria-label="enter your email address"
            type="password"
            placeholder="password"
            className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            disabled={isInvalid}
            type="submit"
            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
              isInvalid && 'opacity-50'
            }`}
          >
            Submit
          </button>
        </form>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-grey-primary">
          <p className="text-sm">don't have an account? sign up</p>
          <Link to="/signup" className="font-bold text-blue-medium">
            Sign Up!
          </Link>
        </div>
      </div>
    </div>
  );
}
// todo
