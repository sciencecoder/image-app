import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/user-auth-listener';
import UserContext from './context/user';

const login = lazy(() => import('./pages/login'));
const signup = lazy(() => import('./pages/sign-up'));
const dashboard = lazy(() => import('./pages/dashboard'));
const notfound = lazy(() => import('./pages/not-found'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<p>Loading ... </p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={login} exact />
            <Route path={ROUTES.SIGNUP} component={signup} exact />
            {user && <Route path={ROUTES.DASHBOARD} component={dashboard} exact />}
            <Route component={notfound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
