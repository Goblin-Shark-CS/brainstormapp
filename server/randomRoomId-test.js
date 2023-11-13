const { generate } = require('random-words');

const randomRoomId = generate({ exactly: 1, wordsPerString: 2, separator: '-' });
const _id = randomRoomId[0];
const roomname = randomRoomId[0];
const password = null;
const values = [_id, roomname, password];

console.log(values)