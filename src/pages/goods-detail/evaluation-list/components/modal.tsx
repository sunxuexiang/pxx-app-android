import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

import * as _ from 'wmkit/common/util';
import Rating from 'wmkit/rating';
import Header from 'wmkit/header';

import { screenWidth, isAndroid, mainColor } from 'wmkit/styles/index';

type IModalProps = T.IProps & T.IModalProps;

@connect<Partial<IModalProps>, T.IModalState>(
  store2Props,
  actions
)
export default class Modal extends React.Component<
  Partial<IModalProps>,
  T.IModalState
> {
  constructor(props: IModalProps) {
    super(props);
  }

  componentDidMount() {
    let {
      actions: { action },
      main
    } = this.props;
    console.log(main);
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;
    const evaluate = main.bigImgList[main.bigImgIndex].goodsEvaluate;
    return (
      <View style={styles.modal}>
        <Header
          style={styles.header}
          renderLeft={() => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ paddingLeft: 10, paddingRight: 30 }}
                onPress={() => action.changeModal()}
              >
                <Image style={styles.img} source={require('../img/back.png')} />
              </TouchableOpacity>
            );
          }}
        />
        <StatusBar barStyle="light-content" />
        <Swiper
          onIndexChanged={async (index) => await action.changeIndex(index)}
          // style={isAndroid ? styles.wrapper : null}
          showsPagination={false}
          loop={true}
          index={main.bigImgIndex}
        >
          {main.bigImgList.map((source, key) => (
            <Image
              key={key}
              style={styles.imgList}
              source={{ uri: source.artworkUrl }}
            />
          ))}
        </Swiper>
        <View style={styles.evaluateContent}>
          <Rating rating={evaluate.evaluateScore} disabled={true} />
          <Text style={styles.whiteText} allowFontScaling={false}>
            {evaluate.specDetails}
          </Text>
          <ScrollView style={styles.evaScroll} bounces={true}>
            <Text style={styles.whiteText} allowFontScaling={false}>
              {evaluate.evaluateContent}
            </Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.giveLike}
            activeOpacity={0.8}
            onPress={() => {
              action.giveLike(evaluate.evaluateId);
            }}
          >
            <Image
              style={[
                styles.giveImg,
                main.goodsEvaluate.isPraise && { tintColor: mainColor }
              ]}
              source={require('../img/giveLike.png')}
            />
            <Text style={styles.whiteText} allowFontScaling={false}>
              &nbsp;
              {main.goodsEvaluate.goodNum}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
let evaImgWidth = (screenWidth - 50) / 4;
const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#000'
  },
  wrapper: {
    width: screenWidth,
    height: screenWidth
  },
  imgList: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'contain'
  },
  header: {
    backgroundColor: '#000',
    borderColor: '#000'
  },
  img: {
    width: 10,
    height: 18
  },
  evaImg: {
    width: screenWidth,
    height: screenWidth
  },
  evaluateContent: {
    padding: 15,
    alignItems: 'flex-start'
  },
  giveLike: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  giveImg: {
    width: 20,
    height: 20,
    tintColor: '#fff'
  },
  whiteText: {
    color: '#fff'
  },
  grayText: {
    color: '#999'
  },
  evaScroll: {
    maxHeight: 60
  }
});
