const express = require('express');
require('./db/mongoose');
const truckRouter = require('./routers/truck');
const tripRouter = require('./routers/trip');
const mineRouter = require('./routers/mine');
const fragRouter = require('./routers/fragmentation');
const blastRouter = require('./routers/blast');
const chargeRouter = require('./routers/charge');
const driverRouter = require('./routers/driver');
const users = require('./routers/users');
const volumeReportRouter = require('./reports/volume');
const blastReportRouter = require('./reports/blast');
const boulderReportRouter = require('./reports/boulder');

const app = express();

app.use(express.json({ limit: '100mb' }));

app.use(users);
app.use(truckRouter);
app.use(tripRouter);
app.use(mineRouter);
app.use(fragRouter);
app.use(blastRouter);
app.use(chargeRouter);
app.use(driverRouter);
app.use(volumeReportRouter);
app.use(blastReportRouter);
app.use(boulderReportRouter);

module.exports = app;
