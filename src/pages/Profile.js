import React from 'react';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { PrimaryButton } from '../components/Button';
import { logout } from '../utils/api';

const Profile = (props) => {
	let userData = props.location.state.userData;
	let history = useHistory();

	const handleLogout = (e) => {
		e.preventDefault();

		logout(userData._id, userData.token).then((payload) => {
			let response = payload.data;
			if (response.success) {
				Cookie.remove('token');

				history.push('/users');
			}
		});
	};

	return (
		<div className='form-card profile'>
			{userData && (
				<div>
					<img src={userData.avatar} alt='' />

					<h3>
						{userData.firstName} {userData.lastName}{' '}
					</h3>

					<p>{userData.phoneNumber}</p>
					<p>{userData.email}</p>
					<PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
				</div>
			)}
		</div>
	);
};

export default Profile;
