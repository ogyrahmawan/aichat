import config from 'config';
import app from './app';

const port = process.env.PORT || config.get('app.port');

app.listen(port, () => {
    console.log(`sever running on port ${port}`);
});
