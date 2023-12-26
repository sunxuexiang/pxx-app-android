package com.cjdbj.shop.pay;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class PayModule extends ReactContextBaseJavaModule{

    private Promise mPromise;

    public PayModule(ReactApplicationContext reactContext) {
        super(reactContext);

        reactContext.addActivityEventListener(mActivityEventListener);
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

        }
    };


    @Override
    public String getName() {
        return "PayModule";
    }


    @ReactMethod
    public void pay(String data, Promise promise) {
        this.mPromise = promise;
        Activity currentActivity = getCurrentActivity();
    }

}