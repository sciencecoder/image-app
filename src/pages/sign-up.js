import { useHistory, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { firebaseContext } from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';
// the login page
/*
    use react sate hook for functional components
  */

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(firebaseContext);
  const [username, setUsername] = useState('');
  const [fullName, setFullname] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = emailAddress === '' || emailAddress === '';

  const handleSignup = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    console.log(usernameExists);
    if (!usernameExists) {
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUser.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection('users').add({
          userId: createdUser.user.uid,
          username: username.toLowerCase(),
          emailAddress: emailAddress.toLowerCase(),
          fullName,
          following: [],
          dateCreated: Date.now(),
        });

        setError(false);
        setUsername('');
        setFullname('');
        setEmailAddress('');
        setPassword('');
        console.log(createdUser);
        history.push(ROUTES.DASHBOARD);
      } catch (err) {
        
        setError(err.message);
        console.error(err);
      }
    } else {
      setError({ message: 'Username Already Exists' });
    }
    // try {

    // //  await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
    //   // history.push(ROUTES.DASHBOARD);
    //   setUsername('');
    //   setFullname('');
    //   setEmailAddress('');
    //   setPassword('');
    // } catch(err) {
    //   setError(err);
    //   console.log('error', error)
    // }
  };
  useEffect(() => {
    document.title = 'Sign Up - Instagram';
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
          {error && (
            <p className="mb-4 text-xs text-red-primary">{error.message}</p>
          )}
        </div>
        <form onSubmit={handleSignup} method="POST">
          <input
            aria-label="choose a username"
            type="input"
            placeholder="username"
            className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            aria-label="enter your full name"
            type="input"
            placeholder="Full Name"
            className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
            onChange={({ target }) => setFullname(target.value)}
          />
          <input
            aria-label="enter your email address"
            type="input"
            placeholder="email addres"
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
          <p className="text-sm">alaready have an account? Sign in!</p>
          <Link to="/login" className="font-bold text-blue-medium">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
// todo
