import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Signup from './pages/Signup';
import TokenVerification from './pages/TokenVerification';
import Users from './pages/Users';
import Profile from './pages/Profile';
import { AppStateProvider } from './context/AppContext';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<AppStateProvider>
						<Route exact path='/users' component={Users} />
						<Route
							exact
							path='/verification'
							component={TokenVerification}
						/>
						<Route exact path='/signup' component={Signup} />
						<Route exact path='/profile' component={Profile} />
						<Route
							exact
							path='/'
							render={() => <Redirect to='users' />}
						/>
					</AppStateProvider>
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
