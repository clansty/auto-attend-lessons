import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';
import Lesson from '@/types/Lesson';

// 不知道为什么，用 use 的话在多个地方同时 use 之后状态并不同步。所以就改成了这样，这样倒是也可以保持响应式
const lessons = createAutoUpdateStorage('lessons', new Array(7).fill([]) as Lesson[][])();

export default lessons;
