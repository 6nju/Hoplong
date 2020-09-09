import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Alert,
    Text,
    StatusBar,
    TouchableOpacity,
    View, StyleSheet,
} from 'react-native';
import {Button, Divider, Input , ThemeProvider} from 'react-native-elements';
import {colors, globalStyles} from './configs';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
import Navbar from './components/navbar';
import Header from './components/Header';
import Logo from './components/logo';
const height = Dimensions.get('window').height;
const formLogin = {
  loginByPhone: 'Lấy Lại Mật Khẩu',

};


class RestPassword extends Component {
	constructor(props) {
    super(props)
		this.state = { 
			email: '',
			

		}
		
	}
	_save = () => {
		
		
		const { email } = this.state
		
		if(email == '' || email == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập Email");
		  return
		  }
		  
		apis.forgot(email).then(res => {
			
			Alert.alert("Thông báo", 'Hãy vào email để xác nhận lại mật khẩu của bạn');
			this.props.navigation.navigate('Home')
		}).catch(err => {
			Alert.alert("Thông báo", 'Hãy vào email để xác nhận lại mật khẩu của bạn');
			this.props.navigation.navigate('Home')
                   
		})
}
  render() {
	  const { email } = this.state
    return (
	
      <View style={[globalStyles.container,{flexDirection:'column',justifyContent: 'center',}]}>
	  <StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
          	<View style={[styles.theme, {marginLeft: 0, position: 'absolute'}]}>
          		<Image
          			style={styles.image}
                    source={require('./images/login.png')}
                />
          	</View>
          <View style={{marginTop: -100}}>
          <ThemeProvider >

              <Input
                  placeholder='Email'
                  placeholderTextColor="#797979" 
                  inputStyle={{fontSize:16,fontStyle:'italic'}}
                  inputContainerStyle={globalStyles.inputStyle}
				  onChangeText={(email) => this.setState({ email })}
				value={email}
              />

            <Button
                titleStyle={{ textTransform: 'uppercase' }}
              title={formLogin.loginByPhone}
			   onPress={this._save}
              buttonStyle={[
                globalStyles.btn,
                globalStyles.btnPrimary,{backgroundColor:'#5ab9f5'},
                {marginTop: 30},
              ]}

            />
          </ThemeProvider>
      </View>


      </View>
    );
  }
}


const styles = StyleSheet.create({
    blockDivider: {
        position:'relative',

    },
	image:{
		width:width,
		height:height,
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
    }
});
export default RestPassword;
