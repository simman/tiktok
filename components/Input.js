import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image as RNImage,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  TextInput,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';

const { width, height, } = Dimensions.get('window')

const defaultBottom = 45;
const inputHeight = 25;

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: defaultBottom,
    }
    this.transformValue = new Animated.Value(0);
  }

  componentDidMount() {
    Keyboard.addListener('keyboardWillShow', this.onKeyboardWillShow);
    Keyboard.addListener('keyboardWillHide', this.onKeyboardWillHide);
  }

  onKeyboardWillShow = (e) => {
    Animated.timing(this.transformValue, {
      toValue: e.endCoordinates.height,
      easing: Easing.bezier(.17,.59,.4,.77),
      duration: e.duration
    }).start()
  }

  // reset
  onKeyboardWillHide = (e) => {
    Animated.timing(this.transformValue, {
      toValue: 2,
      easing: Easing.bezier(.17,.59,.4,.77),
      duration: e.duration
    }).start()
  }

  render () {
    const { containerStyle, } = this.props;
    return (
        <Animated.View
          style={{
            flex: 1,
            position: 'absolute',
            bottom: this.transformValue,
          }}
        >
          <View style={{
              flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', width: width, height: 65, padding: 10,
              // borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'gray',
              shadowColor: "black",
              shadowOffset: { width: 0.3 * 5, height: 0.5 * 5 },
              shadowOpacity: 0.2,
              shadowRadius: 0.7 * 5,
              }}>
            <TextInput
              style={{
                zIndex: 999,
                height: inputHeight,
                padding: 5,
                marginTop: Platform.OS === 'ios' ? 3 : 0,
                fontSize: 13,
                alignSelf: "center",
                textAlignVertical: "center",
                width: width - 120,
                minHeight: 45,
                // borderWidth: 1,
                borderColor: '#f0f0f0',
                paddingHorizontal: 10,
                backgroundColor: 'white',
                margin: 10,
              }}
              multiline={true}
              returnKeyType={'send'}
              placeholder="有爱评论说点好听的～"
              onSubmitEditing={ () => alert(1) }
            />
            <TouchableOpacity style={{ margin: 5,}}>
              <RNImage source={require('../images/at.png')} style={{ width: 30, height: 30, }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 5,}}>
              <RNImage source={require('../images/b.png')} style={{ width: 30, height: 30, }} />
            </TouchableOpacity>
          </View>
        </Animated.View>
    )
  }
}

export default Input;
