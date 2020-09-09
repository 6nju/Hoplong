import React, {Component} from 'react';
import {
  StyleSheet,View,
  TextInput,
  Text,
  TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';

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



class ListOne extends Component {
  constructor(props) {
    super(props);
	this.state = {
		user: this.props.user_login,
		products:this.props.products,
    };
	
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.item_section}>
			{
									this.state.products.map((val, index_) => {
										return (
						<View style={styles.item}>
                  		<TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {product: val})} >
                          <View style={styles.item_image}>
						  <Image 
									 source={{uri: 'https://hoplongtech.com/' + val.cover_image,width: (width-40)*0.5, height: (width-40)*0.5}}/>
                              
                          </View>
						  </TouchableOpacity>
						  <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {product: val})} >
                          <Text style={styles.item_title}>{val.title}</Text>
						  </TouchableOpacity>
                          
                          { 
							  (this.state.user != null && val.price_when_login != null) ? 
								<Text style={styles.item_price}>{(parseFloat(val.price_when_login).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
								
								:
								<Text style={styles.item_price}>{(val.price != null) ? (parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0] : ''} VNĐ</Text>
						  
						  }
                     </View>
					 
						)
									})
			}
                 </View>
    );
  }
}

const styles = StyleSheet.create({
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    item_section:{
  		marginLeft:15,
  		marginRight:15,
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginBottom:100,
  	},
	item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
  	item:{
      width:(width-30)*0.5,
      borderColor:'#e3e3e3',
      borderWidth:1,
      backgroundColor:'#fff',
    },
    item_image:{
      alignItems:'center',
      justifyContent:'center',
    },
    image_fit:{
      width:(width-40)*0.5,
    },
    item_title:{
      marginLeft:15,
      marginTop:15,
      textTransform: 'uppercase',
      color:'#0f1738',
    },
});
export default connect(mapStateToProps)(ListOne);