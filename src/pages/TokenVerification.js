import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import logo from '../assets/basis-logo.png';
import { verifyUser, resendCode } from '../utils/api';
import { AppStateContext } from '../context/AppContext';

const TokenVerification = (props) => {
	const [state] = useContext(AppStateContext);

	let history = useHistory();

	let isLogin = props.location.state ? props.location.state.isLogin : false;
	let email = state.email;

	const [code, setCode] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [resendMessage, setResendMessage] = useState('');
	const [resendCounter, setResendCounter] = useState(0);
	const [wrongTokenCounter, setWrongTokenCounter] = useState(0);

	useEffect(() => {
		if (!email) {
			history.push('/users');
		}
	}, []);

	const handleVerification = (e) => {
		e.preventDefault();

		if (wrongTokenCounter >= 3) {
			history.push('/users');
		} else if (code.length >= 6) {
			setLoading(true);
			let data = {
				email: email,
				token: Cookie.get('token'),
				verificationCode: code,
			};

			verifyUser(data)
				.then((payload) => {
					let response = payload.data;
					setLoading(false);
					if (response.success) {
						if (isLogin) {
							history.push({
								pathname: '/profile',
								state: { userData: response.results.user },
							});
						} else {
							history.push('/signup');
						}
					} else {
						setError(response.message);
						setWrongTokenCounter((counter) => counter + 1);
					}
				})
				.catch((error) => {
					setLoading(false);
					setError(error.response.data.message);
				});
		} else {
			setError('Verification code must be 6 digits long!');
		}
	};

	const handleResendCode = () => {
		setResendCounter((counter) => counter + 1);
		if (resendCounter >= 3) {
			history.push('/users');
		} else {
			let data = {
				email,
				token: Cookie.get('token'),
			};

			resendCode(data)
				.then((response) => {
					if (response.success) {
						setResendMessage(response.message);
					} else {
						setError(response.message);
					}
				})
				.catch((error) => {
					setError(error.response.data.message);
				});
		}
	};

	return (
		<div className='wrapper d-flex justify-content-center align-items-center'>
			<div className='card p-4'>
				<h1>VERIFICATION</h1>
				<img src={logo} alt='' />
				<form onSubmit={handleVerification} className=''>
					<div className='mb-3'>
						<label
							htmlFor='verification-code'
							className='form-label'
						>
							Verification Code
						</label>
						<input
							type='number'
							className='form-control'
							id='verification-code'
							placeholder='Enter verification code'
							onChange={(e) => {
								setError('');
								setCode(e.target.value);
							}}
						/>
						<p className='mb-0 text-danger'>{error}</p>
						<p className='mb-0 text-success'>{resendMessage}</p>
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
								'Verify'
							)}
						</button>
					</div>
				</form>
				<div>
					<button
						className='btn text-success'
						onClick={handleResendCode}
					>
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
							'Resend verification code'
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default TokenVerification;
