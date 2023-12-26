/**
 * @desc
 * @使用场景
 * @company qianmi.com
 * @Date    2019/6/5
 **/

//@ts-ignore
let mockApiInfo={};

/**
 * 判断此api是否需要mock
 * @param {string} controller
 * @param {string} method
 * @returns {boolean}
 */
export default function isMockApi(controller:string,method:string){

  if(!mockApiInfo || !mockApiInfo[controller]){
    return false;
  }

  if(mockApiInfo[controller].includes(method)){
    return true;
  }else{
    return false;
  }
}