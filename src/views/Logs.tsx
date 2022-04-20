import { defineComponent } from 'vue';
import { NTable, NText, NTime } from 'naive-ui';
import useStatus from '@/stores/status';

export default defineComponent({
  setup() {
    const status = useStatus();

    return () => (
      <NTable>
        <thead>
        <tr>
          <th style={{ width: '150px' }}>时间</th>
          <th style={{ width: '80px' }}>等级</th>
          <th>内容</th>
        </tr>
        </thead>
        <tbody>
        {status.logs.map((log, key) => (
          <tr key={key}>
            <td><NTime time={log.time} format="yyyy-M-d H:mm:ss" /></td>
            <td>
              <NText type={log.level} style={{ textTransform: 'capitalize' }}>{log.level}</NText>
            </td>
            <td>{log.content}</td>
          </tr>
        ))}
        </tbody>
      </NTable>
    );
  },
});
