const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backend;

function createWindow() {

  // Lanzar backend
  const serverPath = path.join(__dirname, 'backend', 'server.js');
  backend = spawn('node', [serverPath]);

  backend.stdout.on('data', (data) => {
    console.log(`[Servidor]: ${data}`);
  });

  backend.stderr.on('data', (data) => {
    console.error(`[Servidor ERROR]: ${data}`);
  });

  backend.on('close', (code) => {
    console.log(`Servidor cerrado con código ${code}`);
  });

  // Crear ventana
  const win = new BrowserWindow({
    width: 975,
    height: 680,
    icon: __dirname + '/favicon.ico',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('public/index.html');
  // win.removeMenu();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
