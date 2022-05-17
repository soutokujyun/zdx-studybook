const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);

// 推荐使用
// contextBridge.exposeInMainWorld('myAPI', {
//   loadPreferences: () => ipcRenderer.invoke('load-prefs')
// })

contextBridge.exposeInMainWorld('electron', {
    getMainMsg: () => ipcRenderer.on('main-msg', (event, msg) => {
        console.log(msg);
    }),
    getRenderMsg: () => ipcRenderer.on('pong-msg', (event, msg) => {
        console.log(msg);
    }),
    sendRenderMsg: () => ipcRenderer.send('ping-msg', 'This is other to Main`s Msg'),
    getToWorkMsg: () => ipcRenderer.on('render-msg', (event, data) => {
        console.log(data);
    }),
    sendToWinMsg: (winId) => {
        ipcRenderer.sendTo(winId, 'render-msg', 'This is other`s Msg.')
    }
});




// 添加process
// contextBridge.exposeInMainWorld("process", {
//   versions: {
//       ...process.versions
//     }
// });
