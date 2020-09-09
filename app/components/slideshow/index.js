import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, View, Button} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {colors, images,globalStyles} from '../../configs/index';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.params,
    };
	
	
  }
	
  render() {
    return (
     <View style={styles.blockSlider}>
      
        <SliderBox
          images={this.state.images}
          sliderBoxHeight={440*width/1070}
          autoplay={true}
          dotStyle={{top: 30}}
          dotColor={colors.primaryColor}
        />
    <Text>
      
    </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blockSlider: {
    marginBottom:10,
    width: width,
  }
});
