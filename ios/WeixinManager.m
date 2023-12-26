//
//  WeixinManager.m
//  b2bapp
//
//  Created by hht on 2018/7/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "WeixinManager.h"
#import "WXApi.h"
#import "WXApiRequestHandler.h"

@implementation WeixinManager

RCT_EXPORT_MODULE();

//微信支付
RCT_EXPORT_METHOD(addEvent:(NSDictionary *)payReq
                  callback:(RCTResponseSenderBlock) callback)
{
  
  [WXApiRequestHandler jumpToBizPay:payReq callback:callback];
  
}

//微信朋友圈
RCT_EXPORT_METHOD(shareToMoments:(NSDictionary *)data
                  callback:(RCTResponseSenderBlock) callback) {
  if([WXApi isWXAppInstalled] == NO) {
    if(callback != nil){
      callback(@[@"未安装微信", [NSNull null]]);
    }
    return;
  }
  
  NSString *url = [data objectForKey:@"url"];
  NSString *title = [data objectForKey:@"title"];
  NSString *descr = [data objectForKey:@"description"];
  NSString *imgUrl = [data objectForKey:@"imgUrl"];
  
  UIImage *image = [UIImage imageWithData: [NSData dataWithContentsOfURL:[NSURL URLWithString:imgUrl]]];
  
  [WXApiRequestHandler sendLinkURL:url
                           TagName:nil
                             Title:title
                       Description:descr
                        ThumbImage:image
                           InScene:WXSceneTimeline];
}

//微信朋友
RCT_EXPORT_METHOD(shareToFriends:(NSDictionary *)data
                  callback:(RCTResponseSenderBlock) callback) {
  if([WXApi isWXAppInstalled] == NO) {
    if(callback != nil){
      callback(@[@"未安装微信", [NSNull null]]);
    }
    return;
  }
  
  NSString *url = [data objectForKey:@"url"];
  NSString *title = [data objectForKey:@"title"];
  NSString *descr = [data objectForKey:@"description"];
  NSString *imgUrl = [data objectForKey:@"imgUrl"];
  
  UIImage *image = [UIImage imageWithData: [NSData dataWithContentsOfURL:[NSURL URLWithString:imgUrl]]];
  
  [WXApiRequestHandler sendLinkURL:url
                           TagName:nil
                             Title:title
                       Description:descr
                        ThumbImage:image
                           InScene:WXSceneSession];
}

//微信朋友 - 图片
RCT_EXPORT_METHOD(shareImageToFriends:(NSDictionary *)data
                  callback:(RCTResponseSenderBlock) callback) {
  if([WXApi isWXAppInstalled] == NO) {
    if(callback != nil){
      callback(@[@"未安装微信", [NSNull null]]);
    }
    return;
  }
  
  //  NSString *imgUrl = [data objectForKey:@"imgUrl"];
  NSString *imgObject = [data objectForKey:@"imgObject"];
  
  NSData * imageData =[[NSData alloc] initWithBase64EncodedString:imgObject options:NSDataBase64DecodingIgnoreUnknownCharacters];
  
  //  NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:imgUrl]];
  
  //  UIImage *image = [UIImage imageWithData: imageData];
  
  [WXApiRequestHandler sendImageData:imageData
                             TagName:nil
                          MessageExt:nil
                              Action:nil
                          ThumbImage:nil
                             InScene:WXSceneSession];
}

//微信朋友圈 - 图片
RCT_EXPORT_METHOD(shareImageToMoments:(NSDictionary *)data
                  callback:(RCTResponseSenderBlock) callback) {
  if([WXApi isWXAppInstalled] == NO) {
    if(callback != nil){
      callback(@[@"未安装微信", [NSNull null]]);
    }
    return;
  }
  
  //  NSString *imgUrl = [data objectForKey:@"imgUrl"];
  NSString *imgObject = [data objectForKey:@"imgObject"];
  
  NSData * imageData =[[NSData alloc] initWithBase64EncodedString:imgObject options:NSDataBase64DecodingIgnoreUnknownCharacters];
  
  //  NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:imgUrl]];
  
  //  UIImage *image = [UIImage imageWithData: imageData];
  
  [WXApiRequestHandler sendImageData:imageData
                             TagName:nil
                          MessageExt:nil
                              Action:nil
                          ThumbImage:nil
                             InScene:WXSceneTimeline];
}

// 微信授信登录
RCT_EXPORT_METHOD(quickLogin:(NSDictionary *)data
                  callback:(RCTResponseSenderBlock) callback) {
  // 1.判断是否安装微信
  if([WXApi isWXAppInstalled] == NO) {
    if(callback != nil){
      callback(@[@"未安装微信", [NSNull null]]);
    }
    return;
  }
  
  // 2.构造请求对象
  SendAuthReq* req =[[[SendAuthReq alloc]init]autorelease];
  req.scope = [data objectForKey:@"scope"];
  req.state = [data objectForKey:@"state"];
  
  // 3.发送登录请求
  [WXApi sendReq:req
                  completion:^(BOOL success) {}];

}

@end
