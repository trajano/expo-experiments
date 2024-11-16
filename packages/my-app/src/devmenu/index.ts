import * as DevClient from 'expo-dev-client';
import { DevMenuItemModule, RegisterDevMenuItemProps } from '@/devmenu/types';
import { devMenuModules } from './requireContext';

/**
 * Registers dev menu items.
 * This is an example of using metro requires to scan through a directory
 * rather than explicit imports.  https://github.com/EvanBacon/Metro-Context-Modules-Demo
 */
export const registerDevMenuItemsAsync = async (
  props: RegisterDevMenuItemProps,
) => {
  const expoDevMenuItems = devMenuModules
    .keys()
    .map((key) => devMenuModules<{ default: DevMenuItemModule }>(key))
    .map((it) => it.default)
    .map((it) => ({
      name: it.name,
      callback: () => {
        it.callback(props).then();
      },
      shouldCollapse: true,
    }));
  await DevClient.registerDevMenuItems(expoDevMenuItems);
};
