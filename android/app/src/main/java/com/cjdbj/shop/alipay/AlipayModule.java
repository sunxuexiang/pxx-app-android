package com.cjdbj.shop.alipay;

import android.util.Log;

import com.alipay.sdk.app.PayTask;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class AlipayModule extends ReactContextBaseJavaModule {

    public AlipayModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    @Override
    public String getName() {
        return "AlipayManager";
    }

    @ReactMethod
    public void addEvent(final String payParams, final Callback callback) {
        Log.d("ALI_PAY", "入参：" + payParams);
        PayTask alipay = new PayTask(getCurrentActivity());

        String result = alipay.pay(payParams, true);
        PayResult payResult = new PayResult(result);

        Log.d("ALI_PAY", "支付结果：" + result);

        if(callback != null) {
            WritableNativeMap nativeMap = new WritableNativeMap();
            nativeMap.putString("resultStatus", payResult.getResultStatus());
            nativeMap.putString("memo", payResult.getMemo());
            nativeMap.putString("result", payResult.getResult());

            callback.invoke(null, nativeMap);
        }
    }
}
