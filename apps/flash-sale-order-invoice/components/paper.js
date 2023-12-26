import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import { Relax } from 'plume2';

import { fromJS } from 'immutable';
import { screenWidth } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import FormInput from 'wmkit/form/form-input';
import RadioHook from 'wmkit/radio-hook';
import RadioBox from 'wmkit/radio-box';

import SingleAddress from '../components/single-address';

const data = [{ id: '0', name: '个人' }, { id: '1', name: '单位' }];

@Relax
export default class PaperInvoice extends Component {
  static relaxProps = {
    key: 'key',
    cInvoice: 'cInvoice',
    projects: 'projects',

    initProjectActive: noop,
    initPaperFlag: noop,
    saveInvoiceTitle: noop,
    saveIdentification: noop
  };

  render() {
    const {
      key,
      cInvoice,
      initPaperFlag,
      saveInvoiceTitle,
      saveIdentification,
      projects,
      initProjectActive
    } = this.props.relaxProps;
    const flag = cInvoice.get('flag');
    const projectKey = cInvoice.get('projectKey');

    return (
      <View>
        {key == 'paper' ? (
          <View>
            <RadioHook
              checked={flag}
              data={fromJS(data)}
              onCheck={(v) => initPaperFlag(v)}
            />
            {flag == 1 ? (
              <View>
                <FormInput
                  autoFocus={window.keyBoardShow}
                  label="发票抬头"
                  placeholder="请填写单位全称"
                  defaultValue={cInvoice.get('title')}
                  maxLength={50}
                  onChange={(value) => saveInvoiceTitle(value)}
                />
                <FormInput
                  label="纳税人识别号"
                  placeholder="填写错误将不能作为税收凭证或无法报销"
                  maxLength={20}
                  defaultValue={cInvoice.get('identification')}
                  onChange={(value) => saveIdentification(value)}
                />
              </View>
            ) : null}
            <View style={styles.invoiceBox}>
              <View style={{ backgroundColor: '#ffffff' }}>
                <Text style={styles.title} allowFontScaling={false}>
                  开票项目
                </Text>
              </View>
              <View style={styles.box}>
                <RadioBox
                  data={projects.toJS()}
                  onCheck={(val) => initProjectActive(val)}
                  checked={projectKey}
                  style={{ width: (screenWidth - 56) / 3 }}
                />
              </View>
            </View>
            <SingleAddress companyInfoId={this.props.companyInfoId} />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50
  },
  invoice: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14
  },
  input: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
    marginLeft: 14
  },
  invoiceBox: {
    borderTopColor: '#ebebeb',
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    marginVertical: 10,
    backgroundColor: '#fff'
  },
  title: {
    marginTop: 14,
    color: '#333333',
    fontSize: 14,
    marginHorizontal: 14
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 7,
    backgroundColor: '#ffffff',
    flexWrap: 'wrap'
  },
  item: {
    width: (screenWidth - 56) / 3,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ebebeb',
    marginHorizontal: 7,
    marginVertical: 7
  },
  text: {
    fontSize: 14,
    color: '#939495'
  },
  img: {
    width: 14,
    height: 14,
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});
