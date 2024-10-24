import type { Meta, StoryObj } from '@storybook/react';
import * as TaskManager from 'expo-task-manager';
import { TaskManagerTask } from 'expo-task-manager';
import { FC, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MyText, Strong } from 'react-native-my-text';
import * as BackgroundFetch from 'expo-background-fetch';

const TaskManagerView: FC = () => {
  const [tasks, setTasks] = useState<TaskManagerTask[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);

  const [backgroundFetchStatus, setBackgroundFetchStatus] =
    useState<string>('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const nextTasks = await TaskManager.getRegisteredTasksAsync();
      const nextIsAvailable = await TaskManager.isAvailableAsync();
      const nextBackgroundFetchStatus = await BackgroundFetch.getStatusAsync();
      if (mounted) {
        setTasks(nextTasks);
        setIsAvailable(nextIsAvailable);
        setBackgroundFetchStatus(
          nextBackgroundFetchStatus
            ? BackgroundFetch.BackgroundFetchStatus[nextBackgroundFetchStatus]
            : 'unknown',
        );
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const tasksJson = useMemo(() => JSON.stringify(tasks, null, 2), [tasks]);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>Status</MyText>
      </View>
      <MyText style={styles.text}>
        {isAvailable
          ? 'registeredTasks available'
          : 'registeredTasks not available'}
      </MyText>
      <MyText style={styles.text}>
        <Strong>BackgroundFetch:</Strong>
        <MyText>{backgroundFetchStatus}</MyText>
      </MyText>
      <View style={styles.sectionHeader}>
        <MyText style={styles.sectionHeaderText}>Registered Tasks</MyText>
      </View>
      <MyText style={styles.text}>{tasksJson}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    borderWidth: 1,
    borderColor: 'red',
  },
  container: {
    padding: 20,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: 'black',
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Nunito',
  },
});
const meta: Meta<typeof TaskManagerView> = {
  title: 'Task Manager',
  component: TaskManagerView,
  parameters: {
    notes: 'expo-task-manager.',
  },
};

export default meta;

type Story = StoryObj<typeof TaskManagerView>;

export const Default: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'plain',
    },
  },
};
