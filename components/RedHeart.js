import React, {
  useEffect,
} from 'react';
import PropTypes from "prop-types";
import {
    Animated,
} from 'react-native';

const RedHeart = React.memo((props) => {
  const {x, y} = props;
  const anim = new Animated.Value(0);
  const rotateVal = randomRotate();

  useEffect(() => {
    Animated.sequence([
      Animated.spring(
        anim,
        {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 5,
        }
      ),
      Animated.timing(
        anim,
        {
          toValue: 5,
          useNativeDriver: true,
        }
      )
    ]).start(()=>{
      props.onEnd && props.onEnd()
    });
  }, []);

  return <Animated.Image
      style={{
          position:'absolute',
          left: x,
          top: y,
          opacity: anim.interpolate({
            inputRange:[0, 1, 2],
            outputRange:[1, 1, 0],
          }),
          transform: [{
            scale: anim.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 0.8, 2],
            })
          },{
            rotate: rotateVal
          }]
      }}
      source={require('../images/bfw.png')}
  />
}, () => true);

const randomRotate = () =>{
    const ROTATES = ['-35deg','-25deg','0deg','25deg','35deg'];
    return ROTATES[Math.floor(Math.random() * 4)];
}

RedHeart.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onEnd: PropTypes.func.isRequired,
}

export default RedHeart;
