import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/ActionCreators'
import Icon from 'react-native-vector-icons/Ionicons'
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheckCircle,
  faHome,
  faShoppingCart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';


class Navbarbottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
        textNavbar:[
            {text:'Home'},
            {text:'Kiểm tra'},
            {text:'Khóa học'},
            {text:'Tài khoản'}
        ],
		action: (this.props.user_login) ? 'User' : 'Login' 
    };
	
  }

  render() {
      const textNavbar = this.state.textNavbar;
    return (
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
    );
  }
}

const styles = StyleSheet.create({
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
});
 export default connect(mapStateToProps)(Navbarbottom)