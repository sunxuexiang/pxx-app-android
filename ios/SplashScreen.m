//
//  SplashScreen.m
//  D2PAPP
//
//  Created by 张峰 on 10/14/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "SplashScreen.h"

static bool waiting = true;

@implementation SplashScreen
- (dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

+ (void)show {
  while (waiting) {
    NSDate* later = [NSDate dateWithTimeIntervalSinceNow:0.1];
    [[NSRunLoop mainRunLoop] runUntilDate:later];
  }
}

RCT_EXPORT_METHOD(hide) {
  dispatch_async(dispatch_get_main_queue(),
                 ^{
                   waiting = false;
                 });
}
@end
