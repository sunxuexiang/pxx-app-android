//
//  APRootViewController.m
//  APSocialSDKDemo
//
//  Created by Alipay on 15/6/24.
//  Copyright (c) 2015年 Alipay. All rights reserved.
//
#import <Foundation/Foundation.h>
#import "APRootViewController.h"
//  导入支付宝社交分享SDK头文件
#import "APOpenAPI.h"

@implementation APRootViewController

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendWebByUrl:(NSDictionary *) shareInfo
                  callback:(RCTResponseSenderBlock) callback){
  //  创建消息载体 APMediaMessage 对象
  APMediaMessage *message = [[APMediaMessage alloc] init];
  
  NSString *url = [shareInfo objectForKey:@"url"];
  NSString *title = [shareInfo objectForKey:@"title"];
  NSString *descr = [shareInfo objectForKey:@"description"];
  NSString *imgUrl = [shareInfo objectForKey:@"imgUrl"];
  message.title = title;
  message.desc = descr;
  message.thumbUrl = imgUrl;
  //  创建网页类型的消息对象
  APShareWebObject *webObj = [[APShareWebObject alloc] init];
  webObj.wepageUrl = url;
  //  回填 APMediaMessage 的消息对象
  message.mediaObject = webObj;
  
  //  创建发送请求对象
  APSendMessageToAPReq *request = [[APSendMessageToAPReq alloc] init];
  //  填充消息载体对象
  request.message = message;
//分享场景，0为分享到好友，1为分享到生活圈；支付宝9.9.5版本至现在版本，分享入口已合并，这个scene并没有被使用，用户会在跳转进支付宝后选择分享场景（好友、动态、圈子等），但为保证老版本上无问题、建议还是照常传入
  request.scene = 0;
  //  发送请求
  BOOL result = [APOpenAPI sendReq:request];
  if (!result) {
    //失败处理
    callback(@[[NSNull null], @"发送失败"]);
  }
}

//  发送网页消息到支付宝(缩略图链接形式)
RCT_EXPORT_METHOD(sendWebByData:(NSDictionary *) shareInfo
                  callback:(RCTResponseSenderBlock) callback){
  
  //  创建消息载体 APMediaMessage 对象
  APMediaMessage *message = [[APMediaMessage alloc] init];
  
  NSString *url = [shareInfo objectForKey:@"url"];
  NSString *title = [shareInfo objectForKey:@"title"];
  NSString *descr = [shareInfo objectForKey:@"description"];
  NSString *imgUrl = [shareInfo objectForKey:@"imgUrl"];
  message.title = title;
  message.desc = descr;
  //  此处填充缩略图data数据,例如 UIImagePNGRepresentation(UIImage对象)
  //  此处必须填充有效的image NSData类型数据，否则无法正常分享
  message.thumbData = nil;
  //  创建网页类型的消息对象
  APShareWebObject *webObj = [[APShareWebObject alloc] init];
  webObj.wepageUrl = url;
  //  回填 APMediaMessage 的消息对象
  message.mediaObject = webObj;
  
  //  创建发送请求对象
  APSendMessageToAPReq *request = [[APSendMessageToAPReq alloc] init];
  //  填充消息载体对象
  request.message = message;
//分享场景，0为分享到好友，1为分享到生活圈；支付宝9.9.5版本至现在版本，分享入口已合并，这个scene并没有被使用，用户会在跳转进支付宝后选择分享场景（好友、动态、圈子等），但为保证老版本上无问题、建议还是照常传入
  request.scene = 0;
  //  发送请求
  BOOL result = [APOpenAPI sendReq:request];
  if (!result) {
    //失败处理
    callback(@[[NSNull null], @"发送失败"]);
  }
}

@end
