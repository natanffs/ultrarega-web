import socketio from 'socket.io-client'

const socket = socketio('http://localhost:3000', {
    autoConnect: false,
})

function subscribeToNewUsers(subscribeFunction) {
    socket.on('new-insert', () => { alert('disgreta') })
}

function listenUpdates(updateFunction) {
    socket.on('new-update', updateFunction)
}

function connect() {
    disconnect()
    socket.connect()
    return socket
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