//
//  UMPushModule.m
//  b2bapp
//
//  Created by 何虎 on 2019/5/17.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/RCTRootView.h>
#import "UMPushModule.h"
#import <UMPush/UMessage.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>

#import "AppDelegate.h"
#import <UserNotifications/UserNotifications.h>

@interface UMPushModule()
@end

@implementation UMPushModule

RCT_EXPORT_MODULE();

//  进行设置发送事件通知给JavaScript端
+ (void) setDeviceToken:(NSString *)deviceToken
{
  AppDelegate *appdelegate = (AppDelegate *) [UIApplication sharedApplication].delegate;
  RCTRootView *rootview = (RCTRootView *)appdelegate.window.rootViewController.view;
  RCTBridge *bridge = rootview.bridge;
  
  [bridge.eventDispatcher sendAppEventWithName:@"deviceToken" body:@{@"deviceToken": deviceToken}];
}

// 点击消息时跳转
+ (void) dispatchMessage:(NSDictionary *) messageInfo
{
  AppDelegate *appdelegate = (AppDelegate *) [UIApplication sharedApplication].delegate;
  RCTRootView *rootview = (RCTRootView *)appdelegate.window.rootViewController.view;
  RCTBridge *bridge = rootview.bridge;
//  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:messageInfo options:0 error:0];
//  NSString *dataStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  [bridge.eventDispatcher sendAppEventWithName:@"umengMsg" body:messageInfo];
}

//// 进入系统通知设置页面
//RCT_EXPORT_METHOD(messageSetting){
//  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
//
//  if ([[UIDevice currentDevice].systemVersion floatValue]<10.0f) {
//    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
//  }else{
//    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString] options:@{} completionHandler:nil];
//  }
//}

// 获取系统通知状态
RCT_EXPORT_METHOD(getMessageSetting:(RCTResponseSenderBlock) callback){
  NSString *isPush = @"0";
  
  if ([[UIDevice currentDevice].systemVersion floatValue]>=8.0f) {
    UIUserNotificationSettings *setting = [[UIApplication sharedApplication] currentUserNotificationSettings];
    if (UIUserNotificationTypeNone == setting.types) {
      NSLog(@"推送关闭");
    }else{
      NSLog(@"推送打开");
      isPush = @"1";
    }
  }else{
    UIRemoteNotificationType type = [[UIApplication sharedApplication] enabledRemoteNotificationTypes];
    if(UIRemoteNotificationTypeNone == type){
      NSLog(@"推送关闭");
    }else{
      NSLog(@"推送打开");
      isPush = @"1";
    }
  }
  
  callback(@[isPush]);
}


@end
