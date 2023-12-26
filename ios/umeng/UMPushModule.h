//
//  UMPushModule.h
//  b2bapp
//
//  Created by 何虎 on 2019/5/17.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface UMPushModule : NSObject <RCTBridgeModule>

+ (void)setDeviceToken:(NSString*)deviceToken;

+ (void) dispatchMessage:(NSDictionary *) messageInfo;

+ (void) setMessageParams:(NSDictionary*) messageParams;

@end
