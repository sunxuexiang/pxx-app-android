export const config = {
  // test
  // BFF_HOST: 'http://118.31.238.229:8580',
  // MAGIC_HOST: 'http://magic.s2btest.kstore.shop',
  // RENDER_HOST: 'http://app-render.s2btest.kstore.shop',
  // PV_UV_HOST: 'http://perseus.s2btest.kstore.shop',
  BFF_HOST: 'https://mbff.xiyaya.kstore.shop',
  MAGIC_HOST: 'https://magic.xiyaya.kstore.shop',
  RENDER_HOST: 'https://app-render.xiyaya.kstore.shop',
  PV_UV_HOST: 'https://perseus.xiyaya.kstore.shop',
  IMAGE_SERVER: __DEV__ ? '//img.1000.com/qm-a-img/prod/' : '',
  SHARE_WEN_URL: 'https://m.xiyaya.kstore.shop',
  HTTP_TIME_OUT: 10,
  SUCCESS_CODE: 'K-000000',
  START_YEAR: '2019',
  LAST_YEAR: '2019',
  OWNER: '南京万米信息技术有限公司',
  //FIXME 重要 App当前版本号,配合boss后台APP检测更新版本号用
  CURRENT_VERSION: '1.26.0'
};
