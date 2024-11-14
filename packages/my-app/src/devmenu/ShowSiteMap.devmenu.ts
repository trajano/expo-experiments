import { DevMenuItemModule } from '@/devmenu/types';

export default {
  name: 'Site Map',
  callback: async ({ router }) => {
    router.navigate('/_sitemap');
  },
} satisfies DevMenuItemModule;
