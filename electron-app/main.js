const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the compiled frontend from the dist folder
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'Client', 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});