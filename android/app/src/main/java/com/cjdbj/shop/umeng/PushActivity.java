package com.cjdbj.shop.umeng;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.umeng.message.UmengNotifyClickActivity;
import com.cjdbj.shop.MainActivity;


import org.android.agoo.common.AgooConstants;

/**
 * 友盟集成小米push
 */
public class PushActivity extends UmengNotifyClickActivity {
    private static String TAG = PushActivity.class.getName();

    @Override
    protected void onCreate(Bundle bundle) {

        super.onCreate(bundle);
        Intent intent = new Intent(PushActivity.this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    @Override
    public void onMessage(Intent intent) {
        super.onMessage(intent);  //此方法必须调用，否则无法统计打开数
        String body = intent.getStringExtra(AgooConstants.MESSAGE_BODY);
        Log.i(TAG, "onMessage::" + body);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }
}