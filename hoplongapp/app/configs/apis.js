
import Axios from 'axios'

export default apis = {
	getNew(page) {
		return Axios.get('api/news?page='+page)
	},
	getRecruitment(page) {
		return Axios.get('api/recruitment?page='+page)
	},
	getHomePage() {
		
		return Axios.get('api/home-page')
	},
	coupon(coupon) {
		return Axios.post('api/get-coupon-code', { couponcode: coupon })
	},
	getWarrantyPolicy() {
		return Axios.get('api/policy/warranty')
	},
	getSlider() {
		return Axios.get('api/slider')
	},
	getPolicyRetunExchange() {
		return Axios.get('api/policy/return-exchange')
	},
	getPaymentPolicy() {
		return Axios.get('api/policy/payment')
	},
	getShippingPolicy() {
		return Axios.get('api/policy/shipping')
	},
	forgot(email) {
		return Axios.post('api/customer/forgot-password', { email: email })
	},
	customer() {
		return Axios.get('api/customer')
	},
	login(username, password) {
		return Axios.post('api/login', { 
		email: username, 
		password :password 
		})
    },
	getRange(address) {
		return Axios.get('api/khoang-cach/?address='+address)
	},
	getProduct(id) {
		return Axios.get('api/product/'+id)
	},
	getNewProductPage(page) {
		return Axios.get('api/new/products?page='+page)
	},
	getNewProduct() {
		return Axios.get('api/new/products/')
	},
	getBestSale(page) {
		return Axios.get('api/best-sellers/products?page='+page)
	},
	getFlashSale() {
		return Axios.get('api/flash-sale/products/')
	},
	getCatalog() {
		return Axios.get('api/document/catalog/')
	},
	getCategory() {
		return Axios.get('api/categories/')
	},
	register(username, phone, password, email, address) {
		return Axios.post('api/create-account-customer', {
			name: username,
			phone: phone,
			email: email,
			address: address,
			password: password,
			account_type: "0"
		})
    },
	order(products, order, vat){
		return Axios.post('api/order',{
			order: order,
			order_detail: products,
			vat: vat,
		})
	},
	getCategorySon(id) {
		return Axios.get('api/category-child/'+id)
	},
	getCategorySonProduct(id) {
		return Axios.get('api/category-child-product/'+id)
	},
	getSearchOption(from, to, category, catalog) {
		return Axios.get('api/products?price[from]='+from+'&price[to]='+to+'&category_id='+category+'&catalog='+catalog)
		
	},
	getProductList(id) {
		return Axios.get('api/products/'+id)
	},
    getSearch(search, page) {
		return Axios.get('api/products/search/'+search+'?page='+page)
	},
    
}
