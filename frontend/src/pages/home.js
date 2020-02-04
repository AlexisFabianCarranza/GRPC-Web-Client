import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Table, TableBody,
    TableCell, TableContainer, TableHead, 
    TableRow, Paper, Radio, RadioGroup,
    FormControlLabel} from '@material-ui/core';
import { GreetingServiceClient } from '../greeting_pb_service';
import { Person } from '../greeting_pb';

const IP_HOST = process.env.IP_HOST || 'localhost';

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
            );
        });
    };

    const handleClientSideCommunication = (cli) => {
        let stream = cli.helloClientSide(function(error) {
            if (error) {
                console.log(error);
            }
        });
        let person = new Person();
        for (let i = 0 ; i < quantity ; i++) {
            person.setName(name);
            person.setTimestart(Date.now());
            stream.write(person);
        }
        setResponses(responses => [...responses, createData(person.getName(), quantity + ' mensajes enviados', 'Streaming del lado del cliente')]);
        stream.end();
    };

    const handleServerSideCommunication = (cli) => {
        console.log('Streaming del lado del serv');
        let person = new Person();
        person.setName(name);
        person.setTimestart(Date.now());
        let stream =cli.helloServerSide(person, {}, {});
        stream.on('data',  async function(message) {
            setResponses(responses => [...responses, createData(message.array[0], message.array[1], 'Streaming del lado del servidor')]);
        });
        stream.on('end', () =>  {
        });
    };

    const handleBidirectionalCommunication = (cli) => {
        console.log('Streaming bidireccional');
        const stream = cli.helloBidirectional();
        for (let i = 0 ; i < quantity ; i++) {
            let person = new Person();
            person.setName(name);
            person.setTimestart(Date.now());
            stream.write(person);
            setResponses(responses => [...responses, createData(person.getName(), quantity + ' mensajes enviados', 'Bidireccional/Envio')]);
        }
        stream.on('data', (message) => {
            setResponses(responses => [...responses, createData(message.array[0], message.array[1], 'Bidireccional/Recepcion')]);
        });
        stream.on('end', () => {
            console.log('Finalizo la comunicacion bidireccional');
        });

    };

    const execute = () => {
        //Conexion con el proxy

        const cli = new GreetingServiceClient('http://' + IP_HOST + ':8080',null, null);
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
                disabled={(typeCommunication === 'simple' || typeCommunication === 'serverSide')}
            />
            <RadioGroup aria-label="gender" name="gender1" value={typeCommunication} onChange={handleChange}>
                <FormControlLabel value="simple"  control={<Radio />} label="Simple" />
                <FormControlLabel value="serverSide" control={<Radio />} label="Streaming del lado del servidor" />
                <FormControlLabel value="clientSide" control={<Radio />} label="Streaming del lado del cliente" />
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
                        <StyledTableCell align="left">Tiempo de respuesta/Cantidad de mensajes</StyledTableCell>
                        <StyledTableCell align="left">Tipo de comunicacion</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {responses.map((row, i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell align="left">{row.message}</StyledTableCell>
                            <StyledTableCell align="left">{row.time}</StyledTableCell>
                            <StyledTableCell align="left">{row.type}</StyledTableCell>
                        </StyledTableRow>
                    ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}