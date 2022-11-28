import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();
const urlencodedExtendedParser = bodyParser.urlencoded({ extended: true });
const urlencodedParser = bodyParser.urlencoded({ extended: false });

export { jsonParser, urlencodedParser, urlencodedExtendedParser };
