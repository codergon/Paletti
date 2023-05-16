//
//  PixelColor.m
//  Moduler
//
//  Created by Atakere Kester on 04/05/2023.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PixelColor, NSObject)

RCT_EXTERN_METHOD(setImage:(NSString *)imageUri
                  callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getImageSize:(RCTResponseSenderBlock)callback)                  
RCT_EXTERN_METHOD(getPixelColor:(NSInteger *)x
                  y:(NSInteger *)y
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
   return YES;
}

@end
