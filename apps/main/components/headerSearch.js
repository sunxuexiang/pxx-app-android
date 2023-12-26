import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  View
} from 'react-native';
import { msg, Relax } from 'plume2';
const topNum = 38;
let time;
export default ({ preKeywords }) => {
  const [searchTop, setSearchTop] = useState(topNum);
  const fadeAnim = useRef(new Animated.Value(searchTop)).current;
  const myAnimated = Animated.timing(
    // 随时间变化而执行动画
    fadeAnim, // 动画中的变量值
    {
      toValue: searchTop, // 透明度最终变为1，即完全不透明
      duration: searchTop === topNum ? 0 : 1000, // 让动画持续一段时间
      useNativeDriver: false
    }
  );
  if (searchTop !== topNum && searchTop / -topNum !== preKeywords.length) {
    time = setTimeout(() => {
      setSearchTop(searchTop - topNum);
    }, 4000);
  }

  useEffect(() => {
    myAnimated.start(); // 开始执行动画
    if (searchTop === topNum) {
      clearTimeout(time);
      setSearchTop(0);
    }
    if (searchTop / -topNum === preKeywords.length) {
      clearTimeout(time);
      setTimeout(() => {
        setSearchTop(topNum);
      }, 1000);
    }
  }, [searchTop]);

  return (
    <Animated.View style={[styles.headerSearch, { top: fadeAnim }]}>
      {preKeywords.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={styles.rowSearch}
          onPress={(e) =>{
            e.stopPropagation();
            msg.emit('router: goToNext', {
              routeName: 'Search',
              key:'home',
              queryString: item.presetSearchKeyword
            })
          }}
        >
          <Text
            allowFontSacling={false}
            style={[styles.text, styles.textDefault]}
          >
            {item.presetSearchKeyword}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  headerSearch: {
    // paddingVertical: 6,
    position: 'absolute',
    left: 30,
    top: 0,
    width: '100%'
  },
  text: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
    flex: 1,
    textAlign: 'left',
    height:38,
    lineHeight:38
  },
  textDefault: {
    paddingLeft: 8,
    textAlign: 'left'
  }
});
