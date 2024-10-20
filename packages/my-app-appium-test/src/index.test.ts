import { buildDriver } from './index';

describe('tooling check', () => {
  it('buildDriver should exist', async () => {
    expect(buildDriver).toBeTruthy();
  });
});
