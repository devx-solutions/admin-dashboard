import app from './conf';
import environment from './env';
import debug from './logger';

app.listen(environment.PORT, () => {
    console.log(`DevX RESTful Encrypt API is started!!!. Express Server is listening on port ${environment.PORT}`);
});