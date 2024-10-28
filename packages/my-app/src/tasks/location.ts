import { locationLog } from '@/logging';
import { defineTrackingTask } from './defineTrackingTask';

export const BACKGROUND_LOCATION_TASK = 'background-location-task';

defineTrackingTask(BACKGROUND_LOCATION_TASK, locationLog);
