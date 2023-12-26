import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { Relax, msg } from 'plume2';
import WMImage from 'wmkit/image/index';
import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import { priceColor, screenWidth } from 'wmkit/styles/index';

@Relax
export default class List extends React.Component {
  static relaxProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const {} = this.props.relaxProps;
    let noneStock = true;
    return (
      <View style={styles.bigBox}>
        <TouchableOpacity
          key={1}
          activeOpacity={0.6}
          style={styles.bigView}
          onPress={() => {}}
        >
          <WMImage style={styles.bigImg} src={''} />
          <View style={styles.wrapper}>
            <View style={styles.tagCon}>
              <SelfSalesLabel />
              <Text
                style={[styles.title, noneStock && { color: '#999' }]}
                allowFontSacling={false}
                numberOfLines={1}
              >
                名称
              </Text>
            </View>
            <Text style={styles.gec} allowFontSacling={false} numberOfLines={1}>
              规格
            </Text>
            <View style={styles.rowFlex}>
              <View style={styles.tagCon}>
                <Text
                  allowFontSacling={false}
                  style={[{ color: priceColor }, noneStock && { color: '#bcbcbc' }]}
                >
                  ¥ 1299.00
                </Text>

                {noneStock && (
                  <View style={styles.lack}>
                    <Text allowFontScaling={false} style={styles.lackText}>
                      缺货
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          key={2}
          activeOpacity={0.6}
          style={styles.bigView}
          onPress={() => {}}
        >
          <WMImage style={styles.bigImg} src={''} />
          <View style={styles.wrapper}>
            <View style={styles.tagCon}>
              <SelfSalesLabel />
              <Text
                style={[styles.title, noneStock && { color: '#999' }]}
                allowFontSacling={false}
                numberOfLines={1}
              >
                名称
              </Text>
            </View>
            <Text style={styles.gec} allowFontSacling={false} numberOfLines={1}>
              规格
            </Text>
            <View style={styles.rowFlex}>
              <View style={styles.tagCon}>
                <Text
                  allowFontSacling={false}
                  style={[{ color: priceColor }, noneStock && { color: '#bcbcbc' }]}
                >
                  ¥ 1299.00
                </Text>

                {noneStock && (
                  <View style={styles.lack}>
                    <Text allowFontScaling={false} style={styles.lackText}>
                      缺货
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigBox: {
    paddingLeft: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  bigView: {
    width: (screenWidth - 30) / 2,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ebebeb'
  },
  bigImg: {
    width: (screenWidth - 30) / 2 - 2,
    height: (screenWidth - 30) / 2 - 2
  },
  lack: {
    width: 35,
    height: 15,
    marginLeft: 5,
    backgroundColor: '#cccccc',
    borderRadius: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lackText: {
    fontSize: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  wrapper: {
    padding: 10
  },
  title: {
    color: '#000',
    fontSize: 14
  },
  gec: {
    color: '#999999',
    fontSize: 13,
    marginTop: 5,
    height: 15
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  }
});
