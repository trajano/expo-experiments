import ShowSiteMapDevmenu from '@/devmenu/ShowSiteMap.devmenu';
import { type Router } from 'expo-router';

test('Show site map', async () => {
  const mockRouter = jest.mocked<Router>({
    back: jest.fn(),
    canGoBack: jest.fn(),
    canDismiss: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    push: jest.fn(),
    dismiss: jest.fn(),
    dismissAll: jest.fn(),
    setParams: jest.fn(),
    navigate: jest.fn(),
  });

  await ShowSiteMapDevmenu.callback({ router: mockRouter });
  expect(mockRouter.navigate).toHaveBeenCalledWith('/_sitemap');
});
