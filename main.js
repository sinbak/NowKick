import express from 'express';
import example from './router/example.js';

const app = express();

app.use('/example', example);
app.get("/", (req, res) => res.end("Hello World!"));

app.listen(3000, () => 
{
    console.log("server started!");
});