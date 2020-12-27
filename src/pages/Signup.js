import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import { signup, getReferralKey } from '../utils/api';
import { AppStateContext } from '../context/AppContext';
import { PrimaryButton } from '../components/Button';

const Signup = () => {
	let [state] = useContext(AppStateContext);

	let history = useHistory();
	const [payload, setPayload] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [referralToken, setReferralToken] = useState('');

	useEffect(() => {
		if (!state.email) {
			history.push('/users');
		}

		getReferralKey().then((payload) => {
			let response = payload.data;
			if (response.success) {
				setReferralToken(response.results.referralToken);
			}
		});
	}, []);

	const handleChange = (e) => {
		setError('');
		setPayload((prevPayload) => ({
			...prevPayload,
			[e.target.id]: e.target.value,
		}));
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		if (
			payload.referredCodeKey === referralToken ||
			!payload.referredCodeKey.length
		) {
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
		} else {
			setError('Referred code seems to be invalid!');
		}
	};

	return (
		<div className='form-card'>
			<h2 className='form-header'>Signup</h2>

			<form onSubmit={handleLoginSubmit} className=''>
				<div className='mb-3'>
					<input
						type='text'
						className='input'
						id='firstName'
						placeholder='First Name'
						onChange={(e) => handleChange(e)}
						required
					/>
				</div>
				<div className='mb-3'>
					<input
						type='email'
						className='input'
						id='email'
						placeholder='Your Email'
						value={state.email}
						disabled
					/>
				</div>
				<div className='mb-3'>
					<input
						type='text'
						className='input'
						id='referredCodeKey'
						placeholder='Referrence Code'
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className='form-check'>
					<input
						className='form-check-input'
						value={payload.agreeToPrivacyPolicy}
						id='agreeToPrivacyPolicy'
						type='checkbox'
						required
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
						<p>I agree to the privacy policy.</p>
					</label>
				</div>
				<p className='mt-1 text-danger'>{error}</p>
				<div className='d-flex justify-content-end'>
					<PrimaryButton loading={loading}>Signup</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default Signup;
