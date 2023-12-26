package com.cjdbj.shop.weixin;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

/**
 * 调用微信支付之前，需要向微信注册APP_ID
 * Created by aqlu on 16/1/20.
 */
public class WeixinAppRegister extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        final IWXAPI msgApi = WXAPIFactory.createWXAPI(context, null);

//        Resources.getSystem().getString(R.string.wx_app_id);

        // 将该app注册到微信
        msgApi.registerApp(WeixinConfig.APP_ID);
    }
}