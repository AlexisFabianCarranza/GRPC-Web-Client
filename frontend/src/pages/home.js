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

function createData(message, time, type) {
    return { message, time, type};
};



export default () => {
    const classes = useStyles();
    const [typeCommunication, setTypeCommunication] = React.useState('simple'); //simple clientSide serverSide bidirectional
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState(1);
    const [responses, setResponses] = React.useState([]);
    const handleChange = event => {
        setTypeCommunication(event.target.value);
    };

    const handleSimpleCommunication = (cli) => {
        let person = new Person();
        person.setName(name);
        person.setTimestart(Date.now());
        cli.hello(person, {}, (err, response) => {
            setResponses(
                responses.concat(createData(response.array[0], response.array[1], 'Simple'))
            )
        });
    };
    const handleClientSideCommunication = (cli) => {
        /*let call = cli.helloClientSide(function(error) {
            if (error) {
                console.log(error);
            }
        });
        for (let i = 0 ; i < quantity ; i++ ) {
            call.write({
                name,
                timeStart: Date.now()
            });
        }
        call.end();*/
    };
    const handleServerSideCommunication = (cli) => {
        /*let call = cli.helloServerSide({});
        call.on('data', function(feature) {
            let responseTime = Date.now() - Number(feature.timeStart);
        });
        call.on('end', () =>  {
        });*/
    };
    const handleBidirectionalCommunication = (cli) => {
    };
    const execute = () => {
        //Conexion con el proxy
        const cli = new GreetingServiceClient('http://localhost:8080',null, null);
        switch (typeCommunication) {
            case 'simple':
                handleSimpleCommunication(cli);
                break;
            case 'clientSide':
                handleClientSideCommunication(cli);
                break;
            case 'serverSide':
                handleServerSideCommunication(cli);
                break;
            case 'bidirectional':
                handleBidirectionalCommunication(cli);
                break;
            default:
                handleSimpleCommunication(cli);
        }
    };

    return (
        <div>
            <TextField
                label="Ingrese un nombre"
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <TextField
                label="Cantidad de repeticiones"
                type="number"
                value={quantity}
                onChange={event => setQuantity(parseInt(event.target.value))}
                disabled={(typeCommunication === 'simple')}
            />
            <RadioGroup aria-label="gender" name="gender1" value={typeCommunication} onChange={handleChange}>
                <FormControlLabel value="simple"  control={<Radio />} label="Simple" />
                <FormControlLabel value="clientSide" control={<Radio />} label="Streaming del lado del cliente" />
                <FormControlLabel value="serverSide" control={<Radio />} label="Streaming del lado del servidor" />
                <FormControlLabel value="bidirectional" control={<Radio />} label="Streaming bidireccional" />
            </RadioGroup>
            <Button variant="contained" color="primary" onClick={execute}>
                Ejecutar
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Mensaje de respuesta</StyledTableCell>
                        <StyledTableCell align="left">Tiempo de respuesta</StyledTableCell>
                        <StyledTableCell align="left">Tipo de comunicacion</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {responses.map(row => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align="left">{row.message}</StyledTableCell>
                            <StyledTableCell align="left">{row.time}</StyledTableCell>
                            <StyledTableCell align="left">{row.type}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}