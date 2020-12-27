import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import logo from '../assets/basis-logo.png';
import { addUsers } from '../utils/api';
import { AppStateContext } from '../context/AppContext';

const Users = () => {
	const [state, setState] = useContext(AppStateContext);

	let history = useHistory();
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const handleLoginSubmit = (e) => {
		e.preventDefault();

		if (email.length) {
			setLoading(true);
			addUsers({ email }).then((payload) => {
				let response = payload.data;
				if (response.success) {
					setState((state) => ({
						...state,
						email: email,
					}));
					Cookie.set('token', response.results.token);
					setLoading(false);
					history.push({
						pathname: '/verification',
						state: { isLogin: response.results.isLogin },
					});
				}
				if (!response.success) {
					setError(response.message);
					setLoading(false);
				}
			});
		}
	};

	return (
		<div className='wrapper d-flex justify-content-center align-items-center'>
			<div className='card p-4'>
				<h1>LOGIN</h1>
				<img src={logo} alt='' />
				<form onSubmit={handleLoginSubmit} className=''>
					<div className='mb-3'>
						<label htmlFor='email' className='form-label'>
							Email address
						</label>
						<input
							type='email'
							className='form-control'
							id='email'
							placeholder='Enter your email'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<p className='mb-0 text-error'>{error}</p>
					</div>
					<div>
						<button className='btn btn-success' type='submit'>
							{loading ? (
								<div
									className='spinner-border text-light'
									role='status'
								>
									<span className='visually-hidden'>
										Loading...
									</span>
								</div>
							) : (
								'Login/Signup'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Users;
