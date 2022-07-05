import axiosClient from "./axiosClient";
const homeApi = {
	getBookDiscount: (params) => {
		const url = '/api/home/top-books-discount'
		return axiosClient.get(url, { params })
	},
	getBookRecommended: (params) => {
		const url = 'api/home/top-books-recommended'
		return axiosClient.get(url, { params })
	},
	getBookPopularity: (params) => {
		const url = 'api/home/get-books-popularity'
		return axiosClient.get(url, { params })
	}
}
export default homeApi;