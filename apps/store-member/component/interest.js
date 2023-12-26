import React from 'react';
import { Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Relax } from 'plume2';

const hairlineWidth = StyleSheet.hairlineWidth;

const Container = styled.View`
  background-color: #fff;
  border-top-width: ${hairlineWidth};
  border-bottom-width: ${hairlineWidth};
  border-color: #ebebeb;
  margin-top: 10;
  padding-left: 15;
  padding-right: 15;
  padding-top: 15;
  padding-bottom: 15;
`;
const Tips = styled.Text`
  color: #999;
  margin-top: 10;
  line-height: 18;
  font-size; 13;
`;
const DataTable = styled.View`
  margin-top: 10;
  line-height: 18;
  font-size: 13;
`;

const TableTop = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #fafafa;
  height: 30;
`;
const TopText = styled.Text`
  width: 50%;
  text-align: center;
  color: #666;
  font-size: 13;
`;
const TableContent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 36;
  border-bottom-width: ${hairlineWidth};
  border-color: #ebebeb;
`;
const ContentText = styled.Text`
  width: 50%;
  text-align: center;
  font-size: 13;
`;

@Relax
export default class Interest extends React.Component {
  static relaxProps = {
    levelList: 'levelList'
  };

  render() {
    const { levelList } = this.props.relaxProps;

    return (
      <Container>
        <Text allowFontScaling={false}>会员权益</Text>
        <Tips allowFontScaling={false}>
          成为该店铺的会员，可以享受该店铺会员等级对应的商品折扣率，当商家未按照会员等级设置价格或者单独指定了您的采购价时，商品折扣率不生效。
        </Tips>
        <DataTable>
          <TableTop>
            <TopText allowFontScaling={false}>会员等级</TopText>
            <TopText allowFontScaling={false}>折扣</TopText>
          </TableTop>
          {levelList
            ? levelList.toJS().map((level) => (
                <TableContent key={Math.random()}>
                  <ContentText allowFontScaling={false}>
                    {level.customerLevelName}
                  </ContentText>
                  <ContentText allowFontScaling={false}>
                    {(parseFloat(level.customerLevelDiscount) * 10).toFixed(1)}
                  </ContentText>
                </TableContent>
              ))
            : null}
        </DataTable>
      </Container>
    );
  }
}
