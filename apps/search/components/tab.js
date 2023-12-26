import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import styled from 'styled-components/native';
import { mainColor } from 'wmkit/styles/index';

const isAndroid = Platform.OS === 'android';
const hairlineWidth = StyleSheet.hairlineWidth;
const TabCon = styled.View`
  background-color: #fff
  height: 40
  border-color: #ebebeb
  flex-direction: row
  align-items: center
  justify-content: space-around
`;
const TouchNav = styled.View`
  height: 38
  justify-content: center
  margin-left: 5
  margin-right: 5
`;
const ItemTouch = styled.TouchableOpacity`
  border-left-width: 50
  border-left-color: transparent
  border-right-width: 50
  border-right-color: transparent
`;
const TouchView = styled.View`
  border-bottom-width: 2
  border-bottom-color: ${(props) => (props.primary ? mainColor : 'transparent')}
  padding-left: 8
  padding-right: 8
`;
const ItemText = styled.Text`
  color: ${(props) => (props.primary ? mainColor : '#333333')}
  font-size: 12
  padding-top: ${isAndroid ? 10 : 12}
  padding-bottom: ${isAndroid ? 10 : 12}
`;

@Relax
export default class SearchTab extends React.Component {
  static relaxProps = {
    key: 'key',
    tabActive: noop
  };

  render() {
    const { key } = this.props.relaxProps;

    return (
      <TabCon>
        <TouchNav>
          <ItemTouch
            activeOpacity={0.8}
            primary={key === 'goods'}
            onPress={() => this._tabActive('goods')}
          >
            <TouchView primary={key === 'goods'}>
              <ItemText primary={key === 'goods'} allowFontScaling={false}>
                货品
              </ItemText>
            </TouchView>
          </ItemTouch>
        </TouchNav>
        <TouchNav>
          <ItemTouch
            activeOpacity={0.8}
            primary={key === 'supplier'}
            onPress={() => this._tabActive('supplier')}
          >
            <TouchView primary={key === 'supplier'}>
              <ItemText primary={key === 'supplier'} allowFontScaling={false}>
                商家
              </ItemText>
            </TouchView>
          </ItemTouch>
        </TouchNav>
      </TabCon>
    );
  }

  _tabActive = (k) => {
    const { tabActive } = this.props.relaxProps;
    tabActive(k);
  };
}
