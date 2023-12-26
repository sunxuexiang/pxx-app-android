package com.cjdbj.shop.alishare;

import com.alipay.share.sdk.openapi.APAPIFactory;
import com.alipay.share.sdk.openapi.APMediaMessage;
import com.alipay.share.sdk.openapi.APWebPageObject;
import com.alipay.share.sdk.openapi.IAPApi;
import com.alipay.share.sdk.openapi.SendMessageToZFB;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.cjdbj.shop.MainActivity;

public class AliShareModule extends ReactContextBaseJavaModule {
    public AliShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private IAPApi api;

    @Override
    public String getName() {
        return "AliShareModule";
    }

    /**
     * 发送网页分享
     * @param callback
     */
    @ReactMethod
    public void sendWebPageMessage(ReadableMap payParams, final Callback callback) {
        /**
         * 初始化api
         */
        if(MainActivity.api == null){
            api = APAPIFactory.createZFBApi(this.getReactApplicationContext(), Constants.APP_ID, false);
        }else{
            api = MainActivity.api;
        }

        APWebPageObject webPageObject = new APWebPageObject();
        webPageObject.webpageUrl = payParams.getString("url");
        APMediaMessage webMessage = new APMediaMessage();
        webMessage.title = payParams.getString("title");
        webMessage.description = payParams.getString("desc");
        webMessage.mediaObject = webPageObject;
        webMessage.thumbUrl = payParams.getString("thumbUrl");
        SendMessageToZFB.Req webReq = new SendMessageToZFB.Req();
        webReq.message = webMessage;
        webReq.transaction = buildTransaction("webpage");

        //在支付宝版本会合并分享渠道的情况下,不需要传递分享场景参数
        if (!isAlipayIgnoreChannel()) {
            webReq.scene =  SendMessageToZFB.Req.ZFBSceneSession;

        }
        api.sendReq(webReq);
    }


    private String buildTransaction(final String type) {
        return (type == null) ? String.valueOf(System.currentTimeMillis()) : type + System.currentTimeMillis();
    }


    private boolean isAlipayIgnoreChannel() {
        return api.getZFBVersionCode() >= 101;
    }
}