document.addEventListener('DOMContentLoaded', () => {
    let socket = io.connect(window.origin);

    socket.on('connect', () => {
        socket.send('User has connected!');
    });

    socket.on('message', (msg) => {
        const ulList = document.getElementById('messages');
        const newItem = document.createElement('li');
        newItem.textContent = msg;
        ulList.append(newItem);
        console.log('Received message');
    });

    const button = document.getElementById('sendbutton');

    button.addEventListener('click', () => {
        const input = document.getElementById('myMessage');
        socket.send(input.value);
        input.value = null;
    });
});