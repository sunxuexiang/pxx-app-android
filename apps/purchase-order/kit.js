//计算sku阶梯价格
export const _calculateGoodsPrice = (sku, intervalPrices) => {
  if (!intervalPrices) {
    return sku.marketPrice || 0.0;
  }
  //取出当前商品阶梯价
  const prices = intervalPrices.filter(
    (intervalPrice) =>
      intervalPrice.get('goodsInfoId') === sku.get('goodsInfoId')
  );
  //算所有满足当前商品数量的阶梯价格集合
  const priceList = prices && prices.filter(
    (price) => price.get('count') <= sku.get('buyCount')
  );

  //缺货状态下 求阶梯价最大值
  if (sku.get('goodsStatus') !== 0 && prices.count() > 0) {
    return prices.maxBy((price) => price.get('price')).get('price') || 0.0;
  }

  if (prices.count() > 0 && priceList.count() > 0) {
    //算出阶梯价
    return priceList.maxBy((price) => price.get('count')).get('price') || 0.0;
  } else {
    //算出原价
    return sku.get('salePrice') || 0.0;
  }
};
