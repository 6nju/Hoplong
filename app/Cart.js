import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import { connect } from 'react-redux'
import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class Cart extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            products: (this.props.cart == null) ? [] : this.props.cart,
			 user: this.props.user_login,
        }
		
		if(typeof this.state.products == 'undefined'){
			this.setState({products: []})
		}
	}
	_plus(id) {
		
		let value = this.state.products
		
			value[id].value = parseInt(value[id].value) + 1;
			this.setState({
				products:value
			})
		
    }
	
  _minus(id) {
	  let value = this.state.products
		if(value[id].value > 1){
			value[id].value = parseInt(value[id].value) - 1;
			this.setState({
				products:value
			})
		}
		let ps = this.state.products
	
      
    }
	_delete(id) {
	 let products = this.state.products
	 products.splice(id, 1);
	 this.setState({
				products:products
			})
	this.props.dispatch(ActionCart.set_cart(products))
 }
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.wrapper}>
      		<StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
          	<Header navigation={this.props.navigation} />
			<View style={[styles.itemcenter,{marginBottom: 60}]}>
          	<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollview_section}>
				{(this.state.products.length > 0) ?
			<View>
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

										      	this.setState({ products: products })}}
										      value={String(val.value)}
										    />
		                        </View>
		                        
	                        <TouchableOpacity style={[styles.plus,{marginTop:2}]} key={index} onPress={this._plus.bind(this, index)}>
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
				})
						}				
		            <TouchableOpacity style={styles.buy_now} onPress={() => this.props.navigation.navigate('Pay', {products : this.state.products})}>
		            	<Text style={styles.buy_now_text}>Mua ngay</Text>
		            </TouchableOpacity>
					</View> :
					<View> 
					
					
					<TouchableOpacity style={styles.buy_now} onPress={() => this.props.navigation.navigate('Home')}>
		            	<Text style={styles.buy_now_text}>Trang chủ</Text>
		            </TouchableOpacity>
					</View>
				}
					
		    </ScrollView>
			</View>
		    <Navbar navigation={this.props.navigation} />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
	wrapper:{
		flex: 1
	},
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
  	},
	scrollview_section: {
		height:height - 126
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
      textTransform: 'uppercase',
      color:'#0f1738',
	  marginBottom: 10
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
    	width:(width-30)*0.45,
		
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
	buy_now:{
		marginLeft:15,
		marginRight:15,
		alignItems:'center',
		backgroundColor:'#ffc400',
		borderRadius:10,
		marginTop:25,
		marginBottom:90,
	},
	buy_now_text:{
		paddingBottom:10,
		paddingTop:10,
		color:'#fff',
		fontSize:18,
		textTransform:'uppercase',
		fontWeight:'bold',
	},
	bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:30,
  },

  width25:{
    width:width*0.25,
    alignItems:'center',
    marginTop:5,
  },
  bottom1:{
    color:'#8d8d8d',
    fontSize:12,
  },
});
export default connect(mapStateToProps)(Cart)