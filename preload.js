const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    unlockAchievement: (id) => ipcRenderer.send("unlock-achievement", id),
    setStatus: (status) => ipcRenderer.send("set-status", status),
    sendMessage: (channel, data) => ipcRenderer.send(channel, data),
    onMessage: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args))
})