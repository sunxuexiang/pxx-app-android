import Fetch from 'wmkit/fetch';

/**
 * 
 * @returns {Promise<Result<T>>}
 */
export const fetchBaseConfig = () => {
  return Fetch('/system/baseConfig', {
    method: 'GET'
  });
};
/**
 * 点赞
 * @returns {Promise<Result<T>>}
 */
export const addVideoLike = (parma) => {
  return Fetch('/videomanagement/addVideoLike', {
    method: 'POST',
    body: JSON.stringify(parma)
  });
};
/**
 * 取消点赞
 * @returns {Promise<Result<T>>}
 */
export const cancelVideoLike = (parma) => {
  return Fetch('/videomanagement/cancelVideoLike', {
    method: 'POST',
    body: JSON.stringify(parma)
  });
};
/**
 * 查询视频
 * @returns {Promise<Result<T>>}
 */
export const pageVideo = (parma) => {
  return Fetch('/videomanagement/page', {
    method: 'POST',
    body: JSON.stringify(parma)
  });
};
/**
 * 视频播放次数统计
 * @returns {Promise<Result<T>>}
 */
export const getVideoById = (parma) => {
  return Fetch('/videomanagement/getVideoById', {
    method: 'POST',
    body: JSON.stringify(parma)
  });
};
