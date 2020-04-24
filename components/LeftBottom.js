import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import RollTextView from './RollTextView'

let { height, width } = Dimensions.get("window")
const size = 45;

const LeftBottom = (props) => {
  const { nickName, desc, musicName, onNickNamePress, onMusicNamePress, } = props;

  return (
    <View
      pointerEvents={'box-none'}
      style={styles.container}
    >
      <TouchableOpacity style={{ marginBottom: 5, }}>
        <Text style={styles.nickName}>@{nickName}</Text>
      </TouchableOpacity>
      <View style={{width: width - 120 }}>
        <Text style={styles.desc} >{desc}</Text>
      </View>
      <View style={{alignItems: 'center', flexDirection: 'row', }}>
        <Image source={require('../images/icon_home_musicnote3.png')} style={{ width: 15, height: 15,}}/>
        <RollTextView
          textList = {[
            {label : '1',value : '@抖音官方原创音乐'},
            {label : '1',value : '@抖音官方原创音乐'},
            {label : '1',value : '@抖音官方原创音乐'},
          ]}
          speed = {60}
          width = {width/2}
          height = {25}
          direction = {'left'}
          reverse = {false}
          bgContainerStyle = {{ }}
          textStyle = {{fontSize : 13,color : 'white'}}
          onTextClick = {(item) => {
              alert(''+JSON.stringify(item));
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingBottom: 25,
  },
  nickName: {
    fontSize: 13,
    fontWeight: '800',
    color: 'white',
  },
  desc: {
    fontSize: 13,
    color: 'white',
    lineHeight: 18,
  }
})

LeftBottom.propTypes = {
  nickName: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  musicName: PropTypes.string,
  onNickNamePress: PropTypes.func,
  onMusicNamePress: PropTypes.func,
}

LeftBottom.defaultProps = {
}

export default LeftBottom;
