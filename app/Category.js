import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions,ActivityIndicator, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import ListOne from './components/ListOne';
import CasItem from './components/CasItem';
import CasItemTow from './components/CasItemTow';
import ListTow from './components/ListTow';
import LoadingCircular from './components/Loading';
import {globalStyles} from './configs';
export default class Category extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      sonCategories: [],
      categories: [],
      type:0,
      categoryId:(this.props.navigation.state.params.categoryId != 'undefined') ? this.props.navigation.state.params.categoryId : 0,
      cas:[],
      products:[],
      categorySonId:0,
      title_:'',
      progess: true,
      progess_product: true,
      
      navigation: this.props.navigation,
    };
	
  }
  
	componentDidMount() {
		
    this._promisAll();
  }

  _promisAll = () => {
    

    /*
     * API getCategoryCode
     * @param
     *       categoryCode : string
     * */
	
    apis.getCategory().then(res => {
		this.setState({
			categories: (res.data) ? res.data : [],
			
			
		}) 
		if(res.data){
			this.setState({
			
			
			categoryId:(this.state.categoryId) ? this.state.categoryId : res.data[0].id
			}) 
			
			apis.getCategorySon(this.state.categoryId).then(res => { 
				if(res.data){
					this.setState({
						sonCategories: res.data,
						categorySonId:res.data[0].id,
						title_:res.data[0].title,
					}) 
					
							apis.getCategorySonProduct(res.data[0].id).then(res_ => {
							
							this.setState({
								cas: (res_.data) ? res_.data : [],
								progess: false,
								progess_product: false,
							})
						
						
						
					})
				}else{
					this.setState({
						
						progess: false,
						progess_product: false,
					})
				}
			
			
					
				
		
		});
		}else{
			this.setState({
						
						progess: false,
						progess_product: false,
					})
		}
		
		
		
    }).catch(err => {
					
					this.setState({ process: false })
					this.setState({ progess_product: false })
				
                });
	
	
  };
  _showSubSon(id){
	  if(this.state.progess_product){
		  return;
	  }
	   let sub = []
		  this.setState({
			  categorySonId: this.state.sonCategories[id].id,
			  title_:this.state.sonCategories[id].title,
			  progess_product: true,
			  cas: [],
		  }) 
		  
		  
				
				apis.getCategorySonProduct(this.state.sonCategories[id].id).then(res_ => {
							
							this.setState({
								cas: (res_.data) ? res_.data : [],
								progess: false,
								progess_product: false,
							})
						
						
						
					})
		
  }
  _showSub(id){
	  let sub = []
	  if(this.state.progess){
		  return;
	  }
	  this.setState({
		  categoryId: this.state.categories[id].id,
		  title_:this.state.categories[id].title,
		  progess:true,
		   cas: [],
	  })
	  
	 apis.getCategorySon(this.state.categories[id].id).then(res => {
		
			this.setState({
				sonCategories: res.data,
				categorySonId:res.data[0].id,
				title_:res.data[0].title,
			}) 
			
			
			apis.getCategorySonProduct(res.data[0].id).then(res_ => {
							
							this.setState({
								cas: (res_.data) ? res_.data : [],
								progess: false,
								progess_product: false,
							})
						
						
						
					})
		});
	  
	  }
  render() {
    const {goBack} = this.props.navigation;
	const {search,progess } = this.state;
	if (progess) return <LoadingCircular />;
	else 
    return (
      <View style={styles.wrapper}>
	  
      		<StatusBar 
                    translucent
                    backgroundColor="transparent"
                    barStyle = "light-content"
          	/>
			<View style={[styles.header_section, {zIndex: 10, top:198, left: 0, width: width*.35, height: height -210,position:'absolute', backgroundColor: '#EAEAEA', paddingTop: 0}]}>
						<ScrollView contentInsetAdjustmentBehavior="automatic" style={[styles.scrollview_section, {height: height -218, width: '100%'}]}>	
						<View >
						{
						this.state.sonCategories.map((val, index) => { 
							if(this.state.categorySonId == val.id)
							return (
								
								<TouchableOpacity style={[styles.category_title_box, {backgroundColor: '#ddd'}]} key={index} onPress={this._showSubSon.bind(this, index)}>
                  		<Text style={[styles.category_text, {color: '#000', fontSize:12, fontWeight: 'bold',marginLeft:10,}]}>{val.title}</Text>
                  	</TouchableOpacity>
							)
							
							
						})
					}
						{
						this.state.sonCategories.map((val, index) => { 
							if(this.state.categorySonId != val.id)
							
							
							return (
								<TouchableOpacity style={styles.category_title_box} key={index} onPress={this._showSubSon.bind(this, index)}>
                  		<Text style={[styles.category_text, {color: '#000', fontSize:12,marginLeft:10,}]}>{val.title}</Text>
                  	</TouchableOpacity>
								
							)
						})
					}
					</View>
						</ScrollView>
						</View>
          	<Header navigation={this.props.navigation} />
			<View style={{backgroundColor:'#5ab9f5',}}>	
					<Text style={{width: width, textAlign: 'center', paddingTop: 5, paddingBottom: 5,fontWeight:'bold',color:'#fff',}}>
						Tất cả sản phẩm
					</Text>
              		<ScrollView 
	                     horizontal={true}
	                     showsHorizontalScrollIndicator={false}
	                     style={styles.scrollview_category}
                  	>
					
					{
						this.state.categories.map((val, index) => {
							if(this.state.categoryId == val.id)
							return (
								<TouchableOpacity style={[styles.brand_title_box, {fontWeight: 'bold', color: 'red'}]} key={index} onPress={this._showSub.bind(this, index)}>
									<Text style={[styles.brand_text, {fontWeight: 'bold', color: '#fff', borderBottomWidth:3, borderColor: '#ffc400', paddingBottom: 5}]}>{val.title}</Text>
								</TouchableOpacity>
							)
							else
							return (
								<TouchableOpacity style={styles.brand_title_box} key={index} onPress={this._showSub.bind(this, index)}>
									<Text style={[styles.brand_text,{color: '#fff'}]}>{val.title}</Text>
								</TouchableOpacity>
							)
						})
					}
                  	
					
                  	</ScrollView>
					</View>
          	<ScrollView contentInsetAdjustmentBehavior="automatic" style={[styles.scrollview_section, {marginLeft: width*0.35}]}>
		          	
                  	
                  	<ScrollView contentInsetAdjustmentBehavior="automatic"  style={[styles.header_section, {marginBottom: 100,width: '100%', backgroundColor: '#ddd', paddingTop: 0}]}>
					<View style={[styles.header_section, {marginBottom: 100,width: '100%', backgroundColor: '#ddd', paddingTop: 0, alignItems: 'center', flexDirection: 'row',
    justifyContent: 'space-around'}]}>
                  		{
							(this.state.progess_product) ? <View style={[globalStyles.mainLoader, globalStyles.loader,{width: width*0.65, height: height - 200 }]}><ActivityIndicator size="large" color="#5ab9f5" /></View> :
						<View style={[styles.header_section, {width: width*.65,backgroundColor: '#ddd', paddingLeft: 10,paddingRight: 10,paddingTop: 10}]}>
						{
						this.state.cas.map((val, index) => {
							if(val.products.data.length > 0){
							return (
							<CasItem navigation={this.props.navigation} title={val.title} id={val.id} products={val.products.data}/>
						)
						}else{
							return (
							<CasItemTow navigation={this.props.navigation} title={val.title} products={val.categories}/>
							)
						}
						})
						}
						
						</View>
						}
						 
						</View>
                  	</ScrollView>
					
                  	
						
                 
          	</ScrollView>
          	<Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	wrapper:{
		flex: 1
	},
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
		minHeight: height - 200,
		
		
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
  	scrollview_brand:{
  		backgroundColor:'#fff',
  	},
  	brand_title_box:{
  		marginLeft:30,
  		marginRight:15,
  		alignItems:'center',
  		marginTop:15,
  		paddingBottom:15,
  	},
  	brand_text:{
  		color:'#0f1738',
  		textTransform: 'uppercase',
  	},
  	scrollview_category:{
  		backgroundColor:'#5ab9f5',
  	},
  	category_title_box:{
  		
  		
  		
		justifyContent: 'center',
		height: 60,
		width: width*.35,
  	},
  	category_text:{
  		color:'#0f1738',
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
	scrollview_section:{
		
	},
    
    soft:{
    	paddingBottom:10,
    },
    
    left_soft:{
    	marginLeft:15,
    },
    right_soft:{
		top: 7,
    	marginLeft:15,
    	position:'absolute',
    	right:15,
		width: 110
    },
    bottom_bar:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    borderTopColor:'#e6e6e6',
	    borderTopWidth:2,
	    position:'absolute',
	    bottom:0,
	    backgroundColor:'#f8f8f8',
	    paddingBottom:40,
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