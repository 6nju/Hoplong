import React from 'react';
import { StyleSheet, Text,Alert, View, ActivityIndicator, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import Icon from 'react-native-vector-icons/Ionicons'
import WebView from 'react-native-webview';
import { connect } from 'react-redux'
import LoadingCircular from './components/Loading';
import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class Detail extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      sonCategories: [],
      related: [],
      product: this.props.navigation.state.params.product,
      onWebViewMessage:0,
      firsst:0,
      type:0,
      value:1,
      progess:true,
      link:'',
      cart: (this.props.cart) ? this.props.cart : [], 
      navigation: this.props.navigation,
    };
	
  }
  
	  componentDidMount() {
		this.getData();
	  }
  componentDidMount  () {
	
    this.getData();
  }
  getData() {
	this.setState({
		sonCategories: [],
		  related: [],
		  product: this.props.navigation.state.params.product,
		  onWebViewMessage:0,
		  firsst:0,
		  type:0,
		  value:1,
		  progess:true,
		  link:'',
	})
	
   let id = (this.props.navigation.state.params.product.product_id != null) ? this.props.navigation.state.params.product.product_id : this.props.navigation.state.params.product.id
	
	apis.getProduct(id).then(res => {
			let product = res.data.product
			product.data_weight = res.data.data_weight
			this.setState({
				product: product,
				related: (res.data.related) ? res.data.related.data : [],
				link: res.data.link,
			})	
			
	})
  }
   componentDidMount  () {
	
    this.getData();
  }
  _document = () => {
	  this.props.navigation.navigate('Document', {product: this.state.product})
  }
  _minus = () => {
		let value = this.state.value
		if(this.state.value > 1){
			value = parseInt(value) - 1;
			this.setState({
				value:value
			})
		}
	}
	_plus = () => {
		
		let value = this.state.value
		
			value = parseInt(value) + 1;
			this.setState({
				value:value
			})
		
	}
	_add = () => {
		
		let product = []
		let key = 0;
		if(typeof this.state.cart == 'undefined' || this.state.cart.length == 0){
			product = []
			product.push({product: this.state.product, value: this.state.value})	
			
		}else{
			product = this.state.cart
			
			for(let i = 0; i < product.length; i++){
				if(product[i].product.id == this.state.product.id){
					key = 1;
				}
			}
			if(key == 0){
			product.push({product: this.state.product, value: this.state.value})	
			}
		}
		Alert.alert("Thông báo", "Đã thêm sản phẩm vào giỏ hàng");
		this.props.dispatch(ActionCart.set_cart(product))
		this.props.navigation.navigate('List')
	}
	onWebViewMessage = (event: WebViewMessageEvent) => {
		if(Number(event.nativeEvent.data) > 20){
		this.setState({webViewHeight: Number(event.nativeEvent.data), progess:false})
		}
		
	  }
  render() {
    const {goBack, progess, value} = this.props.navigation;
	
	

    return (
      <View style={styles.wrapper}>
          <StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          />
		  {
			  (this.state.progess) ? <View style={{width: width, height: height, top:0, left: 0, zIndex: 1000, background: 'red', justifyContent: 'center'}}>
				<LoadingCircular />
				</View>: null
		  }
         <Header navigation={this.props.navigation} />
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollview_section}>
              
              
             
			  <WebView
		style={{ height: this.state.webViewHeight, backgroundColor: '#f5f5f5' }}
		onMessage={this.onWebViewMessage}
          
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

         source={{ uri: this.state.link }} />


		              		<TouchableOpacity style={[styles.minus, {position: 'absolute', top: 450, right: 117}]} onPress={this._minus}>
	                            <Image
                                style={{width:25,height:25,}}
	                                source={require('./images/minus.png')}
	                            />
	                        </TouchableOpacity>
		                       
                            <View style={[styles.quantity, {position: 'absolute', top: 455, right: 85}]}>
                                    <TextInput
                                      style={{ height: 20, borderColor: 'gray',color:'#000000' }}
                                      placeholderTextColor="#797979" 
                                      keyboardType = 'numeric'
                                      onChangeText={(value) => { 

                                        this.setState({ value: value })}}
                                      value={String(this.state.value)}
                                    />
                            </View>
	                        <TouchableOpacity style={[styles.plus, {position: 'absolute', top: 450, right: 50}]} onPress={this._plus}>
	                            <Image
                                style={{width:25,height:25,}}
	                                source={require('./images/plus.png')}
	                            />
	                        </TouchableOpacity>
							{
								(this.state.product.document != '') ? 
							<TouchableOpacity style={[styles.plus, {position: 'absolute', top: 600, right: 10}]} onPress={this._document}>
	                            <Image
	                                source={require('./images/download.png')}
	                            />
	                        </TouchableOpacity> : null
							}
		             
              <Text style={styles.item_h2}>Sản phẩm liên quan</Text>
              <ScrollView 
                         horizontal={true}
                         showsHorizontalScrollIndicator={false}
                        
						 
                  > 
				  { (this.state.related.length) ?
				  <View  style={[styles.similar_image_mg, { flexDirection:'row',flexWrap:'wrap'}]}>
				  {
									this.state.related.map((val, index_) => {
										
										return (
						<TouchableOpacity style={styles.item_ymn} onPress={() => {
							this.setState({
								progess: true,
							})
							apis.getProduct(val.id).then(res => {
			
								this.setState({
									
									
									progess: false,
									product: res.data.product,
									related: (res.data.related) ? res.data.related.data : [],
									link: res.data.link,
								})	
									
							})
						}} >
                     
                          <View style={styles.ymn_image}>
                              <Image 
												 source={{uri: 'https://hoplongtech.com/' + val.cover_image,width: (width-10)*0.35, height: (width-10)*0.35}}/>
                          </View>
                          <Text style={styles.ymn_title}>{val.title}</Text>
                          
						  { 
							  (val.price && val.price_when_login) ? 
								<Text style={styles.ymn_price}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
								
								:
								<Text style={styles.ymn_price}></Text>
						  
						  }
                          
                      </TouchableOpacity>
                      )
									})
				  }
				  </View> : null
				  }
                  </ScrollView>
          </ScrollView>
                <View style={styles.bottom_button}>
                        <TouchableOpacity style={styles.leftbutton} onPress={this._add}>
                              <Text style={styles.lefttext}>Thêm giỏ hàng</Text>
                        </TouchableOpacity>
                         <TouchableOpacity style={styles.rightbutton} onPress={() => this.props.navigation.navigate('Pay', {products : [{product: this.state.product, value: this.state.value}]})}>
                              <Text style={styles.righttext}>Mua ngay</Text>
                        </TouchableOpacity>
                </View>
          <View style={styles.navbar}>
                      <TouchableOpacity style={styles.width25} onPress={() =>this.props.navigation.navigate('Home')}>
                          <View>
                              <Icon name={'ios-home'} size={20} color='#797979' />
                          </View>
                          <Text style={styles.bottom1}>Home</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.width25} onPress={() =>this.props.navigation.navigate('Cart')}>
                          <View>
                              <Icon name={'ios-cart'} size={20} color='#797979' />
                          </View>
                          <Text style={styles.bottom1}>Giỏ hàng</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.width25} onPress={() =>this.props.navigation.navigate('Category', {categoryId: 0})}>
                          <View>
                              <Icon name={'md-apps'} size={20} color='#797979' />
                          </View>
                          <Text style={styles.bottom1}>Danh mục</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.width25} onPress={() =>this.props.navigation.navigate(this.state.action)}>
                          <View>
                              <Icon name={'md-person'} size={20} color='#797979' />
                          </View>
                          <Text style={styles.bottom1}>Tài khoản</Text>
                      </TouchableOpacity>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
  },
  navbar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
	zIndex: 1000,
    borderColor: '#e6e6e6',
    backgroundColor: '#f8f8f8',
	flex: 1,
        flexDirection: 'row',
  },
    navbarContent: {
        flex: 1,
        flexDirection: 'row',
    },
  navicon: {
    alignItems: 'center',
    width: '25%',
    paddingTop: 5,
    paddingBottom: 10,
    position: 'relative',
  },
  bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:20,
  },
  width25:{
    width:width*0.25,
    alignItems:'center',
    marginTop:5,
  },
  scrollview_section:{
    backgroundColor:'#EAEAEA',
  },
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
  header_section:{
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'#fff',
    paddingTop:5,
    paddingBottom:5,
  },
  header_left:{
    alignItems:'center',
    width:width*0.1,
  },
  header_right:{
    alignItems:'flex-start',
    width:width*0.1,
  },
  header_middle:{
    width:width*0.7,
  },
  item_slide_wrapper:{
      height:height*0.68,
  },
  slide1:{
    width:width-15,
  },
  slide_wrapper:{
    paddingLeft:7,
    paddingRight:7,
    paddingTop:5,
  },
  item_info_section:{
    marginLeft:15,
  },  
  item_title:{
      
      textTransform: 'uppercase',
      color:'#0f1738',
      fontSize:18,
  },
  item_price:{
     
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
      fontSize:16,
  },
  item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
     
      marginTop:10,
  },
  item_quantity:{
      flexDirection:'row',
      flexWrap:'wrap',
      position: 'absolute',
      right:10,
      bottom:10,
  },
  quantity:{
    alignItems:'center',
    justifyContent:'center',
    marginLeft:8,
    marginRight:8,
  },
  item_code:{
    justifyContent:'center',
    backgroundColor:'#FFC400',
    height:45,
  },
  item_code_download:{
    position: 'absolute',
    right:10,
  },
  code:{
    marginLeft:20,
    fontSize:14,
    color:'#0F1738',
    fontWeight:'normal',
  },
  item_h1:{
    paddingLeft:15,
    fontSize:15,
    fontWeight:'700',
    backgroundColor:'#DDDDDD',
    color:'#0F1738',
    paddingTop:10,
    paddingBottom:10,
  },
  item_p1:{
    paddingLeft:20,
    paddingRight:20,
    color:'#707070',
    marginTop:25,
    marginBottom:25,
  },
  red:{
    color:'#DB0D0D'
  },
  green:{
    color:'#079D1E',
  },
  similar_item:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#dddddd'
  },
  si_left:{
    width:width*0.3,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:15,
    paddingRight:15,
  },
  si_item_title:{
    fontSize:14,
  },
  si_center:{
    width:width*0.35,
  },
  si_right:{
    width:width*0.35,
    paddingRight:7,
    paddingLeft:7,
  },
  cart_button:{
    borderWidth:1,
    borderColor:'#3191cf',
    backgroundColor:'#d0ecff',
    borderRadius:20,
    paddingTop:5,
    paddingBottom:5,
    alignItems:'center',
    marginTop:5,
  },
  buynow_button:{
    borderWidth:1,
    borderColor:'#ffc400',
    backgroundColor:'#ffc400',
    borderRadius:20,
    paddingTop:7,
    paddingBottom:7,
    alignItems:'center',
    marginTop:5,
  },
  bn_text:{
    color:'#fff',
    fontSize:16,
  },
  item_technical:{
    paddingLeft:15,
    paddingRight:15,
    marginTop:10,
    marginBottom:10,
  },
  t_text:{
    color:'#8d8d8d'
  },
  language:{
    width:112,
    height:32,
    borderWidth:1,
    borderColor:'#3191cf',
    backgroundColor:'#d0ecff',
    borderRadius:20,
    paddingTop:5,
    paddingBottom:5,
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
    marginLeft:15,
  },
  similar_image_mg:{
    marginTop:15,
    marginLeft:10,
    marginBottom:15,
  },
  similar_image:{
    marginLeft:10,
    width:width*0.35,
    alignItems:'center',
  },
  discuss:{
    alignItems:'center',
    paddingBottom:50,
  },
  discuss_rate:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:25,
  },
  mgl_15:{
    marginLeft:15,
  },
  rate_text:{
    color:'#ffc711',
    fontSize:17,
    marginTop:20,
  },
  textArea:{
    borderColor:'#e6e6e6',
    borderWidth:1,
    backgroundColor:'#fff',
  },
  textAreaContainer:{
    marginTop:15,
    width:width-30,
  },
  send_box:{
    alignItems:'center',
    backgroundColor:'#3191cf',
    width:50,
    borderRadius:25,
    paddingTop:5,
    paddingBottom:5,
    position:'absolute',
    right:15,
    marginTop:10,
    bottom:10,
  },
  send:{
    color:'#fff',
  },
  item_h2:{
    paddingLeft:15,
    fontSize:15,
    fontWeight:'700',
    backgroundColor:'#3191cf',
    color:'#fff',
    paddingTop:10,
    paddingBottom:10,
  },
  item_ymn:{
    width:width*0.35,
    borderColor:'#ececec',
    borderWidth:1,
    backgroundColor:'#fff',
    marginLeft:10,
    marginBottom:40,
  },
  ymn_image:{
    alignItems:'center',
  },
  ymn_fit:{
    width:(width-10)*0.35,
  },
  ymn_title:{
    marginLeft:15,
    textTransform: 'uppercase',
    color:'#0f1738',
  },
  ymn_price:{
    marginLeft:15,
    textTransform: 'uppercase',
    color:'#0c6dac',
    marginTop:8,
    marginBottom:10,
  },
  ymn_rate:{
    flexDirection:'row',
    flexWrap: 'wrap',
    marginLeft:15,
    marginTop:6,
  },
  bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    height:90,
  },
  width25:{
    width:width*0.25,
    alignItems:'center',
    marginTop:5,
  },
  
  bottom_button:{
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'#3191cf',
    marginBottom:53,
    width:width,
  },
  leftbutton:{
    width:(width-40)*0.5,
    alignItems:'center',
    backgroundColor:'#d0ecff',
    marginLeft:15,
    marginRight:5,
    marginRight:5,
    paddingTop:6,
    paddingBottom:6,
    marginTop:10,
    marginBottom:10,
    borderRadius:25,
  },
  lefttext:{
    color:'#0f1738',
    textTransform: 'uppercase',
  },
  righttext:{
    color:'#0f1738',
    textTransform: 'uppercase',
  },
  rightbutton:{
    width:(width-40)*0.5,
    alignItems:'center',
    backgroundColor:'#ffc400',
    marginLeft:5,
    paddingTop:6,
    paddingBottom:6,
    right:15,
    position: 'absolute',
    marginTop:10,
    marginBottom:10,
    borderRadius:25,
  },
});
export default connect(mapStateToProps)(Detail)