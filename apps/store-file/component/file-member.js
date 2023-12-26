import React, { Fragment } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Relax } from 'plume2';
import styled from 'styled-components/native';
import { noop } from 'wmkit/noop';
import LinearGradient from 'react-native-linear-gradient';
import { mainColor } from 'wmkit/styles/index';

const MemberBg = styled.ImageBackground`
  height: 120;
  width: 100%;
  border-radius: 6;
  overflow: hidden;
  padding-left: 16;
  padding-top: 20;
  padding-bottom: 20;
`;
const MemberBg2 = styled.ImageBackground`
  height: 17;
  width: 42;
  align-items: center;
  margin-left: 8;
  margin-bottom: 11;
`;
const LeverBg = styled.ImageBackground`
  height: 120;
  width: 160;
  justify-content: center;
  align-items: center;
`;

const Discount = styled.View``;

const LeverText1 = styled.Text`
  color: #fff;
  font-size: 28;
  background-color: transparent;
`;

const LeverText2 = styled.Text`
  color: #fff;
  font-size: 10;
  background-color: transparent;
`;

const NameBox = styled.View``;

const NameText1 = styled.Text`
  color: #fff;
  font-size: 14;
  line-height: 14;
  background-color: transparent;
`;

const NameText2 = styled.Text`
  color: #f60;
  font-size: 12;
  line-height: 14;
  background-color: transparent;
`;
const NameText3 = styled.Text`
  color: #fff;
  font-size: 12;
  line-height: 14;
  background-color: transparent;
`;

const NoMemberBg = styled.ImageBackground`
  height: 120;
  width: 100%;
  border-radius: 6;
  overflow: hidden;
  padding-left: 16;
  padding-top: 20;
  padding-bottom: 20;
`;

const Tips1 = styled.Text`
  color: #fff;
  font-size: 28;
  background-color: transparent;
  line-height: 28;
  margin-top: 12;
  margin-bottom: 12;
`;

const Tips2 = styled.Text`
  color: #fff;
  font-size: 12;
  line-height: 14;
  background-color: transparent;
`;

const DashLine = styled.Image`
  height: 1;
  width: 120;
  background-color: transparent;
  padding-left: 35;
  padding-right: 35;
`;

const hairlineWidth = StyleSheet.hairlineWidth;

const Container = styled.View`
  background-color: #fff;
  border-top-width: ${hairlineWidth};
  border-bottom-width: ${hairlineWidth};
  border-color: #ebebeb;
  margin-top: 12;
  border-radius: 6;
  overflow: hidden;
`;
const Tips = styled.Text`
  color: #985B31;
  margin-top: 12;
  line-height: 22;
  font-size; 14;
`;
const DataTable = styled.View`
  margin-top: 12;
  margin-bottom: 12;
`;

const TableTop = styled.View`
  border-top-width: ${hairlineWidth};
  border-bottom-width: ${hairlineWidth};
  border-color: #ebebeb;
`;
const TopText = styled.Text`
  text-align: center;
  color: #666;
  line-height: 18;
  font-size: 14;
`;
const TableContent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: 16;
  padding-right: 16;
  background-color: #fff;
  justify-content: space-between;
`;
const ContentText = styled.Text`
  text-align: left;
  font-size: 14;
  color: rgba(0,0,0,0.8)
  margin-top: 16
`;
const ContentSmallText = styled.Text`
  text-align:right;
  font-size: 14;
  color: rgba(0, 0, 0, 0.8);
`;

const TouchBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 36;
  border-radius: 18;
`;
const BtnText = styled.Text`
  font-size: 14;
  color: #fff;
`;

@Relax
export default class FileMember extends React.Component {
  static relaxProps = {
    level: 'level',
    customerName: 'customerName',
    levelList: 'levelList',
    contact: noop,
    store: 'storeArchives',
    userInfo: 'userInfo' //用户消费信息
  };

  render() {
    const {
      level,
      store,
      customerName,
      levelList,
      contact,
      userInfo
    } = this.props.relaxProps;
    // 是否是自营店铺
    let isSelf = store.get('companyType') === 0 ? true : false;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1,  flexDirection: 'column',backgroundColor: '#f5f5f5' }}>
          <View style={{  padding: 12 }}>
            {level && level.size > 0 ? (
              <MemberBg source={require('../img/bgs.png')}>
                <View>
                  <NameText1 key={1} allowFontScaling={false} numberOfLines={1}>
                    {customerName}
                  </NameText1>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 12,
                      marginBottom: 12,
                      height: 28,
                      alignItems: 'center'
                    }}
                  >
                    <Discount>
                      <LeverText1 allowFontScaling={false}>
                        {isSelf
                          ? parseFloat(
                              userInfo.get('customerLevelDiscount') * 10
                            ).toFixed(1)
                          : (
                              parseFloat(
                                userInfo.getIn(['storeLevelVO', 'discountRate'])
                              ) * 10
                            ).toFixed(1)}
                        <LeverText2 allowFontScaling={false}>折</LeverText2>
                      </LeverText1>
                    </Discount>
                    <MemberBg2 source={require('../img/level.png')}>
                      <NameBox>
                        <NameText2 allowFontScaling={false} numberOfLines={1}>
                          {isSelf
                            ? userInfo.get('customerLevelName')
                            : userInfo.getIn(['storeLevelVO', 'levelName'])}
                        </NameText2>
                      </NameBox>
                    </MemberBg2>
                  </View>
                  <NameText3 key={2} allowFontScaling={false} numberOfLines={1}>
                    {isSelf
                      ? `成长值:${userInfo.get('customerGrowthValue') || 0} `
                      : `当前购物 ${userInfo.get('totalOrder') ||
                          0}笔 消费${userInfo.get('totalAmount') || 0}元`}
                  </NameText3>
                </View>
              </MemberBg>
            ) : (
              <NoMemberBg source={require('../img/nonebgs.png')}>
                <NameText1 key={1} allowFontScaling={false} numberOfLines={1}>
                  {customerName}
                </NameText1>
                <Tips1 allowFontScaling={false}>非会员</Tips1>
                <Tips2 allowFontScaling={false}>您可联系商家成为会员</Tips2>
              </NoMemberBg>
            )}
            <Container>
              <LinearGradient
                colors={['#FFEEDB', '#FFD8C2']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ padding: 16 }}
              >
                <Text
                  allowFontScaling={false}
                  style={{ color: '#985B31', fontSize: 16 }}
                >
                  会员权益
                </Text>
                <Tips allowFontScaling={false}>
                  {isSelf
                    ? '您享受平台会员等级对应的商品折扣率，会员等级根据成长值自动升级，成长值获取规则请至个人中心查看'
                    : '成为该店铺的会员，可以享受该店铺会员等级对应的商品折扣率，当商家未按照会员等级设置价格或者单独指定了您的采购价时，商品折扣率不生效。'}
                </Tips>
              </LinearGradient>
            </Container>
            <DataTable>
              <TableTop>
                <LinearGradient
                  colors={['#F0F0F0', '#E6E6E6']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 12,
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                    paddingHorizontal: 16,
                    justifyContent: 'space-between'
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <TopText allowFontScaling={false}>会员等级</TopText>
                    <TopText
                      style={{ marginLeft: 32 }}
                      allowFontScaling={false}
                    >
                      折扣
                    </TopText>
                  </View>
                  <TopText allowFontScaling={false}>
                    {isSelf ? '所需成长值' : '升级规则'}
                  </TopText>
                </LinearGradient>
              </TableTop>
              <View style={{ paddingBottom: 16, backgroundColor: '#fff' }}>
                {levelList
                  ? levelList.toJS().map((level) => (
                      <View key={level.customerLevelName}>
                        <TableContent key={Math.random()}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: 116
                            }}
                          >
                            <ContentText
                              allowFontScaling={false}
                              numberOfLines={1}
                              style={{width:'50%'}}
                            >
                              {level.customerLevelName}
                            </ContentText>
                            <ContentText
                              allowFontScaling={false}
                              numberOfLines={1}
                              style={{marginLeft:32}}
                            >
                              {(
                                parseFloat(level.customerLevelDiscount) * 10
                              ).toFixed(1)}
                            </ContentText>
                          </View>
                          {isSelf ? (
                            <ContentText allowFontScaling={false}>
                              {level.growthValue}
                            </ContentText>
                          ) : (
                            <ContentSmallText allowFontScaling={false}>
                              {this.renderColumn(level)}
                            </ContentSmallText>
                          )}
                        </TableContent>
                      </View>
                    ))
                  : null}
              </View>
            </DataTable>
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 10
          }}
        >
          <TouchBtn activeOpacity={0.6} onPress={() => contact()}>
            <LinearGradient
              colors={[mainColor, mainColor]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                flexDirection: 'row',
                width: '100%'
              }}
            >
              <BtnText allowFontScaling={false}>联系商家</BtnText>
            </LinearGradient>
          </TouchBtn>
        </View>
      </View>
    );
  }

  renderColumn = (rowInfo) => {
    let orderConditions = rowInfo.orderConditions
      ? '购物满' + rowInfo.orderConditions + '笔'
      : '';
    let amountConditions = rowInfo.amountConditions
      ? '消费' + rowInfo.amountConditions + '元'
      : '';
    if (orderConditions == '' || amountConditions == '') {
      return <Fragment> {orderConditions + amountConditions}</Fragment>;
    }
    return (
      <Fragment>
        {' '}
        {orderConditions}
        <Text allowFontScaling={false}>
          {'\n'} 或{amountConditions}
        </Text>
      </Fragment>
    );
  };
}
