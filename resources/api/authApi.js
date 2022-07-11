import axios from "axios";
import axiosClient from "./axiosClient";
const authApi = {
	registerApi: (params) => {
		const url = 'api/auth/register'
		return axios.post(url, params)
	},
	loginApi: (params) => {
		const url = 'api/auth/sign-in'
		return axios.post(url, params)
	},
	logoutApi: () => {
		const url = 'api/logout'
		return axiosClient.post(url, {})
	},

}
export default authApi;