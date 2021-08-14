import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { firebaseContext } from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';

export default function Header() {
  const { firebase } = useContext(firebaseContext);
  const user = useContext(UserContext);
 
  return (
    <header className="h-16 bg-white border-b border-grey-primary mb-4">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-base text-center flex items-start align-items cursor-pointer">
            <h1 className=" flex w-full h-full">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  src="images/logo.png"
                  className="w-9/12 h-full"
                  aria-label="Imagegram logo"
                />
              </Link>
            </h1>
          </div>
          <div className="text-center flex items-center align-items">
            {user ? (
              <>
                <Link className="mx-2" to={ROUTES.DASHBOARD}>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                <button
                  className="mx-2"
                  type="button"
                  title="Sign out"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(event) => {
                    if (Event.key === 'Enter') {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="leex items-center cursor-pointer">
                  <Link to={`p/${user.displayName}`}>
                    <img
                      className="rounded-full w-16"
                      src={`images/avatars/${user.displayName}.jpg`}
                      alt={`${user.displayName} profile`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="bg-blue-medium hover:bg-blue-700 font-bold py-2 px-4 rounded mr-2"
                >
                  <NavLink to={ROUTES.LOGIN}>Login</NavLink>
                </button>
                <div
                  type="button"
                  className="bg-blue-400 hover:bg-blue-700 font-bold py-2 px-4 rounded"
                >
                  <NavLink to={ROUTES.SIGNUP}>SignUp</NavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
