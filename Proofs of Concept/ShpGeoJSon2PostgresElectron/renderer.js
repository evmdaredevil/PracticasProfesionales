const { ipcRenderer } = require('electron');

function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const status = document.getElementById('status');

  if (!file) {
    status.textContent = 'No file selected.';
    return;
  }

  ipcRenderer.send('upload-file', { file });

  ipcRenderer.on('upload-response', (event, data) => {
    if (data.success) {
      status.textContent = 'File uploaded successfully.';
    } else {
      status.textContent = `Error: ${data.message}`;
    }
  });
}
