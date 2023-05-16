import TaskInput from "components/tasks/TaskInput"
import Task from "types/Task";
import { useAppSelector } from "hooks/useAppSelector";
import format from "date-fns/format";
/*
Input component for handling a new task. Handles both use cases of adding a new task and editing an existing one. 
*/
export default function TaskCreate({ onClose }: { onClose: () => void }) {
    const tag = useAppSelector(state => state.tasks.tags[0])

    const emptyTask: Task = {
        name: '',
        id: 0,
        date: format(new Date(), 'LL/dd/yy'),
        description: '',
        type: 'normal',
        blocks: 0,
        repeat: 'no-repeat',
        repeatOn: [false, false, false, false, false, false, false],
        tag: tag.name,
        completed: false,
        defaultBlocks: 0,
    }

    return (
        <TaskInput
            task={emptyTask}
            tagColor={tag.color}
            onClose={onClose}
            onSaveTask={() => { }}
        />
    )
}