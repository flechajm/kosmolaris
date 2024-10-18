const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    unlockAchievement: (id) => ipcRenderer.send("unlock-achievement", id),
    setStatus: (status) => ipcRenderer.send("set-status", status)
})