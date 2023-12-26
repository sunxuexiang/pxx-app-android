/**
 * oss相关，为分享功能压缩图片，微信分享要求图片小于32k
 * @param {*} imgUrl
 */
export const suffixForShare = (imgUrl) => {
  if (imgUrl) {
    //目前写死，后期会请求后台，查询当前使用的oss，修改后缀名
    return `${imgUrl}?x-oss-process=image/resize,w_100,h_100/quality,q_80`;
  }
  return imgUrl;
};
