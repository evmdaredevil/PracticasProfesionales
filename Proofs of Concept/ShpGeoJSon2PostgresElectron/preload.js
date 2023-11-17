
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendUploadRequest: (fileData) => {
    return window.api.send('upload-file', fileData);
  },
});
