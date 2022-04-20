import { defineComponent } from 'vue';
import { NForm, NFormItem, NText, NTime } from 'naive-ui';
import useStatus from '@/stores/status';
import lessons from '@/stores/lessons';

export default defineComponent({
  setup() {
    const status = useStatus();

    return () => (
      <NForm labelPlacement="left" labelWidth="auto">
        <NFormItem label="注意">
          本页面需要保持打开状态，并需要授予打开弹出式窗口的权限
        </NFormItem>
        <NFormItem label="最近更新">
          <NTime time={status.lastUpdate} format="yyyy-M-d H:mm:ss" />
        </NFormItem>
        <NFormItem label="当前课程">
          <NText type={status.currentLesson ? 'warning' : 'success'}>
            {status.currentLesson ?
              lessons.value.flatMap(it => it).find(lesson => lesson.id === status.currentLesson)?.name :
              '空闲'}
          </NText>
        </NFormItem>
      </NForm>
    );
  },
});
