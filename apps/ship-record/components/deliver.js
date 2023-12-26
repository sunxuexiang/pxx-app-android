import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Relax } from 'plume2';

@Relax
export default class Deliver extends React.Component {
  static relaxProps = {
    logisticsCompanyInfo: 'logisticsCompanyInfo'
  };

  render() {
    const {logisticsCompanyInfo} = this.props.relaxProps;
    return logisticsCompanyInfo && (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.title}>
            <Text style={styles.titleText} allowFontScaling={false}>物流公司</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText} allowFontScaling={false}>
              {`${logisticsCompanyInfo.logisticsCompanyName || '-'} ${logisticsCompanyInfo.logisticsCompanyPhone || '-'}`}
            </Text>
            <Text style={styles.info} allowFontScaling={false}>{logisticsCompanyInfo.logisticsAddress || '-'}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.title}>
            <Text style={styles.titleText} allowFontScaling={false}>收货站点</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText} allowFontScaling={false}>{logisticsCompanyInfo.receivingPoint || '-'}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 12
  },
  box: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  title: {
    marginBottom: 8,
  },
  titleText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: '500'
  },
  infoText: {
    lineHeight: 18,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.8)'
  }
});
