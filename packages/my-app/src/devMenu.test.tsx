import './devMenu';
jest.mock('react-native', () => ({
  DevSettings: {
    addMenuItem: jest.fn(),
    reload: jest.fn(),
  },
}));
it('should load side-effects', () => {});
