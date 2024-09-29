import { buildDriver } from '../';

describe('sanity check', () => {
  let driver: WebdriverIO.Browser;
  beforeEach(async () => {
    driver = await buildDriver({
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Android',
      'appium:appPackage': 'com.android.settings',
      'appium:appActivity': '.Settings',
    });
  }, 30000);
  it('should show battery', async () => {
    const batteryItem = driver.$('//*[@text="Battery"]');
    await batteryItem.click();
  });
  afterEach(async () => {
    if (driver) {
      // await driver.pause(1000);
      await driver.deleteSession();
    }
  });
});
