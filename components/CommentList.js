import React, { useState, useEffect, useRef, } from 'react';
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
  Dimensions,
  FlatList,
} from 'react-native';

// import {
//   PanGestureHandler,
//   TapGestureHandler,
//   PinchGestureHandler,
//   ScrollView,
//   State,
//   // FlatList
// } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const VIEWABILITY_CONFIG = {
	minimumViewTime: 30,
	viewAreaCoveragePercentThreshold: 10,
	waitForInteraction: true,
};

const CommentList = (props) => {
  const { containerStyle, comments, onScroll} = props;

  const flatListRef = useRef((change)=> {
    const { viewableItems } = change;
    if (viewableItems && viewableItems.lenght) {
      const firstItem = viewableItems[0];
      onScroll && onScroll(firstItem === 0)
    }
  })

  return (
    <View style={StyleSheet.flatten([{ flex: 1, height: 500,}, containerStyle])}>
      <FlatList
        style={{ flex: 1, }}
        data={comments}
        renderItem={(row) => {
          const { item } = row;
          return (
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, marginVertical: 5,}}>
              <View style={{  }} >
                <RNImage source={{ uri: item.avatar }} style={{ width: 28, height: 28, borderRadius: 28/2}}/>
              </View>
              <View style={{ marginHorizontal: 10, width: width - 90,}} >
                <Text style={{ fontSize: 13, color: 'black', }}>{item.nickname}</Text>
                <Text style={{ fontSize: 13, color: 'black', marginTop: 5, }}>{item.text}</Text>
              </View>
              <View style={{ alignItems: 'center', }} >
                <RNImage source={require('../images/icCommentLikeBefore.png')} style={{ height: 18, width: 18, }} />
                <Text style={{ fontSize: 11, color: 'gray',}}>{item.zan}</Text>
              </View>
            </View>
          )
        }}
        horizontal={false}
        pagingEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={flatListRef.current}
        viewabilityConfig={VIEWABILITY_CONFIG}
      />
    </View>
  )
}

export default CommentList;
