import React from 'react';
import { StyleSheet, View, Text, Image,ScrollView,TouchableOpacity } from 'react-native';
import * as T from '../types';

import actions from '../actions';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import LinearGradient from 'react-native-linear-gradient';
import { mainColor } from '@/wmkit/styles';
type ITimesProps = T.IProps & T.ITimesProps;

@connect<Partial<ITimesProps>, T.ITimesState>(
  store2Props,
  actions
)
export default class Times extends React.Component<Partial<ITimesProps>,
T.ITimesState> {

  _scroll;
  constructor(props: ITimesProps) {
    super(props);
  }

  componentDidUpdate() {
    this.scrollViewTo();
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollViewTo();
    }, 10);
  }

  render() {
    let {
      actions: { action, changeActivity },
      main
    } = this.props;
    return (
        <View style={
          styles.container
        }>
          <Image source={require('../img/logo.png')} style={styles.img} />
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} ref={(ref) => (this._scroll = ref)}>
            {main.sceneList.map((item, index) => {
              return (
                <TouchableOpacity activeOpacity={0.8} style={styles.item} key={item.cateId}
                onPress={async () => {
                  if (item.activityTime) {
                    item.activityTime && await changeActivity(
                      item.activityDate,
                      item.activityTime,
                      item.status
                    );
                    action.commonChange('main.presentScene', index);
                  }
                }}>
                  <Text allowFontScaling={false} style={[styles.sceneTime,main.presentScene == index && { color: mainColor }]}>{item.activityTime}</Text>
                  {main.presentScene == index && item.activityTime ?
                  <LinearGradient
                    colors={[mainColor, mainColor]}
                    style={styles.activeStatus}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                  >
                    <Text allowFontScaling={false} style={styles.activeStatusText}>{item.status}</Text>
                  </LinearGradient> :  <Text allowFontScaling={false} style={styles.sceneStatus}>{item.status}</Text>}


                </TouchableOpacity>
              );
            })}
          </ScrollView>

        </View>
    );
  }
  _changeScene(cateId) {
    this.props.actions.changeCate(cateId);
  }

  scrollViewTo = () => {
    let {
      main: { presentScene,sceneList }
    } = this.props;
    this._scroll && sceneList[presentScene].activityTime && this._scroll.scrollTo({ x: (presentScene - 1)*70, y: 0 });
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:16,
    marginBottom:20
  },
  img:{
    width:32,
    height:32,
    marginRight:16
  },
  item:{
    flexDirection:'column',
    alignItems:'center',
    marginRight:15,
    position:'relative',
    width:55
  },
  sceneTime:{
    fontSize:18,
    color:'#333',
    fontWeight:'bold'
  },
  sceneStatus:{
    fontSize:10,
    color:'#999',
  },
  activeStatus:{
    height:14,
    borderRadius:7,
    paddingHorizontal:4,

  },
  activeStatusText:{
    fontSize:10,
    color:'#fff',
  }
});
