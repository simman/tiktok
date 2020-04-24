import React, { useState, useEffect, Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image as RNImage,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';

const coverSize = 50;
const avatarSize = 30;

class Cover extends Component {
  constructor(props) {
    super(props);
    this.bounceValue = new Animated.Value(1);
    this.rotateValue = new Animated.Value(0);
    // this.transformValue = new Animated.ValueXY(0);
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    this.bounceValue.setValue(1);
    this.rotateValue.setValue(0);
    Animated.parallel([
      Animated.spring(this.bounceValue, {
          toValue: 1,
          friction: 20,
          useNativeDriver: true,
      }),
      Animated.timing(this.rotateValue, {
          toValue: 1,
          duration: 15000,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true,
      }),
    ]).start(() => this.startAnimation());
  }

  render () {
    const { containerStyle, avatar, } = this.props;

    return (
      <View style={StyleSheet.flatten([{ flex: 1, }, containerStyle, {  }])}>
        <ImageBackground source={require('../images/music_cover.png')} style={styles.imgbg}>
          <Animated.Image
            source={{uri: avatar}}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              transform: [
              {scale: this.bounceValue},
              {rotateZ: this.rotateValue.interpolate({
              inputRange: [0,1],
              outputRange: ['0deg', '360deg'],
              })},
              ]
            }}
          />
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgbg: {
    flex: 1,
    height: coverSize,
    width: coverSize,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Cover;
