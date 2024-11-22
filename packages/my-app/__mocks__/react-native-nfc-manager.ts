export const start = jest.fn(() => Promise.resolve());
export const isSupported = jest.fn(() => Promise.resolve(true));
export default {
  start,
  isSupported,
};
