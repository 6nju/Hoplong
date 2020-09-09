import React from 'react';
import { StyleSheet, Dimensions,LayoutAnimation,StatusBar, Alert, Picker, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image,Platform, UIManager } from 'react-native';
import {Divider, Input , ThemeProvider} from 'react-native-elements';
import { Footer } from './components/index'
const width = Dimensions.get('window').width
import {colors, globalStyles} from './configs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamationCircle, faTruck, faCommentDollar, faMinus, faPlus, faCommentDots, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
const height = Dimensions.get('window').height
import { connect } from 'react-redux'
import Axios from 'axios';
import { apis } from './configs/index'
import { ActionCart } from './redux/ActionCart'
import Header from './components/Header';
import Navbar from './components/navbar';
import { CheckBox } from 'react-native-elements'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
const formLogin = {
  loginByPhone: 'Sử Dụng Coupon',

};
class Pay extends React.Component {
	constructor(props) {
    super(props)
    this.state = { 
		expandedOne: false,
		expandedTow: false,
		expandedFour: false,
		ships: [],
		ship: 0,
		vat: false,
		cannang: 0,
		khoangcach: 0,
		codMoney: 0,
		heso_: 0,

		citys: [],
		coupon: '',
		guild: '',
		addressCompany: '',
		vatCompany: '',
		company: '',
		user: this.props.user_login,
		pay: 'Thanh toán chuyển khoản',
		districts: [],
		price_reduced: 0,
		guilds: [],
		shipCost: 0,
		amountVat: 0,
		expandedThree: false,
		total_: 0,
		all_: 0,
		products: props.navigation.state.params.products,
		user_info: this.props.user_login,
		address: (this.props.user_login) ? this.props.user_login.address : '',
		phone: (this.props.user_login) ? this.props.user_login.phone : '',
		name: (this.props.user_login) ? this.props.user_login.name : '',
		district: (this.props.user_login) ? this.props.user_login.district : '',
		city: (this.props.user_login) ? this.props.user_login.city : '',

	}
	let cannang = 0;
	let products = this.state.products
	
	for(let i = 0; i < products.length; i++){
		
		let p = this.state.products[i];
		let value = p.value
		
		if(p.product.data_weight != null){
		let cn = p.product.data_weight
		cannang = cannang + cn.weight*p.value
		}
	}
	this.setState({
		cannang: cannang
	});
	
	if(this.state.address != ''){
		apis.getRange(address).then(res => {
																						
																						this.setState({
																							khoangcach: res.data.range,
																							shipCost: shipCost,
																							heso_: res.data.heso
																						})	
																						let shipCost = (this.state.cannang + res.data.range)*this.state.heso_	
																					})
	}
	if(this.state.user_info){
		
		Axios.defaults.headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + this.state.user_info.token
                        }
	
    }
	if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
	
	
	
	
    
	
  }
	/*static navigationOptions = {
	
    headerRight: () => (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#ddd"
		style={{ }}

        hardwareAccelerated
      />
    ),
  };*/

  
  _couponClose = () => {
					this.setState({
						  price_reduced: 0,coupon:''
					  })
  }
  _coupon = () => {
	  const { coupon } = this.state
	  apis.coupon(coupon).then(res => {
		if(res.data.error || res.data.status != 1){
			  Alert.alert("Thông báo", "Coupon không thể sử dụng");
		  }else{
			  if(res.data.rule.conditions == '>='){
				  let total = parseFloat(parseFloat(this.state.all_) + parseFloat(this.state.shipCost) + parseFloat(this.state.codMoney));
				  if(total >= res.data.rule.condition_for){
					  this.setState({
						  price_reduced: parseInt(res.data.rule.price_reduced)
					  })
					  Alert.alert("Thông báo", "Đơn hàng lớn hơn "+res.data.rule.condition_for+' bạn có thể sử dụng coupon này');
				  }else{
					  Alert.alert("Thông báo", "Đơn hàng nhỏ hơn "+res.data.rule.condition_for+' bạn không thể sử dụng coupon này');
				  }
			  }
			  if(res.data.rule.conditions == '>'){
				  if(total > res.data.rule.condition_for){
					  this.setState({
						  price_reduced: parseInt(res.data.rule.price_reduced)
					  })
					  Alert.alert("Thông báo", "Đơn hàng lớn hơn "+res.data.rule.condition_for+' bạn có thể sử dụng coupon này');
				  }else{
					  Alert.alert("Thông báo", "Đơn hàng nhỏ hơn "+res.data.rule.condition_for+' bạn không thể sử dụng coupon này');
				  }
			  }
			  if(res.data.rule.conditions == '<'){
				  if(total < res.data.rule.condition_for){
					  this.setState({
						  price_reduced: parseInt(res.data.rule.price_reduced)
					  })
					  Alert.alert("Thông báo", "Đơn hàng nhỏ hơn "+res.data.rule.condition_for+' bạn có thể sử dụng coupon này');
				  }else{
					  Alert.alert("Thông báo", "Đơn hàng lớn hơn "+res.data.rule.condition_for+' bạn không thể sử dụng coupon này');
				  }
			  }
		  }
		  
		  }).catch(err => {
			Alert.alert("Thông báo", "Không tồn tại coupon");
                   
		})
  }
  _save = () => {
	  
	  if(this.state.name == '' || this.state.name == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập tên");
		  return
	  }
	  if(this.state.phone == '' || this.state.phone == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập số điện thoại");
		  return
	  }
	  if(this.state.address == '' || this.state.address == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập địa chỉ");
		  return
	  }
	  const { username, password, name, email, address, phone, city, district } = this.state
	  let products = []
	  for(let i = 0; i < this.state.products.length; i++){
		  let p = this.state.products[i];
		  products.push({
			  product_id:p.product.id,product_name:p.product.title,quantity:p.value,price: (this.state.user != null && p.product.price_when_login != null) ?  p.product.price_when_login : p.product.price
			  
		  })
	  }
	  let vat = {company:this.state.company,tax_code:this.state.vatCompany,address:this.state.addressCompany}
	  let total = parseFloat(((this.state.all_ + this.state.shipCost + this.state.codMoney)-((this.state.all_ + this.state.shipCost + this.state.codMoney) * this.state.price_reduced)/100) + parseFloat(parseFloat(((this.state.all_ + this.state.shipCost + this.state.codMoney)-((this.state.all_ + this.state.shipCost + this.state.codMoney) * this.state.price_reduced)/100))*parseFloat(this.state.amountVat)/100))
		let vat_ = parseFloat(parseFloat(((this.state.all_ + this.state.shipCost + this.state.codMoney)-((this.state.all_ + this.state.shipCost + this.state.codMoney) * this.state.price_reduced)/100))*parseFloat(this.state.amountVat)/100)
	 let order = {
		  user_id:(this.state.user_info) ? this.state.user_info.id : '',
		  name:this.state.name,
		  email:this.state.email,
		  address:this.state.address,
		  phone:this.state.phone,
		  total_price:total,
		  total_order_price:total,
		  vat:(this.state.vat) ? 1 : 0,
		  status:1,
		  total_vat:(this.state.vat) ? vat_ : 0,
		  ship_cod:0,
		  shipping_fee:0,
		  reduced_price:parseFloat(((this.state.all_ + this.state.shipCost + this.state.codMoney) * this.state.price_reduced)/100),
		  use_coupon_code:parseFloat(((this.state.all_ + this.state.shipCost + this.state.codMoney) * this.state.price_reduced)/100),
		  payment_method: this.state.pay,
		  shipping_method:'',
		  }
		
			
			 apis.order(products, order, vat)
                .then(res => {
					
					
                   
                        
                        
                       this.props.dispatch(ActionCart.set_cart([]))
                
						this.props.navigation.navigate('Checkoutcomplete')

					
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                    return alert('Có lỗi trong quá trình sử lý')
                })

				
				
			
		
	  
  }
  componentDidMount() {
	let ps = this.state.products
	let total = 0
	for(let i = 0; i < this.state.products.length; i++){
		let price = (this.state.user != null && ps[i].product.price_when_login) ? ps[i].product.price_when_login : ps[i].product.price
		total = total + ps[i].value*ps[i].product.price
	}
	let all_ = total + this.state.shipCost
       this.setState({
				total_:total,
				all_:all_
		})
    }
	_plus(id) {
		let value = this.state.products
			value[id].value = parseInt(value[id].value) + 1;
			this.setState({
				products:value
			})
		let cannang = 0;
	let products = this.state.products
	
	for(let i = 0; i < products.length; i++){
		
		let p = this.state.products[i];
		let value = p.value
		
		if(p.product.data_weight != null){
		let cn = p.product.data_weight
		cannang = cannang + cn.weight*p.value
		}
	}
	this.setState({
		cannang: cannang
	});
	if(this.state.khoangcach != 0){
	let shipCost = (this.state.cannang + this.state.khoangcach)*this.state.heso_
	this.setState({
				shipCost:shipCost,

		})
	}
	let ps = this.state.products
	let total = 0
	for(let i = 0; i < this.state.products.length; i++){
		let price = (this.state.user != null && ps[i].product.price_when_login) ? ps[i].product.price_when_login : ps[i].product.price
		total = total + ps[i].value*ps[i].product.price
	}
       let all_ = total
       this.setState({
				total_:total,
				all_:all_
		})
		
    }
	_delete(id) {
	 let products = this.state.products
	 products.splice(id, 1);
	 let total = 0
	 for(let i = 0; i < products.length; i++){
		let price = (this.state.user != null && ps[i].product.price_when_login) ? ps[i].product.price_when_login : ps[i].product.price
		total = total + ps[i].value*ps[i].product.price
	}
       let all_ = total
       this.setState({
				total_:total,
				all_:all_
		})
 
	 this.setState({
				products:products
			})
			
	this.props.dispatch(ActionCart.set_cart(products))
 }
  _minus(id) {
	  let value = this.state.products
		if(value[id].value > 1){
			value[id].value = parseInt(value[id].value) - 1;
			this.setState({
				products:value
			})
		}
		let cannang = 0;
		let products = this.state.products
	
		for(let i = 0; i < products.length; i++){
		
		let p = this.state.products[i];
		let value = p.value
		
		if(p.product.data_weight != null){
		let cn = p.product.data_weight
		cannang = cannang + cn.weight*p.value
		}
		}
		this.setState({
		cannang: cannang
		});
		if(this.state.khoangcach != 0){
	let shipCost = (this.state.cannang + this.state.khoangcach)*this.state.heso_
	this.setState({
				shipCost:shipCost,

		})
	}
		let ps = this.state.products
		let total = 0
		for(let i = 0; i < this.state.products.length; i++){
		let price = (this.state.user != null && ps[i].product.price_when_login) ? ps[i].product.price_when_login : ps[i].product.price
		total = total + ps[i].value*ps[i].product.price
	}
       let all_ = total + this.state.shipCost
       this.setState({
				total_:total,
				all_:all_
		})
    }
	payClick(id) {
		if(id == 'Thanh toán chuyển khoản'){
			this.setState({
		  codMoney: 0
		})
		}else{
			let total = ((this.state.all_ + this.state.shipCost + this.state.codMoney)-((this.state.all_ + this.state.shipCost + this.state.codMoney) * this.state.price_reduced)/100)
			let cod = 15000
			if(total > 3000000){
				let cod = parseFloat(total)*0.8/100;
			}
			this.setState({
			  codMoney: cod
			})
		}
		 this.setState({
		  pay: id
		})
	 }
	 payShip(id) {
		 this.setState({
		  ship: id, shipCost: this.state.ships[id].attributes.shippingCost
		})
	 }
	changeLayoutVat = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	
    this.setState({ vat: !this.state.vat, amountVat: 10 }); 
    if(this.state.vat){
    	this.setState({ amountVat: 0 }); 
    }
  } 
  changeLayoutOne = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedOne: !this.state.expandedOne }); 
  }
  changeLayoutTow = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedTow: !this.state.expandedTow }); 
  }
  changeLayoutThree = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedThree: !this.state.expandedThree }); 
  }
  changeLayoutFour = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedFour: !this.state.expandedFour });
  }
  render() {
    const { username, password, name, email, address, phone, city, district, coupon, company, vatCompany, addressCompany } = this.state
    const pays = [{
			id: 0,
			text: 'Thanh toán chuyển khoản'
		},
		{
			id: 1,
			text: 'Nhận hàng và thanh toán'
		}
	];
    return (
      <View style={styles.wrapper}>
      		<StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
          	
			  <Header navigation={this.props.navigation} />
                  <ScrollView 
                      contentInsetAdjustmentBehavior="automatic"
                     style={styles.scrollview_section}>
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutOne} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faExclamationCircle } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#5ab9f5'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Thông tin giao hàng</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedOne ? null : 0, overflow: 'hidden', }}>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Tên</Text></View>
                                                                              <View><TextInput 
																			  style={styles.fill} 
																			  placeholder = 'Điền tên'
																			  placeholderTextColor="#797979"
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(name) => this.setState({ name })}
																				value={name}
																			  /></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Số điện thoại</Text></View>
                                                                              <View>
																			  <TextInput 
																			  style={styles.fill} 
																			  placeholder = 'Điền số điện thoại'
																			  placeholderTextColor="#797979"
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(phone) => this.setState({ phone })}
																				value={phone}
																			  /></View>
                                                                        </View>
                                                                        
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={[styles.centertext]}><Text style={styles.extext}>Địa chỉ cụ thể</Text></View>
                                                                              <View><View>
																					
																					  <TextInput 
																			  style={[styles.fill]}
																			  placeholder = 'Nhập địa chỉ cụ thể'
																			  placeholderTextColor="#797979"
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(address) => {
																					
																					
																					this.setState({ address })
																					apis.getRange(address).then(res => {
																						
																						this.setState({
																							khoangcach: res.data.range,
																							shipCost: shipCost,
																							heso_: res.data.heso,
																							
																						})	
																						let shipCost = (this.state.cannang + res.data.range)*this.state.heso_	
																					})
																				}}
																				value={address}
																			  />
																					 
																					</View></View>
                                                                        </View>
                                                                  </View>
                                                      </View>
                                                    </View>
                                                    
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutThree} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faCommentDollar } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#5ab9f5'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Hình thức thanh toán</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedThree ? null : 0, overflow: 'hidden', }}>
                                                                        {
			pays.map((val) => {
				return (
					<View style={ [styles.formGroup, {height: 40, position: 'relative'}] }>
					<TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.text} onPress={this.payClick.bind(this, val.text)}>
					<View style={{
					  height: 20,
					  width: 20,
					  borderRadius: 10,
					  borderWidth: 1,
					  borderColor: '#757F8C',
					  alignItems: 'center',
					  justifyContent: 'center',
					  position: 'absolute',
					  bottom: 7,
					  left: 10
					}}>
					  {
						val.text == this.state.pay ?
						  <View style={{
							height: 14,
							width: 14,
							borderRadius: 7,
							backgroundColor: '#5ab9f5',
						  }} />
						  : null
					  }
					</View>
					<Text style={[styles.title, {color: '#757F8C', fontSize: 14, bottom: -2, left: 40}]}>
						{val.text}
					</Text>
				  </TouchableOpacity>
				  
				
				  </View>
				)
			  })
			}
                                                                  </View>
                                                      </View>
                                                    </View>
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutFour} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faCommentDollar } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#5ab9f5'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Thông tin chuyển khoản</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedFour ? null : 0, overflow: 'hidden', }}>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Tên ngân hàng</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>Viecombank</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Chi nhánh</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>Phố Hiến - Hưng Yên</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Tên chủ tài khoản</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>Công Nghệ Hợp Long</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Số tài khoản</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>1021000006868</Text></View>
                                                                        </View>
																		<View style={{height:10, backgroundColor:'#ddd', width: width}}></View>
																		<View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Tên ngân hàng</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>Viecombank</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Chi nhánh</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>Nam Hà Nội</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Tên chủ tài khoản</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>LƯƠNG HOÀNG NGỌC</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Số tài khoản</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>21310000888368</Text></View>
                                                                        </View>
                                                                  </View>
                                                      </View>
                                                    </View>
                                                    
														{
				this.state.products.map((val, index) => {
						

				return(
									<View style={styles.cart_box}>
		              		<View style={styles.cart_item_image}>
		              				<Image 
									 source={{uri: 'https://hoplongtech.com/' + val.product.cover_image,width: (width)*0.3, height: (width)*0.3}}/>
		              		</View>
		              		<View style={styles.cart_item_title}>
		              			<Text style={styles.item_title}>{val.product.title}</Text>
		                          <View style={styles.item_rate}>
		                              <Image
		                                source={require('./images/rated_star.png')}
		                              />
		                              <Image
		                                source={require('./images/rated_star.png')}
		                              />
		                              <Image
		                                source={require('./images/rated_star.png')}
		                              />
		                              <Image
		                                source={require('./images/rated_star.png')}
		                              />
		                              <Image
		                                source={require('./images/unrated_star.png')}
		                              />
		                          </View>
                          		{ 
							  (this.state.user != null && val.product.price_when_login != null) ? 
								<Text style={styles.item_price}>{(parseFloat(val.product.price_when_login).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
								
								:
								<Text style={styles.item_price}>{(val.product.price != null) ? (parseFloat(val.product.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0] : ''} VNĐ</Text>
						  
						  }
		              		</View>
		              	<View style={styles.cart_item_quantity}>
		              		<TouchableOpacity style={[styles.minus,{marginTop:2}]} key={index} onPress={this._minus.bind(this, index)}>
	                            <Image
	                            	style={{height:25,width:25,}}
	                                source={require('./images/minus.png')}
	                            />
	                        </TouchableOpacity>
		                       <View style={styles.quantity}>
		                          			<TextInput
										      style={{ height: 20, borderColor: 'gray',color:'#000000' }}
										      placeholderTextColor="#797979" 
										      keyboardType = 'numeric'
										      onChangeText={(value) => { let products = this.state.products

										      	products[index].value = value

										      	this.setState({ products: products })
										      	let cannang = 0;
	products = this.state.products
	products[index].value = parseInt(products[index].value)
	for(let i = 0; i < products.length; i++){
		
		let p = this.state.products[i];
		let value = p.value
		
		if(p.product.data_weight != null){
		let cn = p.product.data_weight
		cannang = cannang + cn.weight*p.value
		}
	}
	this.setState({
		cannang: cannang
	});
	if(this.state.khoangcach != 0){
	let shipCost = (this.state.cannang + this.state.khoangcach)*this.state.heso_
	this.setState({
				shipCost:shipCost,

		})
	}
	let ps = this.state.products
	let total = 0
	for(let i = 0; i < this.state.products.length; i++){
		let price = (this.state.user != null && ps[i].product.price_when_login) ? ps[i].product.price_when_login : ps[i].product.price
		total = total + ps[i].value*ps[i].product.price
	}
       let all_ = total
       this.setState({
				total_:total,
				all_:all_
		})
										      }}
										      value={String(val.value)}
										    />
		                        </View>
	                        <TouchableOpacity sstyle={[styles.plus,{marginTop:2}]} key={index} onPress={this._plus.bind(this, index)}>
	                            <Image
	                            	style={{height:25,width:25,}}
	                                source={require('./images/plus.png')}
	                            />
	                        </TouchableOpacity>
		              </View>
		              	<View style={styles.exit}>
		              		<TouchableOpacity style={styles.exit_icon} onPress={this._delete.bind(this, index)}>
	                            <Image
	                                source={require('./images/exit.png')}
	                            />
	                        </TouchableOpacity>
		              	</View>
		            </View>
														)
  })}
  <CheckBox
  title='Lấy hóa đơn VAT'
  checked={this.state.vat}
  onPress={this.changeLayoutVat}
  right={true}
  containerStyle={{backgroundColor: null}}
/>
<View style={{ height: this.state.vat ? null : 0, overflow: 'hidden', }}>
															<View style={{backgroundColor: '#fff'}}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                         
                                                                          <Text style={[styles.s1text, {position: 'absolute',top: 0, left: -10}]}>Thông tin viết hóa đơn</Text>
                                                                    </View>
                                                                  </View>
                                                                       
                                                                        <View style={[styles.expand,styles.container, {backgroundColor: '#fff'}]}>
                                                                              
                                                                              <View><View>
																					
																					  <TextInput 
																			  style={[styles.fill, {width: width, marginLeft: 5}]}
																			  placeholder = 'Nhập tên công ty'
																			  placeholderTextColor="#2f3657"
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(company) => {
																					
																					
																					this.setState({ company })
																					
																				}}
																				value={company}
																			  />
																					 
																					</View></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container, {backgroundColor: '#fff'}]}>
                                                                              
                                                                              <View><View>
																					
																					  <TextInput 
																			  style={[styles.fill, {width: width, marginLeft: 5}]}
																			  placeholder = 'Nhập địa chỉ xuất hoá đơn'
																			  placeholderTextColor="#2f3657"
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(addressCompany) => {
																					
																					
																					this.setState({ addressCompany })
																					
																				}}
																				value={addressCompany}
																			  />
																					 
																					</View></View>
                                                                        </View>
																		<View style={[styles.expand,styles.container, {backgroundColor: '#fff'}]}>
                                                                              
                                                                              <View><View>
																					
																					  <TextInput 
																			  style={[styles.fill, {width: width, marginLeft: 5}]}
																			  placeholder = 'Nhập mã số thuế'
																			  placeholderTextColor="#2f3657"
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(vatCompany) => {
																					
																					
																					this.setState({ vatCompany })
																					
																				}}
																				value={vatCompany}
																			  />
																					 
																					</View></View>
                                                                        </View>
                                                                  </View>
                                                    
                                                    <View style={styles.section3}>
                                                        <View style={styles.container}>
                                                              <Text style={styles.servicestext}>Tổng tiền</Text>
                                                              <Text style={styles.services}>{parseFloat(this.state.total_).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
                                                        <View style={[styles.container,styles.margin12]}>
                                                              <Text style={styles.servicestext}>Phí vận chuyển</Text>
                                                              <Text style={styles.services}>{parseFloat(this.state.shipCost).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
														 <View style={[styles.container,styles.margin12]}>
                                                              <Text style={styles.servicestext}>COD</Text>
                                                              <Text style={styles.services}>{parseFloat(this.state.codMoney).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
														<View style={[styles.container,styles.margin12]}>
                                                              <Text style={styles.servicestext}>VAT</Text>
                                                              <Text style={styles.services}>{parseFloat(parseFloat(((this.state.all_ + this.state.shipCost + this.state.codMoney)-((this.state.all_ + this.state.shipCost + this.state.codMoney) * this.state.price_reduced)/100))*parseFloat(this.state.amountVat)/100).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
														<View style={[styles.container,styles.margin12]}>
                                                              <Text style={styles.converttext}>Giảm</Text>
                                                              <Text style={styles.convert}>{parseFloat(((this.state.all_ + this.state.shipCost + this.state.codMoney) * this.state.price_reduced)/100).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
                                                        </View>
														
                                                        
													<View style={{width: '100%', position: 'relative'}}>
											<TouchableOpacity activeOpacity={0.8} onPress={this._couponClose} style={[{paddingLeft:8, paddingRight: 8, paddingTop: 8,paddingBottom: 8,position: 'absolute', left: 19, textAlign: 'center', backgroundColor: '#ddd', borderRadius: 10,top: 5, zIndex: 100}]}>
                                                                    
                                                                         <FontAwesomeIcon icon={ faTimes } size={15} color={'#fff'} />
                                                                          
                                                                   
                                                                  </TouchableOpacity>
											  <Input
												  placeholder='Nhập mã giảm giá'
												  placeholderTextColor="#797979" 
												  inputStyle={{fontSize:13,fontStyle:'italic',color:'#000000',borderBottomWidth:0}}
												  inputContainerStyle={[globalStyles.inputStyle, {paddingLeft: 50,borderBottomWidth:0}]}
												  onChangeText={(coupon) => this.setState({ coupon })}
												value={coupon}
											  />
											<TouchableOpacity activeOpacity={0.8} onPress={this._coupon} style={[{paddingLeft: 20, paddingRight: 20, paddingTop: 8,paddingBottom: 8,position: 'absolute', right: 23, textAlign: 'center', backgroundColor: '#5ab9f5', borderRadius: 10,top: 5}]}>
                                                                    
                                                 <Text style={{color:'#fff',fontWeight:'bold'}}><FontAwesomeIcon icon={ faCheck } size={15} color={'#fff'} /> Áp dụng</Text>
                                                                          
                                                                   
                                             </TouchableOpacity>
											
										  </View>
										  <View style={styles.section3}>
											<View style={[styles.container,styles.margin12]}>
                                                              <Text style={[styles.converttext, {fontWeight: 'bold'}]}>Thành tiền</Text>
                                                              <Text style={[styles.convert, {fontWeight: 'bold', color: 'red'}]}>{parseFloat(((this.state.all_ + this.state.shipCost + this.state.codMoney)-((this.state.all_ + this.state.shipCost + this.state.codMoney) * this.state.price_reduced)/100) + parseFloat(parseFloat(((this.state.all_ + this.state.shipCost + this.state.codMoney)-((this.state.all_ + this.state.shipCost + this.state.codMoney) * this.state.price_reduced)/100))*parseFloat(this.state.amountVat)/100)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View> 
                                                    </View>
													
                                                    <View style={[styles.sectionbutton,styles.container, {marginBottom: 200}]}>
                                                        
                                                              <TouchableOpacity style={styles.Cpay} onPress={this._save}>
                                                                    <Text style={{fontSize:20,fontWeight:'bold',}}>Thanh toán</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{marginTop:200,}}></View>
                  </ScrollView>
				  
           
			  <Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
	cart_box:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginLeft:15,
	    marginRight:15,
	    backgroundColor:'#fff',
	    shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
		marginBottom:10,
		marginTop:10,
  	},
  	item_title:{
      marginLeft:15,
      marginTop:15,
	  fontSize: 13,
      textTransform: 'uppercase',
      color:'#0f1738',
    },
    item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    cart_item_image:{
    	width:(width-30)*0.35,
    	alignItems:'center',
    	justifyContent:'center',
    },
    cart_item_title:{
    	width:(width-30)*0.35,
    },
    cart_item_quantity:{
      flexDirection:'row',
      flexWrap:'wrap',
      position: 'absolute',
      right:10,
      bottom:10,
      zIndex:1000,
  	},
	 quantity:{
	    alignItems:'center',
	    justifyContent:'center',
	    marginLeft:8,
	    marginRight:8,
	},
	exit:{
		position: 'absolute',
      	right:10,
      	top:10,
	},
  container:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  section1: {
    marginTop:15,
  },
  s1text:{
	  fontSize: 16,
    marginLeft:10,
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
  btnTextHolder: {
    backgroundColor:'#fff',
   
   
  },
  Btn: {
    marginLeft:16,
    marginRight:16,
    backgroundColor: '#fff',
  },
  expand:{
    borderTopWidth:1,
    borderColor:'#e9edf2',
  },
  btnText: {
    marginLeft:7,
    color: '#2f3657',
    marginTop:7,
    marginBottom:7,
  },
  fill:{
	height: 40,
    width:width*0.60,
    marginLeft: 10,
	fontSize: 13,
	color:'#000'
  },
  extext:{
	fontSize: 16,
    marginLeft:8,
    width:width*0.35,
    color:'#909090',
  },
  tranfertext:{
    marginLeft:8,
    color:'#909090',
    marginTop:7,
    marginBottom:7,
  },
  infotext:{
    marginLeft:8,
    color:'#909090',
    marginTop:7,
    width:width*0.4,
    marginBottom:7,
  },
  userinfotext:{
    marginLeft:8,
    color:'#5ab9f5',
    marginTop:7,
    width:width*0.4,
    marginBottom:7,
    textAlign:'right',
  },
  centertext:{
    justifyContent: 'center',
  },
  section2:{
    marginLeft:16,
    marginRight:16,
    marginTop:15,
    backgroundColor:'#fff',
    borderRadius:10,
  },
  payitem:{
    width:width*0.4,
  },
  payiteminfo:{
    width:width*0.5,
  },
  payitemimage:{
    width:width*0.4,
    height:width*0.4,
  },
  pinfotext1:{
    marginLeft:9,
    color:'#2f3657',
    marginTop:10,
    fontSize:15,
  },
  pinfotext2:{
    marginLeft:9,
    marginTop:8,
    color:'#5ab9f5',
    fontSize:17,
  },
  pamount:{
    width:width*0.07,
    backgroundColor:'#ffc0a8',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.07,
    marginTop:4,
  },
  patext:{
    width:width*0.10,
    color: '#2f3657',
    alignItems: 'center',
    fontWeight: '600',
  },
  pmiddletext:{
    color: '#2f3657',
    fontSize: 20,
    fontWeight:'bold',
  },
  floatbot:{
    justifyContent: 'flex-end',
    marginBottom:9,
    marginLeft:8,
  },
  delete:{
    width:width*0.15,
    alignItems: 'flex-end',
  },
  wrapper:{
		flex: 1
	},
  deletetext:{
    color:'#2f3657',
  },
  section3:{
    marginLeft:16,
    marginRight:16,
    marginTop:15,
  },
  servicestext:{
    width:width*0.4,
    color:'#2f3657',
    fontSize:15, 
  },
  services:{
    width:width*0.5,
    textAlign:'right',
    color:'#5ab9f5',
    fontSize:17,
  },
  margin12:{
    marginTop:12,
  },
  scrollview_section:{
		height: height - 65
	},
    
  converttext:{
    width:width*0.4,
    color:'#2f3657',
    fontSize:15, 
  },
  blockDivider: {
        position:'relative',

    },
    textDivider:{
       padding:10,
        textTransform:'uppercase',
        position:'absolute',
        zIndex:5,
        top:50,
        textAlign:'center',
        color:'#a0a0a0',
        backgroundColor:'#f2f2f2',
    },
    lineDivider:{
        backgroundColor:'#e3e3e3',
        height:1,
        marginTop:70,
        marginBottom:80,
    },
  convert:{
    width:width*0.5,
    textAlign:'right',
    color:'#5ab9f5',
    fontSize:19,
  },
  sectionbutton:{
      backgroundColor:'#5ab9f5',
      marginTop:15,
    },
    Cmess:{
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:15,
      
    },
    Cpay:{
    backgroundColor: '#ffc400',
    width:width*0.76,
	
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:7,
    marginBottom:7,
    marginLeft:width*0.12,
    height:width*0.1,
  },
});
export default connect(mapStateToProps)(Pay)