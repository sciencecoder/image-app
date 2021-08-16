import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';  
import * as Routes from '../constants/routes';

export default function IsUserLoggedIn({user, loggedInPath, children, ...rest}) {
  return (
    <Route 
    {...rest}
    render={({ location }) => {
      if(!user) {
        return children
      } if(user) {
       return  <Redirect 
        to={{
          // loggedInPAth = ROUTES.DASHBOARD
          pathname: loggedInPath,
          state: {from: location}
        }}
        />
      }
    }} />
  )
}

IsUserLoggedIn.propTypes = {
  user: propTypes.object,
  children: propTypes.object,
  rest: propTypes.any,
  loggedInPath: propTypes.string
}