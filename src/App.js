import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Signup from './pages/Signup';
import TokenVerification from './pages/TokenVerification';
import Users from './pages/Users';
import Profile from './pages/Profile';
import { AppStateProvider } from './context/AppContext';

const App = () => {
	return (
		<div className='root-wrapper'>
			<div className='row wrapper'>
				<div className='col-lg-7 hero-section'>
					<img
						src='https://static.wixstatic.com/media/51b1dd_74f30a8e963e417ebf707e309e269547~mv2.png/v1/fill/w_538,h_429,al_c,lg_1,q_85/0ne%200n%200ne.webp'
						alt=''
					/>
					<h1>Your Money, Your Way</h1>
					<p>Powering Financial Independence for Women </p>
				</div>
				<div className='col-lg-5 '>
					{' '}
					<BrowserRouter>
						<Switch>
							<AppStateProvider>
								<Route exact path='/users' component={Users} />
								<Route
									exact
									path='/verification'
									component={TokenVerification}
								/>
								<Route
									exact
									path='/signup'
									component={Signup}
								/>
								<Route
									exact
									path='/profile'
									component={Profile}
								/>
								<Route
									exact
									path='/'
									render={() => <Redirect to='users' />}
								/>
							</AppStateProvider>
						</Switch>
					</BrowserRouter>
				</div>
			</div>
		</div>
	);
};

export default App;
