
# image-color-picker

## Getting started

`$ npm install image-color-picker --save`

### Mostly automatic installation

`$ react-native link image-color-picker`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `image-color-picker` and add `RNImageColorPicker.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNImageColorPicker.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNImageColorPickerPackage;` to the imports at the top of the file
  - Add `new RNImageColorPickerPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':image-color-picker'
  	project(':image-color-picker').projectDir = new File(rootProject.projectDir, 	'../node_modules/image-color-picker/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':image-color-picker')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNImageColorPicker.sln` in `node_modules/image-color-picker/windows/RNImageColorPicker.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Com.Reactlibrary.RNImageColorPicker;` to the usings at the top of the file
  - Add `new RNImageColorPickerPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNImageColorPicker from 'image-color-picker';

// TODO: What to do with the module?
RNImageColorPicker;
```
  