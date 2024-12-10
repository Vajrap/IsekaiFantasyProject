import WebSocket from 'ws';

// Define types for messages
type Message = {
    type: string;
};

type ErrorResponse = {
    type: string;
    message: string;
};

export class WebSocketService {
    wss: WebSocket.Server;

    constructor(server: any) { // Update the type of server as needed
        this.wss = new WebSocket.Server({ noServer: true });

        this.wss.on('connection', (ws: WebSocket) => {
            console.log('Client connected');

            ws.on('message', async (message: string) => {
                const data: Message = JSON.parse(message);

                switch (data.type) {
                    default:
                        const unknownMessage: ErrorResponse = {
                            type: 'ERROR',
                            message: 'Unknown message type',
                        };
                        ws.send(JSON.stringify(unknownMessage));
                        break;
                }
            });

            ws.on('close', () => {
                console.log('Client disconnected');
            });

            ws.on('error', (error: Error) => {
                console.error('WebSocket error:', error.message);
            });
        });

        server.on('upgrade', (request: any, socket: any, head: any) => {
            this.wss.handleUpgrade(request, socket, head, (ws) => {
                this.wss.emit('connection', ws, request);
            });
        });
    }
}
