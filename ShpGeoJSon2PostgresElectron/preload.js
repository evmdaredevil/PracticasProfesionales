// This script can be used to expose safe APIs to the renderer process
const { contextBridge } = require('electron');

// Define safe APIs that can be used in the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  sendUploadRequest: (fileData) => {
    // Send the 'upload-file' message to the main process with the fileData
    return window.api.send('upload-file', fileData);
  },
});
