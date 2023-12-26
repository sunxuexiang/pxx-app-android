package com.cjdbj.shop.weixin;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXImageObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

/**
 * 支付宝对接模块
 * Created by hht on 18/7/9
 */
public class WeixinModule extends ReactContextBaseJavaModule{

    public static ReactApplicationContext reactApplicationContext;

    public WeixinModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactApplicationContext = reactContext;
    }

    @Override
    public String getName() {
        return "WeixinModule";
    }

    @ReactMethod
    public void addEvent(ReadableMap payParams, final Callback callback) {
        Log.d("WX_PAY", "入参：" + payParams.toString());

        IWXAPI api = WXAPIFactory.createWXAPI(getCurrentActivity(), payParams.getString("appid"), true);

        if (api.isWXAppInstalled()) {

            PayReq req = new PayReq();
            req.appId = payParams.getString("appid");
            req.partnerId = payParams.getString("partnerid");
            req.prepayId = payParams.getString("prepayid");
            req.nonceStr = payParams.getString("noncestr");
            req.timeStamp = payParams.getString("timestamp");
            req.packageValue = payParams.getString("package");
            req.sign = payParams.getString("sign");

            boolean result = api.sendReq(req);
            Log.d("WX_PAY", "发起支付：" + result);
        } else {
            if (callback != null) {
                callback.invoke("支付失败，请先安装微信", false);
            }
        }
    }

    //微信分享好友
    @ReactMethod
    public void shareToFriends(ReadableMap payParams, final Callback callback) {
        Log.d("微信分享好友", "入参：" + payParams.toString());
        IWXAPI api = WXAPIFactory.createWXAPI(getCurrentActivity(), WeixinConfig.APP_ID, true);
        //判断是否安装
        if (api.isWXAppInstalled()) {
            //分享请求
            final SendMessageToWX.Req req = new SendMessageToWX.Req();
            //分享场景-好友
            req.scene = 0;
            //请求
            final WXMediaMessage message = new WXMediaMessage();
            req.message = message;
            //描述
            message.description = payParams.getString("description");
            //标题
            message.title = payParams.getString("title");
            //缩略图
            message.thumbData = thumbData(Utils.toByteArray(payParams.getString("imgUrl")));
            //跳转地址
            String url = payParams.getString("url");
            WXWebpageObject webpageObject = new WXWebpageObject();
            webpageObject.webpageUrl = url;
            message.mediaObject = webpageObject;
            boolean result = api.sendReq(req);
            Log.d("WX_SHARE", "开始分享好友：" + result);
        } else {
            Log.d("WX_SHARE", "未安装微信，无法分享");
            if (callback != null) {
                callback.invoke("未安装微信", false);
            }
        }
    }

    //微信分享朋友圈
    @ReactMethod
    public void shareToMoments(ReadableMap payParams, final Callback callback) {
        Log.d("微信分享朋友圈", "入参：" + payParams.toString());
        IWXAPI api = WXAPIFactory.createWXAPI(getCurrentActivity(), WeixinConfig.APP_ID, true);
        //判断是否安装
        if (api.isWXAppInstalled()) {
            //分享请求
            final SendMessageToWX.Req req = new SendMessageToWX.Req();
            //分享场景-朋友圈
            req.scene = 1;
            //请求
            final WXMediaMessage message = new WXMediaMessage();
            req.message = message;
            //描述
            message.description = payParams.getString("description");
            //标题
            message.title = payParams.getString("title");
            //缩略图
            message.thumbData = thumbData(Utils.toByteArray(payParams.getString("imgUrl")));
            //跳转地址
            String url = payParams.getString("url");
            WXWebpageObject webpageObject = new WXWebpageObject();
            webpageObject.webpageUrl = url;
            message.mediaObject = webpageObject;
            boolean result = api.sendReq(req);
            Log.d("WX_SHARE", "开始分享朋友圈：" + result);
        } else {
            Log.d("WX_SHARE", "未安装微信，无法分享");
            if (callback != null) {
                callback.invoke("未安装微信", false);
            }
        }
    }

    //图片微信分享好友
    @ReactMethod
    public void shareFriendsImage(ReadableMap payParams, final Callback callback) {
        Log.d("图片微信分享好友", "入参：" + payParams.toString());
        IWXAPI api = WXAPIFactory.createWXAPI(getCurrentActivity(), WeixinConfig.APP_ID, true);
        //判断是否安装
        if (api.isWXAppInstalled()) {
            //分享请求
            final SendMessageToWX.Req req = new SendMessageToWX.Req();
            //分享场景-好友
            req.scene = 0;
            //请求
            final WXMediaMessage message = new WXMediaMessage();
            req.message = message;

            //缩略图
            message.thumbData = thumbData(Utils.toByteArray(payParams.getString("imgUrl")));

            // 原图
            byte[] imageData = Utils.toByteArray(payParams.getString("imgUrl"));
            WXImageObject imageObject = new WXImageObject(BitmapFactory.decodeByteArray(imageData, 0, imageData.length));

            message.mediaObject = imageObject;
            boolean result = api.sendReq(req);
            Log.d("WX_SHARE", "开始分享好友：" + result);
        } else {
            Log.d("WX_SHARE", "未安装微信，无法分享");
            if (callback != null) {
                callback.invoke("未安装微信", false);
            }
        }
    }

    //图片微信分享朋友圈
    @ReactMethod
    public void shareToMomentsImage(ReadableMap payParams, final Callback callback) {
        Log.d("图片微信分享朋友圈", "入参：" + payParams.toString());
        IWXAPI api = WXAPIFactory.createWXAPI(getCurrentActivity(), WeixinConfig.APP_ID, true);
        //判断是否安装
        if (api.isWXAppInstalled()) {
            //分享请求
            final SendMessageToWX.Req req = new SendMessageToWX.Req();
            //分享场景-朋友圈
            req.scene = 1;
            //请求
            final WXMediaMessage message = new WXMediaMessage();
            req.message = message;

            //缩略图
            message.thumbData = thumbData(Utils.toByteArray(payParams.getString("imgUrl")));
            // 原图
            byte[] imageData = Utils.toByteArray(payParams.getString("imgUrl"));
            WXImageObject imageObject = new WXImageObject(BitmapFactory.decodeByteArray(imageData, 0, imageData.length));

            message.mediaObject = imageObject;
            boolean result = api.sendReq(req);
            Log.d("WX_SHARE", "开始分享朋友圈：" + result);
        } else {
            Log.d("WX_SHARE", "未安装微信，无法分享");
            if (callback != null) {
                callback.invoke("未安装微信", false);
            }
        }
    }

    //微信授信登录
    @ReactMethod
    public void quickLogin(ReadableMap payParams, final Callback callback) {
        Log.d("WX_LOGIN", "微信授信登录，入参：" + payParams.toString());
        IWXAPI api = WXAPIFactory.createWXAPI(getCurrentActivity(), WeixinConfig.APP_ID, true);
        // 1.判断是否安装
        if (api.isWXAppInstalled()) {
            // 2.发送登录请求
            final SendAuth.Req req = new SendAuth.Req();
            req.scope = payParams.getString("scope");
            req.state = payParams.getString("state");
            boolean result = api.sendReq(req);
            Log.d("WX_LOGIN", "授信是否成功：" + result);
        } else {
            Log.d("WX_LOGIN", "未安装微信，无法授信登录");
            if (callback != null) {
                callback.invoke("未安装微信", false);
            }
        }
    }

//图片微信分享好友
    @ReactMethod
    public void shareImageToFriends(ReadableMap params, final Callback callback) {
        Log.d("图片微信分享好友", "入参：" + params.toString());
        IWXAPI api = WXAPIFactory.createWXAPI(getCurrentActivity(), WeixinConfig.APP_ID, true);
        //判断是否安装
        if (api.isWXAppInstalled()) {
            //分享请求
            final SendMessageToWX.Req req = new SendMessageToWX.Req();
            //分享场景-好友
            req.scene = 0;
            //请求
            final WXMediaMessage message = new WXMediaMessage();
            req.message = message;

            //缩略图
//            message.thumbData = thumbData(Utils.toByteArray(params.getString("imgObject")));

            // 原图
            WXImageObject imageObject = new WXImageObject(base64ToBitmap(params.getString("imgObject")));

            message.mediaObject = imageObject;
            boolean result = api.sendReq(req);
            Log.d("WX_SHARE", "开始分享好友：" + result);
        } else {
            Log.d("WX_SHARE", "未安装微信，无法分享");
            if (callback != null) {
                callback.invoke("未安装微信", false);
            }
        }
    }

    //图片微信分享朋友圈
    @ReactMethod
    public void shareImageToMoments(ReadableMap params, final Callback callback) {
        Log.d("图片微信分享朋友圈", "入参：" + params.toString());
        IWXAPI api = WXAPIFactory.createWXAPI(getCurrentActivity(), WeixinConfig.APP_ID, true);
        //判断是否安装
        if (api.isWXAppInstalled()) {
            //分享请求
            final SendMessageToWX.Req req = new SendMessageToWX.Req();
            //分享场景-朋友圈
            req.scene = 1;
            //请求
            final WXMediaMessage message = new WXMediaMessage();
            req.message = message;

            //缩略图
//            message.thumbData = thumbData(Utils.toByteArray());
            // 原图
            WXImageObject imageObject = new WXImageObject(base64ToBitmap(params.getString("imgObject")));

            message.mediaObject = imageObject;
            boolean result = api.sendReq(req);
            Log.d("WX_SHARE", "开始分享朋友圈：" + result);
        } else {
            Log.d("WX_SHARE", "未安装微信，无法分享");
            if (callback != null) {
                callback.invoke("未安装微信", false);
            }
        }
    }

    /**
     * base64转为bitmap
     * @param base64Data
     * @return
     */
    public static Bitmap base64ToBitmap(String base64Data) {
        byte[] bytes = Base64.decode(base64Data, Base64.DEFAULT);
        return BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
    }

    //图片转换
    private static byte[] thumbData(byte[] imageData) {
        Bitmap thumb = thumb(imageData);
        return Utils.toByteArray(thumb, true);
    }

    private static Bitmap thumb(Bitmap bmp) {
        if (bmp != null) {
            int scale = (int) Math.ceil(Math.sqrt(bmp.getWidth() * bmp.getHeight() * 1f / 32768));
            return Bitmap.createScaledBitmap(bmp, bmp.getWidth() / scale, bmp.getHeight() / scale, true);
        }
        return null;
    }


    private static Bitmap thumb(byte[] imageData) {
        if (imageData != null) {
            Bitmap bitmap = BitmapFactory.decodeByteArray(imageData, 0, imageData.length);
            Bitmap thumb = thumb(bitmap);
            if (thumb != bitmap) {
                bitmap.recycle();
            }
            return thumb;
        }
        return null;
    }
}
