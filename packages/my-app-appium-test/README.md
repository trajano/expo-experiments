debating how to best approach this

1. run appium locally connect to real device

annoying, probably would avoid this as much as possibe

2. run appium in Docker (appium/appium) connect to real device or locally run emulator

this one seems to be better, just don't like the extra steps but at least a real device helps. However, the appium instance needs to add the device after it has started.

```
container_id=$(docker run -d -p 4723:4723 appium/appium)
docker exec -d ${container_id} adb connect 192.168.0.129:5555
```

Also the annoying bit is everytime it restarts a new "approval" needs to be done on the phone.

This is the one I got to work first. but too hacky. It needs node to do some weird things.

So looking further into it, it appears that the APK must be with the server so Dockerfile was modified to extend appium/appium with the APK

3. run the emulator in Docker?

```
docker run -p 6080:6080 -e EMULATOR_DEVICE="Samsung Galaxy S10" -e WEB_VNC=false --device //dev/kvm --name android-container2 budtmo/docker-android:emulator_14.0
```

How do we connect? Even if the image does have appium built in.

Another problem is dealing with updates, it takes a few minutes to build the APK again, it would be nice to push an update of the javascript parts only. That would require EAS unless there's a local update server.

Maestro and Detox were too painful to run on Windows with Git Bash so I dropped it in the end.

Appium at least once configured (which was a pain and a half to get going) was at least the most sensible E2E one that would run on Windows + Docker. Only thing missing now is running the test on an Android emulator.

The problem with running in an emulator inside Docker is without proper /dev/kvm access (which is difficult on Docker Desktop unless I cheat and `root`) is it is so painfully slow it's not worth the hassle. For now I'll stop with real device, theoretically stuff like BrowserStack or LamdaTest can run on their devices if need be.
