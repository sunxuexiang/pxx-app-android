import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { msg, Relax } from 'plume2';
import LinearGradient from 'react-native-linear-gradient';

import styled from 'styled-components/native';
import * as WMkit from 'wmkit/kit';
import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util';
import { screenWidth, mainColor } from 'wmkit/styles/index';

const defaultImg = require('../img/defalutShop.png');
const isAndroid = Platform.OS === 'android';
const StoreHeader = styled.ImageBackground`
  padding-top: ${isAndroid ? 0 : _.isIphoneX() ? 35 : 20}  
  height: ${isAndroid ? 95 : _.isIphoneX() ? 125 : 110} 
  width: 100% 
`;
const Bar = styled.View` 
  flex-direction: row 
  align-items: center 
  justify-content: space-between 
`;

const LeftImg = styled.Image`
  height: 19 
  width: 11 
  margin-right: 20 
`;
const RightImg = styled.Image`
  height: 20 
  width: 20
  tint-color: #fff 
  margin-left: 16
`;
const Content = styled.View`
  height: 28 
  padding-top: 5 
  padding-bottom: 5 
  padding-left: 8 
  padding-right: 8 
  background-color: #ffffff 
  flex-direction: row 
  align-items: center 
  flex: 1 
  border-radius: 3 
  overflow: hidden 
`;
const Icon = styled.Image`
  width: 20 
  height: 20 
`;
const MainText = styled.Text`
  color: #ffffff 
  font-size: 10  
`;
const RightBox = styled.TouchableOpacity`
  margin-left: 10 
  align-items: center 
  flex-direction: row
  background-color:  #fff
  padding-left: 12
  padding-right: 12
  padding-top: 8
  padding-bottom: 8
  border-radius: 14
  margin-right: 16
`;
const RightBox2 = styled.TouchableOpacity`
  margin-left: 10 
  align-items: center 
  flex-direction: row
  border-width: 1
  border-color: #fff
  padding-left: 12
  padding-right: 12
  padding-top: 8
  padding-bottom: 8
  border-radius: 14
  margin-right: 20
`;
const Navs = styled.TouchableOpacity`
  align-items: center 
  flex-direction: row
`;
const Logo = styled.TouchableOpacity``;
const LogoImg = styled.Image`
  width: 48 
  height: 48 
  resizeMode: stretch
`;
const Contents = styled.View`
  flex-direction: row;
`;
const StoreBottom = styled.View`
  flex-direction: column 
  align-items:flex-start
  margin-left: 12
`;
const NameBox = styled.View`
  flex-direction: row 
  margin-top:8
  justify-content: flex-start
`;
const StoreText = styled.Text`
  height: 16
  color: #fff
  max-width:  ${(props) =>
    props.primary ? screenWidth - 180 : screenWidth - 160}
`;
const EvaluateText = styled.Text`
  color: #fff
  font-size: 12
`;
const TouchFollow = styled.TouchableOpacity`
  align-items: center  
  height: 40 
  width: 50
  justify-content: center 
  align-self: center 
`;
const Container = styled.View`
  flex-direction: row
  padding-left: 12
  padding-right: 12
  padding-top: 16
  padding-bottom: 16
  justify-content: space-between
`;
const Box = styled.View`
  padding-left: 4
  padding-right: 4
  padding-top: 2
  padding-bottom: 2
  border-width: 1
  border-color:#fff
  border-radius: 8
  margin-right: 4
`;
const FollowImg = styled.Image`
  width: 12
  height: 12
  margin-right:4
`;
const FollowText = styled.Text`
  color: ${mainColor}
  font-size: 10
`;
const FollowText2 = styled.Text`
  color: #fff
  font-size: 10
`;

@Relax
export default class SearchBar extends React.Component {
  static relaxProps = {
    store: 'store',
    follow: noop,
    unfollow: noop,
    isShow: 'isShow',
    handClick: noop,
    menuList: 'menuList'
  };

  constructor(props) {
    super(props);
    this.state = {
      isMenuBoxFlag: false
    };
  }
  render() {
    const {
      store,
      isShow,
      menuList,
      handClick
    } = this.props.relaxProps;
    // console.log(menuList, '666');
    let compositeScore = 5;
    if (store.get('storeEvaluateSumVO')) {
      const sumCompositeScore = store.getIn([
        'storeEvaluateSumVO',
        'sumCompositeScore'
      ]);
      compositeScore = sumCompositeScore == 0 ? 5 : sumCompositeScore;
    }

    return [
      <LinearGradient
        colors={[mainColor, mainColor]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Container>
          <Contents>
            <Logo activeOpacity={0.6}>
              <LogoImg
                source={
                  store.get('storeLogo')
                    ? { uri: store.get('storeLogo') }
                    : defaultImg
                }
              />
            </Logo>

            <StoreBottom key={2}>
              <StoreText
                primary={store.get('companyType') == 0}
                allowFontScaling={false}
                numberOfLines={1}
              >
                {store.get('storeName')}
              </StoreText>
              <NameBox>
                {store.get('companyType') == 0 && (
                  <Box>
                    <MainText>自营</MainText>
                  </Box>
                )}
                {isShow ? (
                  <EvaluateText allowFontScaling={false} numberOfLines={1}>
                    综合评分 {compositeScore.toFixed(2)}
                  </EvaluateText>
                ) : null}
              </NameBox>
            </StoreBottom>
          </Contents>
          <Contents>
            <Bar>
              {store.get('isFollowed') ? (
                <RightBox2 activeOpacity={1} onPress={this._clickAttention}>
                  <FollowText2 allowFontScaling={false}>已关注</FollowText2>
                </RightBox2>
              ) : (
                <RightBox activeOpacity={1} onPress={this._clickAttention}>
                  <FollowImg source={require('../img/love.png')} />
                  <FollowText allowFontScaling={false}>关注</FollowText>
                </RightBox>
              )}
              <TouchableWithoutFeedback
                onPress={() =>
                  msg.emit('router: goToNext', {
                    routeName: 'StoreSearch',
                    storeId: store.get('storeId')
                  })
                }
              >
                <Icon source={require('../img/searchs.png')} />
              </TouchableWithoutFeedback>
              {menuList.length > 0 && (
                <Navs activeOpacity={0.6} onPress={handClick}>
                  <RightImg source={require('../img/more.png')} />
                </Navs>
              )}
            </Bar>
          </Contents>
        </Container>
      </LinearGradient>
    ];
  }
  /**
   * 关注/取消
   */
  _clickAttention = () => {
    if (WMkit.isLoginOrNotOpen()) {
      const { follow, unfollow, store } = this.props.relaxProps;
      if (store.get('isFollowed')) {
        unfollow(store.get('storeId'));
      } else {
        follow(store.get('storeId'));
      }
    } else {
      msg.emit('loginModal:toggleVisible', {
        callBack: () => {
          msg.emit('router: refresh');
        }
      });
    }
  };
}

// const styles=StyleSheet.create({
//   container:{
//     flexDirection:'row'
//   }
// })
