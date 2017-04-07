
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore odontoManager.keystore .\platforms\android\build\outputs\apk\android-release-unsigned.apk odontoManager

C:\Users\tfonseca\AppData\Local\Android\sdk\build-tools\25.0.1\zipalign.exe -v 4 .\platforms\android\build\outputs\apk\android-release-unsigned.apk odontoManager.apk