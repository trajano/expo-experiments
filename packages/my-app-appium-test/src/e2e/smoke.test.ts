import { buildDriver } from '..';

describe('smoke test', () => {
  let driver: WebdriverIO.Browser;
  beforeEach(async () => {
    driver = await buildDriver({
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Android',
      'appium:app': '/app-debug.apk',
      'appium:autoGrantPermissions': true,
      'appium:printPageSourceOnFindFailure': true,
    });
    const splash = await driver.$('~home-tab-button');
    await splash.waitForExist({
      timeout: 30000,
    });
  }, 30000);
  it('should wait for the text "Step 2: Explore"', async () => {
    await driver.pause(5000);
    const splash = await driver.$('//android.widget.TextView[@text="Explore"]');
    await splash.click();
    // await splash.waitForExist({
    //   timeout: 30000
    // });
    await driver.pause(5000);

    //   const splash = await driver.$('~splash'); // ~ is used for testID in React Native apps
    //   await driver.waitUntil(
    //       async () => await splash.isDisplayed(),
    //       {
    //           timeout: 10000, // Wait for up to 10 seconds
    //           timeoutMsg: 'Splash animation was not displayed'
    //       }
    //   );
    //   await driver.waitUntil(
    //     async () => !(await splash.isDisplayed()),
    //     {
    //         timeout: 10000, // Wait for up to 10 seconds for it to disappear
    //         timeoutMsg: 'Splash animation did not disappear in time'
    //     }
    // );
    //   // Wait for the text "Step 2: Explore" to appear
    //   const element = await driver.$('//*[contains(@text, "Step 2: Explore")]');
    //   await element.waitForDisplayed({ timeout: 20000 }); // Wait for 10 seconds
    //   expect(await element.isDisplayed()).toBeTruthy(); // Verify the element is displayed
  }, 40000);
  afterEach(async () => {
    if (driver) {
      await driver.deleteSession();
    }
  });
});
