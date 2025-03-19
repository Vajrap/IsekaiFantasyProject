import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { loggerMiddleware } from './Middleware/logger';
import { errorHandlerMiddleware } from './Middleware/errorHandler';
import { game } from './Game/Game';
import readline from 'readline';
import { router } from './API/Routes/routes';

const app = express();
const port = 3030;

// MARK: CORS
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://127.0.0.1:5500',
            'https://4cskhjm2-3030.asse.devtunnels.ms/'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.options('*', cors());

// MARK: Middleware
app.use(express.json());
app.use('/route', router);
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use(errorHandlerMiddleware);
const server = app.listen(port, async () => {
    console.log(`Server running on port ${port}`);    
});

// MARK: WebSocket
server.on('upgrade', (request: any, socket: any, head: any) => {
    if (!request.headers.upgrade || request.headers.upgrade.toLowerCase() !== 'websocket') {
        socket.destroy();
        return;
    }

    game.webSocketManager.wss.handleUpgrade(request, socket, head, (ws) => {
        game.webSocketManager.wss.emit('connection', ws, request);
    });
});

//MARK: CLI
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function handleCommand(command: string) {
    const [action, ...args] = command.split(' ');

    switch (action) {
        case 'characters':
            console.log('All Characters names-id:', game.characterManager.characters.map(c => c.name + 'ID: ' + c.id));
            break;
        case 'character':
            if (args[0] != null) {
                console.log('Character:', game.characterManager.getCharacterByID(args[0]));
            } else {
                console.log('Please provide a character ID');
            }
        case 'exit':
            console.log('Exiting server...');
            process.exit(0);
            break;
        default:
            console.log(`Unknown command: ${command}`);
            break;
    }
}

// Listen for command line input
rl.on('line', (input) => {
    handleCommand(input.trim());
});

console.log('Server is running. Type "exit" to stop or enter game commands.');


game.start();