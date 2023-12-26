package com.cjdbj.shop;

import android.app.Activity;
import android.app.Dialog;

import java.lang.ref.WeakReference;

/**
 * Created by hufeng on 10/21/15.
 *
 * 本想在JS层次直接封装一个View,来完成Splash的功能且都已经ok
 * 但是从体验上说,有点不妥的地方时无法覆盖StatusBar
 * 如果再折腾一圈去隐藏和显示导航条就绕太远了.
 * 我们从不排斥原生,但是总是在关键的时候才祭出屠龙刀.
 *
 * 感谢领航者hufeng为我们开辟出来的道路
 */
public class SplashScreen {
    private static Dialog mSplashDialog;
    private static WeakReference<Activity> mActivity;


    /**
     * 打开启动屏
     */
    public static void show(final Activity activity,final boolean fullScreen) {
        if (activity == null) return;
        mActivity = new WeakReference<Activity>(activity);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {

                    mSplashDialog = new Dialog(activity,fullScreen? R.style.SplashScreen_Fullscreen:R.style.SplashScreen_SplashTheme);
                    mSplashDialog.setContentView(R.layout.splash);
                    mSplashDialog.setCancelable(false);

                    if (!mSplashDialog.isShowing()) {
                        mSplashDialog.show();
                    }
                }
            }
        });
    }
    /**
     * 打开启动屏
     */
    public static void show(final Activity activity) {
        show(activity,false);
    }

    /**
     * 关闭启动屏
     */
    public static void hide(Activity activity) {
        if (activity == null) activity = mActivity.get();
        if (activity == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashDialog != null && mSplashDialog.isShowing()) {
                    mSplashDialog.dismiss();
                }
            }
        });
    }
}
