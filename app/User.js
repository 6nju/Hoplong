import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from './redux/ActionCreators'
import Header from './components/Header';
import Navbar from './components/navbar';
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
class User extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
			user: this.props.user_login,
			
			

			
        }
		
           
    }
	_logout = () => {
	  this.props.dispatch(ActionCreators.set_user_login(null))
	  this.props.navigation.navigate('Home')
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
          	<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollview_section}>
		          		
		            <View style={styles.user_portrait}>
		            	<View style={styles.user_image}>
		            		
		            	</View>
		            	<View style={styles.user_login}>
		            		<Text style={styles.user_text}>{this.state.user.name}</Text>
		            		<Text style={styles.user_text}>{this.state.user.phone}</Text>
		            	</View>
		            </View>
		            <View style={styles.user_name}>
		            	<Text style={styles.user_name_title}>Số điện thoại</Text>
		            	<Text style={styles.user_name_info}>{this.state.user.phone}</Text>
		            </View>
		            <View style={styles.user_name}>
		            	<Text style={styles.user_name_title}>Email</Text>
		            	<Text style={styles.user_name_info}>{this.state.user.email}</Text>
		            </View>
		            
		            
		            <View style={styles.user_name}>
		            	<Text style={styles.user_name_title}>Địa chỉ cụ thể</Text>
		            	<Text style={styles.user_name_info}>{this.state.user.address}</Text>
		            </View>
		            <TouchableOpacity style={styles.logout}   onPress={this._logout}>
                  		<Text style={styles.logout_text}>Thoát</Text>
                	</TouchableOpacity>
		    </ScrollView>
		    
		 <Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	wrapper:{
		height:height,
	},
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
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
  	user_portrait:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginLeft:15,
  		marginRight:15,
  		backgroundColor:'#fff',
  		marginTop:15,
  		paddingTop:15,
  		paddingBottom:15,
  		borderRadius:10,
  		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
		marginBottom:35,
  	},
  	user_image:{
  		width:(width-30)*0.35,
  		paddingLeft:15,
  		alignItems:'center',
  	},
  	user_login:{
  		width:(width-30)*0.65,
  		marginTop:15,
  	},
  	user_text:{
  		color:'#0f1738',
  	},
  	user_name:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginLeft:15,
  		marginRight:15,
  		borderBottomWidth:1,
  		borderBottomColor:'#e3e4e4',
  		paddingTop:5,
  		paddingBottom:5,
  		marginTop:8,
  	},
  	user_name_title:{
  		width:(width-30)*0.35,
  		color:'#707070',
  	},
  	user_name_info:{
  		position:'absolute',
    	right:15,
    	color:'#bcbcbc',
  	},
  	logout:{
	    marginLeft:15,
	    marginRight:15,
	    alignItems:'center',
	    backgroundColor:'#3191cf',
	    borderRadius:10,
	    marginTop:25,
	    marginBottom:90,
  	},
  logout_text:{
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
    paddingBottom:20,
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
 export default connect(mapStateToProps)(User)