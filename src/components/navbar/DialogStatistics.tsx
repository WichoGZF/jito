import { Dialog, DialogTitle, Grid, Typography, IconButton, DialogContent, Stack, Divider, Select, MenuItem } from "@mui/material"
import { differenceInCalendarWeeks, differenceInCalendarDays, differenceInCalendarMonths, getDay, subDays, subMonths } from "date-fns"
import React, { useState } from "react"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import { useAppSelector } from "hooks"
import CloseIcon from '@mui/icons-material/Close';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    ArcElement,
} from 'chart.js';

interface PropTypes {
    open: boolean,
    handleClose: any,
}

type TimeTypes = 'today' | 'week' | 'month' | 'all';
type HistoryTypes = 'days' | 'weeks' | 'months';

export default function DialogStatistics(props: PropTypes) {
    //Redux selectors
    const tags = useAppSelector(state => state.tasks.tags)
    const history = useAppSelector(state => state.tasks.history)

    //Component state
    const [historySelect, setHistorySelect] = useState<HistoryTypes>("days")
    const [timeDistribuitionSelect, setTimeDistribuitionSelect] = useState<TimeTypes>("all")

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const todayDate = new Date();
    const todayMonth = String(todayDate.getMonth() + 1).padStart(2, 0)
    const todayMonthName = monthNames[todayDate.getMonth()]
    const todayDay = String(todayDate.getDate()).padStart(2, 0);
    const todayYear = String(todayDate.getFullYear())
    const todayStringDate = todayMonth + "/" + todayDay + "/" + todayYear

    const dayTime = () => {
        let totalTimeSpent = 0;
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            if (completeDate === todayStringDate) {
                totalTimeSpent += time
            }
        }
        return totalTimeSpent
    }

    const weekTime = () => {
        let totalTimeSpent = 0;
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')

            const weekDifference = differenceInCalendarWeeks(
                todayDate,
                new Date(parseInt(completedYear), parseInt(completedMonth) - 1, parseInt(completedDay))
            )
            if (weekDifference < 1) {
                totalTimeSpent += time;
            }
        }
        return totalTimeSpent
    }

    const monthTime = () => {
        let totalMonthTime = 0;
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')
            if (todayYear === completedYear && todayMonth === completedMonth) {
                totalMonthTime += time
            }
        }
        return totalMonthTime
    }

    const totalTime = () => {
        let totalTime = 0;
        for (const completeTask of history) {
            totalTime += completeTask.time
        }
        return totalTime
    }

    const daysTime = () => {
        let dayTimeSpent = [0, 0, 0, 0, 0, 0, 0];
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')

            const dayDifference = differenceInCalendarDays(
                todayDate,
                new Date(parseInt(completedYear), parseInt(completedMonth) - 1, parseInt(completedDay))
            )
            if (dayDifference < 7) {
                dayTimeSpent[6 - dayDifference] += time;
            }
        }
        return dayTimeSpent
    }

    const weeksTime = () => {
        let weekTimeSpent = [0, 0, 0, 0, 0, 0, 0];
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')

            const weekDifference = differenceInCalendarWeeks(
                todayDate,
                new Date(parseInt(completedYear), parseInt(completedMonth) - 1, completedDay)
            )
            if (weekDifference < 7) {
                weekTimeSpent[6 - weekDifference] += time;
            }
        }
        return weekTimeSpent
    }

    const monthsTime = () => {
        let monthTimeSpent = [0, 0, 0, 0, 0, 0, 0];
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')

            const monthDifference = differenceInCalendarMonths(
                todayDate,
                new Date(parseInt(completedYear), parseInt(completedMonth) - 1, parseInt(completedDay))
            )
            if (monthDifference < 7) {
                monthTimeSpent[6 - monthDifference] += time;
            }
        }
        return monthTimeSpent
    }

    const daysOfTheWeekTime = () => {
        let daysOfTheWeek = [0, 0, 0, 0, 0, 0, 0];
        for (const completedTask of history) {
            const { completeDate, time } = completedTask
            const [completedMonth, completedDay, completedYear] = completeDate.split('/')

            const dayOfTheWeek = getDay(new Date(parseInt(completedYear), parseInt(completedMonth) - 1, parseInt(completedDay)))
            daysOfTheWeek[dayOfTheWeek] += time;
        }
        return daysOfTheWeek
    }


    const tagsTime = (timeType: TimeTypes) => {
        let tagTime: {
            [key: string]: number
        } = {}
        tags.forEach((tag, index) => {
            tagTime[`${tag.name}`] = 0;
        });
        switch (timeType) {
            case 'today':
                for (const completedTask of history) {
                    const { completeDate, time, tag } = completedTask
                    if (todayStringDate === completeDate) {
                        tagTime[tag] += time;
                    }
                }
                break;
            case 'week':
                for (const completedTask of history) {
                    const { completeDate, time, tag } = completedTask
                    const [completedMonth, completedDay, completedYear] = completeDate.split('/')
                    const dayDifference = differenceInCalendarDays(
                        todayDate,
                        new Date(parseInt(completedYear), parseInt(completedMonth) - 1, completedDay)
                    )
                    if (dayDifference < 7) {
                        tagTime[tag] += time;
                    }
                }
                break;
            case 'month':
                for (const completedTask of history) {
                    const { completeDate, time, tag } = completedTask
                    const [completedMonth, completedDay, completedYear] = completeDate.split('/')
                    const monthDifference = differenceInCalendarMonths(
                        todayDate,
                        new Date(parseInt(completedYear), parseInt(completedMonth) - 1, completedDay)
                    )
                    if (monthDifference < 1) {
                        tagTime[tag] += time;
                    }
                }
                break;
            case 'all':
                for (const completedTask of history) {
                    const { completeDate, time, tag } = completedTask
                    tagTime[tag] += time;
                }
                break;
        }


        let array: number[] = []
        Object.values(tagTime).forEach((value, index) => array.push(value))
        return (array)
    }

    const secondsToHourMins = (seconds: number) => {
        const minutes = Math.trunc(seconds / 60)
        const hours = Math.trunc(minutes / 60)
        if (hours > 0) {
            return (`${hours}h ${minutes % 60}m`)
        }
        else {
            return (`${minutes}m`)
        }
    }

    const hoursToHoursMins = (hours: number) => {
        const minutes = Math.trunc(hours * 60)
        if (hours >= 1) {
            return (`${Math.trunc(hours)}h ${minutes % 60}m`)
        }
        else {
            return (`${minutes}m`)
        }
    }


    const secondsArrayToMinutesArray = (secondsArray: number[]) => {
        secondsArray.forEach((seconds, index) => secondsArray[index] = Math.floor(seconds / 60))
        return secondsArray
    }

    const secondsArrayToHoursArray = (secondsArray: number[]) => {
        secondsArray.forEach((seconds, index) => secondsArray[index] = ((seconds / 60) / 60))
        return secondsArray
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        ChartTooltip,
        Legend,
        BarElement,
        ArcElement
    );

    const optionsLineChart = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
            tooltip: {
                callbacks: {
                    title: (_a, _b) => {
                        return ''
                    },
                    label: (item, data) => {
                        return `${item.label} - ${hoursToHoursMins(item.raw)}`
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return hoursToHoursMins(value)
                    }
                },
                min: 0,
            }
        }
    };
    let labelsLineChart = []
    switch (historySelect) {
        case "days":
            for (let i = 6; i >= 0; i--) {
                const newDate = subDays(todayDate, i)
                labelsLineChart.push(String(newDate.getDate()))
            }
            break;
        case "weeks":
            for (let i = 6; i > 0; i--) {
                labelsLineChart.push(`${i} weeks ago`)
            };
            labelsLineChart.push("This week")
            break;
        case "months":
            for (let i = 6; i >= 0; i--) {
                const newDate = subMonths(todayDate, i)
                labelsLineChart.push(`${monthNames[newDate.getMonth()]}`)

            }
            break;
    }

    let dataLineData = []
    switch (historySelect) {
        case "days":
            dataLineData = secondsArrayToHoursArray(daysTime());
            break;
        case "weeks":
            dataLineData = secondsArrayToHoursArray(weeksTime());
            break;
        case "months":
            dataLineData = secondsArrayToHoursArray(monthsTime());
    }

    const dataLineChart = {
        labels: labelsLineChart,
        datasets: [
            {
                label: 'Hours',
                data: dataLineData,
                borderColor: 'rgb(217, 85, 80)',
                backgroundColor: 'rgb(255 142 138)',
            }
        ],
    };

    const labelsBarChart = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    const optionsBarChart = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    title: (item, date) => {
                        return ''
                    },
                    label: (item, data) => {
                        return `${item.label} - ${hoursToHoursMins(item.raw)}`
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, ticks) {

                        return hoursToHoursMins(value)
                    }
                },
                min: 0,
            }
        }
    };


    const dataBarChart = {
        labels: labelsBarChart,
        datasets: [
            {
                label: "Hours",
                data: secondsArrayToHoursArray(daysOfTheWeekTime()),
                backgroundColor: 'rgb(255 142 138)',
            },
        ],
    };

    function getRandomColor() {
        const color1 = Math.floor(Math.random() * 255)
        const color2 = Math.floor(Math.random() * 255)
        const color3 = Math.floor(Math.random() * 255)
        return `rgb(${color1} ${color2} ${color3})`;
    }

    const doughnutColors = () => {
        let colors = []
        for (const tag of tags) {
            colors.push(tag.color)
        }
        return (colors)
    }


    const dataDoughnut = {
        labels: tags.map((tag) => { return (tag.name) }),
        datasets: [
            {
                label: 'Minutes',
                data: secondsArrayToHoursArray(tagsTime(timeDistribuitionSelect)),
                backgroundColor: doughnutColors(),
                borderColor: doughnutColors(),
                borderWidth: 1,
            },
        ],
    };

    const optionsDoughnut = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (item, data) => {
                        return `${item.label} - ${hoursToHoursMins(item.raw)}`
                    }
                }
            }
        }
    };
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle>

                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h5">
                            Statistics
                        </Typography>
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton onClick={props.handleClose}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container direction='column' spacing={2}>
                    <Stack spacing={4} sx={{ paddingLeft: '16px', paddingTop: '16px', marginBottom: '16px' }}>
                        <Typography >Total stats</Typography>
                        <Grid container item>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography color="primary.main">{secondsToHourMins(dayTime())}</Typography>
                                    <Typography color="grey.600">Today</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography color="primary.main">{secondsToHourMins(weekTime())}</Typography>
                                    <Typography color="grey.600">This week</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography color="primary.main">{secondsToHourMins(monthTime())}</Typography>
                                    <Typography color="grey.600">{todayMonthName}</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs>
                                <Stack alignItems={'center'}>
                                    <Typography color="primary.main">{secondsToHourMins(totalTime())}</Typography>
                                    <Typography color="grey.600">Total</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Divider></Divider>
                    <Grid container item direction={'column'} spacing={2} sx={{ marginBottom: '32px' }}>
                        <Grid container item justifyContent='space-between' alignItems='center'>
                            <Grid item><Typography>History</Typography></Grid>
                            <Grid item>
                                <Select size='small' value={historySelect} onChange={(event) => { setHistorySelect(event.target.value as HistoryTypes) }}>
                                    <MenuItem value={'days'}><Typography>Days</Typography></MenuItem>
                                    <MenuItem value={'weeks'}><Typography>Weeks</Typography></MenuItem>
                                    <MenuItem value={'months'}><Typography>Months</Typography></MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Line options={optionsLineChart} data={dataLineChart}></Line>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container item spacing={5} sx={{ marginBottom: '32px' }}>
                        <Grid container item justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <Typography >Average time</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Bar options={optionsBarChart} data={dataBarChart}></Bar>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <Grid container item spacing={2} sx={{ marginBottom: '32px' }}>
                        <Grid container item justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <Stack>
                                    <Typography >Time distribution</Typography>
                                </Stack>

                            </Grid>
                            <Grid item>
                                <Select size='small' value={timeDistribuitionSelect} onChange={(event) => { setTimeDistribuitionSelect(event.target.value) }}>
                                    <MenuItem value={'all'}>Total</MenuItem>
                                    <MenuItem value={'month'}>This month</MenuItem>
                                    <MenuItem value={'week'}>This week</MenuItem>
                                    <MenuItem value={'today'}>Today</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Doughnut options={optionsDoughnut} data={dataDoughnut}></Doughnut>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}