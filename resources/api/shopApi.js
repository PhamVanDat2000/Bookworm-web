import axiosClient from "./axiosClient";
const shopApi = {
	getListBookSort: (params) => {
		const url = 'api/shop/sort-book'
		return axiosClient.get(url, { params })
	},

	getListCategory: () => {
		const url = 'api/shop/category-list'
		return axiosClient.get(url, {})
	},

	getListAuthor: () => {
		const url = 'api/shop/author-list'
		return axiosClient.get(url, {})
	},

	getFilterByCategory: (params) => {
		const url = 'api/shop/filter-by-category'
		return axiosClient.get(url, { params })
	},
	getFilterByAuthor: (params) => {
		const url = 'api/shop/filter-by-author'
		return axiosClient.get(url, { params })
	},
	getFilterByStar: (params) => {
		const url = 'api/shop/filter-by-star'
		return axiosClient.get(url, { params })
	}
}
export default shopApi;