import React from 'react';
import logo from '../assets/basis-logo.png';

const Profile = (props) => {
	let userData = props.location.state.userData;

	return (
		<div className='wrapper d-flex justify-content-center align-items-center'>
			<div className='card p-4'>
				<h1>PROFILE</h1>
				<img src={logo} alt='' />
				{userData && (
					<>
						<img src={userData.avatar} alt='' />

						<h3>
							{userData.firstName} {userData.lastName}{' '}
						</h3>

						<p>{userData.phoneNumber}</p>
						<p>{userData.email}</p>
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
