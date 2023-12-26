
//
//  Header.h
//  b2bapp
//
//  Created by gaomuwei on 2018/8/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface WXEventManager : RCTEventEmitter <RCTBridgeModule>

+ (void)postMessageToReactNative:(NSMutableDictionary *)args;

@end
