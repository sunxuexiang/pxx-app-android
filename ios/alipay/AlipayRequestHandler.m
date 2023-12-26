//
//  AlipayRequestHandler.m
//  b2bapp
//
//  Created by bob on 2019/2/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AlipayRequestHandler.h"

@implementation AlipayRequestHandler



+ (void)alipay:(NSString *)orderString
      callback:(RCTResponseSenderBlock)callback
{
  
  NSString *appScheme = @"WMs2bApp";
  
  if (orderString == nil || appScheme == nil) {
    if(callback != nil){
      callback(@[@"参数错误", [NSNull null]]);
    }
    return;
  }
  
  //日志输出
  NSLog(@"alipay payOrder : orderString=%@, appScheme=%@", orderString, appScheme);
  
  [[AlipaySDK defaultService] payOrder:orderString
                            fromScheme:appScheme
                              callback:^(NSDictionary *resultDic) {
                                NSLog(@"alipay result = %@",resultDic);
                                if(callback != nil){
                                  callback(@[[NSNull null], resultDic]);
                                }
                              }
   ];
}

@end
