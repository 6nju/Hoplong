import React, {Component} from 'react';
import {
  StyleSheet,View,
  TextInput,
  Text,
  TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import {colors,images} from '../../configs/index';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {connect} from 'react-redux';
const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});



class CasItem extends Component {
  constructor(props) {
    super(props);

	this.state = {
      id:this.props.id,
      title:this.props.title,
      products:this.props.products,
	  user: this.props.user_login,
    };
	
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
			<View>
		
						
							<View style={[{width: '100%',paddingTop: 0, backgroundColor: '#fff',marginBottom: 20,borderRadius:5,paddingBottom:25}]}>
								<Text style={[styles.category_text, {width: '100%', textAlign:'center', color: '#000', fontSize:12, paddingTop: 5, fontWeight: 'bold', }]}>{this.state.title}</Text>
								<View style={[styles.header_section, {width: '100%',paddingTop: 0, backgroundColor: '#fff',paddingTop: 5,}]}>
								{ (this.state.products.length) ? 
									<View style={[{width: '100%',paddingTop: 0,  backgroundColor: '#fff',flexDirection:'row',flexWrap:'wrap',}]}>
										{
									this.state.products.map((val, index_) => {
										return (
										<TouchableOpacity  onPress={() => this.props.navigation.navigate('Detail', {product: val})} style={[{width: (width-width*0.35)*0.3,}]}>	
											<View style={styles.item_image}>
										  <Image 
												 source={{uri: 'https://hoplongtech.com/uploads/product_new/cover_image/'+val.cover_image,width: (width-width*0.35)*0.3, height: ((width-width*0.35)*0.3) }}/>
									  </View>
									<Text style={{fontSize: 9, textAlign: 'center', width: '100%',}}>{val.title}</Text>
									{ 
							  (this.state.user != null && val.price_when_login != null) ? 
								<Text style={styles.item_price}>{(parseFloat(val.price_when_login).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
								
								:
								<Text style={styles.item_price}>{(val.price != null) ? (parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0] : ''} VNĐ</Text>
						  
						  }
						  
										</TouchableOpacity>
									)
						})
						}</View>
									: <View style={[styles.header_section, {width: '100%',paddingTop: 0, backgroundColor: '#fff'}]}>
								
								
								
									<Text style={[styles.category_text, {width: '100%', textAlign:'center', color: '#000', fontSize:14}]}>Không có sản phẩm</Text>
								
								
							</View>
						}
</View>
						<TouchableOpacity style={[{position: 'absolute', bottom: 10, right: 15}]} onPress={() => this.props.navigation.navigate('CategoryInfo', {category: this.state.id})}>
							<Text style={[{fontSize: 12, fontWeight: 'bold',color:'#0c6dac'}]}>Xem thêm </Text>
							<Icon style={{top:-3, position: 'absolute', right: -5}} name={'md-arrow-dropright'} size={20} color='#0c6dac' />
						</TouchableOpacity>	
						</View>
						
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
      textTransform: 'uppercase',
      color:'#0f1738',
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
    item_price:{
    
      textTransform: 'uppercase',
      color:'#0c6dac',
		width: '100%',
		textAlign:'center',
      marginBottom:10,
	  fontSize: 9,
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
});
export default connect(mapStateToProps)(CasItem);