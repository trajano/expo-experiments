import * as FileSystem from 'expo-file-system';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FileViewer from 'react-native-file-viewer';
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
      result.push({
        name: fileInfo.name,
        uri: itemUri,
        type: 'directory',
        children: await readDirectoryRecursively(itemUri, depth + 1),
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

const DirectoryItem: FC<{ item: FileTreeItemInfoDirectory }> = ({ item }) => (
  <View style={[styles.fileItem, { paddingLeft: item.depth * 10 }]}>
    <MyText>{`📁 ${item.name}`}</MyText>
  </View>
);
const FileItem: FC<{ item: FileTreeItemInfoFile }> = ({ item }) => {
  const onPress = useCallback(async () => {
    try {
      await FileViewer.open(item.uri);
    } catch (e: unknown) {
      Alert.alert('File viewer', `Unable to open ${item.name}. Reason: ${e}`);
    }
  }, [item]);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.fileItem, { paddingLeft: item.depth * 10 }]}
    >
      <MyText>{`📄 ${item.name} ${item.depth}`}</MyText>
    </TouchableOpacity>
  );
};
// FileTree component using a single FlashList
export const FileTree: FC<{ directoryUri: string }> = ({ directoryUri }) => {
  const [fileTree, setFileTree] = useState<FileTreeItemInfo[]>([]);

  const refresh = useCallback(async () => {
    const tree = await readDirectoryRecursively(directoryUri);
    setFileTree(tree);
  }, [directoryUri]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const tree = await readDirectoryRecursively(directoryUri);
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
  }, [directoryUri]);

  // Render each file or directory item
  const renderItem: ListRenderItem<FileTreeItemInfo> = ({ item }) =>
    item.type === 'directory' ? (
      <DirectoryItem item={item} />
    ) : (
      <FileItem item={item} />
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
