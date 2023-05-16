import { useDrop, useDrag } from "react-dnd"
import { useRef, useState } from 'react'
import { ItemTypes } from "components/ItemTypes"
import { useAppDispatch } from "./useAppDispatch"
import { reorderTask } from "features/tasksSlice"
import { ListItem } from "@mui/material"

/*Handles DnD logic of each  task entry (List Entry). Takes in three parameters two from reduxs state the last is the index of the 
task itself (the component), as in, the index in the redux store.*/
type DragHover = 'below' | 'above' | null

export default function useHandleDnd(timerState: boolean, timerStarted: boolean, index: number) {
    const ref = useRef<React.MutableRefObject<React.ElementRef<typeof ListItem>>>(null)
    const dispatch = useAppDispatch()

    const [dragHover, setDragHover] = useState<DragHover>(null)
    const handleDragHover = () => setDragHover(null);

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }
        ),
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const clientOffset = monitor.getClientOffset()!;

            //Gets current item total height.
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            //Get the middle of the task
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            //Get distance to 'middle' of the task. 
            // 0 then the cursor is in the middle;
            // positive: the dragging target is below the middle of the task
            // negative: the dragging target is above the middle of the task
            const hoverClientY = clientOffset.y - (hoverBoundingRect.top + hoverMiddleY)

            if (hoverClientY > 0) {
                setDragHover("below");
            }
            else if (hoverClientY < 0) {
                setDragHover("above");
            }


        },
        drop(item, monitor) {
            if (!ref.current) {
                return;
            }

            if (timerState || timerStarted) {
                return;
            }

            const dragIndex = item.index //What is being dragged 
            const hoverIndex = index //Current index

            if (dragIndex === hoverIndex) {
                return;
            }

            const clientOffset = monitor.getClientOffset();

            if (!clientOffset) {
                return;
            }

            //Gets current item total height.
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            //Divides by number of tasks the total size of the component, then divides by 2 to get the middle of current one.

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Get pixels to the middle of the 'main' task
            const hoverClientY = clientOffset.y - (hoverBoundingRect.top + hoverMiddleY)

            if (hoverClientY > 0 && hoverClientY < hoverMiddleY) {
                dispatch(reorderTask(hoverIndex, dragIndex, 'below'))
                //props.moveTask(item.fatherIndex, dragIndex, props.fatherIndex, hoverIndex + 1)
            }
            else if (hoverClientY < 0 && hoverClientY > (-1 * hoverMiddleY)) {
                //props.moveTask(item.fatherIndex, dragIndex, props.fatherIndex, hoverIndex)
                dispatch(reorderTask(hoverIndex, dragIndex, 'above'))
            }

        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: () => {
            return { index: index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    drag(drop(ref))
    return [ref, isOver, dragHover]
}