import { remote } from 'webdriverio';

export const buildDriver = async (capabilities: WebdriverIO.Capabilities) => {
  const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    capabilities,
  };
  return remote(wdOpts);
};
