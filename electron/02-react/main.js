const { app, BrowserWindow } = require("electron");

let win 

function  createWindow() {
    // 创建浏览器窗口并设置宽高
    win = new BrowserWindow({
        width: 800,
        height: 600
    })

    // 加载页面
    // 载入一个远程 URL
    // win.loadURL('https://github.com')

    // // 或者载入本地 HTML 文件
    // win.loadURL(`file://${__dirname}/app/index.html`)

    win.loadURL('file://' + __dirname + '/build/index.html');

    // 打开开发者工具
    // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    // 在macOS上，除非用户用Cmd+Q确定退出
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on("activate", () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})