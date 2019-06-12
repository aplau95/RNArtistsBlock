using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Com.Reactlibrary.RNImageColorPicker
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNImageColorPickerModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNImageColorPickerModule"/>.
        /// </summary>
        internal RNImageColorPickerModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNImageColorPicker";
            }
        }
    }
}
