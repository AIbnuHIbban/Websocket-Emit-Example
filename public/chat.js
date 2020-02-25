// Make Connection
var socket_front = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message')
    handle  = document.getElementById('handle')
    btn = document.getElementById('send')
    output = document.getElementById('output')
    feedback = document.getElementById('feedback')

// Emmit event

btn.addEventListener('click', function () {
    socket_front.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    message.value = ""
    handle.value = ""
})

// Message
message.addEventListener('keypress', function () {
    socket_front.emit('typing', handle.value)
})

// Listen for event
socket_front.on('chat', function (data) {
    output.innerHTML += '<p><strong> '+data.handle+'</strong> '+data.message+'</p>'
})

socket_front.on('typing', function (data) {
    feedback.innerHTML = "<p><em>"+data+" sedang menulis.. </em></p>"
})