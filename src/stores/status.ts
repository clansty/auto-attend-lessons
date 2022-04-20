import { defineStore } from 'pinia';
import Log from '@/types/Log';

const useStatus = defineStore('status', {
  state() {
    return {
      lastUpdate: 0,
      currentLesson: '',
      logs: [] as Log[],
    };
  },
  actions: {
    addLog(level: string, content: string) {
      this.logs.push({
        level, content,
        time: new Date().getTime(),
      });
    },
  },
});

export default useStatus;
