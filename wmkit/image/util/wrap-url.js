import { config } from 'wmkit/config';
import {
  PixelRatio
} from 'react-native';

/**
 * 包装地址
 * @param src
 * @private
 */
const wrapUrl = (params) => {
  let defaultParams = {
    alt: '',
    formatToJPG: true,
    src: '',
    devicePixelRatio: PixelRatio.get(),
    mode: 'fill' //固定宽高，将延伸出指定w与h的矩形框外的最小图片进行居中裁剪。这样显示出来的最好,
  };
  params = Object.assign({}, defaultParams, params);
  let { src, imageServer } = params;

  // 本地图片 或者 地址中已包含?参数，这种不是通过本系统上传的图片不进行处理
  if (src.indexOf('data') == 0 || src.indexOf('?') > 0) {
    return src;
  }

  const isComp = src.indexOf('http') >= 0;
  src = `${
    isComp ? '' : `${imageServer ? imageServer : config.IMAGE_SERVER}`
  }${src}`;

  params.src = cleanUrl(src);

  return format(params);
};

const cleanUrl = (src = '') => {
  let p = src.lastIndexOf('@');
  return p != -1 ? src.substring(0, p) : src;
};

const format = (params) => {
  let { src, width, height, devicePixelRatio } = params;

  let f = [src, '?x-oss-process=image'];
  f.push('/resize');

  if (width || height) {
    if (width) {
      f.push(`,w_${Math.round(parseInt(width) * devicePixelRatio)}`);
    }
  } else {
    f.push(',w_960');
  }
  //加入锐化效果，增加清晰度
  f.push('/sharpen,100');
  return f.join('');
};

export default wrapUrl;
