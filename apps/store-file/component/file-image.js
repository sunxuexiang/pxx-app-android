import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';

import { Relax } from 'plume2';

@Relax
export default class FileImage extends React.Component {
  static relaxProps = {
    storeArchives: 'storeArchives',
    changeAnnexMask: noop
  };

  render() {
    const { storeArchives, changeAnnexMask } = this.props.relaxProps;
    const licences = storeArchives.get('businessLicence');
    const cates = storeArchives.get('catePicList');
    const brands = storeArchives.get('brandPicList');
    return (
      <Container>
        {licences ? (
          <FileItems>
            <Title allowFontScaling={false}>营业执照</Title>
            <ImgScroll horizontal={true}>
              <TouchableOpacity
                key={Math.random()}
                activeOpacity={0.6}
                onPress={() => {
                  changeAnnexMask(0, 2);
                }}
              >
                <Img src={licences} />
              </TouchableOpacity>
            </ImgScroll>
          </FileItems>
        ) : null}

        {cates && cates.size != 0 ? (
          <FileItems>
            <Title allowFontScaling={false}>经营资质</Title>
            <ImgScroll horizontal={true} showsHorizontalScrollIndicator={false}>
              {cates.toJS().map((cate, index) => (
                <TouchableOpacity
                  key={Math.random()}
                  activeOpacity={0.6}
                  onPress={() => {
                    changeAnnexMask(1, index);
                  }}
                >
                  <Img src={cate} />
                </TouchableOpacity>
              ))}
            </ImgScroll>
          </FileItems>
        ) : null}

        {brands && brands.size != 0 ? (
          <FileItems>
            <Title allowFontScaling={false}>品牌经营资质</Title>
            <ImgScroll horizontal={true}>
              {brands.toJS().map((brand, index) => (
                <TouchableOpacity
                  key={Math.random()}
                  activeOpacity={0.6}
                  onPress={() => {
                    //changeAnnexMask(2, index);
                  }}
                >
                  <Img src={brand} zoom/>
                </TouchableOpacity>
              ))}
            </ImgScroll>
          </FileItems>
        ) : null}
      </Container>
    );
  }
}

const hairlineWidth = StyleSheet.hairlineWidth;

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
  padding-top:12
`;

const FileItems = styled.View`
  background-color: #ffffff;
  padding-left: 12;
  margin-bottom: 10;
`;

const ImgScroll = styled.ScrollView`
  background-color: #ffffff;
`;

const Img = styled(WMImage)`
  border-width: ${hairlineWidth};
  border-color: #ebebeb;
  width: 112;
  height: 112;
  margin-top: 12;
  margin-bottom: 12;
  margin-right: 7
`;

const Title = styled.Text`
  flex: 1;
  font-size: 16;
  margin-top:16;
  margin-bottom:16
`;
