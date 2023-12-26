import Fetch from 'wmkit/fetch';

export const fetchDeliveryDetail = (code, id) => {
  return Fetch('/trade/deliveryInfos', {
    method: 'POST',
    body: JSON.stringify({
      companyCode: code,
      deliveryNo: id
    })
  });
};

export const fetchCompanyInfo = (id) => {
  return Fetch(`/return/returnLogistics/${id}`, {
    method: 'GET'
  });
};
