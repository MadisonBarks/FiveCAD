const Express = require('express');
const BodyParser = require('body-parser');
const Morgan = require('morgan');
const HBS = require('hbs');
//const DB = require('./models/').sequelize;

const IndexRouter = require('./routes/index');
const CivilianRouter = require('./routes/civilians');
const CitationRouter = require('./routes/citations');
const ReportRouter = require('./routes/reports');
const CaseRouter = require('./routes/cases');

const app = new Express();

app.set('view engine', 'hbs');
HBS.registerPartials(__dirname + '/views/partials');

app.use(new Morgan('dev'));
app.use(Express.static('public'));
app.use(BodyParser.urlencoded({
    extended: true
}));

app.use('/', IndexRouter);
app.use('/civilian', CivilianRouter);
app.use('/ecitations', CitationRouter);
app.use('/fieldreports', ReportRouter);
app.use('/cases', CaseRouter);

// DB.sync().then(() => {
//   app.listen(3000, () => {
//     console.log('App running on port 3000!');
//   });
// });
app.listen(3010, () => {
    console.log('App running on port 3010!');
})