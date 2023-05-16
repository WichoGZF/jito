
import TaskInput from "components/tasks/TaskInput"
import Task from "types/Task";

/*
Input component for handling a new task. Handles both use cases of adding a new task and editing an existing one. 
*/
export default function TaskEdit({task, tagColor, onClose} : {task: Task, tagColor: string, onClose: () => void}) {
  

    return (
       <TaskInput
        task={task}
        tagColor={tagColor}
        onClose={onClose}
        onSaveTask={() => {}}
       />
    )
}
