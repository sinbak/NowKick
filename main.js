import _ from './lib/env_config.js';
import express from 'express';
import example from './router/example.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewPath = path.join(__dirname, 'view');

const app = express();

app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use('/example', example);
app.get("/", (req, res) => res.end("Hello World!"));

app.listen(3000, () => console.log("server started!"));