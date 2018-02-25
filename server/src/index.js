import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import {matchRoutes} from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import createStore from './helpers/createStore';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
}));
app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path).map(({route}) => {
    return route.loadData ? route.loadData(store) : null;
  }).map(promise => {
    if (promise) {
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve);
      });
      // оборачиваем все промисы из loadData в промисы, которые всегда resolve, 
      //чтобы Promise.all не делал reject до загрузки всех данных в store и рендерил app, не зависимо от наличия ошибок загрузки
    }
  });
  
  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);
    if (context.url) {
      return res.redirect(301, context.url);
    }// если был рендер <Redirect>
    if (context.notFound) {
      res.status(404);
    }//если был рендер <NotFoundPage>
    res.send(content);
  });
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})