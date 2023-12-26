//
//  AlipayManager.m
//  b2bapp
//
//  Created by bob on 2019/2/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "AlipayManager.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import "AlipayRequestHandler.h"     // 导入支付类

@implementation AlipayManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *) orderString
                  callback:(RCTResponseSenderBlock) callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [AlipayRequestHandler alipay:orderString callback:callback];
  });
}

@end
