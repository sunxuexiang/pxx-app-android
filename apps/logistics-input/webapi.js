import Fetch from 'wmkit/fetch';

/**
 * 填写物流信息
 */
export const deliver = (rid, values) => {
  return Fetch(`/return/deliver/${rid}`, {
    method: 'POST',
    body: JSON.stringify({
      code: values.logisticCompanyCode,
      company: values.logisticCompany,
      no: values.logisticNo,
      createTime: values.date
    })
  });
};
