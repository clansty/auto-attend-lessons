import { defineComponent } from 'vue';
import { dateZhCN, MenuOption, NConfigProvider, NLayout, NLayoutContent, NLayoutSider, NMenu, zhCN } from 'naive-ui';
import { RouterView, RouterLink, useRoute } from 'vue-router';

const routes = {
  status: '运行状态',
  lessons: '课程管理',
  logs: '实时日志',
};

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
