import './devMenu';

jest.mock('react-native', () => ({
  DevSettings: {
    addMenuItem: jest.fn(),
    reload: jest.fn(),
  },
}));
jest.mock('expo-dev-client', () => ({
  DevMenu: {
    registerDevMenuItems: jest.fn(),
  },
}));
it('should load side-effects', () => {});
