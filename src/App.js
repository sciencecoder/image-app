import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/user-auth-listener';
import UserContext from './context/user';
import ProtectedRoute from './helpers/protected-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const notfound = lazy(() => import('./pages/not-found'));
const Profile = lazy(() => import('./pages/profile'))
function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<p>Loading ... </p>}>
          <Switch>
         
            <IsUserLoggedIn user={user} path={ROUTES.LOGIN} loggedInPath={ROUTES.DASHBOARD}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} path={ROUTES.SIGNUP} loggedInPath={ROUTES.DASHBOARD}>
              <Signup />
            </IsUserLoggedIn>
            {/* {user && <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />} */}
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route component={notfound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
