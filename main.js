import _ from './lib/env_config.js';
import express from 'express';
import example from './router/example.js';
import match from './router/match.js';
import user from './router/user.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewPath = path.join(__dirname, 'view');

const app = express();

app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use(express.static('public'));
app.use('/example', example);
app.use('/match', match);
app.use('/user', user);

app.get("/", (_, res) => res.redirect("/match/list/0"));

app.listen(3000, () => console.log("server started!"));