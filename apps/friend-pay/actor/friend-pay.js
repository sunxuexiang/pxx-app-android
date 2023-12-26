import { Actor, Action } from 'plume2';

export default class FriendPayActor extends Actor {
    defaultState() {
        return {
            orderInfo: {}
        }
    }
    @Action('friendPay: getFriendPayInfo')
    getFriendPayInfo(state, context){
        return state.set('orderInfo', context);
    }
}

