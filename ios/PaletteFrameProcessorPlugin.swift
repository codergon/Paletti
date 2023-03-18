//
//  PaletteFrameProcessorPlugin.swift
//  Paletti
//
//  Created by Atakere Kester on 14/03/2023.
//

import Foundation
import UIImageColors

extension UIColor {
    func toHexString() -> String {
        var r:CGFloat = 0
        var g:CGFloat = 0
        var b:CGFloat = 0
        var a:CGFloat = 0

        getRed(&r, green: &g, blue: &b, alpha: &a)

        let rgb:Int = (Int)(r*255)<<16 | (Int)(g*255)<<8 | (Int)(b*255)<<0

        return NSString(format:"#%06x", rgb) as String
    }

    convenience init(red: Int, green: Int, blue: Int) {
        assert(red >= 0 && red <= 255, "Invalid red component")
        assert(green >= 0 && green <= 255, "Invalid green component")
        assert(blue >= 0 && blue <= 255, "Invalid blue component")

        self.init(red: CGFloat(red) / 255.0, green: CGFloat(green) / 255.0, blue: CGFloat(blue) / 255.0, alpha: 1.0)
    }

}

@objc(PaletteFrameProcessorPlugin)
public class PaletteFrameProcessorPlugin: NSObject, FrameProcessorPluginBase {
  private static let context = CIContext(options: nil)
  
  @objc
  public static func callback(_ frame: Frame!, withArgs args: [Any]!) -> Any! {
    guard let imageBuffer = CMSampleBufferGetImageBuffer(frame.buffer) else {
      print("Failed to get CVPixelBuffer!")
      return nil
    }
    
    let ciImage = CIImage(cvPixelBuffer: imageBuffer)

    // Get the coordinates of the center of the image
    let center = CGPoint(x: ciImage.extent.width / 2, y: ciImage.extent.height / 2)

    guard let cgImage = context.createCGImage(ciImage, from: ciImage.extent) else {
      print("Failed to create CGImage!")
      return nil
    }
    
    // Get the color of the center pixel
    let pixelData = cgImage.dataProvider!.data
    let data: UnsafePointer<UInt8> = CFDataGetBytePtr(pixelData)
    let pixelInfo: Int = ((Int(cgImage.width) * Int(center.y)) + Int(center.x)) * 4

    let red = CGFloat(data[pixelInfo]) / CGFloat(255.0)
    let green = CGFloat(data[pixelInfo+1]) / CGFloat(255.0)
    let blue = CGFloat(data[pixelInfo+2]) / CGFloat(255.0)
    let alpha = CGFloat(data[pixelInfo+3]) / CGFloat(255.0)
    let color = UIColor(red: red, green: green, blue: blue, alpha: alpha)

    // Convert the color to a hex string
    let hexString = color.toHexString()
    
    return ["hexString": hexString]
  }
}
