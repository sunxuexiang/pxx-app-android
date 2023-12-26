import React, { Component } from 'react'
import {TouchableWithoutFeedback,Image,View, StyleSheet,Linking} from 'react-native';
import Swiper from 'react-native-swiper';
import { Relax, msg } from 'plume2';

@Relax
export default class CardCarousel extends Component {
  constructor(props) {
    super(props)
    
  }

  static relaxProps = {
    bannerList: 'bannerList',
  };

  
  render() {
    const {bannerList} = this.props.relaxProps;

    return (
      <View style={styles.container}>
        <Swiper
          height={140}
          dot={dot}
          activeDot={activeDot}
          loop={true}
        >
          {bannerList.toJS().map((item) => {
            if (item.isShow == 0) {
              return (
                // <TouchableWithoutFeedback id={item.id} onPress={()=>{Linking.openURL(item.link)}}>
                <TouchableWithoutFeedback id={item.id} onPress={()=>msg.emit('router: goToNext', {
                  routeName: 'SobotLink',
                  otherLink: true,
                  url:item.link
                })}>
                  {
                    item.bannerImg ? <Image style={styles.img} source={{uri:item.bannerImg}} /> : 
                    <Image style={styles.img} source={require('../img/defaultCateImg.png')} />
                  }
                </TouchableWithoutFeedback>
              );
            }
          })}
        </Swiper>
      </View>
    )
  }
}

const dot = (
  <View
    style={{
      backgroundColor: '#e6e6e6',
      width: 8,
      height: 8,
      marginLeft: 2,
      marginRight: 3,
      borderRadius:50,
      bottom:-20,
    }}
  />
);
const activeDot = (
  <View
    style={{
      backgroundColor: '#666',
      width: 8,
      height: 8,
      marginLeft: 2,
      marginRight: 3,
      borderRadius:50,
      bottom:-20,
    }}
  />
);
const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    position:'relative'
  },
  img:{
    width:'100%',
    height:140
  }
})