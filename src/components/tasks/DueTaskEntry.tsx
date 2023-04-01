import { ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText, Chip } from "@mui/material"

interface PropTypes{ 
    key: string, 
    date: string | null,
    index:number,
    checked: boolean, 
    id: number, 
    taskName: string,
    tagName: string, 
    tagColor: string, 
    onClick: (arg0: number) => void,
}

export const DueTaskEntry = (props: PropTypes) => {
    return (
        <ListItem
            key={props.id}
            disablePadding>
            <ListItemButton onClick={() => props.onClick(props.index)} sx={{ marginRight: '1' }}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={props.checked}
                    ></Checkbox>
                </ListItemIcon>
                <ListItemText>
                    {props.taskName} {props.date}
                </ListItemText>
                <Chip label={props.tagName} sx={{ backgroundColor: props.tagColor, marginLeft: '15px' }}></Chip>
            </ListItemButton>

        </ListItem>
    )
}