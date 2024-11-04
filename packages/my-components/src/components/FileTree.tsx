import * as FileSystem from 'expo-file-system';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { MyText } from 'react-native-my-text';

type FileTreeItemInfoDirectory = {
  name: string;
  uri: string;
  type: 'directory';
  children: FileTreeItemInfo[];
  depth: number;
};
type FileTreeItemInfoFile = {
  name: string;
  uri: string;
  type: 'file';
  depth: number;
};
type FileTreeItemInfo = FileTreeItemInfoDirectory | FileTreeItemInfoFile;
// Recursive function to read the directory and its children
const readDirectoryRecursively = async (
  uri: string,
  hideChildren: boolean,
  depth = 0,
): Promise<FileTreeItemInfo[]> => {
  const items = await FileSystem.readDirectoryAsync(uri);
  const result: FileTreeItemInfo[] = [];

  // Get detailed info for each item
  const itemInfos = await Promise.all(
    items.map(async (item) => {
      const itemUri = `${uri}/${item}`;
      const fileInfo = await FileSystem.getInfoAsync(itemUri);
      return { name: item, isDirectory: fileInfo.isDirectory, uri: itemUri };
    }),
  );

  // Sort: Directories first (alphabetically), then files (alphabetically)
  itemInfos.sort((a, b) => {
    if (a.isDirectory && !b.isDirectory) return -1; // a is directory, b is not
    if (!a.isDirectory && b.isDirectory) return 1; // a is not directory, b is
    return a.name.localeCompare(b.name); // Sort alphabetically
  });

  for (const fileInfo of itemInfos) {
    const itemUri = fileInfo.uri;

    if (fileInfo.isDirectory) {
      // Recursively fetch the children of the directory
      const children = hideChildren
        ? []
        : await readDirectoryRecursively(itemUri, true, depth + 1);
      result.push({
        name: fileInfo.name,
        uri: itemUri,
        type: 'directory',
        children,
        depth,
      });
    } else {
      result.push({
        name: fileInfo.name,
        uri: itemUri,
        type: 'file',
        depth,
      });
    }
  }

  return result;
};

const flattenTree = (tree: FileTreeItemInfo[]): FileTreeItemInfo[] => {
  let result: FileTreeItemInfo[] = [];

  tree.forEach((node) => {
    if (node.type === 'directory') {
      // Keep the directory, but remove the children
      result.push({ ...node, children: [] });

      // Recursively flatten the children and add them to the result
      if (node.children && node.children.length > 0) {
        result = result.concat(flattenTree(node.children));
      }
    } else {
      // Add files directly to the result
      result.push(node);
    }
  });

  return result;
};

export type OnItemPressCallback = (
  item: FileTreeItemInfo,
  refreshCallback: () => Promise<void>,
) => void | Promise<void>;

const TreeItem: FC<{
  item: FileTreeItemInfo;
  onItemPress?: OnItemPressCallback;
  onItemLongPress?: OnItemPressCallback;
  refreshCallback: () => Promise<void>;
  itemTextStyle?: StyleProp<TextStyle>;
  label: string;
}> = ({
  item,
  onItemPress,
  onItemLongPress,
  label,
  refreshCallback,
  itemTextStyle,
}) => {
  const onPress = useCallback(
    () => onItemPress && onItemPress(item, refreshCallback),
    [item, onItemPress, refreshCallback],
  );
  const onLongPress = useCallback(
    () => onItemLongPress && onItemLongPress(item, refreshCallback),
    [item, onItemLongPress, refreshCallback],
  );
  if (onItemPress || onItemLongPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.fileItem, { paddingLeft: item.depth * 10 }]}
        testID="touchable-tree-item"
      >
        <MyText style={itemTextStyle}>{label}</MyText>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.fileItem, { paddingLeft: item.depth * 10 }]}>
        <MyText style={itemTextStyle}>{label}</MyText>
      </View>
    );
  }
};

const DirectoryItem: FC<{
  item: FileTreeItemInfoDirectory;
  itemTextStyle?: StyleProp<TextStyle>;
  refreshCallback: () => Promise<void>;
  onItemPress?: OnItemPressCallback;
  onItemLongPress?: OnItemPressCallback;
}> = ({ item, ...props }) => (
  <TreeItem item={item} {...props} label={`📁 ${item.name}`} />
);

const FileItem: FC<{
  item: FileTreeItemInfoFile;
  itemTextStyle?: StyleProp<TextStyle>;
  refreshCallback: () => Promise<void>;
  onItemPress?: OnItemPressCallback;
  onItemLongPress?: OnItemPressCallback;
}> = ({ item, ...props }) => (
  <TreeItem item={item} {...props} label={`📄 ${item.name} ${item.depth}`} />
);

export const FileTree: FC<{
  directoryUri: string;
  hideChildren?: boolean;
  onItemPress?: OnItemPressCallback;
  onItemLongPress?: OnItemPressCallback;
  itemTextStyle?: StyleProp<TextStyle>;
}> = ({
  directoryUri,
  onItemPress,
  onItemLongPress,
  itemTextStyle,
  hideChildren = false,
}) => {
  const [fileTree, setFileTree] = useState<FileTreeItemInfo[]>([]);

  const refresh = useCallback(async () => {
    const tree = await readDirectoryRecursively(directoryUri, hideChildren);
    setFileTree(tree);
  }, [directoryUri, hideChildren]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const tree = await readDirectoryRecursively(directoryUri, hideChildren);
        if (mounted) {
          setFileTree(tree);
        }
      } catch (error) {
        console.error('Error reading directory:', error);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [directoryUri, hideChildren]);

  // Render each file or directory item
  const renderItem: ListRenderItem<FileTreeItemInfo> = ({ item }) =>
    item.type === 'directory' ? (
      <DirectoryItem
        item={item}
        onItemPress={onItemPress}
        itemTextStyle={itemTextStyle}
        onItemLongPress={onItemLongPress}
        refreshCallback={refresh}
      />
    ) : (
      <FileItem
        item={item}
        onItemPress={onItemPress}
        itemTextStyle={itemTextStyle}
        onItemLongPress={onItemLongPress}
        refreshCallback={refresh}
      />
    );

  const flatFileTree = useMemo<FileTreeItemInfo[]>(
    () => flattenTree(fileTree),
    [fileTree],
  );

  return (
    <FlatList
      data={flatFileTree}
      ListHeaderComponent={<Button onPress={refresh} title="refresh" />}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={renderItem}
      getItemLayout={(data, index) => ({
        length: 50,
        offset: 50 * index,
        index,
      })}
    />
  );
};
const styles = StyleSheet.create({
  fileItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 50,
  },
});
