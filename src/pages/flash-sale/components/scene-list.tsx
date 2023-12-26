import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import * as T from '../types';

import actions from '../actions';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import * as _ from 'wmkit/common/util';
import { isAndroid, mainColor } from 'wmkit/styles/index';
import Carousel from 'react-native-snap-carousel';
import { msg } from 'plume2';
import LinearGradient from 'react-native-linear-gradient';
import NavList from './nav-list';
type ISceneListProps = T.IProps & T.ISceneListProps;

@connect<Partial<ISceneListProps>, T.ISceneListState>(
  store2Props,
  actions
)
export default class SceneList extends React.Component<
  Partial<ISceneListProps>,
  T.ISceneListState
> {
  constructor(props: ISceneListProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: { action },
      main
    } = this.props;
    const sceneList = main.sceneList;
    if (main.presentScene == null) {
      return null;
    }

    return (
      <View>
        {/*<Header title="限时抢购"/>*/}
        <LinearGradient
          colors={[mainColor, mainColor]}
          style={styles.sceneList}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.leftImg}
              onPress={() => this._handleBack()}
            >
              <Image style={styles.img} source={require('../img/back.png')} />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.title}>秒杀</Text>
            <Text allowFontScaling={false} style={styles.type} />
          </View>
          <NavList />
        </LinearGradient>
        {/* <View style={styles.contentContainer}>
          <Carousel
            data={sceneList}
            firstItem={main.presentScene} //要显示的第一个项的索引
            renderItem={(e) => this._renderItem(e)}
            sliderWidth={screenWidth}
            itemWidth={screenWidth / 5}
            inactiveSlideOpacity={1} //应用于非活动幻灯片的不透明效果的值
            inactiveSlideScale={1} //应用于非活动幻灯片的scale值
            // onSnapToItem={(data) => action.commonChange('main.presentScene', data)}
          />
        </View> */}
      </View>
    );
  }

  _renderItem({ item, index }) {
    let {
      actions: { action, changeActivity },
      main
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={async () => {
          await changeActivity(
            item.activityDate,
            item.activityTime,
            item.status
          );
          action.commonChange('main.presentScene', index);
        }}
      >
        <View
          style={[styles.scene, main.presentScene == index && styles.sceneType]}
        >
          <Text allowFontScaling={false} style={styles.sceneTime}>{item.activityTime}</Text>
          <Text allowFontScaling={false} style={styles.sceneStatus}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _handleBack() {
    if (this.props.onLeftMenuPress) {
      this.props.onLeftMenuPress();
    } else {
      msg.emit('router: back');
    }
  }
}

const styles = StyleSheet.create({
  sceneList: {
    flexDirection: 'column',
    borderBottomRightRadius:36,
    borderBottomLeftRadius:36,
    ..._.ifIphoneX(
      {
        paddingTop: 80,
        height: 226,
      },
      {
        height: isAndroid ? 196 : 206,
        paddingTop: isAndroid ? 45 : 45,
      }
    )
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  leftImg: {
    marginLeft: 15,
  },
  img: {
    width: 10,
    height: 18
  },
  title: {
    color: '#fff',
    fontSize: 18
  },
  type: {
    color: '#fff',
    marginRight: 15
  },
  contentContainer: {
    paddingBottom: 20
  },
  scene: {
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0.6,
    width: 80
  },
  sceneType: {
    opacity: 1
  },
  sceneTime: {
    fontSize: 20,
    color: '#fff'
  },
  sceneStatus: {
    fontSize: 12,
    color: '#fff'
  }
});
