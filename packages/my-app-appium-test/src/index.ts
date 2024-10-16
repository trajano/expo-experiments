import { Capabilities } from '@wdio/types';
import { remote } from 'webdriverio';

export const buildDriver = async (
  capabilities: Capabilities.RequestedStandaloneCapabilities,
) => {
  const wdOpts: Capabilities.WebdriverIOConfig = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    capabilities,
    logLevel: 'warn',
  };
  return remote(wdOpts);
};
