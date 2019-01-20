const server = require('./api/server.js');

let port = 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));