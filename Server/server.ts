import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { loggerMiddleware } from './Middleware/logger';
import { errorHandlerMiddleware } from './Middleware/errorHandler';
import { game } from './Game/Game';
import readline from 'readline';
import { router } from './API/Routes/routes';

const app = express();
const port = process.env.PORT || 3030;

// MARK: CORS
const allowedOrigins = [
    'http://127.0.0.1:5500',
    'https://4cskhjm2-3030.asse.devtunnels.ms/'
];

app.use(cors({
    origin: function (origin, callback) {
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

// MARK: Server
let server: any;

async function startServer() {
    try {
        server = app.listen(port, async () => {
            console.log(`Server running on port ${port}`);
            await game.start();
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

        // Handle server errors
        server.on('error', (error: Error) => {
            console.error('Server error:', error);
            process.exit(1);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// MARK: CLI
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function handleCommand(command: string) {
    const [action, ...args] = command.split(' ');

    switch (action) {
        case 'characters':
            console.log('All Characters names-id:', game.characterManager.characters.map(c => `${c.name} (ID: ${c.id})`));
            break;
        case 'character':
            if (args[0]) {
                const character = game.characterManager.getCharacterByID(args[0]);
                if (character) {
                    console.log('Character:', character);
                } else {
                    console.log('Character not found');
                }
            } else {
                console.log('Please provide a character ID');
            }
            break;
        case 'status':
            console.log({
                characters: game.characterManager.characters.length,
                parties: game.partyManager.parties.length,
                wsClients: game.webSocketManager.wss.clients.size
            });
            break;
        case 'exit':
            gracefulShutdown();
            break;
        default:
            console.log(`Unknown command: ${command}`);
            break;
    }
}

// Graceful shutdown
async function gracefulShutdown(signal: string = 'SIGTERM') {
    console.log(`\n${signal} signal received. Starting graceful shutdown...`);

    // Close readline interface
    rl.close();

    try {
        // Close WebSocket connections
        game.webSocketManager.wss.clients.forEach(client => {
            client.send(JSON.stringify({ type: 'SERVER_SHUTDOWN' }));
            client.close();
        });

        // Save game state if needed
        await game.save();

        // Close HTTP server
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });

        // Force close after timeout
        setTimeout(() => {
            console.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 10000);

    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
}

// Handle process signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('UNHANDLED_REJECTION');
});

// Start server and CLI
startServer();

// Listen for command line input
rl.on('line', (input) => {
    handleCommand(input.trim());
});

console.log('Server is running. Available commands:');
console.log('- characters: List all characters');
console.log('- character [id]: Show character details');
console.log('- status: Show server status');
console.log('- exit: Stop server');