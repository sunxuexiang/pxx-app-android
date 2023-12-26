import React, { Component } from 'react'
import { StyleSheet, View,Text,Image, TouchableOpacity } from 'react-native';
import { Relax, msg } from 'plume2';
import { mainColor, screenHeight, screenWidth } from 'wmkit/styles/index';
import { config } from 'wmkit/config';
import * as Button from 'wmkit/button';
import * as share from 'wmkit/share';
const SubmitButton = Button.Submit;

@Relax
export default class InviteFriends extends Component {
  static relaxProps = {
    h5Url: 'h5Url',
    jobNo: 'jobNo'
  };

  render() {
    return (
      <View style={styles.btnBlock}>
        <TouchableOpacity
          style={styles.btnBox}
          onPress={() => this.shareToFriends()}
        >
          <Image source={require('../img/invite-btn.png')} style={styles.shareBtn} resizeMode="stretch"/>
          {/* <SubmitButton
            disabled={false}
            text="邀请微信好友"
            aotuFixed={true}
            boxStyle={{ marginRight: 4 }}
            btnStyle={{backgroundColor: '#FFE766FF',borderRadius: 18}}
            btnTextStyle={{color:'#000'}}
            isLinear={false}
            onClick={() => this.shareToFriends()}
          />
        </View>
          /> */}
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * 分享到朋友
   */
  shareToFriends = () => {
    const { h5Url ,jobNo} = this.props.relaxProps;
    share.shareToFriends({
      url: `${h5Url}/pages/package-A/login/register/index?jobNo=${jobNo}`,
      title: '我在超级大白鲸厂家直卖平台找到了靠谱的货源',
      description: '特别低价的平台分享给你，让生活变得更简单哦～',
      imgUrl: 'https://m.cjdbj.cn/static/images/beluga.jpg'
    });
  };
}
const styles = StyleSheet.create({
  btnBlock:{
    alignItems: 'center',
  },
  btnBox: {
    position:'absolute',
    bottom:screenHeight / 13,
    // left:0,
    flexDirection: 'row',
    // width:'80%'
  },
  shareBtn:{
    width:screenWidth * 0.8,
    height:70
  }
});
