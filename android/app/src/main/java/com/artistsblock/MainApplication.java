package com.artistsblock;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.slider.ReactSliderPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import io.palette.RNPalettePackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
<<<<<<< HEAD
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new ReactSliderPackage(), new ReactSliderPackage(),
          new RNFirebasePackage(), new RNFirebaseStoragePackage(), new RNFirebaseFirestorePackage(),
          new RNPalettePackage(), new ImagePickerPackage(), new AsyncStoragePackage(), new VectorIconsPackage(),
          new RNScreensPackage(), new RNGestureHandlerPackage());
=======
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactSliderPackage(),
            new RNFirebasePackage(),
            new RNPalettePackage(),
            new RNPalettePackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage(),
            new RNScreensPackage(),
            new RNGestureHandlerPackage()
      );
>>>>>>> image
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
