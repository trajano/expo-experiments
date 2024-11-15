/**
 * This is extracted as jest does not support require.context
 */
export const devMenuModules = require.context(
  '.',
  true,
  /^.+\.devmenu\.ts$/,
  'sync',
);
