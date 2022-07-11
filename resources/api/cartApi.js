import axiosClient from "./axiosClient";
const cardApi = {
	placeOrderApi: (params) => {
		const url = 'api/product/make-order'
		return axiosClient.post(url, params)
	},

}
export default cardApi;