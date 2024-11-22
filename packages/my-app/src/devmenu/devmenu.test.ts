import { registerDevMenuItemsAsync } from '@/devmenu/index';
import ClearAllData from '@/devmenu/ClearAllData.devmenu';
import { devMenuModules } from '@/devmenu/requireContext';
import { DevMenuItemModule } from '@/devmenu/types';
import ClearAsyncStorageDevmenu from '@/devmenu/ClearAsyncStorage.devmenu';
import ClearLogFilesDevmenu from '@/devmenu/ClearLogFiles.devmenu';
import ShowSiteMapDevmenu from '@/devmenu/ShowSiteMap.devmenu';

jest.mock('@/devmenu/requireContext', () => {
  const devMenuModules = jest.fn(() => ({})) as any;
  devMenuModules.keys = jest.fn(() => []);
  return { devMenuModules };
});
jest.mock('expo-dev-client', () => ({
  registerDevMenuItems: jest.fn(),
}));

test('nothing registered', async () => {
  await registerDevMenuItemsAsync({ router: jest.fn() as any });
});

describe('register known menu items', () => {
  /**
   * This mocks out the missing require.context limitation of jest.
   */
  const menuItems: Record<string, { default: DevMenuItemModule }> = {
    ClearAllData: { default: ClearAllData },
    ClearAsyncStorage: { default: ClearAsyncStorageDevmenu },
    ClearLogFiles: { default: ClearLogFilesDevmenu },
    ShowSiteMap: { default: ShowSiteMapDevmenu },
  };
  test('register known test', async () => {
    jest.mocked(devMenuModules!.keys).mockReturnValue(Object.keys(menuItems));
    jest
      .mocked(devMenuModules!)
      .mockImplementation((key: keyof typeof menuItems) => menuItems[key]);
    await registerDevMenuItemsAsync({ router: jest.fn() as any });
  });
});
