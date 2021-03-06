// All API CALLS
import axios from 'axios';

let API_URL = window.BASE_URL;

export const addUsers = (payload) => {
	return axios.post(`${API_URL}/users/email`, payload);
};

export const verifyUser = (payload) => {
	return axios.put(`${API_URL}/users/email/verify`, payload);
};

export const resendCode = (payload) => {
	return axios.put(`${API_URL}/users/token/resendtoken`, payload);
};

export const signup = (payload) => {
	return axios.post(`${API_URL}/users`, payload);
};

export const getReferralKey = () => {
	return axios.get(`${API_URL}/users/referral/MAYANK`);
};

export const logout = (userid, token) => {
	return axios.delete(`${API_URL}/users/logout/${userid}`, {
		headers: {
			Authorization: `Bearer ${userid},${token}`,
		},
	});
};
