import { Server } from 'ws'

const wss = new Server({ noServer: true });

const clients = new Map();

wss.on('connection', (ws, request) => {
    const userId = request.url?.split('user=')[1];
    if (userId) {
        clients.set(userId, ws);
    }

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
        clients.delete(userId);
    });
});

export const broadcastToUser = (userId: string, data: any) => {
    const client = clients.get(userId);
    if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
    }
};

export default wss;