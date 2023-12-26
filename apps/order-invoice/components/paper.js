import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import { Relax } from 'plume2';

import { fromJS } from 'immutable';
import { screenWidth } from 'wmkit/styles/index';

import { noop } from 'wmkit/noop';
import RadioHook from 'wmkit/radio-hook';
import FormInput from 'wmkit/form/form-input';
import RadioBox from 'wmkit/radio-box';
import Check from 'wmkit/check';

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
    console.log(projects.toJS(), projectKey, '22');
    return (
      <View style={{ backgroundColor: '#f5f5f5', marginBottom: 12 }}>
        {key == 'paper' ? (
          <View>
            <View style={{backgroundColor:'#fff'}}>
              <Text style={styles.title}>发票信息</Text>
              <View>
                {/* <RadioHook
                checked={flag}
                data={fromJS(data)}
                onCheck={(v) => initPaperFlag(v)}
              /> */}
                <View style={styles.kaip}>
                  <Text style={{ fontSize: 12 }}>抬头类型</Text>
                  <View style={{ flexDirection: 'row' }}>
                    {data.map((item) => {
                      return (
                        <View
                          style={{ flexDirection: 'row', marginLeft: 12,alignItems:'center' }}
                          key={item.id}
                        >
                          <Check
                            onCheck={() => initPaperFlag(item.id)}
                            checked={flag == item.id}
                          />
                          <Text style={{ marginLeft: 8, fontSize: 12 }}>
                            {item.name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>

            {flag == 1 ? (
              <View style={{paddingHorizontal:12,backgroundColor:'#fff'}}>
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
                {projects.toJS().map((item) => {
                  return (
                    <View key={item.id} style={[styles.kaip,{width:screenWidth - 30}]}>
                      <Text style={{ fontSize: 12 }}>{item.name}</Text>
                      <Check
                        onCheck={() => initProjectActive(item.id)}
                        checked={projectKey == item.id}
                      />
                    </View>
                  );
                })}
                {/* <RadioBox
                  data={projects.toJS()}
                  onCheck={(val) => initProjectActive(val)}
                  checked={projectKey}
                  style={{ width: (screenWidth - 56) / 3 }}
                /> */}
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
    // borderBottomWidth: 1 / PixelRatio.get(),
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
    // borderTopColor: '#ebebeb',
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get(),
    marginVertical: 10,
    backgroundColor: '#fff',
    marginTop: 12
  },
  title: {
    // marginTop: 14,
    color: '#000',
    fontSize: 14,
    marginHorizontal: 12,
    marginVertical: 16
  },
  box: {
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    // padding: 7,
    backgroundColor: '#ffffff',
    flexWrap: 'wrap'
  },
  kaip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    marginHorizontal: 12,
    marginVertical: 7,
    alignItems: 'center',
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
