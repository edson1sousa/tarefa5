const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

let tarefas = [];
app.post('/task', (req, res) => {
    const { titulo } = req.body;
    const nova = { id: tarefas.length + 1, titulo };
    tarefas.push(nova);
    res.status(201).json(nova);
});


app.get('/tasks', (req, res) => {
    res.json(tarefas);
});


app.get('/task/:id', (req, res) => {
    const tarefa = tarefas.find(t => t.id == req.params.id);
    if (tarefa) res.json(tarefa);
    else res.status(404).json({ message: 'Tarefa não encontrada' });
});


app.put('/task/:id', (req, res) => {
    const tarefa = tarefas.find(t => t.id == req.params.id);
    if (tarefa) {
        tarefa.titulo = req.body.titulo;
        res.json(tarefa);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
});



app.delete('/task/:id', (req, res) => {
    tarefas = tarefas.filter(t => t.id != req.params.id);
    res.json({ message: 'Tarefa apagada com sucesso' });
});


