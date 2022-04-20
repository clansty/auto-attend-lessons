import { defineComponent } from 'vue';
import useLessons from '@/stores/lessons';
import { NDynamicInput, NForm, NFormItem, NInput, NTimePicker } from 'naive-ui';
import Lesson from '@/types/Lesson';

const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export default defineComponent({
  setup() {
    const lessons = useLessons();

    return () => (
      <NForm labelPlacement="top" labelWidth="auto">
        <NFormItem label="注意">
          课程不能有时间重叠
        </NFormItem>
        {weekdays.map((name, weekday) => (
          <NFormItem label={name} key={weekday}>
            <NDynamicInput
              // @ts-ignore
              vModel:value={lessons.value[weekday]}
              onCreate={() => ({
                name: '',
                url: '',
                endTime: 0,
                startTime: 0,
                id: crypto.randomUUID(),
              }) as Lesson}
            >
              {{
                default({ value }: { value: Lesson }) {
                  return (
                    <div style="display: flex; align-items: center; width: 100%">
                      {/* @ts-ignore */}
                      <NInput vModel:value={value.name} placeholder="名称" style={{ width: '25%', marginRight: '5px' }} />
                      {/* @ts-ignore */}
                      <NInput vModel:value={value.url} placeholder="上课 URL" style={{ marginRight: '5px' }} />
                      <NTimePicker
                        // @ts-ignore
                        vModel:value={value.startTime}
                        placeholder="开始时间"
                        style={{ flexShrink: '0', marginRight: '5px' }}
                      />
                      <NTimePicker
                        // @ts-ignore
                        vModel:value={value.endTime}
                        placeholder="结束时间"
                        style={{ flexShrink: '0' }}
                      />
                    </div>
                  );
                },
              }}
            </NDynamicInput>
          </NFormItem>
        ))}
      </NForm>
    );
  },
});
