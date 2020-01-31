const PROTO_PATH = './greeting.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const logger = require('simple-node-logger').createSimpleLogger();
const eteam = ['Leo' , 'Rodri', 'Fran', 'Damian', 'Mati', 'Alex'];

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const greeting_proto = grpc.loadPackageDefinition(packageDefinition).greeting;

function main() {
    let server = new grpc.Server();
    server.addService(greeting_proto.GreetingService.service, {
        hello,
        helloServerSide,
        helloBidirectional,
        helloClientSide
    });
    server.bind( '0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

function hello(call, callback) {
    logger.info('---------------------------------------------------------------------------------');
    logger.info('Simple gRPC - Start - Server');
    let { name, timeStart } = call.request;
    callback(null,
        {
            message: 'Hola querido ' + name,
            timeStart: Date.now()
        });
    let responseTime = Date.now() - Number(timeStart);
    logger.info('\tReception Time: ' + responseTime);
    logger.info('Simple gRPC - End - Server');
}

function helloClientSide(call, callback) {
    logger.info('---------------------------------------------------------------------------------');
    logger.info('Client Side Streaming gRPC - Start - Server');
    call.on('data', function(feature) {
        let responseTime = Date.now() - Number(feature.timeStart);
        logger.info('\tReception Time: ' + responseTime + ' ml - Message: '+ JSON.stringify(feature));
    });
    call.on('end', function() {
        logger.info('Client Side Streaming gRPC - End - Server');
    });
}

function helloServerSide(call, callback) {
    logger.info('---------------------------------------------------------------------------------');
    logger.info('Server Side Streaming gRPC - Start - Server');
    eteam.forEach(person => {
            call.write( {
                message: 'Hola querido ' + person,
                timeStart: Date.now()
            });
        }
    );
    call.end();
    logger.info('Server Side Streaming gRPC - End - Server');
}

function helloBidirectional(call, callback) {
    logger.info('---------------------------------------------------------------------------------');
    logger.info('Comienza el streaming bidireccional - Servidor');
    call.on('data', function(feature) {
        let {name, timeStart} = feature;
        let responseTime = Date.now() - Number(timeStart);
        logger.info('\tReception Time: ' + responseTime + ' ml - Message: '+ JSON.stringify(feature));
        call.write({
            message: 'Hola querido ' + name,
            timeStart: Date.now()
        })
    });
    call.on('end', function() {
        logger.info('Finaliza el streaming bidireccional - Servidor');
        call.end();
    });
}



main();