const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);

// 推荐使用
// contextBridge.exposeInMainWorld('myAPI', {
//   loadPreferences: () => ipcRenderer.invoke('load-prefs')
// })

contextBridge.exposeInMainWorld('api', {
    onResponse: (fn) => ipcRenderer.on('main-msg', (event, msg) => {
        console.log(msg);
    })
})

// 添加process
// contextBridge.exposeInMainWorld("process", {
//   versions: {
//       ...process.versions
//     }
// });
