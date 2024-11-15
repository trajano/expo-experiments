import { Router } from 'expo-router';

export type RegisterDevMenuItemProps = {
  router: Router;
};

export type DevMenuItemModule = {
  name: string;
  callback: (props: RegisterDevMenuItemProps) => Promise<void>;
};
