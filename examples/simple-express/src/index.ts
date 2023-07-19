import { connect } from '@aleksrutins/butterfly';
import express from 'express';

const app = express();

type Todo = {
    id: number,
    content: string
}

const db = await connect('sqlite3:data.db');
if(!db) throw "Failed to connect to database";

app.set('view engine', 'pug');

app.use(express.static('static'));

app.get('/', async (_req, res) => {
    const todos = await db.q<Todo>`SELECT * FROM todos`;
    res.render('index', { todos });
});

app.post('/create', express.urlencoded({ extended: false }), async (req, res) => {
    await db.e`INSERT INTO todos (content) VALUES (${req.body.content})`;
    res.redirect('/');
});

app.post('/delete', express.urlencoded({ extended: false }), async (req, res) => {
    await db.e`DELETE FROM todos WHERE id = ${req.body.id}`;
    res.redirect('/');
})

const port = process.env['PORT'] ?? 8080;
app.listen(port, () => console.log(`Listening on ${port}`));

process.on('exit', db.destroy);