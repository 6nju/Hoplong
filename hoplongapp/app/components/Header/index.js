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




export default class Header extends Component {
  constructor(props) {
    super(props);
   this.state = {
          search: this.props.params,
          
     }
  
  
  }
  render() {
    const { navigate, search } = this.props.navigation;

    return (
        <View style={styles.header}>
              <View>
                  <Image
                    style={{height:60,width:width}}
                    source={require('../../images/other-banner.png')}
                />
              </View>
              <View style={styles.header_section}>
                      <TouchableOpacity style={[styles.header_left, { marginTop: 10}]} onPress={() => this.props.navigation.pop()}>
                          <Image
                              source={require('../../images/back_arrow.png')}
                          />
                      </TouchableOpacity>
                      <View style={styles.header_middle}>
              <View style={styles.search_section}>
                  <TextInput style = {styles.input}
                     placeholder = "Tìm kiếm sản phẩm"
                     placeholderTextColor = "#8D8D8D"
                     autoCapitalize = "none"
           onChangeText={(search) => this.setState({ search })}
           value={this.state.search}
                  />
                  
              </View>
                      </View>
              
                      <TouchableOpacity style={styles.header_right} onPress={() => {
              
                  this.props.navigation.navigate('Search', {val: this.state.search})
               
              }}>
                          <Image
                              source={require('../../images/detail_search.png')}
                          />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.header_right} onPress = {()=> this.props.navigation.toggleRightDrawer('Right')}>
                          <Image
                              source={require('../../images/detail_soft.png')}
                          />
                      </TouchableOpacity>
                  </View>
             
        </View>
    );
  }
}

const styles = StyleSheet.create({
    
    header_text:{
      color:'red',
    },
    header_banner:{
    width: width,
    height: 112*width/375
  },
    header_left:{
      paddingLeft:15,
      width:width*0.33,
      alignItems:'flex-start',
   
    },
    header_middle:{
      width:width*0.33,
      alignItems:'center',
    },
    header_end:{
      paddingRight:15,
      width:width*0.33,
      alignItems:'flex-end',
    },
    header_image_section:{
      flexDirection:'row',
      flexWrap: 'wrap',
      position: 'absolute',
      top:50,
    },
    input:{
      marginLeft:0,
      marginRight:60,
      width:width*1-120,
      backgroundColor:'#fff',
      height: 40,
      borderRadius:10,
    marginTop: 2,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: null,
   color:'#000',
    
    },
    search_section:{
      flexDirection:'row',
      
      zIndex:10,
    },
    search_icon:{
      justifyContent:'center',
      alignItems:'center',
      marginLeft:-50,
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
    zIndex:100,
    marginTop: 10,
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
