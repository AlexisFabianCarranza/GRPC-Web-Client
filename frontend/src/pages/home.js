import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Table, TableBody,
    TableCell, TableContainer, TableHead, 
    TableRow, Paper, Radio, RadioGroup,
    FormControlLabel} from '@material-ui/core';
import { GreetingServiceClient } from '../greeting_grpc_web_pb';
import { Person } from '../greeting_pb';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
    },
    }))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function createData(message, time) {
    return { message, time};
};

const rows = [
    createData('Hola alexis', 159),
];

export default () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('simple');
    const handleChange = event => {
        setValue(event.target.value);
    };



    const execute = () => {
        //Conexion con el proxy
        const cli = new GreetingServiceClient('http://localhost:8080',null, null);
        let person = new Person();
        person.setName('Alexis');
        person.setTimestart('456');
        cli.hello(person, {}, (err, response) => {
            console.log(response);
        })
    };

    return (
        <div>
            <TextField label="Ingrese un nombre" />
            <TextField label="Cantidad de repeticiones" type="number"/>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="simple" control={<Radio />} label="Simple" />
                <FormControlLabel value="clientSide" control={<Radio />} label="Streaming del lado del cliente" />
                <FormControlLabel value="serverSide" control={<Radio />} label="Streaming del lado del servidor" />
                <FormControlLabel value="bidirecctional" control={<Radio />} label="Streaming bidireccional" />
            </RadioGroup>
            <Button variant="contained" color="primary" onClick={execute}>
                Ejecutar
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Mensaje de respuesta</StyledTableCell>
                        <StyledTableCell align="left">Tiempo de respuesta</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.message}</StyledTableCell>
                            <StyledTableCell align="left">{row.time}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}