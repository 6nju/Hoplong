import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { connect } from 'react-redux'
import Axios from 'axios';
import { ActionCreators } from './redux/ActionCreators'
import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class Register extends React.Component {
	constructor(props) {
    super(props)
    this.state = { 
		address: '',
		phone: '',
		name: '',
		username: '',
		password: '',
		rePassword: '',
		email:'',
	}
	}
	_save = () => {
		
		
		const { username, password, email, address , rePassword, phone } = this.state
		
		if(password == '' || password == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập mật khẩu");
		  return
		  }
		  if(phone == '' || phone == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập số điện thoại");
			  return
		  }
		   if(email == '' || email == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập email");
			  return
		  }
		  if(username == '' || username == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập tài khoản");
			  return
		  }
			if(address == '' || address == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập địa chỉ");
			  return
		  }
		if(password != rePassword){
			  Alert.alert("Thông báo", "Xác nhận mật khẩu không đúng");
			  return
		  }
		apis.register(username, phone, password, email, address).then(res => {
			
			if(typeof res.data.id != 'undefined'){
				let user = {
					"name": username,
					"phone": phone,
					"address": address,
					"password": password,
					"email": email,
					"customerId": res.data.id,
				}
				
				
				Alert.alert("Thông báo", 'Bạn đã tạo tài khoản thành công');
                this.props.dispatch(ActionCreators.set_user_login(user))
				
                this.props.navigation.navigate('Home')
				
			}else{
				
				Alert.alert("Thông báo", "Đã tồn tại tài khoản hoặc số điện thoại, email");
				
			}
		}).catch(err => {
			Alert.alert("Thông báo", "Đã tồn tại tài khoản hoặc số điện thoại, email");
                   
		})
}
  render() {
    const {goBack} = this.props.navigation;
	const { username, password, email, address, phone, rePassword} = this.state
    return (
      <View style={styles.wrapper}>
      <ScrollView>
      		<StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
          	<View style={styles.theme}>
          		<Image
          			style={styles.image}
                    source={require('./images/login.png')}
                />
          	</View>
          	<View style={styles.form}>
          		<View style={styles.section1}>
          				<Image
		                    source={require('./images/big_logo.png')}
                		/>
                		<View style={styles.margintop}></View>
						<View style={styles.section2}>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="Tên tài khoản"
		                        placeholderTextColor="#8d8d8d"
								autoCorrect={false}
								returnKeyType='done'
								onChangeText={(username) => this.setState({ username })}
								value={username}
		                      />
                		</View>
                		<View style={styles.section2}>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="Số điện thoại"
		                        placeholderTextColor="#8d8d8d"
								autoCorrect={false}
								returnKeyType='done'
								onChangeText={(phone) => this.setState({ phone })}
								value={phone}
		                      />
                		</View>
						<View style={styles.section2}>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="Email"
		                        placeholderTextColor="#8d8d8d"
								onChangeText={(email) => this.setState({ email })}
								value={email}
		                      />
                		</View>
						<View style={styles.section2}>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="Địa chỉ"
		                        placeholderTextColor="#8d8d8d"
								onChangeText={(address) => this.setState({ address })}
								value={address}
		                      />
                		</View>
                		<View style={styles.section2}>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="Mật khẩu"
		                        placeholderTextColor="#8d8d8d"
								onChangeText={(password) => this.setState({ password })}
								value={password}
		                      />
                		</View>
                    <View style={styles.section2}>
                      <TextInput
                            style={styles.input}
                            placeholder="Nhập lại mật khẩu"
                            placeholderTextColor="#8d8d8d"
							onChangeText={(rePassword) => this.setState({ rePassword })}
								value={rePassword}
                          />
                    </View>
                		<TouchableOpacity style={styles.logout} onPress={this._save}>
                  				<Text style={styles.logout_text}>Đăng ký</Text>
                		</TouchableOpacity>
          		</View>
                
          	</View>
          	</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	wrapper:{
		flex:1,
	},
	theme:{
		paddingBottom:200,
	},
	image:{
		width:width,
		height:height,
	},
	form:{
		position:'absolute',
		width:width,
		height:height,
	},
	section1:{
		alignItems:'center',
		marginTop:90,
	},
	input:{
		width:width-30,
		height:42,
	},
	section2:{
		borderBottomWidth:1,
		borderBottomColor:'#efefef',
	},
	logout:{
	    marginLeft:15,
	    marginRight:15,
	    alignItems:'center',
	    backgroundColor:'#3191cf',
	    borderRadius:10,
	    marginTop:25,
	    width:width-30,
  	},
  	logout_text:{
	    paddingBottom:10,
	    paddingTop:10,
	    color:'#fff',
	    fontSize:18,
	    textTransform:'uppercase',
  	},
  	margintop:{
  		marginTop:30,
  	},
  	forgot:{
  		alignItems:'flex-end',
  	},
  	forgot_text:{
  		color:'#59a5d8',
  		marginTop:5,
  		marginRight:15,
  	},
  	or:{
  		flexDirection:'row',
      	flexWrap: 'wrap',
      	marginTop:35,
        marginBottom:30,
  	},
  	left:{
  		height:1,
  		backgroundColor:'#c6ced4',
  		width:(width-50)*0.42,
  		marginTop:9,
  		marginRight:10,
  		marginLeft:15,
  	},
  	center:{
  		width:(width-50)*0.16,
  		alignItems:'center',
  	},
  	right:{
  		height:1,
  		backgroundColor:'#c6ced4',
  		width:(width-50)*0.42,
  		marginTop:9,
  		marginRight:15,
  		marginLeft:10,
  	},
  	other:{
	    marginLeft:15,
	    marginRight:15,
	    alignItems:'center',
	    backgroundColor:'transparent',
	    borderRadius:10,
	    borderWidth:1,
	    borderColor:'#3191cf',
	    marginTop:25,
	    width:width-30,
  	},
  	other_text:{
	    paddingBottom:10,
	    paddingTop:10,
	    color:'#3191cf',
	    fontSize:18,
	    textTransform:'uppercase',
  	},
});
export default connect(mapStateToProps)(Register)