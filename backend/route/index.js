const siteRouter = require('./site');
const userRouter = require('./User/user');
const bookingRouter = require('./Booking/booking');

function route(app) {
    app.use('/user', userRouter);
    app.use('/hotel', bookingRouter);
    app.use('/', siteRouter);
}

module.exports = route;
