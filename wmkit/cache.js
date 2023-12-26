/**
 * Created by feitingting on 2017/9/4.
 */
/**
 * storage的key，定义为常量统一存放
 */
const cache = {
  PURCHASE_CACHE: 'purchase-cache', // 用户未登录时的购物车本地缓存
  SKU_MARKETING_CACHE: 'sku-marketing-cache', // 用户未登录时,针对sku选择的营销活动缓存
  LOGIN_DATA: 'b2b-app@login', //h5端登录信息缓存
  FORGET_CODE: 'forgetpass-verticode', //修改密码时获取的验证码
  CUSTOMER_ID: 'forgetpass-customerId', //修改密码时发送验证码后返回过来的ID
  ORDER_CONFIRM: 'b2b-app@order-confirm', //确认订单即时信息
  ORDER_CONFIRM_COUPON: 'b2b-app@order-confirm-coupon', //确认订单优惠券即时信息
  ORDER_CONFIRM_PAYTYPE: 'b2b-app@order-confirm-paytype', //确认订单支付方式信息
  ORDER_INVOICE: 'b2b-app@order-invoice', //确认订单发票临时信息
  ORDER_POINT: 'b2b-app@order-point', //确认订单积分临时信息
  SITE_MAIN_BANNER: 'b2b-pc@site-main-banner', //商城首页banner
  SITE_LOGO: 'b2b-pc@site-logo', //商城logo
  PENDING_AND_REFUSED: 'pending-or-refused-useInfo', //审核中或者审核未通过的用户信息
  SITE_LOGIN_BANNER: 'b2b-pc@site-login-banner', //商城登陆页banner
  SITE_PC_LOGO: 'b2b-pc@site-pc-logo', //商城pc端Logo
  FILL_PAYMENT_INFO: 'fill-payment-info', // 填写的付款单信息
  LOGISTICS_INFO: 'logistics-info', // 退单列表填写的物流信息
  PURCHASE_NUM: 'b2b-app@purchase-num', //购物车商品种类数
  OLD_VERIFY_CODE: 'modify-mobile-old-code', //修改绑定手机号时第一次收到的验证码
  DO_NOT_NOTICE_AGAIN: 'b2b-app@do-not-notice-again', // 记录不再提醒的版本
  TARGET_PAGES: 'TARGET_PAGES', //拦截登录前需要访问的目标页面
  PAY_OLD_VERIFY_CODE: 'set-pay-pwd-old-code', //设置支付密码时第一次收到的验证码
  IS_DISTRIBUTOR: 'is-distributor', // 当前登录用户是否是可用分销员
  REGISTER_INFO: 'register_info', //注册信息，临时缓存
  MY_PERFORMANCE: 'my_performance', //我的销售业绩显示/隐藏
  STORE_ID: 'store-id', // 当前所在店铺的storeId
  VALUE_ADDED_SERVICES: 'value-added-service', // 增值服务
  PURCHASE_ADDRESS: 'purchase_address', //购物车临时信息
  AGREE_PRIVATECY_POLICY: 'b2b-app@agree_privatecy_policy', // 记录是否同意隐私政策
  GOODS_DETAIL_ADDRESS: 'goods_detail_address',//商品详情页临时信息
  //仓库信息
  MATCH_WARE_STORE: 'match-ware-store', // 仓库数据
  CHOOSE_POSITION_CITY_CODE: 'choose-position-city-code', //选中的地址信息
  MATCHING_WAREHOUSE_FLAG: 'matching_warehouse', //是否匹配到仓库信息->1:是;0：否
  GOODS_DETAIL: 'goods-detail',
  DELIVER_SITE: 'app:deliverSite', //下单物流信息
  ORDER_CONFIRM_DELIVERY_WAY: 'order_confirm_delivery_way',
  CONFIRM_ORDER_FILE_RMK: 'order_confirm_file_rmk',
};

export {cache as cache}
