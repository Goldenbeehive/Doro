// Title bar events
var close = document.getElementById('close');
var max = document.getElementById('max');
var min = document.getElementById('min');

close.addEventListener('click', function () {
    ipcRenderer.send('close');
});
min.addEventListener('click', function () {
    ipcRenderer.send('min');
});
max.addEventListener('click', function () {
    ipcRenderer.send('max');
});


//const delayInMillis = 5000;
//setTimeout(() => {
//  ipcRenderer.send('focus');
//}, delayInMillis);