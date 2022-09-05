# Onboarding project
## Small project to learn the company development cycle
### Environment and tools
This project was tested using:

- MacOS Monterey 12.5
    - Xcode 13.4.1
    - Android Studio Chipmunk | 2021.2.1
### Steps to run and debug

#### Instaling dependencies
- Run `$ npm install`
##### Node and Watchmen
- Install [Homebrew](http://brew.sh/)
- Run `$ brew install node`
- Run `$ brew install watchman`

##### JDK
- Run `$ brew tap homebrew/cask-versions`
- Run `$ brew install --cask zulu11`

##### Android Studio
- Install [Android Studio](https://developer.android.com/studio/index.html)
- Open it
    - Go to More Actions > Appearance & Behavior > System Settings > Android SDK
    - Select "SDK Plataforms"
        - Check the box "Show Package Details"
        - Expand Android 12 (S)
            - Check "Android SDK Platform 31"
            - Check "Google APIs Intel x86 Atom System Image""
    - Select "SDK Tools""
        - Check the box "Show Package Details""
        - Expand "Android SDK Build-Tools""
            - Check "31.0.0"
- Open the file `$HOME/.bash_profile` and add:
    - `export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk`
    - `export PATH=$PATH:$ANDROID_SDK_ROOT/emulator`
    - `export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools`
- Run `$ source $HOME/.bash_profile`

##### Xcode
- Install [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
- Open it
    - Go to Xcode > Preferences ... > Components
        - Install the latest version of iOS
- Run `$ sudo gem install cocoapods`
- Run `$ sudo pod install`

#### Running and debugging
- Run `$ npx react-native start`
- If testing on Android, run `$ npx react-native run-android`
- If testing on iOS, run `$ npx react-native run-ios`
