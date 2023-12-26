package com.cjdbj.shop.umeng;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.cjdbj.shop.MainApplication;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.message.IUmengRegisterCallback;
import com.umeng.message.PushAgent;
import com.umeng.message.UmengNotificationClickHandler;
import com.umeng.message.entity.UMessage;

import org.android.agoo.xiaomi.MiPushRegistar;
import org.json.JSONObject;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class UmengConfigure {
    public static ReactApplicationContext reactApplicationContext;

    // 消息路由参数集合
    private WritableMap messageParams = null;

    public UmengConfigure(Context context, Application application, String host) {
        // 日志开关
        UMConfigure.setLogEnabled(true);

//        UMConfigure.init(context, "5e1fda0d570df35d3d0003db",
//                "Umeng", UMConfigure.DEVICE_TYPE_PHONE, "d00d0ddf2e7e3448524b441d5b24abd7");
        // TODO: 2020-01-16 GB 友盟上线更改
        getConfig(context, host);
    }

    private void getConfig(final Context context, final String host){

        Log.d("host=====", host);

        // 真机不允许在主线程发起http请求，所以开一个线程
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    String url = host + "/umengConfig/getKey";
                    OkHttpClient okHttpClient = new OkHttpClient();
                    Request request = new Request.Builder()
                            .url(url)
                            .build();
                    Call call = okHttpClient.newCall(request);
                    Response response = call.execute();
                    if (response != null && response.body() != null) {
                        String result = response.body().string();
                        JSONObject json = new JSONObject(result);
                        Log.d("gettoken----1---->", json.toString());

                        JSONObject resultJson = json.getJSONObject("context").getJSONObject("umengPushConfigVO");
                        // 在此处调用基础组件包提供的初始化函数 相应信息可在应用管理 -> 应用信息 中找到 http://message.umeng.com/list/apps
                        // 参数一：当前上下文context；
                        // 参数二：应用申请的Appkey（需替换）；
                        // 参数三：渠道名称；
                        // 参数四：设备类型，必须参数，传参数为UMConfigure.DEVICE_TYPE_PHONE则表示手机；传参数为UMConfigure.DEVICE_TYPE_BOX则表示盒子；默认为手机；
                        // 参数五：Push推送业务的secret 填充Umeng Message Secret对应信息（需替换）
                        UMConfigure.init(context, resultJson.getString("androidKeyId"),
                                "Umeng", UMConfigure.DEVICE_TYPE_PHONE, resultJson.getString("androidMsgSecret"));

                        PushAgent mPushAgent = PushAgent.getInstance(context);
                        mPushAgent.register(new IUmengRegisterCallback(){

                            @Override
                            public void onSuccess(String deviceToken) {
                                // 注册成功会返回deviceToken deviceToken是推送消息的唯一标志
                                // deviceToken是【友盟+】消息推送生成的用于标识设备的id，长度为44位，不能定制和修改。
                                // 同一台设备上不同应用对应的deviceToken不一样。获取deviceToken的值后，可进行消息推送测试！
                                Log.i("walle", "--->>> 友盟::注册::onSuccess, deviceToken is " + deviceToken);
                                PushModule.deviceTokenValue = deviceToken;
                            }

                            @Override
                            public void onFailure(String s, String s1) {
                                Log.i("walle", "--->>> 友盟::注册::onFailure, s is " + s + ", s1 is " + s1);
                            }
                        });

                        // 友盟-小米
                        MiPushRegistar.register(context, "2882303761518277017", "5801827731017");

                        // 消息点击时获取自定义参数
                        UmengNotificationClickHandler notificationClickHandler = new UmengNotificationClickHandler() {

                            @Override
                            public void dealWithCustomAction(Context context, UMessage msg) {
                                // 判断app是否在后台
                                if(MainApplication.isBackground()){
                                    Intent var3 = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
                                    var3.setPackage((String)null);
                                    var3.addFlags(268435456);
                                    context.startActivity(var3);
                                }
                                UmengConfigure.sendEvent("PUSH_MESSAGE", msg.custom);
                            }
                        };

                        mPushAgent.setNotificationClickHandler(notificationClickHandler);
                    } else {
                        Log.e("UmengConfigure" ,"友盟推送初始化获取参数失败");
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();



    }

    public static void sendEvent(String eventName, Object params){
        if (reactApplicationContext == null){
            PushModule.pageParams = params;
            return;
        } else {
            reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName,params);
        }
    }

    public WritableMap getMessageParams() {
        return messageParams;
    }

    public void setMessageParams(WritableMap params) {
        messageParams = params;
    }
}
