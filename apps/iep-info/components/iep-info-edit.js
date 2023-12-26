/**
 * Created by hht on 2017/9/8.
 */

import React from 'react';
import { KeyboardAvoidingView, PixelRatio, ScrollView, StyleSheet, View } from 'react-native';
import { Relax } from 'plume2';
import { FormInput, FormSelect, noop, BusinessIndustryPicker, BusinessEmployeeNumPicker } from 'wmkit';
import * as FindBusiness from 'wmkit/business/business';
@Relax
export default class IepInfoEdit extends React.Component {
  static relaxProps = {
    iepInfo: 'iepInfo',
    setIepInfo: noop,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { iepInfo, setIepInfo } = this.props.relaxProps;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <FormInput
              label="公司性质"
              defaultValue={iepInfo.get('businessNatureType') != undefined && FindBusiness.findBusinessNatureName(iepInfo.get('businessNatureType'))}
              disabled={true}
            />
            <FormInput
              label="公司名称"
              defaultValue={iepInfo.get('enterpriseName')}
              disabled={true}
            />
            <BusinessEmployeeNumPicker
              ref={(ref) => (this.areaPicker = ref)}
              value={iepInfo.get('businessEmployeeNum') ? iepInfo.get('businessEmployeeNum') : null}
              title=''
              onChange={(val) => setIepInfo('businessEmployeeNum', +val[0])}
            >
              <FormSelect
                label="企业人数"
                placeholder={iepInfo.get('businessEmployeeNum') != undefined ? FindBusiness.findBusinessEmployeeNumValue(iepInfo.get('businessEmployeeNum')) : '请选择'}
              />
            </BusinessEmployeeNumPicker>
            <BusinessIndustryPicker
              ref={(ref) => (this.areaPicker = ref)}
              value={iepInfo.get('businessIndustryType') ? iepInfo.get('businessIndustryType') : null}
              title=''
              onChange={(val) => setIepInfo('businessIndustryType', +val[0])}
            >
              <FormSelect
                label="企业行业"
                placeholder={iepInfo.get('businessIndustryType') != undefined ? FindBusiness.findBusinessIndustryName(iepInfo.get('businessIndustryType')) : '请选择'}
              />
            </BusinessIndustryPicker>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // minHeight: screenHeight-140,
    backgroundColor: '#fff'
  },
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12
  },
  text: {
    color: '#333',
    fontSize: 14
  },
  input: {
    color: '#999',
    fontSize: 14,
    textAlign: 'right',
    flex: 1
  }
});
