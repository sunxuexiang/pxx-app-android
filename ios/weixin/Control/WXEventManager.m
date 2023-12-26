//
//  EventManager.m
//  b2bapp
//
//  Created by gaomuwei on 2018/8/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WXEventManager.h"

@implementation WXEventManager

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[@"wxAuthResp"]; //这里返回的将是你要发送的消息名的数组。
}

- (void)startObserving {
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(emitEventInternal:)
                                               name:@"event-emitted"
                                             object:nil];
}

- (void)stopObserving {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)emitEventInternal:(NSNotification *)notification {
  [self sendEventWithName:@"wxAuthResp" body:notification.object];
}

+ (void)postMessageToReactNative:(NSMutableDictionary *)args {
  [[NSNotificationCenter defaultCenter] postNotificationName:@"event-emitted" object:args];
}

@end
