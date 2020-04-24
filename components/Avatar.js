import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image as RNImage,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing,
} from 'react-native';

// follow image default size
const FOLLOW_IMAGE_SIZE = 23;

const unFollowImage = require('../images/dgo.png');
const followedImage = require('../images/dk.png');

const Avatar = (props) => {
  const { avatar, containerStyle, avatarButtonStyle, size, avatarImageStyle, } = props;
  const followRotateValue = new Animated.Value(0);
  const followScaleValue = new Animated.Value(0);

  const [ followImage , setFollowImage, ] = useState(unFollowImage);
  const [ followVisable, setFollowVisable, ] = useState(true);

  onFollowPress = () => {
    followRotateValue.setValue(0);
    Animated.sequence([
      Animated.timing(
        followRotateValue,
        {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        followScaleValue,
        {
          toValue: 1,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }
      ),
    ]).start((r) => {
      setFollowImage(followedImage);
    });
  }

  useEffect(() => {
    if (followImage === followedImage) {
      setTimeout(() => {
        setFollowVisable(false);
      }, 400);
    }
  }, [followImage])

  return (
    <View style={StyleSheet.flatten([ styles.container, containerStyle, ])}>
      <TouchableHighlight style={StyleSheet.flatten([ styles.avatarButton, { borderRadius: size / 2, height: size, width: size, }, avatarButtonStyle, ])}>
        <RNImage source={{ uri: avatar }} style={StyleSheet.flatten([ { height: size - 2, width: size - 2, borderRadius: size / 2, }, avatarImageStyle, ])}/>
      </TouchableHighlight>
      { followVisable ?
      <TouchableOpacity
        style={styles.followButton}
        onPress={this.onFollowPress}
      >
        <Animated.Image
          source={followImage}
          style={{
            width: FOLLOW_IMAGE_SIZE,
            height: FOLLOW_IMAGE_SIZE,
            transform: [
              {
                rotate: followRotateValue.interpolate(
                  {
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }
                ),
              },
              {
                scale: followScaleValue.interpolate(
                  {
                    inputRange: [0, 1, 2],
                    outputRange: [1, 0.8, 2],
                  }
                ),
              }
            ],
          }}
        />
      </TouchableOpacity>
      : null }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButton: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
  },
});

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  containerStyle: PropTypes.any,
  avatarButtonStyle: PropTypes.any,
  size: PropTypes.number.isRequired,
  avatarImageStyle: PropTypes.any,
}

Avatar.defaultProps = {
  containerStyle: {},
  avatarButtonStyle: {},
  size: 50,
  avatarImageStyle: {},
}

export default Avatar;
