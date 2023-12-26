import React, { useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View, Platform } from 'react-native';
import { screenWidth } from 'wmkit/styles/index';
const isAndroid = Platform.OS === 'android';
const DraggableView = (props) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [opacity, setopacity] = useState(1);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      // 防止误触移位
      if (
        gestureState.dx < -screenWidth * 0.1 ||
        gestureState.dx > screenWidth * 0.1
      ) {
        return true;
      } else {
        return false;
      }
    },
    onMoveShouldSetPanResponder: (e, gestureState) => {
      const touchThreshold = 20;
      // 设置手势移动20以上才触发位移
      const { dx, dy } = gestureState;
      const offsetY = Math.abs(dy);
      const offsetX = Math.abs(dx);

      return offsetX > touchThreshold || (isAndroid && offsetY > 100 && offsetX < offsetY);
    },
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y, 
          useNativeDriver: false
        }
      ],
      {
        listener: (event, gestureState) => {
          const diffY = gestureState.dy;
          const diffX = gestureState.dx;
          const offsetY = Math.abs(diffY);
          const offsetX = Math.abs(diffX);
          if(offsetX > offsetY) {
            if (offsetX > 80&&opacity==1) {
              diffX < 0
                ? props._onIndexChanged('add')
                : props._onIndexChanged('reduce');
              setopacity(0.5)
            } else {
              Animated.spring(
                pan, // Auto-multiplexed
                { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Back to zero
              ).start();
              setopacity(1)
            }
          } else {
            // 单独处理--兼容安卓
            if(isAndroid && offsetY > 80&&opacity==1) {
              diffY < 0
                ? props._next()
                : props._last();
              setopacity(0.5)
            }
          }
        }
      }
    ),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Back to zero
      ).start();
      setopacity(1)
    }
  });

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), { opacity: opacity }, styles.box]}
      >
        {props.children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  box: {
    flex:1,
    // alignItems: '',
    justifyContent:'flex-start',
  }
});

export default DraggableView;
