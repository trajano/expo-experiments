/**
 * This is extracted as jest does not support require.context.
 * Note this does not work on production builds and will return null
 * for the export.
 */
let modules = null;
if (__DEV__) {
  modules = require.context('.', true, /^.+\.devmenu\.ts$/, 'sync');
}
export const devMenuModules = modules;
