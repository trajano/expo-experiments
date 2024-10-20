import { buildDriver } from '..';

describe('smoke test', () => {
  let driver: WebdriverIO.Browser;
  beforeEach(async () => {
    driver = await buildDriver({
      platformName: 'Android',
      // 'appium:avd': 'foo',
      // 'appium:isHeadless': true,
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Android',
      'appium:app': '/app-release.apk',
      'appium:autoGrantPermissions': true,
      'appium:settings[disableIdLocatorAutocompletion]': true,
      'appium:waitForIdleTimeout': 200,
    });

    const splashElement = driver.$('id=splash');
    await splashElement.waitForExist();
    await splashElement.waitForExist({ reverse: true, timeout: 10000 });
  }, 30000);
  it('should navigate to Storybook and activate sidebar"', async () => {
    const button = driver.$('id=go-storybook-button');
    await button.click();
    await driver.$('id=BottomMenu.Sidebar').click();
    await driver.pause(5000);
  }, 60000);
  afterEach(async () => {
    if (driver) {
      await driver.deleteSession();
    }
  }, 40000);
});
