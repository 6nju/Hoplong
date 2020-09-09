import React, {Component} from 'react';
import {
  StyleSheet,View,
  TextInput,
  TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';

import {colors,images} from '../../configs/index';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/ActionCreators'
const mapStateToProps = (state) => ({
  user_login: state.user_login
})



class Logo extends Component {
  constructor(props) {
    super(props);
  this.state = {
            page:1,
            search: '',
      action: (this.props.user_login) ? 'User' : 'Login' 
    }
  }
  _search = () => {
  
  this.setState({
     page: 1,
     progess: true,
    })
  apis.getSearch(this.state.search, this.state.page).then(res => {
      let array_page =[]
      let pages
      if((res.data.count % 50) != 0){
        pages = parseInt(res.data.count / 50) + 1;
      }else{
        pages = parseInt(res.data.count / 50);
      }
      for(let i = 0;  i < pages ; i++){
        let key = i + 1;
        array_page.push(key)
      }
      for(let a = 0 ; a < res.data.rows.length; a++){
        res.data.rows[a].value_ = 1
      }
      this.setState({
        products: res.data.rows,
        count: res.data.count,
        progess: false,
        array_page: array_page,
      })  
      
    })
  }
  render() {
    const { navigate, search } = this.props.navigation;

    return (
        <View style={styles.header}>
              <View>
                  <Image
            style={styles.header_banner}
                      source={require('../../images/banner.png')}
                  />
              </View>
              <View style={styles.header_image_section}>
                  <TouchableOpacity activeOpacity={0.8} onPress = {()=> this.props.navigation.toggleLeftDrawer('Main', {param: this.state.action})} style={[styles.header_left, {marginTop: 30}]}>
                    <Image
                        source={require('../../images/lb-icon.png')}
                    />
                  </TouchableOpacity>
                  <View style={[styles.header_middle,{ zIndex: 1000,marginTop: 20}]}>
                    <Image
                        style={{height:457*(60/738),width:60}}
                        source={require('../../images/logo.png')}
                    />
                  </View>
                  <View style={[styles.header_end, {marginTop: 30}]} >
                    
                  </View>
              </View>
              <View style={[styles.search_section]}>
                  <TextInput style = {styles.input}
                     placeholder = "Tìm kiếm sản phẩm"
                     placeholderTextColor = "#6f6c6d"
           onChangeText={(search) => this.setState({ search })}
           value={this.state.search}
                     autoCapitalize = "none"
                  />
                  <TouchableOpacity style={styles.search_icon}  onPress={() =>{this.props.navigation.navigate('Search', {val: this.state.search})}}>
                    <Image
                          source={require('../../images/search.png')}
                      />
                  </TouchableOpacity>
              </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    header:{
      zIndex:100,
    },
    header_text:{
      color:'red',
    },
    header_banner:{
    width: width,
    marginTop:-10,
    marginBottom:10,
  },
    header_left:{
      paddingLeft:15,
      width:width*0.33,
      alignItems:'flex-start',
      marginTop:5,
    },
    header_middle:{
      width:width*0.33,
      alignItems:'center',
     
    },
    header_end:{
      paddingRight:15,
      width:width*0.33,
      alignItems:'flex-end',
      marginTop:5,
    },
    header_image_section:{
      flexDirection:'row',
      flexWrap: 'wrap',
      position: 'absolute',
      top:25,
    },
    input:{
     color:'#000000',
      width:width,
      backgroundColor:'#fff',
      height: 40,
      
      borderColor:'#fff',
      borderWidth:1, 
    paddingLeft: 10
    },
    search_section:{
      flexDirection:'row',
      position:'absolute',
      top:112*width/375 - 20,
      zIndex:10,
    },
    search_icon:{
      justifyContent:'center',
      alignItems:'center',
      marginLeft:-30,
    },
    input:{
      color:'#000000',
      width:width,
      backgroundColor:'#fff',
      height: 40,
      
      borderColor:'#fff',
      borderWidth:1, 
    paddingLeft: 10
    },
    search_section:{
      flexDirection:'row',
      position:'absolute',
      bottom:-25,
      zIndex:10,
    },
    search_icon:{
      justifyContent:'center',
      alignItems:'center',
      marginLeft:-30,
    },
});
export default connect(mapStateToProps)(Logo)