//
//  AlipayRequestHandler.h
//  b2bapp
//
//  Created by bob on 2019/2/22.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import <AlipaySDK/AlipaySDK.h>     // 导入AlipaySDK
#import "AlipayRequestHandler.h"     // 导入支付类

@interface AlipayRequestHandler : NSObject

/**
 * 创建支付宝订单
 */
+ (void)alipay:(NSString *)orderString
      callback: (RCTResponseSenderBlock) callback;

@end/* AlipayRequestHandler_h */
