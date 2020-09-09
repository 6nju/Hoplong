import React from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  BackHandler,
  View,
  Button,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {apis, settings, images} from './configs';
import Slideshow from './components/slideshow';
import {globalStyles} from './configs';
import Navbar from './components/navbar';
import Logo from './components/logo';
import FlashSale from './components/FlashSale';
import Course from './components/CourseNew';
import Branch from './components/Branch';
import News from './components/News';
import NewsTow from './components/NewsTow';
import LoadingCircular from './components/Loading';
import Icon from 'react-native-vector-icons/Ionicons'
import Intro from './components/Intro';
import CountDown from 'react-native-countdown-component';
import {connect} from 'react-redux';
const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      search: '',
      cart: this.props.cart,
      news: [],
      user: this.props.user_login,
      length: this.props.cart ? this.props.cart.length : 0,
      statusFlashSale: 1,
      progessFlash: true,
      progessSlider: true,
      progess: true,
      progess_: true,
      end: 0,
      sliders: [],
      newProduct: [],
      flashSaleItem: [],
      showModal: false,
      images:images.homeSlider,
		search: '',
		bestSaler: [],
      bestSalerProgess: false,
    };
    
    
	

	apis.getNew().then(res => {
			
		this.setState({
			news: res.data.data,
			progess: false,
		})	
			
	})
	
	apis.getSlider().then(res => {
	
			
		let images = []
			for(let i = 0; i < res.data.length;i++){
				images[i] = res.data[i].cover_image
				
			}
		this.setState({
			images: images,
			progessSlider: false,
		})		
			
	})
	apis.getNewProduct().then(res => {
			
		this.setState({
			newProduct: res.data.data,
			progess: false,
		})	
			
	})
	apis.getFlashSale().then(res => {
		
		let now = (res.data.flash_sales.end_time*1000 - Date.now())/1000; 
		this.setState({
			flashSaleItem: res.data.products,
			progessFlash: false,
			end: now,
		}) 
		
    });
	apis.getBestSale().then(res => {
		
		this.setState({
			bestSaler: res.data.data,
			bestSalerProgess: false,
			
		}) 
		
    });
	apis.getHomePage().then(res => {
		
      this.setState({
        
        sliders: res.data.slidersIntro,
        progess: false,
      });
    });
	
  }

  componentDidMount() {
  	
  	this.getData();
		  setTimeout( () => {
		     this.setTimePassed();
		  },4000);
	}
	setTimePassed() {
		
   		this.setState({progess_: false});
	}
  
 _facebookPage = () => {
	 Linking.openURL('fb://page/673301269359074');
 }
 _facebook = () => {
	 
	  	Linking.openURL("fb-messenger://user-thread/673301269359074");
		
	 }
	 _zalo = () => {
		 Linking.openURL('tel:0986938883')
	 }
	 _phone = () => {
		 Linking.openURL('tel:19006503')
	 }
	 
  getData() {
    let cart = this.props.cart;
    this.setState({
      cart: cart,
      length: cart ? cart.length : 0,
    });
  }
	showHome = (showIntro) => {
    this.setState({
		showModal: false
	})
  }
  render() {
    const {search,progess,showModal } = this.state;
    

    if (this.state.progess_) return <View style={[globalStyles.mainLoader, globalStyles.mainLoader]}>
                <Image 
					source={require('./images/logo-app-400x600.gif')}   
					style={{width:width,height:height}}
				/>
            </View>
        ;
	if (showModal) return (	
		<View>
          <Intro showHome={this.showHome} params={settings.Intro} sliders={this.state.sliders} showModal={showModal} navigation={this.props.navigation} />
		</View>
	)
    return (
	
        <View style={styles.wrapper}>
         		

          <View style={[styles.itemcenter,{marginBottom: 1}]}>
            <StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#EAEAEA',marginTop:-35}}>
				 <Logo navigation={this.props.navigation} />
				{ (this.state.progessSlider) ? <LoadingCircular /> : 
				<View style={{marginTop: 26}}> 
				 <Slideshow params={this.state.images}/>
				</View>
             
				}
              {/* Home Slideshow */}
				
				
				<Branch params={this.state.images} navigation={this.props.navigation}/>
				<View style={styles.section_flashsale}>
                  <Image
					style={{width: width, height: 72*width/372}}
                    source={require('./images/flsale-banner.png')}
                  />
              </View>
			  {
					(!this.state.flashSaleItem.length) ? <LoadingCircular /> : 
					<View>
			  { (this.state.statusFlashSale) ?
			   <View>
			  <View style={styles.flashsale_fuction}>
                    <View style={[styles.flashsale_left_fuction]}>
                        <Text style={[styles.fl_text,{marginTop:12,}]}>Kết thúc sau</Text>
                    </View>
                    <View style={styles.flashsale_center_fuction}>
                        <View style={styles.fl_text}><CountDown
        size={15}
        until={this.state.end}
        onFinish={() => {
			alert('Đã hết FlashSale')
			this.setState({
				statusFlashSale: 0
			})
		}} 
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#3191cf'}}
        digitTxtStyle={{color: '#3191cf'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#3191cf'}}
        timeToShow={['D', 'H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      /></View>
                    </View>
                    <TouchableOpacity style={styles.flashsale_right_fuction} onPress={() => this.props.navigation.navigate('Flashsale', {products: this.state.flashSaleItem, end: this.state.end})} >
                        <Text style={[styles.fl_text, {marginTop: 10}]}>Xem thêm</Text><Icon style={{top:8, position: 'absolute', right: 15}} name={'md-arrow-dropright'} size={20} color='#000' />
                    </TouchableOpacity>
              </View>
				
				<View>
            
				{
					(!this.state.flashSaleItem.length) ? null : 
				 <View style={styles.item_section}>
                  <ScrollView 
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}
                     style={styles.scrollview_item}
                  >
				  {
									this.state.flashSaleItem.map((val, index_) => {
										
										return (
										<View>
                      <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Detail', {product: val})} >
                          <View style={styles.item_image}>
                              <Image 
									 source={{uri: 'https://hoplongtech.com/' + val.cover_image,width: (width-30)*0.5 - 4, height: (width-30)*0.5}}/>
                          </View>
                          <Text style={styles.item_title}>{val.title}</Text>
                          
						  { 
							  (val.price && val.price_when_login) ? 
								<Text style={styles.item_price}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
								
								:
								<Text style={styles.item_price}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
						  
						  }
                      </TouchableOpacity>
					  </View>
					)
					})
					}
                     
                  </ScrollView>
              </View>
				 
				}
			</View>
				 </View>
              
              : null
			  }
			  </View>
  }
		{
					(!this.state.bestSaler.length) ? <LoadingCircular /> : 
					<View>
			<View style={styles.hot_fuction}>
                    <View style={styles.hot_left_fuction}>
                        <Text style={styles.hot_title}>Sản phẩm bán chạy</Text>
                    </View>
                    <TouchableOpacity style={styles.hot_right_fuction} onPress={() => this.props.navigation.navigate('BestSaler')}>
                        <Text style={styles.hot_text}>Xem thêm </Text><Icon style={{top:-2, position: 'absolute', right: 20}} name={'md-arrow-dropright'} size={20} color='#fff' />
                    </TouchableOpacity>
                  </View>
              
				
				
				<View>
            
				{
					(!this.state.bestSaler.length) ? null : 
				 <View style={styles.item_section}>
                  <ScrollView 
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}
                     style={styles.scrollview_item}
                  >
				  {
									this.state.bestSaler.map((val, index_) => {
										
										return (
										<View>
                      <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Detail', {product: val})} >
                          <View style={styles.item_image}>
                              <Image 
									 source={{uri: 'https://hoplongtech.com/' + val.cover_image,width: (width-30)*0.5 - 4, height: (width-30)*0.5}}/>
                          </View>
                          <Text style={styles.item_title}>{val.title}</Text>
                          
						  { 
							  (this.state.user != null && val.price_when_login != null) ? 
								<Text style={styles.item_price}>{(parseFloat(val.price_when_login).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
								
								:
								<Text style={styles.item_price}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
						  
						  }
                      </TouchableOpacity>
					  </View>
					)
					})
					}
                     
                  </ScrollView>
              </View>
				 
				}
			</View>
				</View>
		}
		{
					(!this.state.newProduct.length) ? <LoadingCircular /> : 
					<View>
			<View style={styles.hot_fuction}>
                    <View style={styles.hot_left_fuction}>
                        <Text style={styles.hot_title}>48h giao hàng</Text>
                    </View>
                    <TouchableOpacity style={styles.hot_right_fuction} onPress={() => this.props.navigation.navigate('Twodaymore')}>
                        <Text style={styles.hot_text}>Xem thêm </Text><Icon style={{top:-2, position: 'absolute', right: 20}} name={'md-arrow-dropright'} size={20} color='#fff' />
                    </TouchableOpacity>
                  </View>
              
				
				<View>
            
				{
					(!this.state.newProduct.length) ? null : 
				 <View style={styles.item_section}>
                  <ScrollView 
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}
                     style={styles.scrollview_item}
                  >
				  {
									this.state.newProduct.map((val, index_) => {
										
										return (
										<View>
                      <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Detail', {product: val})} >
                          <View style={styles.item_image}>
                              <Image 
									 source={{uri: 'https://hoplongtech.com/' + val.cover_image,width: (width-30)*0.5 - 4, height: (width-30)*0.5}}/>
                          </View>
                          <Text style={styles.item_title}>{val.title}</Text>
                          
						  { 
							  (this.state.user != null && val.price_when_login != null) ? 
								<Text style={styles.item_price}>{(parseFloat(val.price_when_login).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} VNĐ</Text>
								
								:
								<Text style={styles.item_price}>{(val.price != null) ? (parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0] : ''} VNĐ</Text>
						  
						  }
                      </TouchableOpacity>
					  </View>
					)
					})
					}
                     
                  </ScrollView>
              </View>
				 
				}
			</View>
				</View>
		}
		
				<News navigation={this.props.navigation} news={this.state.news}/>
				
				
				 <View style={styles.about_section}>
                  <View style={styles.contact_me}>
                      <TouchableOpacity style={styles.mg_8x8}  onPress={this._facebookPage}>
                          <Image 
                            source={require('./images/facebook.png')}
                          />
                      </TouchableOpacity>
					  <TouchableOpacity style={styles.mg_8x8}  onPress={this._facebook}>
                          <Image 
						  style={{width: 32, height: 32}}
                            source={require('./images/chat.png')}
                          />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.mg_8x8}  onPress={this._phone}>
                          <Image 
                            source={require('./images/whatzapp.png')}
                          />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.mg_8x8} onPress={this._zalo}>
                          <Image  
						  style={{width:32, height:32,marginTop: 1}}
                            source={require('./images/zalo.png')}
                          />
                      </TouchableOpacity>
                      
                  </View>
                  <View style={styles.mg_top25}>
                          <Image 
                            source={require('./images/supermarket.png')}
                          /> 
                  </View>
                  <Text style={styles.conpany}>Công ty cổ phần công nghệ hợp long</Text>
                  <View style={styles.dash}></View>
                  <Text style={styles.address}>Địa chỉ:87 Lĩnh Nam, Hoàng Mai, Hà Nội</Text>
                  <Text style={styles.address}>Hotline:1900.6536</Text>
                  <Text style={styles.address}>Email:info@hoplongtech.com.vn</Text>
              </View>
			  
              </ScrollView>
			   <Navbar navigation={this.props.navigation} />
            </View>

          {/*  Navbar Bottom */}
		
          
        </View>
    );
  }
}

const styles = StyleSheet.create({
	section_flashsale:{
      marginTop:-15,
    },
	wrapper:{
		flex: 1
	},
	hot_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#3191cf',
    },
    hot_left_fuction:{
      width:width*0.5,
      alignItems:'flex-start',
      paddingLeft:25,
    },
	hot_title:{
      textTransform:'uppercase',
      color:'#fff'
    },
    hot_right_fuction:{
      width:width*0.5,
      alignItems:'flex-end',
      paddingRight:25,
    },
    hot_text:{
      fontSize:13,
      fontWeight:'bold',
      color:'#fff',
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
	 about_section:{
      alignItems:'center',
      paddingTop:20,
      paddingBottom:30,
      marginBottom:80,
    },
    contact_me:{
      flexDirection:'row',
      flexWrap: 'wrap',
    },
    mg_8x8:{
      marginLeft:8,
      marginRight:8,
    },
    mg_top25:{
      marginTop:25,
    },
    conpany:{
      textTransform:'uppercase',
      marginTop:10,
      fontSize:13,
      color:'#0f1738'
    },
    dash:{
      height:2,
      backgroundColor:'#e5e5e5',
      width:width-60,
      marginTop:5,
      marginBottom:8,
    },
    address:{
      fontSize:13,
      color:'#0f1738'
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
  popup:{
    width:width*0.85,
    position:'absolute',
    backgroundColor:'#fff',
    zIndex:100,
  },
  popup_box:{
    height:height,
  },
  popup_logo:{
    alignItems:'center',
    marginTop:50,
    marginBottom:20,
  },
  exit_button:{
    bottom:50,
    position:'absolute',
    right:20,
  },
  popup_naviga:{
    marginLeft:20,
  },
  popup_naviga_text:{
    paddingTop:5,
    paddingBottom:5,
    textTransform:'uppercase',
    marginTop:10,
  },
    flashsale_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#ededed',
    },
    flashsale_left_fuction:{
      width:width*0.33,
      alignItems:'flex-start',
      paddingLeft:25,
      marginTop:11,
    },
    flashsale_center_fuction:{
      width:width*0.33,
      alignItems:'center',
    },
    flashsale_right_fuction:{
      width:width*0.33,
      alignItems:'flex-end',
      paddingRight:25,
    },
    fl_text:{
      fontSize:13,
      fontWeight:'bold',
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    marginTop: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  itemcenter: {
    position: 'relative',
    alignItems: 'center'
  },
  banner: {
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
  },

  textCategory: {
    position: 'absolute',

    textAlign: 'center',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    color: '#fff',
    backgroundColor: '#ff5c00',
    top: ((width - 40) / 344) * 64 - 5,
    fontSize: 18,
  },

  ctimg: {
    borderRadius: 10,
    width: width - 40,
    height: ((width - 40) / 344) * 128,
    marginTop: 25,
  },
  col:{
      flexDirection:'row',
      flexWrap:'wrap',
    },
    wrapper:{
      backgroundColor:'#EAEAEA'
    }, 
    header_text:{
      color:'red',
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
      marginLeft:15,
      marginRight:15,
      width:width*1-30,
      backgroundColor:'#fff',
      height: 40,
      borderRadius:10,
      borderColor:'#fff',
      borderWidth:1, 
    },
    search_section:{
      flexDirection:'row',
      position:'absolute',
      top:85,
      zIndex:10,
    },
    search_icon:{
      justifyContent:'center',
      alignItems:'center',
      marginLeft:-50,
    },
    slide_wrapper:{
      height:height*0.35,
    },
    brand_wrapper:{
      height:height*0.4,
    },
    slide1:{
      alignItems:'center',
    },
    brand_box:{
      flexDirection:'row',
      flexWrap: 'wrap',
      width:width-30,
    },
    brand:{
      width:(width-30)*0.25,
      marginTop:10,
    },
    brand_text:{
      marginTop:7,
      fontSize:13,
    },
    item_center:{
      alignItems:'center',
      justifyContent:'center',
    },
    section_flashsale:{
      marginTop:-15,
    },
    flashsale_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#ededed',
    },
    flashsale_left_fuction:{
      width:width*0.33,
      alignItems:'flex-start',
      paddingLeft:25,
    },
    flashsale_center_fuction:{
      width:width*0.33,
      alignItems:'center',
    },
    flashsale_right_fuction:{
      width:width*0.33,
      alignItems:'flex-end',
      paddingRight:25,
    },
    fl_text:{
      fontSize:13,
    },
    scrollview_item:{
      marginLeft:15,
      marginTop:15,
      marginBottom:20,
     
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
    hot_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#3191cf',
    },
    hot_left_fuction:{
      width:width*0.5,
      alignItems:'flex-start',
      paddingLeft:25,
    },
    hot_right_fuction:{
      width:width*0.5,
      alignItems:'flex-end',
      paddingRight:25,
    },
    
    hot_title:{
      textTransform:'uppercase',
      color:'#fff'
    },
    new_section:{
      paddingRight:15,
      paddingLeft:15,
      backgroundColor:'#fff',
    },
    new_title:{
      marginLeft:15,
      color:'#5aa6d8',
      textTransform:'uppercase',
    },
    new:{
      paddingTop:8,
      paddingBottom:8,
      borderBottomWidth:1,
      borderBottomColor:'#fbfbfb',
    },
    more_new:{
      alignItems:'flex-end',
      paddingRight:15,
    },
    more_new_text:{
      color:'#5aa6d8',
      fontSize:13,
    },
    about_section:{
      alignItems:'center',
      paddingTop:20,
      paddingBottom:30,
      marginBottom:80,
    },
    contact_me:{
      flexDirection:'row',
      flexWrap: 'wrap',
    },
    mg_8x8:{
      marginLeft:8,
      marginRight:8,
    },
    mg_top25:{
      marginTop:25,
    },
    conpany:{
      textTransform:'uppercase',
      marginTop:10,
      fontSize:13,
      color:'#0f1738'
    },
    dash:{
      height:2,
      backgroundColor:'#e5e5e5',
      width:width-60,
      marginTop:5,
      marginBottom:8,
    },
    address:{
      fontSize:13,
      color:'#0f1738'
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
  popup:{
    width:width*0.85,
    position:'absolute',
    backgroundColor:'#fff',
    zIndex:100,
  },
  popup_box:{
    height:height,
  },
  popup_logo:{
    alignItems:'center',
    marginTop:50,
    marginBottom:20,
  },
  exit_button:{
    bottom:50,
    position:'absolute',
    right:20,
  },
  popup_naviga:{
    marginLeft:20,
  },
  popup_naviga_text:{
    paddingTop:5,
    paddingBottom:5,
    textTransform:'uppercase',
    marginTop:10,
  },
});
export default connect(mapStateToProps)(Home);
