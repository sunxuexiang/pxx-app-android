import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Relax } from 'plume2';
import { Button, FormInput, noop } from 'wmkit';

const LongButton = Button.LongButton;

@Relax
export default class List extends React.Component {
  static relaxProps = {
    addChildList: 'addChildList',
    releaseChildConfirm: noop,
    setFormInfo: noop,
    deleteRecord: noop
  };

  render() {
    const { addChildList, setFormInfo, deleteRecord } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#fff',flex:1 }}>
          <ScrollView keyboardShouldPersistTaps={true}>
          {addChildList.map((i, index) => {
            const customerAccount = i.customerAccount;
            return (
              <View key={index} style={styles.item}>
                <FormInput
                  label={"手机号码"}
                  placeholder="请填写手机号码"
                  // required
                  defaultValue={customerAccount}
                  maxLength={11}
                  onChange={(value) =>
                    setFormInfo({ index: index, value: value })
                  }
                  autoFocus={false}
                  keyboardType="numeric"
                  style={[styles.form]}
                />
                {index > 0 &&
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => deleteRecord(index)}
                    style={styles.imgBtn}
                  >
                    <Image
                      source={require('../img/delete.png')}
                      style={styles.img}
                    />
                  </TouchableOpacity>
                }
              </View>
            );
          })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24
  },
  nav: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    paddingHorizontal: 12,
    backgroundColor: '#ffffff'
  },
  text: {
    color: '#333333',
    fontSize: 14,
    flex: 1
  },
  icon: {
    width: 7,
    height: 13,
    marginLeft: 5
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 1
  },
  rightText: {
    fontSize: 14,
    color: '#999'
  },
  tipText: {
    fontSize: 12,
    color: '#939495',
    lineHeight: 26
  },
  tipBox: {
    paddingHorizontal: 15,
    paddingVertical: 12
  },
  linkedInfo: {
    position: 'absolute',
    right: 10,
    display: 'flex'
  },
  btn: {
    borderColor: '#000',
    borderWidth: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#000',
    fontSize: 16
  },
  item: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  form: {
    flex:1
  },
  imgBtn: {
    width: 30,
  }
});
