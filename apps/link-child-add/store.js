import { Store, msg } from 'plume2';
import IndexActor from './actor/index';
import { cache, config, Confirm, ValidConst } from 'wmkit';
import { fromJS } from 'immutable';
import * as webapi from './webapi';
import AsyncStorage from '@react-native-community/async-storage';

export default class AppStore extends Store {
  bindActor() {
    return [new IndexActor()];
  }
  constructor(props) {
    super(props);
  }

  /**
   * 初始化
   */
  init = async () => {
    let addChildList = this.state().get('addChildList');
    let childList = addChildList.push({customerAccount:''});
    this.dispatch('info: addChildList',childList);
  };


  /**
   * 解除绑定
   * @param tid 订单号
   */
  releaseChildConfirm = (customerId) => {
    Confirm({
      title: '解除绑定',
      text: '您确定要解除绑定?',
      okFn: () => this.releaseBindCustomers(customerId),
      okText: '确定',
      cancelText: '取消'
    });
  };

  releaseBindCustomers = async (customerId) => {
    const res = await webapi.releaseBindCustomers(customerId);
    if(res.code ==  config.SUCCESS_CODE){
      await this.init();
    }else{
      msg.emit('app:tip', res.message);
    }
  };

  /**
   * 增加一条空记录
   */
  addRecord = () => {
    let addChildList = this.state().get('addChildList');
    let childList = addChildList.push({customerAccount:''});
    this.dispatch('info: addChildList',childList);
  };

  /**
   * 删除一条记录
   */
  deleteRecord = (index) => {
    let reflushList = [];
    let addChildList = this.state().get('addChildList');
    addChildList.map((i, pos)=>{
      if(pos != index){
        reflushList.push(i);
      }
    });
    this.dispatch('info: addChildList',fromJS(reflushList));
  };


  /**
   * 设置list中的值
   */
  setFormInfo = async ({index,value}) => {
    let addChildList = this.state().get('addChildList');
    addChildList.get(index).customerAccount = value;
    this.dispatch('info: addChildList',addChildList);
  };

  /**
   * 添加所有的子账户
   */
  saveAll = async () => {
    let addChildList = this.state().get('addChildList');
    let saveFlag = true;
    let isFatherAccount = true;
    const loginData = await AsyncStorage.getItem(cache.LOGIN_DATA);
    const customerAccount = JSON.parse(loginData).accountName;
    if(addChildList && addChildList.size < 1){
      msg.emit('app:tip','请添加手机号');
      return false;
    }
    addChildList.map(i =>{
      if(!ValidConst.phone.test(i.customerAccount)){
        saveFlag = false;
        return false;
      }

      if(customerAccount == i.customerAccount){
        isFatherAccount = false;
        return false;
      }
    });
    if(!saveFlag){
      msg.emit('app:tip','请输入正确的手机号');
      return;
    }
    if(! isFatherAccount){
      msg.emit('app:tip','不可绑定当前账号为子账号');
      return;
    }
    //校验工单处理
    let childCustomer = addChildList.map(i=>{return i.customerAccount;});
    const childCustomerTemp = childCustomer.push(customerAccount);
    const result = await webapi.verifyCustomerRel(childCustomerTemp);
    if(result.code == config.SUCCESS_CODE){
      if(result.context.noCustomers && result.context.noCustomers.length > 0){
        const mobile = result.context.noCustomers[0];
        msg.emit('app:tip',mobile + '不是会员，不可添加为子账户');
        return false;
      }else if (result.context.inWorkOrders && result.context.inWorkOrders.length > 0) {
        const mobile = result.context.inWorkOrders[0];
        if (mobile == customerAccount) {
          msg.emit('app:tip',mobile + '在工单处理中，不可添加子账户');
        } else{
          msg.emit('app:tip',mobile + '在工单处理中不可添加为子账户');
        }
        return false;
      } else if (result.context.customerList && result.context.customerList.length > 0) {
        const customerList = result.context.customerList;
        const customerInfo = customerList[0];
        if (customerInfo.status == 0) {
          msg.emit('app:tip',customerInfo.customerAccount + '用户已是企业用户');
          return false;
        }else{
          msg.emit('app:tip',customerInfo.customerAccount + '用户已被绑定');
          return false;
        }
      }
    }

    const res = await webapi.addCustomerRela(childCustomer);
    if(res.code == config.SUCCESS_CODE){
      msg.emit('app:tip','添加成功');
      msg.emit('router: refreshRoute',{routeName:'LinkChildAccount'});
      msg.emit('router: back');
    }
  }

}
