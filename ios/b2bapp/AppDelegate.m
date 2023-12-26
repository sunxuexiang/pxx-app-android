/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "SplashScreen.h"
#import "WXApi.h"
#import "WXApiManager.h"
#import <AlipaySDK/AlipaySDK.h>

#import "RNUMConfigure.h"
#import "UMPushModule.h"
#import <UMCommon/UMCommon.h>
#import <UMPush/UMessage.h>
#import <BaiduMapViewManager.h>

#import "APRootViewController.h"
#import "APOpenAPI.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  [UMConfigure setLogEnabled:YES];
  [RNUMConfigure initWithAppkey:@"6087e715066ad2501831fa5d" channel:@"App Store"];

  [BaiduMapViewManager initSDK:@"R0x1mX3hshLgvlh5kGwdCHHDCUWhjA5i"];
  [[BMKLocationAuth sharedInstance] checkPermisionWithKey:@"R0x1mX3hshLgvlh5kGwdCHHDCUWhjA5i" authDelegate:self];

  // Push's basic setting
  UMessageRegisterEntity * entity = [[UMessageRegisterEntity alloc] init];
  //type是对推送的几个参数的选择，可以选择一个或者多个。默认是三个全部打开，即：声音，弹窗，角标
  entity.types = UMessageAuthorizationOptionBadge|UMessageAuthorizationOptionAlert|UMessageAuthorizationOptionSound;
  [UNUserNotificationCenter currentNotificationCenter].delegate=self;
  [UMessage registerForRemoteNotificationsWithLaunchOptions:launchOptions Entity:entity completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
    }else
    {
    }
  }];

//
  NSDictionary * userInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];

  NSURL *jsCodeLocation;
  // 下面的路径为原来的路径
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
//  jsCodeLocation = [NSURL URLWithString:@"http://172.19.6.57:8081/index.ios.bundle?platform=ios&dev=true&minify=false"];

  // 获取应用沙盒根目录
//  NSString * jsBundlePath = NSHomeDirectory();
//  NSLog(@"sanbox root path = %@",jsBundlePath);
//  // 调整过的加载路径，设置从 沙盒根目录/bundles/index.ios.bundle 加载文件
//  jsCodeLocation = [NSURL URLWithString:[jsBundlePath stringByAppendingString:@"/bundles/index.ios.bundle"]];

  NSLog(@"scx======jsCodeLocation: %@", jsCodeLocation);

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"b2bapp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  NSString *plistPickPath = [[NSBundle mainBundle] pathForResource:@"Info" ofType:@"plist"];
  NSDictionary *plistDictionary = [[NSDictionary alloc] initWithContentsOfFile:plistPickPath];

  NSString *wxAppId = [plistDictionary objectForKey:@"wxAppId"];
  //向微信注册AppId
  NSString *UNIVERSAL_LINK = @"https://m.s2b.wanmi.com/";

//  [WXApi registerApp:wxAppId]; // 此处需要重新写下微信的方法
  [WXApi registerApp:wxAppId universalLink:UNIVERSAL_LINK];


  //  配置应用的AppId
  //      重要：必须先在支付宝开放平台申请您的AppId才能正常使用支付宝社交分享功能
  //      Demo中的AppId，使用xxxxxxxxxx代替
  if (![APOpenAPI registerApp:@"2019011663011858"]) {
      UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"注册App失败" message:@"请检查scheme配置" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil];
      [alert show];
  }


  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [SplashScreen show];
  return YES;
}


- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
  //下面这个token是将获取的nsdata转换成String,应为指定推送时我们需要将这个传给服务端。
  if (![deviceToken isKindOfClass:[NSData class]]) return;
  const unsigned *tokenBytes = [deviceToken bytes];
  NSString *token = [NSString stringWithFormat:@"%08x%08x%08x%08x%08x%08x%08x%08x",
                        ntohl(tokenBytes[0]), ntohl(tokenBytes[1]), ntohl(tokenBytes[2]),
                        ntohl(tokenBytes[3]), ntohl(tokenBytes[4]), ntohl(tokenBytes[5]),
                        ntohl(tokenBytes[6]), ntohl(tokenBytes[7])];
  NSLog(@"deviceToken = %@",deviceToken);
  NSLog(@"deviceToken = %@",token);
  //注册token
  [UMessage registerDeviceToken:deviceToken];

  [UMPushModule setDeviceToken:token];
}


// 远程通知注册失败委托
-( void )application:( UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:( NSError *)error
{
  NSLog( @"%@啦啦啦啦啦啦啦" ,error);
}

// 次方法在iOS10以后，已经不再支持
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{

  //接受服务端推送通知传来的值，全部在userinfo里面。
  [UMessage didReceiveRemoteNotification:userInfo];
  [UIApplication sharedApplication].applicationIconBadgeNumber=5;

  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0)
  {
    UIUserNotificationType myType = UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeSound;
    UIUserNotificationSettings *mySetting = [UIUserNotificationSettings settingsForTypes:myType categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:mySetting];
  }else{
    UIRemoteNotificationType myType = UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeSound;
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:myType];
  }
}

//iOS10新增：处理前台收到通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler{
  NSDictionary * userInfo = notification.request.content.userInfo;
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {

    //应用处于前台时的远程推送接受
    //关闭友盟自带的弹出框
    [UMessage setAutoAlert:NO];
    //必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];

    // 在这里自己实现来在接收到远程推送时，主动调用RN端的，把通知内容传给RN，这样就可以控制RN收到推送时跳转到指定页面来。
    // [UMPushModule dispatchMessage:userInfo];

  }else{
    //应用处于前台时的本地推送接受
  }
  completionHandler(UNNotificationPresentationOptionSound|UNNotificationPresentationOptionBadge|UNNotificationPresentationOptionAlert);
}

//iOS10新增：处理后台点击通知的代理方法
//这个方法是在APP接收到通知之后，点击通知栏跳转到APP时才调用的， 注意：：！！如果直接点击APP是没用的
//知识点！！ iOS的通知 分APP在前台时显示和点击通知栏跳转到APP显示， 如果直接点击APP的话是不会走上面的两个回调方法的，之前理解错误
-(void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler{
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {

    //应用处于后台时的远程推送接受
    //必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];
    // [UMEventManager OCsendMessageToReactNative:userInfo];

    [UMPushModule dispatchMessage:userInfo];
    //[YouMengNotice performSelector:@selector(OCsendMessageToReactNative:) withObject:userInfo afterDelay:15];
    //    [YouMengNotice OCsendMessageToReactNative:userInfo];


  }else{
    //应用处于后台时的本地推送接受
  }
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url {
    return  [WXApi handleOpenURL:url delegate: [WXApiManager sharedManager]];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    return [WXApi handleOpenURL:url delegate: [WXApiManager sharedManager]];
}

-(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{
    return [WXApi handleOpenURL:url delegate: [WXApiManager sharedManager]];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
    return [WXApi handleOpenUniversalLink:userActivity delegate: [WXApiManager sharedManager]];
}

@end
