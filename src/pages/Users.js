import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import { addUsers } from '../utils/api';
import { AppStateContext } from '../context/AppContext';
import { PrimaryButton } from '../components/Button';

const Users = () => {
	const [state, setState] = useContext(AppStateContext);

	let history = useHistory();
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const isValidEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		if (email.length && isValidEmail(email)) {
			setLoading(true);
			addUsers({ email })
				.then((payload) => {
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
				})
				.catch((error) => {
					setLoading(false);
					setError(error.response.data.message);
				});
		} else {
			setError('Please enter a valid email');
		}
	};

	return (
		<div className='form-card'>
			<h2 className='form-header'>Welcome to the Basis</h2>

			<form onSubmit={handleLoginSubmit}>
				<div className='mb-3'>
					<input
						type='email'
						className='input'
						id='email'
						placeholder='Your Email'
						onChange={(e) => {
							setError('');
							setEmail(e.target.value);
						}}
					/>
					<p className='mt-1 text-danger'>{error}</p>
				</div>
				<div className='d-flex justify-content-end'>
					<PrimaryButton loading={loading}>Send OTP</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default Users;
