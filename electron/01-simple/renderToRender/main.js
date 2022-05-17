const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require("path");

let wins = [];

function createWindow () {
    const work = new BrowserWindow({
        show: true,
        webPreferences: {
            nativeWindowOpen: true,
            // contextIsolation: true, // 默认开启，上下文隔离确保预加载脚本和Electron的内部逻辑运行在所加载的webcontent网页之外的另一个独立的上下文环境里
            preload: path.join(__dirname, 'preload.js'), // 可以访问 Node.js API
            // nodeIntegration: true // 是否集成nodejs
        }
    });

    work.loadFile("other.html");

    work.webContents.openDevTools();

    work.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        // wins = null;
        delete wins[0];
    });

    wins.push(work);

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nativeWindowOpen: true,
            // contextIsolation: true, // 默认开启，上下文隔离确保预加载脚本和Electron的内部逻辑运行在所加载的webcontent网页之外的另一个独立的上下文环境里
            preload: path.join(__dirname, 'preload.js'), // 可以访问 Node.js API
            // nodeIntegration: true // 是否集成nodejs
        }
    });

    // win.loadURL(`file://${__dirname}/index.html`);

    win.loadFile('index.html');

    win.webContents.openDevTools();

    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        // wins = null;
        wins.length > 1 ? (delete wins[1]) : (wins.length = 0);
    })

    wins.push(win);

    // 在window上注入脚本
    work.webContents.executeJavaScript(`window.winId = ${win.webContents.id};`);
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', function () {
    // darwin 为 macOS
    // 在macOS上，除非用户Cmd + Q 确定退出
    // 否则绝大部分应用及其菜单会保持激活
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // 在 macOS 上，当点击 dock 图标并且该应用没有打开的窗口时，
    // 绝大部分应用会重新创建一个窗口。
    if (wins.length == 0) {
        createWindow();
    }
})

// 在这文件，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。

// 渲染进程
ipcMain.on('async-render', (event, data) => {
    console.log(data);
    // 主进程TO渲染进程
    // 1.
    // win.webContents.send('main-msg', '来自主进程的消息');
    // 2.
    // event.sender.send('main-msg', '来自主进程的消息');
    // 3.
    event.reply('main-msg', '来自主进程的消息');
})

// 渲染进程TO渲染进程
ipcMain.on('ping-msg', (event, data) => {
    console.log(data);
    event.sender.send('pong-msg', data);
})