import { defineStore } from 'pinia';
import Log from '@/types/Log';

const useStatus = defineStore('status', {
  state() {
    return {
      lastUpdate: 0,
      currentLesson: '',
      logs: [
        { time: 23333333333, level: 'warning', content: 'qwq' },
      ] as Log[],
    };
  },
});

export default useStatus;
