import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // BrowserRouter as Router,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom";
import { startChecking } from '../../actions/auth';
import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const { checking, uid } = useSelector(state => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch]);

  if (checking) {
    return <h5>Espere...</h5>
  }

  return (
    <HashRouter>
      <div>
        <Switch>
          <PublicRoute
            exact
            path='/login'
            component={LoginScreen}
            isAuth={!!uid} />

          <PrivateRoute 
            exact 
            path='/' 
            component={CalendarScreen} 
            isAuth={!!uid} />

          <Redirect to='/' />
        </Switch>
      </div>
    </HashRouter>
  )
}
