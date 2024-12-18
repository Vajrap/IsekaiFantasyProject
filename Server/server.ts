import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { loggerMiddleware } from './Middleware/logger';
import { errorHandlerMiddleware } from './Middleware/errorHandler';
import { Game } from './Game/Game';
import WebSocket from 'ws';
import { WebSocketService } from './API/WebSocket/WebSocketService';
import readline from 'readline';
import { router } from './API/Routes/routes';

//Run with npx ts-node server.ts

const app = express();
const port = 3030;

// Allowed origins
// const allowedOrigins = [
//     'http://127.0.0.1:5500',
//     'https://9f090kw5-3030.asse.devtunnels.ms'
// ];

// CORS configuration
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

// Middleware setup
app.use(express.json());
app.use('/route', router);
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use(errorHandlerMiddleware);

// Start WebSocket service
const server = app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    
    try {
        await game.start();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

});

//Initialize Wss
const wssCore = new WebSocket.Server({ noServer: true });
export const webSocketService = new WebSocketService(wssCore);

//Game initialize
export const game = new Game();

const websocketHandlers: { [key: string]: WebSocketService } = {
    '/ws': webSocketService,
//     // '/character-ws': characterWebSocketService,
//     // '/travel-ws': travelWebSocketService,
//     // '/battle-ws': battleWebSocketService,
//     // '/game-ws': gameWebSocketService,
//     // '/character-creation-ws': new CharacterCreationWebsocketService(wssCore)
};

server.on('upgrade', (request: any, socket: any, head: any) => {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (socket.upgradeHandled) {
        console.warn('Upgrade already handled for this socket, skipping.');
        return;
    }

    const handler = websocketHandlers[url.pathname];
    if (handler) {
        handler.wss.handleUpgrade(request, socket, head, (ws) => {
            console.log(`WebSocket connection established for ${url.pathname}`);
            handler.wss.emit('connection', ws, request);
        });
    } else {
        console.log(`Unknown WebSocket path: ${url.pathname}. Destroying socket.`);
        socket.destroy();
    }

    socket.upgradeHandled = true;
});

// Command Line Interface Setup for Server Control
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function handleCommand(command: string) {
    const [action, ...args] = command.split(' ');

    switch (action) {
        case 'players':
            if (args[0] === 'status') {
                console.log('Game status:', game.characterManager.characters);
            }
            break;
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