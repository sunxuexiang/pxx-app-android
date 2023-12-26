import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Header from 'wmkit/header';
import { mainColor } from 'wmkit/styles/index';
import { StoreProvider } from 'plume2';

import AppStore from './store';
import MemberTop from './component/member-top';
import Interest from './component/interest';

const Container = styled.View`
  flex: 1;
  background-color: #fafafa;
`;
const TouchBtn = styled.TouchableOpacity`
  height: 45;
  border-color: ${mainColor};
  border-width: 1;
  align-items: center;
  justify-content: center;
  padding-left: 40;
  padding-right: 40;
  margin-top: 15;
  margin-left: 15;
  margin-right: 15;
  margin-bottom: 30;
`;
const BtnText = styled.Text`
  font-size: 16;
  color: ${mainColor};
`;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class StoreMember extends React.Component {
  store;

  componentDidMount() {
    const state = this.props.route;
    const { storeId } = (state && state.params) || {};
    this.store.init(storeId);
  }

  render() {
    return (
      <Container>
        <Header title="店铺会员" />

        <ScrollView>
          <MemberTop />

          <Interest />
            <TouchBtn
              activeOpacity={0.6}
              onPress={() =>
                this.store.contact(
                  this.store.state().getIn(['store', 'contactMobile'])
                )
              }
            >
              <BtnText allowFontScaling={false}>联系商家</BtnText>
            </TouchBtn>
        </ScrollView>
      </Container>
    );
  }
}
