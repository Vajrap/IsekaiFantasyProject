class Env {
    constructor() {
        this.ip = () => { return this.serverURL; };
        this.ws = () => { return this.wsHost; };
        this.serverURL = 'http://localhost:3030/route';
        this.wsHost = 'ws://localhost:3030/ws';
        // this.serverURL = 'http://49.228.247.69:3030',
        // this.wsHost = 'ws://49.228.247.69:3030'
        // this.serverURL = 'https://4cskhjm2-3030.asse.devtunnels.ms/route'
        // this.wsHost = 'https://4cskhjm2-3030.asse.devtunnels.ms'
    }
}
export const env = new Env();
