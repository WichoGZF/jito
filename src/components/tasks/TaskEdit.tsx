
import TaskInput from "components/tasks/TaskInput"
import Task from "types/Task";
import useHandleUpdateTask from "hooks/useHandleUpdateTask";
/*
Input component for handling a new task. Handles both use cases of adding a new task and editing an existing one. 
*/
export default function TaskEdit({task, tagColor, onClose, index} : {task: Task, tagColor: string, onClose: () => void, index: number}) {
    const [onSave] = useHandleUpdateTask(index)
    return (
       <TaskInput
        task={task}
        tagColor={tagColor}
        onClose={onClose}
        onSaveTask={onSave}
       />
    )
}
