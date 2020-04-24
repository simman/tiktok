import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image as RNImage,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing,
} from 'react-native';
import format from '../utils/num'

const size = 45;

const ImageButton = (props) => {
  const { containerStyle, imageUrl, onPress, count, } = props;

  return (
    <View style={StyleSheet.flatten([{ flex: 1, }, containerStyle])}>
      <TouchableOpacity style={{ alignItems: 'center', }} onPress={onPress}>
        <RNImage source={imageUrl} resizeMode={'contain'} style={{ width: size, height: size, }} />
        <Text style={{ color: 'white', fontSize: 13, fontWeight: '600',}}>
          {format(count)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ImageButton;
