//
//  WXApiManager.m
//  SDKSample
//
//  Created by Jeason on 16/07/2015.
//
//

#import "WXApiManager.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTBridgeModule.h>
#import "WXEventManager.h"

@implementation WXApiManager
@synthesize bridge = _bridge;

#pragma mark - LifeCycle
+(instancetype)sharedManager {
    static dispatch_once_t onceToken;
    static WXApiManager *instance;
    dispatch_once(&onceToken, ^{
        instance = [[WXApiManager alloc] init];
    });
    return instance;
}

- (void)dealloc {
    self.delegate = nil;
    [super dealloc];
}

#pragma mark - WXApiDelegate
- (void)onResp:(BaseResp *)resp {
  if ([resp isKindOfClass:[SendMessageToWXResp class]]) {
    SendMessageToWXResp *messageResp = (SendMessageToWXResp *)resp;
    NSMutableDictionary *body = @{@"errCode":@(messageResp.errCode)}.mutableCopy;
    body[@"errStr"] = messageResp.errStr;
    body[@"type"] = @"SendMessageToWX.Resp";
    [self.bridge.eventDispatcher sendAppEventWithName:@"sendMessage" body:body];
  } else if ([resp isKindOfClass:[SendAuthResp class]]) {
    SendAuthResp *r = (SendAuthResp *)resp;
    NSMutableDictionary *body = @{@"errCode":@(r.errCode)}.mutableCopy;
    NSString *plistPickPath = [[NSBundle mainBundle] pathForResource:@"Info" ofType:@"plist"];
    NSDictionary *plistDictionary = [[NSDictionary alloc] initWithContentsOfFile:plistPickPath];
    body[@"errStr"] = r.errStr;
    body[@"state"] = r.state;
    body[@"lang"] = r.lang;
    body[@"country"] =r.country;
    body[@"code"] = r.code;
    body[@"appId"] = [plistDictionary objectForKey:@"wxAppId"];
    body[@"appSecret"] = [plistDictionary objectForKey:@"wxAppSecret"];
    body[@"type"] = @"SendAuth.Resp";
    [WXEventManager postMessageToReactNative :body];
//    [self.bridge.eventDispatcher sendAppEventWithName:@"wxAuthResp" body:body];
  } else if ([resp isKindOfClass:[AddCardToWXCardPackageResp class]]) {
    if (_delegate
        && [_delegate respondsToSelector:@selector(managerDidRecvAddCardResponse:)]) {
      AddCardToWXCardPackageResp *addCardResp = (AddCardToWXCardPackageResp *)resp;
      [_delegate managerDidRecvAddCardResponse:addCardResp];
    }
  }else if([resp isKindOfClass:[PayResp class]]){
    //支付返回结果，实际支付结果需要去微信服务器端查询
    NSString *strMsg,*strTitle = [NSString stringWithFormat:@"支付结果"];
    
    switch (resp.errCode) {
      case WXSuccess:
        strMsg = @"支付结果：成功！";
        NSLog(@"支付成功－PaySuccess，retcode = %d", resp.errCode);
        break;
        
      default:
        strMsg = [NSString stringWithFormat:@"支付结果：失败！retcode = %d, retstr = %@", resp.errCode,resp.errStr];
        NSLog(@"错误，retcode = %d, retstr = %@", resp.errCode,resp.errStr);
        break;
    }
  }
}

- (void)onReq:(BaseReq *)req {
    if ([req isKindOfClass:[GetMessageFromWXReq class]]) {
        if (_delegate
            && [_delegate respondsToSelector:@selector(managerDidRecvGetMessageReq:)]) {
            GetMessageFromWXReq *getMessageReq = (GetMessageFromWXReq *)req;
            [_delegate managerDidRecvGetMessageReq:getMessageReq];
        }
    } else if ([req isKindOfClass:[ShowMessageFromWXReq class]]) {
        if (_delegate
            && [_delegate respondsToSelector:@selector(managerDidRecvShowMessageReq:)]) {
            ShowMessageFromWXReq *showMessageReq = (ShowMessageFromWXReq *)req;
            [_delegate managerDidRecvShowMessageReq:showMessageReq];
        }
    } else if ([req isKindOfClass:[LaunchFromWXReq class]]) {
        if (_delegate
            && [_delegate respondsToSelector:@selector(managerDidRecvLaunchFromWXReq:)]) {
            LaunchFromWXReq *launchReq = (LaunchFromWXReq *)req;
            [_delegate managerDidRecvLaunchFromWXReq:launchReq];
        }
    }
}

@end
