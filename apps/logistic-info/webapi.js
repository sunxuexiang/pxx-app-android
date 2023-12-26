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

export const fetchCompanyInfo = (orderId, id, type) => {
  return Fetch(`/trade/shipments/${orderId}/${id}/${type}`, {
    method: 'GET'
  });
};
