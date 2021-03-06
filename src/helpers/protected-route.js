import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';  
import * as Routes from '../constants/routes';

export default function ProtectedRoute({user, children, ...rest}) {
  return (
    <Route 
    {...rest}
    render={({ location }) => {
      if(user) {
        return children
      } if(!user) {
       return  <Redirect 
        to={{
          pathname: Routes.LOGIN,
          state: {from: location}
        }}
        />
      }
    }} />
  )
}

ProtectedRoute.propTypes = {
  user: propTypes.object,
  children: propTypes.object,
  rest: propTypes.any
}