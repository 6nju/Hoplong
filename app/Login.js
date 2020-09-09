import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import Axios from 'axios';
import Navbar from './components/navbar';
import { ActionCreators } from './redux/ActionCreators'
const mapStateToProps = (state) => ({
	user_login: state.user_login
})

class Login extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        textNavbar:[
            {text:'Home'},
            {text:'Kiểm tra'},
            {text:'Khóa học'},
            {text:'Tài khoản'}
        ],
		username: '',
		password: '' 
    };
	if(this.props.user_login){this.props.navigation.navigate('User')}
  }
  
  _login = () => {
        const { username, password } = this.state

        if (!username.trim())alert('Bạn Chưa Nhập Email')
        if (!password.trim()) alert('Bạn Chưa Nhập Mật Khẩu')
        this.setState({ process: true }, () => {
            apis.login(username, password)
                .then(res => {
					
					
                    if (res.data.token) {
                        
                        
                        Axios.defaults.headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + res.data.token
                        }
						 apis.customer(username, password)
						.then(res => {
								let user_login = res.data
							
								this.props.dispatch(ActionCreators.set_user_login(user_login))
								Alert.alert('Chúc mừng',  'Bạn đã đăng nhập thành công' )
								this.props.navigation.navigate('Home')
							})

						
                    } else {
                        this.setState({ process: false })
                        showMessage({ message: 'An error occurred during login', type: "error" })
                    }
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                    return showMessage({ message: 'An error occurred during login', type: "error" })
                })
        })     
    }
  render() {
    const {goBack} = this.props.navigation;
	const { username, password} = this.state
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
		                        placeholder="Email"
		                        placeholderTextColor="#6f6c6d"
								autoCorrect={false}
								  returnKeyType="done"
								  onChangeText={username => this.setState({username})}
								  value={username}
		                      />
                		</View>
                		<View style={styles.section2}>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="Mật khẩu"
		                        placeholderTextColor="#6f6c6d"

								returnKeyType="done"
								  onChangeText={password => this.setState({password})}
								  value={password}
		                      />
                		</View>
                		<TouchableOpacity style={styles.logout}  onPress={this._login}>
                  				<Text style={styles.logout_text}>Đăng nhập</Text>
                		</TouchableOpacity>
          		</View>
          		<TouchableOpacity style={styles.forgot} onPress={() =>this.props.navigation.navigate('RestPassword')}>
                		<Text style={styles.forgot_text}>Quên mật khẩu</Text>
                </TouchableOpacity>
                
                <View style={styles.register}>
                	<Text style={styles.register_qoute}>Bạn chưa có tài khoản?</Text>
                	<TouchableOpacity onPress={() =>this.props.navigation.navigate('Register')}>
                  		<Text style={styles.register_now}>Đăng ký ngay</Text>
                	</TouchableOpacity>
                </View>
          	</View>
            </ScrollView>
            <Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	wrapper:{
		flex:1,
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
    color:'#000000',
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
  	register:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		position:'absolute',
  		bottom:65,
  	},
  	register_now:{
  		color:'#3191cf',
  	},
  	register_qoute:{
  		marginLeft:50,
  		marginRight:10,
  	}
});
 export default connect(mapStateToProps)(Login)