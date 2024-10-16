declare module '@storybook/react-native/metro/withStorybook' {
  import { InputConfigT } from 'metro-config';

  interface WebsocketsOptions {
    port?: number;
    host?: string;
  }

  interface WithStorybookOptions {
    configPath?: string;
    enabled?: boolean;
    websockets?: WebsocketsOptions;
    useJs?: boolean;
  }

  function withStorybook(
    config: InputConfigT,
    options?: WithStorybookOptions,
  ): InputConfigT;

  export = withStorybook;
}
