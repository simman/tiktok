/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  PanResponder,
} from 'react-native';
import Video from 'react-native-video';
const shortid = require('shortid');

import Avatar from './components/Avatar';
import Commend from './components/Commend';
import ImageButton from './components/ImageButton';
import CommentList from './components/CommentList';
import LeftBottom from './components/LeftBottom';
import Cover from './components/Cover';
import ActionSheet from './components/ActionSheet';
import Input from './components/Input';
import RedHeart from './components/RedHeart'

const mockData = require('./data.json').data

let { height, width } = Dimensions.get("window")

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      data: mockData,

      redHearts: [],

      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'cover',
      duration: 0.0,
      currentTime: 0.0,
      paused: false,

      onScrollToTop: true,
      bottom: 10,
    }
    this.videoRefs = [];
    this.actionSheet = React.createRef();
    this.tapStartTime = null
    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: this._onPanResponderGrant
    })
  }

  // Video Callback Function
  onLoad = () => {

  }

  onProgress = () => {

  }

  onEnd = () => {

  }

  onAudioBecomingNoisy = () => {

  }

  onAudioFocusChanged = () => {

  }

  onCommentsPress = () => {
    // this.Sheet.open()
    this.actionSheet.setModalVisible();
  }

  _onViewableItemsChanged = ({viewableItems, changed}) => {
    if(viewableItems.length === 1 && this.state.current !== viewableItems[0].index){
      this.setState({
          current: viewableItems[0].index,
          paused: false,
      })
      this.videoRefs[viewableItems[0].index].seek(0);
    }
  }

  _onPanResponderGrant = (ev)=>{
    if(!this.isDoubleTap()) {
      this.setState({paused: !this.state.paused})
      return;
    }
    const { pageX, pageY } = ev.nativeEvent

    this.setState(({redHearts})=>{
        redHearts.push({
            x: pageX - 60,
            y: pageY - 60,
            key: shortid.generate()
        })
        return {
            redHearts
        }
    })
  }

  isDoubleTap(){
    const curTime = +new Date()
    if(!this.tapStartTime || curTime - this.tapStartTime > 300) {
        this.tapStartTime = curTime
        return false
    }
    this.tapStartTime = null
    return true
  }

  renderItem = item => {
    const info = item.item
    return (
      <View>
        <View
        {...this._panResponder.panHandlers}
        // underlayColor={'transparent'}
        // activeOpacity={1}
        style={{ height, justifyContent: 'center', alignItems: 'center', }}
        // onPress={() => }
        >
          <Video
            ref={(ref) => {
                this.videoRefs[item.index] = ref
            }}
            source={{uri: info.video_url}}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={item.index == this.state.current ? this.state.paused : true}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={true}
          />
          {
            this.state.redHearts.map(({x, y, key}, index)=>{
              return <RedHeart
                onEnd={()=>{
                  // release
                  this.setState(({redHearts})=>{
                    redHearts.splice(index,1)
                    return {
                      redHearts
                    }
                  })
                }}
                key={key}
                x={x}
                y={y}
              />
            })
          }
        </View>

        {/** TODO:: Placehold Video Image */}
        {/* <TouchableOpacity
            style={{position: 'absolute', justifyContent:'center', alignItems: 'center', width:width, height:height, backgroundColor: 'pink',}}>
            <Image source={{uri: info.video_img}} style={{width:width, height:height,}}/>
        </TouchableOpacity> */}

        <Avatar avatar={info.avatar} containerStyle={{ position: 'absolute', right: 15, bottom: 330,}} size={50}/>
        <Commend containerStyle={{ position: 'absolute', right: 15, bottom: 240,}} count={info.statistics.zan} />
        <ImageButton containerStyle={{ position: 'absolute', right: 15, bottom: 170,}} imageUrl={require('./images/icon_home_comment.png')} count={info.statistics.comment} onPress={this.onCommentsPress}/>
        <ImageButton containerStyle={{ position: 'absolute', right: 15, bottom: 100,}} imageUrl={require('./images/icon_home_share.png')} count={info.statistics.share} />
        <Cover containerStyle={{ position: 'absolute', right: 15, bottom: 30,}} avatar={info.avatar} />
        <LeftBottom nickName={info.nickname} desc={info.desc} />
        {
          this.state.paused ?
            <TouchableOpacity
              style={{position: 'absolute', justifyContent:'center', alignItems: 'center', width:width, height:height, }}
              onPress={()=>{this.setState({ paused: !this.state.paused, })}}
            >
              <Image source={require('./images/paused.png')} />
            </TouchableOpacity>
          :null
        }

        {/* <View
          {...this._panResponder.panHandlers}
          style={{ position: 'absolute', width: width, height: height, }}>

        </View> */}

        <ActionSheet
          ref={ref => (this.actionSheet = ref)}
          footerHeight={65}
          extraScroll={120}
          gestureEnabled={this.state.onScrollToTop}
          CustomFooterComponent={
            <Input />
          }
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10, }}>
            <Text style={{ fontSize: 13, fontWeight: '800', }}>{info.comments.length}条评论</Text>
          </View>
          <CommentList
            comments={info.comments}
            onScroll={(isTop) => {
              this.setState({ onScrollToTop: isTop});
            }}
          />
        </ActionSheet>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <FlatList
          style={{ }}
          data={this.state.data}
          renderItem={this.renderItem}
          horizontal={false}
          pagingEnabled={true}
          getItemLayout={(data, index) => {
          return {length: height, offset: height * index, index}
          }}
          keyExtractor={(item, index) => index.toString()}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 80}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={this._onViewableItemsChanged}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

export default App;
