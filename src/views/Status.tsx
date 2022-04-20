import { defineComponent } from 'vue';
import { NForm, NFormItem, NText, NTime } from 'naive-ui';
import useStatus from '@/stores/status';

export default defineComponent({
  setup() {
    const status = useStatus();

    return () => (
      <div>
        <NForm labelPlacement="left" labelWidth="auto">
          <NFormItem label="注意">
            本页面需要保持打开状态，并需要授予打开弹出式窗口的权限
          </NFormItem>
          <NFormItem label="最近更新">
            <NTime time={status.lastUpdate} format="yyyy-M-d H:mm:ss" />
            （每分钟判断一次最新状态）
          </NFormItem>
          <NFormItem label="当前课程">
            <NText type={status.currentLesson ? 'warning' : 'success'}>
              {status.currentLesson || '空闲'}
            </NText>
          </NFormItem>
        </NForm>
      </div>
    );
  },
});
