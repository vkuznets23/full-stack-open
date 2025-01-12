const morgan = require('morgan');
morgan.token('jsonData', (req) => JSON.stringify(req.body));
const logger = morgan(':method :url :status :response-time ms - :res[content-length] :jsonData');

module.exports = logger;