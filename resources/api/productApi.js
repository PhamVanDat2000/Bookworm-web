import axiosClient from "./axiosClient";
const productApi = {
	getQuantityStar: (params) => {
		const url = '/api/product/get-star-count?'
		return axiosClient.get(url, { params })
	},
	// getReviewSort: (params) => {
	// 	const url = '/api/product/sort-review-by-date'
	// 	return axiosClient.get(url, { params })
	// },
	getBookDetail: (params) => {
		const url = '/api/product/get-book-by-id'
		return axiosClient.get(url, { params })
	},
	getReivewsBook: (params) => {
		const url = '/api/product/sort-review-by-date'
		return axiosClient.get(url, { params })
	},
	
}
export default productApi;