import React, { useState, useContext } from 'react';
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

	const handleVerification = (e) => {
		e.preventDefault();

		if (code.length) {
			setLoading(true);
			let data = {
				email: email,
				token: Cookie.get('token'),
				verificationCode: code,
			};

			verifyUser(data).then((payload) => {
				let response = payload.data;
				if (response.success) {
					setLoading(false);
					console.log('FORM TOKEN:', response.user);
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
				}
			});
		}
	};

	const handleResendCode = () => {
		let data = {
			email,
			token: Cookie.get('token'),
		};

		resendCode(data).then((response) => {
			if (response.success) {
				setResendMessage(response.message);
			} else {
				setError(response.message);
			}
		});
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
							type='text'
							className='form-control'
							id='verification-code'
							placeholder='Enter verification code'
							onChange={(e) => setCode(e.target.value)}
						/>
						<p className='mb-0 text-error'>{error}</p>
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
				</form>
			</div>
		</div>
	);
};

export default TokenVerification;
