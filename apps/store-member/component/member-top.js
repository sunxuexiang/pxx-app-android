import React from 'react';
import styled from 'styled-components/native';
import { Relax } from 'plume2';

const MemberBg = styled.ImageBackground`
  height: 220;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LeverBg = styled.ImageBackground`
  height: 180;
  width: 180;
  justify-content: center;
  align-items: center;
`;

const Discount = styled.View`
  border-bottom-width: 1;
  border-bottom-color: #98d1f6;
  align-items: center;
  border-style: dashed;
`;

const LeverText1 = styled.Text`
  color: #fff;
  font-size: 50;
  background-color: transparent;
  padding-left: 15;
  padding-right: 15;
`;

const LeverText2 = styled.Text`
  color: #fff;
  font-size: 15;
  background-color: transparent;
`;

const NameBox = styled.View`
  align-items: center;
  margin-top: 8;
`;

const NameText1 = styled.Text`
  color: #fff;
  font-size: 13;
  background-color: transparent;
  padding-left: 25;
  padding-right: 25;
`;

const NameText2 = styled.Text`
  color: #fff;
  font-size: 14;
  margin-top: 8;
  background-color: transparent;
  padding-left: 35;
  padding-right: 35;
`;

const NoMemberBg = styled.ImageBackground`
  height: 158;
  width: 348;
  justify-content: center;
  align-items: center;
`;

const Tips1 = styled.Text`
  color: #fff;
  font-size: 13;
  margin-top: 8;
  background-color: transparent;
  padding-left: 35;
  padding-right: 35;
`;

const Tips2 = styled.Text`
  color: #fff;
  font-size: 14;
  margin-top: 8;
  background-color: transparent;
  padding-left: 35;
  padding-right: 35;
`;

const DashLine = styled.Image`
  height: 1;
  width: 120;
  background-color: transparent;
  padding-left: 35;
  padding-right: 35;
`;

@Relax
export default class MemberTop extends React.Component {
  static relaxProps = {
    level: 'level',
    customerName: 'customerName'
  };

  render() {
    const { level, customerName } = this.props.relaxProps;
    return (
      <MemberBg source={require('../img/bg.png')}>
        {level && level.size > 0 ? (
          <LeverBg source={require('../img/round.png')}>
            <Discount>
              <LeverText1 allowFontScaling={false}>
                {(parseFloat(level.get('customerLevelDiscount')) * 10).toFixed(
                  1
                )}
                <LeverText2 allowFontScaling={false}>&nbsp;&nbsp;折</LeverText2>
              </LeverText1>
            </Discount>
            <DashLine source={require('../img/dashline.png')} />
            <NameBox>
              <NameText1 allowFontScaling={false} numberOfLines={1}>
                {customerName}
              </NameText1>
              <NameText2 allowFontScaling={false} numberOfLines={1}>
                {level.get('customerLevelName')}
              </NameText2>
            </NameBox>
          </LeverBg>
        ) : (
          <NoMemberBg source={require('../img/noMember.png')}>
            <Tips1 allowFontScaling={false}>您还不是该店铺会员噢~</Tips1>
            <Tips2 allowFontScaling={false}>您可联系商家成为会员</Tips2>
          </NoMemberBg>
        )}
      </MemberBg>
    );
  }
}
