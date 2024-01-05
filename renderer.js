const delayInMillis = 5000;  

 
    setTimeout(() => {
      ipcRenderer.send('focus');
    }, delayInMillis);