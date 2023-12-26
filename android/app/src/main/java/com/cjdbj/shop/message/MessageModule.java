package com.cjdbj.shop.message;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import androidx.core.app.NotificationManagerCompat;

public class MessageModule extends ReactContextBaseJavaModule {
    public MessageModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MessageModule";
    }

    @ReactMethod
    public void getMessageSetting(Callback callback) {
        boolean isOpened;
        try {
            isOpened = NotificationManagerCompat.from(getReactApplicationContext()).areNotificationsEnabled();
        } catch (Exception e) {
            e.printStackTrace();
            isOpened = false;
        }

        WritableMap params = Arguments.createMap();
        params.putBoolean("isOpened", isOpened);

        callback.invoke(params);
    }

    @ReactMethod
    public void setMessageSetting() {
        Context context = getReactApplicationContext();

        Intent localIntent = new Intent();
        localIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        localIntent.setAction("android.settings.APPLICATION_DETAILS_SETTINGS");
        localIntent.setData(Uri.fromParts("package", context.getPackageName(), null));

        context.startActivity(localIntent);
    }
}