import Fetch from "wmkit/fetch";

export const getFlashSaleGoodsQualifications = (params:any) => {
  return Fetch('/flashsale/getFlashSaleGoodsQualifications', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};
