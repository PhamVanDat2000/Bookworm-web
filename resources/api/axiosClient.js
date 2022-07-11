import axios from 'axios';
// import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
let token = ''
if (JSON.parse(localStorage.getItem('userLogin'))) {
	token = JSON.parse(localStorage.getItem('userLogin')).token
}
const axiosClient = axios.create({
	baseURL: process.env.APP_URL,
	headers: {
		'content-type': 'application/json',
		"Authorization": `Bearer ${token}`
	},
	// paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
	// Handle token here ...
	return config;
})
axiosClient.interceptors.response.use((response) => {
	if (response && response.data) {
		return response.data;
	}
	return response;
}, (error) => {
	// Handle errors
	throw error;
});
export default axiosClient;