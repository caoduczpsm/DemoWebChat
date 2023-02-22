const siteRouter = require('./site');
const userRouter = require('./User/user');

function route(app) {
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
