//
//  PixelColor.swift
//  Moduler
//
//  Created by Atakere Kester on 04/05/2023.
//

import Foundation

@objc(PixelColor)
class PixelColor: NSObject {
    private var image: UIImage?;

    @objc
    static func requiresMainQueueSetup() -> Bool {
      return true;
    }
  
    @objc
    func constantsToExport() -> [AnyHashable : Any]! {
        return ["currentImage": self.image ?? UIImage(), "imageSize": self.image?.size ?? CGSize()]
    }

    @objc
    func getImageSize(_ callback: RCTResponseSenderBlock) {
        callback([self.image?.size.width ?? 0, self.image?.size.height ?? 0])
    }

    func imageFromLocalFileURL(_ uri: String) -> UIImage? {
        let image: UIImage?
        guard let url = URL(string: uri) else {
          return nil
        }
        do {
          let imageData = try Data(contentsOf: url)
          image = UIImage(data: imageData)
        } catch {
            image = nil
        }
        return image
    }

    @objc
    func setImage(_ imageUri: String, callback: RCTResponseSenderBlock) {
        self.image = imageFromLocalFileURL(imageUri)
        if (self.image == nil) {
            callback(["error"])
        } else {
            callback(["success"])
        }
    }

    @objc
    func getPixelColor(_ x: Int, y: Int, resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock
    ) {
        guard let image = self.image else {
            let error = NSError(domain: "", code: 0, userInfo: nil)
            rejecter("no_image", "No image set", error)
            return
        }

        let point = CGPoint(x: x, y: y)
        guard let pixelData = image.cgImage?.dataProvider?.data else {
            let error = NSError(domain: "", code: 0, userInfo: nil)
            rejecter("no_pixel_data", "No pixel data", error)
            return
        }

        let data: UnsafePointer<UInt8> = CFDataGetBytePtr(pixelData)
        let pixelInfo: Int = ((Int(image.size.width) * Int(point.y)) + Int(point.x)) * 4

        let r = data[pixelInfo]
        let g = data[pixelInfo + 1]
        let b = data[pixelInfo + 2]
        let hex: String = "#" + String(format: "%02x%02x%02x", r, g, b)
        
        resolver(hex)
    }
}
