import socketio from 'socket.io-client'

const socket = socketio('http://192.168.0.107:3000', {
    autoConnect: false,
})

function subscribeToNewUsers(subscribeFunction) {
    socket.on('new-insert', subscribeFunction)
}

function listenUpdates(updateFunction) {
    socket.on('new-update', updateFunction)
}

function connect() {
    socket.connect()
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect()
    }
}

export {
    connect,
    disconnect,
    subscribeToNewUsers,
    listenUpdates
}