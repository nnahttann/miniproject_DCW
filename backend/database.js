const bcrypt = require('bcrypt')

let users = {
    users: [
        { id: 1, username: 'test', password: '$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO', email: 'test@gmail.com'  },
    ]
}
let queues = {
    list: [
        { id: 1, name: 'Natthanon', phone: 'xxx-xxx-xxxx', license: "1xx xxxx" },
        { id: 2, name: 'Natthanon', phone: 'xxx-xxx-xxxx', license: "1xx xxxx" },
    ]
}
const SECRET = 'your_jwt_secret'
const NOT_FOUND = -1

exports.users = users
exports.queues = queues
exports.SECRET = SECRET
exports.NOT_FOUND = NOT_FOUND

exports.setUsers = function (_users) {
    users = _users;
}
exports.setQueues = function (_queues) {
    queues = _queues;
}
// === validate username/password ===
exports.isValidUser = async (username, password) => {
    const index = users.users.findIndex(item => item.username === username)
    return await bcrypt.compare(password, users.users[index].password)
}

// return -1 if user is not existing
exports.checkExistingUser = (username) => {
    return users.users.findIndex(item => item.username === username)
}