import CheckIcon from '@mui/icons-material/Check';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

function createData(
    name: string,
    free: any,
    supporter: any,
) {
    return { name, free, supporter };
}

const rows = [
    createData('Support the dev', <MoodIcon></MoodIcon>, <SentimentVeryDissatisfiedIcon></SentimentVeryDissatisfiedIcon>),
    createData('Basic usage', <CheckIcon></CheckIcon>, <CheckIcon></CheckIcon>),
    createData('Settings', <CheckIcon></CheckIcon>, <CheckIcon></CheckIcon>),
    createData('Local storage', <CheckIcon></CheckIcon>, <CheckIcon></CheckIcon>),
    createData('Cloud storage', <></>, <CheckIcon></CheckIcon>),
    createData('Statistics', <></>, <CheckIcon></CheckIcon>),

];

function CompareTable() {
    return (
        <>
            <Typography variant='h5'>
                Compare the plans
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="compare table">
                    <TableHead >
                        <TableRow >
                            <TableCell component="th" scope="row"></TableCell>
                            <TableCell align='right'> Free</TableCell>
                            <TableCell align='right'> Supporter</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.free}</TableCell>
                                <TableCell align="right">{row.supporter}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
//    return { name, usage, settings, localStorage, cloudStorage, statistics, support };

export default CompareTable;