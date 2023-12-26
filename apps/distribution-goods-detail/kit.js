import { List } from 'immutable';
/**
 * 根据满减>满折>满赠的优先级，返回需要显示的促销活动
 */
export const marketOne = (goodsInfo) => {
  return goodsInfo
    .get('marketingLabels')
    .sortBy((marketing) => marketing.get('marketingType'))
    .toJS();
};

/**
 * 展示某个规格下的促销活动
 * @param goodsInfos
 */
export const marketAllByOne = (goodsInfo) => {
  let hash = {};
  let allSkuMarketings = List();
  goodsInfo.size > 0 &&
  goodsInfo.get('marketingLabels')
    .sortBy((marketing) => marketing.get('marketingType'))
    .map((marketing) => {
    allSkuMarketings = allSkuMarketings.push(marketing);
  });
  const newArr = allSkuMarketings.toJS().reduceRight((item, next) => {
    hash[next.marketingId]
      ? ''
      : (hash[next.marketingId] = true && item.push(next));
    return item;
  }, []);
  return newArr;
};

/**
 * 展示所有规格下的促销活动，并去重
 * @param goodsInfos
 */
export const marketAll = (goodsInfos) => {
  let hash = {};
  let allSkuMarketings = List();
  goodsInfos.size > 0 &&
    goodsInfos.map((goodsInfo) => {
      goodsInfo.get('marketingLabels').map((marketing) => {
        allSkuMarketings = allSkuMarketings.push(marketing);
      });
    });
  const newArr = allSkuMarketings.toJS().reduceRight((item, next) => {
    hash[next.marketingId]
      ? ''
      : (hash[next.marketingId] = true && item.push(next));
    return item;
  }, []);
  return newArr;
};
