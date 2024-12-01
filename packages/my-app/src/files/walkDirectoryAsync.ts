import { FileInfo } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';

type ExistingFileInfoMayBeDirectory = FileInfo & { exists: true };
type ExistingFileInfo = ExistingFileInfoMayBeDirectory & { isDirectory: false };

export type FileVisitOptions = {
  depthFirst?: boolean;
  md5?: boolean;
  size?: boolean;
  /**
   * Determines whether the file should be traversed or included in the result.
   * If it returns `false`, the file or directory will be ignored.
   * @param filename the current file name without the parents.
   * @param fileInfo File information.
   * @return `true` if the file should be processed or if the directory should be traversed.
   */
  onFileInfoAsync?: (
    filename: string,
    fileInfo: ExistingFileInfoMayBeDirectory,
  ) => Promise<boolean>;
};

export const walkDirectoryAsync = async (
  directoryFileUri: string,
  options: FileVisitOptions = {},
): Promise<ExistingFileInfo[]> => {
  const files: ExistingFileInfo[] = [];
  const directories: string[] = [];
  const items = await FileSystem.readDirectoryAsync(directoryFileUri);

  for (const item of items) {
    const fullPath = `${directoryFileUri}/${item}`;
    const fileInfo = await FileSystem.getInfoAsync(fullPath, {
      md5: options.md5,
      size: options.size,
    });

    if (!fileInfo.exists) continue;

    const shouldProcess =
      !options.onFileInfoAsync ||
      (await options.onFileInfoAsync(item, fileInfo));

    if (!shouldProcess) continue;

    if (fileInfo.isDirectory) {
      directories.push(fullPath); // Collect directories for further traversal
    } else {
      files.push(fileInfo as ExistingFileInfo); // Add files immediately
    }
  }

  // If depthFirst is true, process directories first
  if (options.depthFirst) {
    for (const dir of directories) {
      const nestedFiles = await walkDirectoryAsync(dir, options);
      files.unshift(...nestedFiles);
    }
  } else {
    // Otherwise, process files in the current directory first, then directories
    for (const dir of directories) {
      const nestedFiles = await walkDirectoryAsync(dir, options);
      files.push(...nestedFiles);
    }
  }

  return files;
};
