import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
//To access instead of switch
const paginationContent = [
    {
        title: `What is it`,
        content: `Pomodoro Planner is a time tracking and day planning app that allows you to
        plan your days, based on pomodoro blocks.`
    },
    {
        title: `Types of tasks`,
        content: `
        Pomodoro planner uses two main tasks, 'block' and 'normal':\n
        Block tasks have a fixed ammount of pomodoros and are represented by having a 'box' on their left side.
        You complete them by doing pomodoros until they reach 0. Good for things you only want to spend a fixed ammount of time on.
        \n
        Normal tasks have a clickable circle on the left. Clicking the circle completes the task.
        They need to be at the top to be 'completed'. Normal tasks have no time limit, you have to click on the circle to
        complete them. If you complete a normal task while the timer has started (before the break starts) and according to the 
        ammount of time you've spent on the pomodoro, a corresponding ammount of break time is calculated and you can choose to use
         it now (break starts), store it for later (next break the stored time is used) or discard it. 
        `
    },
    {
        title: `Calendar feature`,
        content: `
        Pomodoro Planner uses a calendar (below the timer) to plan ahead your tasks. Just click a specific date in the
        calendary and you can see your scheduled tasks for that day or add new ones in advance.
        `
    },
    {
        title: `Tags and repeat`,
        content: `
        Every task has a tag (by default 'My tasks') which is used to keep track of your progress and time spent on a
        particular tag.
        \n
        Tasks can repeat daily or weekly, depending on your needs, or be 'no repeat', which just means once they're complete
        they'll be disposed. Repeatable tasks will keep showing up every new day they're scheduled to be on, unless you delete
        them.
        `
    }

]

export default function PaginationPanel(props) {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value)
    }

    return (
        <Stack alignItems='center'>
            <Pagination count={4} onChange={handleChange}></Pagination>
            <Stack justifyContent={'center'} alignItems={'center'} p={2}>
                <Typography variant='h4' color='text.secondary' align='center'>
                    {paginationContent[page - 1].title}
                </Typography>
                <Typography variant='body2' color='text.secondary' align='center' sx={{ whiteSpace: 'pre-line', minHeight: '250px' }}>
                    {paginationContent[page - 1].content}
                </Typography>
            </Stack>
        </Stack>
    )
}