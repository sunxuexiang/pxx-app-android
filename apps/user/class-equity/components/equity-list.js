import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Relax } from 'plume2';
import AutoHeightWebView from 'react-native-autoheight-webview';
import WMEmpty from 'wmkit/empty';

const styleHtml = ` 
 <style type="text/css">
  body {font-size: 14px;word-break: break-all;width: 100%;}
	img {max-width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
	li {clear: both;}
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@Relax
export default class EquityList extends React.Component {
  static relaxProps = {
    atPresentEquityNum: 'atPresentEquityNum',
    gradeList: 'gradeList'
  };

  render() {
    const { gradeList, atPresentEquityNum } = this.props.relaxProps;
    if (
      gradeList.get(atPresentEquityNum) &&
      gradeList.get(atPresentEquityNum).get('customerLevelRightsVOS').size == 0
    ) {
      return (
        <WMEmpty
          emptyImg={require('../img/none.png')}
          desc="当前等级暂无权益~"
        />
      );
    }

    return (
      <ScrollView style={styles.container}>
        <SafeAreaView>
          {gradeList.get(atPresentEquityNum) &&
            gradeList
              .get(atPresentEquityNum)
              .get('customerLevelRightsVOS')
              .map((v, k) => {
                return (
                  <View
                    key={k}
                    style={styles.levelBox}
                    onPress={() => {}}
                    activeOpacity={0.8}
                  >
                    <View style={styles.rowFlex}>
                      <Image
                        style={styles.icon}
                        source={{ uri: v.get('rightsLogo') }}
                      />
                      <Text style={styles.title} allowFontScaling={false}>
                        {v.get('rightsName')}
                      </Text>
                    </View>
                    <AutoHeightWebView
                      enableBaseUrl={true}
                      source={{ html: styleHtml + v.get('rightsDescription') }}
                      scalesPageToFit={false}
                      style={{
                        width: '100%'
                      }}
                    />
                  </View>
                );
              })}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  levelBox: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  title: {
    color: '#000',
    fontSize: 14,
    marginLeft: 5
  },
  levelText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
    marginTop: 8
  }
});
