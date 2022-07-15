import axios from "axios";
import axiosClient from "./axiosClient";
let token = ''
if (JSON.parse(localStorage.getItem('userLogin'))) {
	token = JSON.parse(localStorage.getItem('userLogin')).token
}
const cardApi = {
	placeOrderApi: (params) => {
		const url = 'api/product/make-order'
		return axios.post(url, params, {
			headers: {
				'content-type': 'application/json',
				"Authorization": `Bearer ${token}`
			}
		})
	},

}
export default cardApi;