package com.cjdbj.shop;

import android.app.Activity;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.swmansion.reanimated.ReanimatedPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import org.reactnative.camera.RNCameraPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.example.cukiy.cqshare.CQSharePackage;

import androidx.multidex.MultiDexApplication;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.opensettings.OpenSettingsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rnfs.RNFSPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.cjdbj.shop.alipay.AlipayPackage;
import com.cjdbj.shop.alishare.AliSharePackage;
import com.cjdbj.shop.message.MessagePackage;
import com.cjdbj.shop.pay.PayModulePackage;
import com.cjdbj.shop.umeng.UmengConfigure;
import com.cjdbj.shop.weixin.WeixinPackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.reactnativecommunity.cameraroll.CameraRollPackage;

import org.android.agoo.huawei.HuaWeiRegister;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

    private static int count = 0;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new ReanimatedPackage(),
            new AsyncStoragePackage(),
            new RNCameraPackage(),
            new BaiduMapPackage(),
            new RNCWebViewPackage(),
            new ImagePickerPackage(),
              new CQSharePackage(),
              new ReactVideoPackage(),
              new RNViewShotPackage(),
              new AliSharePackage(),
              new RNFSPackage(),
              new SvgPackage(),
              new RNDeviceInfo(),
              new RNExitAppPackage(),
//              new AutoHeightWebViewPackage(),
              new OpenSettingsPackage(),
              new LinearGradientPackage(),
              new CommonReactPackage(),
              new SplashScreenReactPackage(),
              new WeixinPackage(),
              new AlipayPackage(),
              new MessagePackage(),
              new RNGestureHandlerPackage(),
              new RNPermissionsPackage(),
              new SafeAreaContextPackage(),
              new CameraRollPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    init();
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // 友盟
    try {
      ApplicationInfo appInfo = this.getPackageManager()
              .getApplicationInfo(getPackageName(),
                      PackageManager.GET_META_DATA);

      String host = appInfo.metaData.getString("INTERFACE_HOST");

      new UmengConfigure(this, this, host);
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }

    // 友盟- 华为
    HuaWeiRegister.register(this);
  }

  private void init() {
    registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
      @Override
      public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
        Log.w("Lifecycle",activity.getLocalClassName()+" was Created activity==null   "
                +(activity==null)+"     activity.isFinishing()  "+(activity.isFinishing())+"    activity.isDestroyed()  "+activity.isDestroyed());
      }

      @Override
      public void onActivityStarted(Activity activity) {
        Log.w("Lifecycle",activity.getLocalClassName()+" was Started activity==null   "
                +(activity==null)+"     activity.isFinishing()   "+(activity.isFinishing())+"   activity.isDestroyed()  "+activity.isDestroyed());

        count ++;
      }

      @Override
      public void onActivityResumed(Activity activity) {
        Log.w("Lifecycle",activity.getLocalClassName()+" was oResumed activity==null   "
                +(activity==null)+"activity.isFinishing()   "+(activity.isFinishing())+"activity.isDestroyed() "+activity.isDestroyed());
      }

      @Override
      public void onActivityPaused(Activity activity) {
        Log.w("Lifecycle",activity.getLocalClassName()+" was Pauseed activity==null   "
                +(activity==null)+"activity.isFinishing()   "+(activity.isFinishing())+"activity.isDestroyed()  "+activity.isDestroyed());
      }

      @Override
      public void onActivityStopped(Activity activity) {
        Log.w("Lifecycle",activity.getLocalClassName()+" was Stoped activity==null    "
                +(activity==null)+"activity.isFinishing()   "+(activity.isFinishing())+"activity.isDestroyed() "+activity.isDestroyed());
        if(count > 0) {
          count--;
        }
      }

      @Override
      public void onActivitySaveInstanceState(Activity activity, Bundle outState) {
        Log.w("Lifecycle",activity.getLocalClassName()+" was SaveInstanceState activity==null "
                +(activity==null)+"activity.isFinishing()   "+(activity.isFinishing())+"activity.isDestroyed()  "+activity.isDestroyed());
      }

      @Override
      public void onActivityDestroyed(Activity activity) {
        Log.w("Lifecycle",activity.getLocalClassName()+" was Destroyed"+"activity==null"
                +(activity==null)+"  activity.isFinishing()  "+(activity.isFinishing())+"  activity.isDestroyed()"+activity.isDestroyed());
      }
    });
  }

  public static boolean isBackground(){
    if(count <= 0){
      return true;
    } else {
      return false;
    }
  }
}
