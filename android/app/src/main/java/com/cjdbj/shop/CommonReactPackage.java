package com.cjdbj.shop;

import android.util.Log;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.cjdbj.shop.umeng.PushModule;
import com.cjdbj.shop.umeng.UmengConfigure;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CommonReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        UmengConfigure.reactApplicationContext = reactContext;
        List<NativeModule> modules = new ArrayList<>();
//        modules.add(new SplashScreenModule(reactContext));
//        modules.add(new AlipayModule(reactContext));
//        modules.add(new PayModule(reactContext));
//        modules.add(new WeixinModule(reactContext));
        modules.add(new PushModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}