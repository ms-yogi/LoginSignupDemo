import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import { verifyUser, resendCode } from '../utils/api';
import { AppStateContext } from '../context/AppContext';
import { PrimaryButton } from '../components/Button';

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
		<div className='form-card d-flex justify-content-between'>
			<div className='d-flex flex-column justify-content-center flex-grow-1'>
				<h2 className='form-header'>Welcome to the Basis</h2>
				<p className='mb-2 text-black-50'>
					A verification code has been sent to your email.
				</p>

				<form onSubmit={handleVerification}>
					<div className='mb-3'>
						<input
							type='number'
							className='input'
							id='verification-code'
							placeholder='Verification Code'
							onChange={(e) => {
								setError('');
								setCode(e.target.value);
							}}
						/>
						<p className='mt-1 text-danger'>{error}</p>
						<p className='mb-1 text-success'>{resendMessage}</p>
					</div>
					<div className='d-flex justify-content-end'>
						<PrimaryButton loading={loading}>Verify</PrimaryButton>
					</div>
				</form>
			</div>
			<button className='btn text-success' onClick={handleResendCode}>
				Resend verification code
			</button>
		</div>
	);
};

export default TokenVerification;
