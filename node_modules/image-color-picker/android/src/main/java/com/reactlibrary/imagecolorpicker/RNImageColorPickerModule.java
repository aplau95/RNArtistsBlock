
package com.reactlibrary.imagecolorpicker;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.support.v7.graphics.Palette;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Callback;

import java.util.List;
import java.util.ArrayList;

public class RNImageColorPickerModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNImageColorPickerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNImageColorPicker";
  }

  @ReactMethod
  public void getColor(String imagePath, final Promise promise) {
    Bitmap bitmap = BitmapFactory.decodeFile(imagePath);
    Palette.from(bitmap).generate(new Palette.PaletteAsyncListener() {
      @Override
      public void onGenerated(Palette palette) {
        try {
          WritableArray color = Arguments.createArray();
          List<Palette.Swatch> swatchList = palette.getSwatches();
          for (Palette.Swatch swatch : swatchList) {
            if (swatch != null) {
              int rgb = swatch.getRgb();
              int r = Color.red(rgb);
              int g = Color.green(rgb);
              int b = Color.blue(rgb);
              // add 1 value for alpha factor
              color.pushString(String.valueOf(r) + "-" + String.valueOf(g) + "-" + String.valueOf(b) + "-" + "1");
            }
          }
          promise.resolve(color);
        } catch (Exception e) {
          promise.reject("No color", e);
        }
      }
    });
  }
}
