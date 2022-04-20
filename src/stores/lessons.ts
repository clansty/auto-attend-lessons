import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';
import Lesson from '@/types/Lesson';

const useLessons = createAutoUpdateStorage('lessons', new Array(7).fill([]) as Lesson[][]);

export default useLessons;
