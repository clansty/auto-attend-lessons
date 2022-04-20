import { defineComponent } from 'vue';
import { dateZhCN, MenuOption, NConfigProvider, NLayout, NLayoutContent, NLayoutSider, NMenu, zhCN } from 'naive-ui';
import { RouterView, RouterLink, useRoute } from 'vue-router';
import useStatus from '@/stores/status';
import { useIntervalFn } from '@vueuse/core';
import lessons from '@/stores/lessons';

const routes = {
  status: '运行状态',
  lessons: '课程管理',
  logs: '实时日志',
};

// 获取从今天 0 点到现在到秒数
const getTime = (time: number | Date) => {
  if (typeof time === 'object') {
    time = time.getTime();
  }
  // 转换为中国时间秒数
  time += 1000 * 60 * 60 * 8;
  return time % (1000 * 60 * 60 * 24);
};

let workingWindow: Window;

export default defineComponent({
  setup() {
    const menuOptions: MenuOption[] = Object.entries(routes)
      .map(([path, name]) => ({
        label: () => (
          <RouterLink to={path}>
            {() => name}
          </RouterLink>
        ),
        key: path,
      }));

    const route = useRoute();
    const status = useStatus();

    useIntervalFn(() => {
      // 主要运行逻辑
      status.lastUpdate = new Date().getTime();
      const now = getTime(new Date());
      for (const lesson of lessons.value[new Date().getDay()]) {
        // 该上这节课了
        if (getTime(lesson.startTime) < now && now < getTime(lesson.endTime) && status.currentLesson !== lesson.id) {
          status.addLog('info', `${lesson.name} 打开`);
          try {
            workingWindow = window.open(lesson.url, 'work',
              'menubar=no,toolbar=no,width=1600,height=900')!;
            if (!workingWindow) {
              throw new Error('打开窗口失败');
            }
          }
          catch (e: any) {
            status.addLog('error', e.message);
          }
          status.currentLesson = lesson.id;
          break;
        }
        // 下课了，关闭窗口
        if (status.currentLesson === lesson.id && now > getTime(lesson.endTime)) {
          status.addLog('info', `${lesson.name} 关闭`);
          workingWindow.close();
          status.currentLesson = '';
          // 这里不 break，因为可能要上别的课
        }
      }
    }, 1000 * 10, { immediateCallback: true });

    return () => (
      <NConfigProvider locale={zhCN} dateLocale={dateZhCN}>
        <NLayout hasSider>
          <NLayoutSider contentStyle={{ padding: '10px 5px' }}>
            <NMenu options={menuOptions} value={route.name as string} />
          </NLayoutSider>
          <NLayoutContent contentStyle={{ padding: '24px' }}>
            <RouterView />
          </NLayoutContent>
        </NLayout>
      </NConfigProvider>
    );
  },
});
