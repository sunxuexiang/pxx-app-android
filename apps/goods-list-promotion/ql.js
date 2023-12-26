import { QL } from 'plume2';

/**
 * 已选中的分类筛选条件
 * @type {plume2.QueryLang}
 */
export const selectedCatesQL = QL('selectedCatesQL', [
  'cates',
  cates => {
    return cates.filter(cate => cate.get('checked') === true);
  }
]);
