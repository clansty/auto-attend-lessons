import { defineStore } from 'pinia';

const useStatus = defineStore('status', {
  state() {
    return {
      lastUpdate: 0,
      currentLesson: '',
      logs: [],
    };
  },
});

export default useStatus;
