import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import logo from '../assets/basis-logo.png';
import { signup } from '../utils/api';
import { AppStateContext } from '../context/AppContext';

const Signup = () => {
	let [state] = useContext(AppStateContext);
	let history = useHistory();
	const [payload, setPayload] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setError('');
		setPayload((prevPayload) => ({
			...prevPayload,
			[e.target.id]: e.target.value,
		}));
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		let data = {
			firstName: payload.firstName,
			email: state.email,
			referredCodeKey: payload.referredCodeKey,
			agreeToPrivacyPolicy: payload.agreeToPrivacyPolicy,
			token: Cookie.get('token'),
			source: window.SOURCE,
		};

		setLoading(true);
		signup(data).then((payload) => {
			let response = payload.data;
			console.log(response);
			setLoading(false);
			if (response.success) {
				history.push({
					pathname: '/profile',
					state: { userData: response.results.user },
				});
			} else {
				setError(response.message);
			}
		});
	};

	return (
		<div className='wrapper d-flex justify-content-center align-items-center'>
			<div className='card p-4'>
				<h1>SIGNUP</h1>
				<img src={logo} alt='' />
				<form onSubmit={handleLoginSubmit} className=''>
					<div className='mb-3'>
						<label htmlFor='firstName' className='form-label'>
							First Name
						</label>
						<input
							type='text'
							className='form-control'
							id='firstName'
							placeholder='First Name'
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='email' className='form-label'>
							Email address
						</label>
						<input
							type='email'
							className='form-control'
							id='email'
							placeholder='Enter your email'
							onChange={(e) => handleChange(e)}
							value={state.email}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='referredCodeKey' className='form-label'>
							Referred code
						</label>
						<input
							type='text'
							className='form-control'
							id='referredCodeKey'
							placeholder='Enter your referrence code'
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className='form-check'>
						<input
							className='form-check-input'
							value={payload.agreeToPrivacyPolicy}
							id='agreeToPrivacyPolicy'
							type='checkbox'
							onChange={(e) => {
								setPayload({
									...payload,
									agreeToPrivacyPolicy: e.target.checked,
								});
							}}
						/>
						<label
							className='form-check-label'
							htmlFor='agreeToPrivacyPolicy'
						>
							I agree to the privacy policy.
						</label>
					</div>
					<p className='mb-0 text-error'>{error}</p>
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
								'Signup'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
