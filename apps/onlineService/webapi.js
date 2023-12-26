import Fetch from 'wmkit/fetch';

/**
 * 获取ali聊天窗口的url
 */
export const getAliyunChatUrl = (customerId,customerName) => {
  return Fetch('/system/aliyun/detail', {
    method: 'POST',
    body: JSON.stringify({
      customerId: customerId,
      customerName: customerName,
    })
  });
};
