import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import CountDown from 'react-native-countdown-component';
import ListOne from './components/ListOne';
import ListTow from './components/ListTow';
export default class Flashsale extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      type:0,
      products:this.props.navigation.state.params.products,
      end:this.props.navigation.state.params.end,
      navigation: this.props.navigation,
    };
	
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
		          	
		              <View style={styles.section_flashsale}>
                  			<Image
							style={{width: width, height: 72*width/372}}
                    			source={require('./images/flsale-banner.png')}
                  			/>
             		</View>
                    
             		<View style={[styles.soft, {marginTop: 15}]}>
                  		<TouchableOpacity style={[styles.left_soft, {marginLeft: 25}]}>
                  			<View>
                  				
                  				<CountDown
        size={15}
        until={this.state.end}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#3191cf'}}
        digitTxtStyle={{color: '#3191cf'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#3191cf'}}
        timeToShow={['D', 'H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
                  			</View>
                  		</TouchableOpacity>
                  		<View style={styles.soft}>
                  		<TouchableOpacity style={styles.left_soft}>
                  			<Text>
                  				
                  				<Text>
                  					
                  				</Text>
                  			</Text>
                  		</TouchableOpacity>
                  		<View style={styles.right_soft}>
                  			<Text style={{marginRight: 50}}>
                  				Sắp xếp
                  			</Text>
								
                  			
                  		</View>
						<View style={[styles.right_soft,{width:30, right: 40}]}>
								<TouchableOpacity style={{marginRight: 10}} onPress={() =>this.setState({type: 0})}>
                  					<Image
                                		source={require('./images/grid1.png')}
                              		/>
								</TouchableOpacity>	
                  		</View>		
                  		<View style={[styles.right_soft,{width:30, right: 10}]}>		
								<TouchableOpacity onPress={() =>this.setState({type: 1})}>
                  					<Image
                                		source={require('./images/grid2.png')}
                              		/>
								</TouchableOpacity>
                  		</View>			
                  	</View>
					{ 
						(!this.state.type) ?
						<ListOne navigation={this.props.navigation} products={this.state.products}/>
						: <ListTow navigation={this.state.navigation} products={this.state.products}/>
					}
                  	</View>
                  	
                 
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
  	},
	scrollview_section:{
		height: height - 65
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
  	soft:{
    	paddingBottom:10,
    },
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    left_soft:{
    	marginLeft:0,
		width: 150
    },
    right_soft:{
		top: -30,
    	marginLeft:15,
    	position:'absolute',
    	right:15,
		width: 110
    },
    item_section:{
  		marginLeft:15,
  		marginRight:15,
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginBottom:100,
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