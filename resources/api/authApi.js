import axiosClient from "./axiosClient";
const authApi = {
	registerApi: (params) => {
		const url = 'api/auth/register'
		return axiosClient.post(url, params )
	},
	loginApi: (params) => {
		const url = 'api/auth/sign-in'
		return axiosClient.post(url, params)
	},
	logoutApi: () => {
		const url = 'api/auth/logout'
		return axiosClient.post(url,{})
	},

}
export default authApi;