const express = require('express');
const bodyParsed = require('body-parser');

const app = express();
app.use(bodyParsed.json());

const PORT = process.env.port || 3000;

app.get('/', (req, res) => {
    return res.send("Hello form Express!!!");
});

app.post('/conservation/:userId', (req, res) => {
    console.log("params", req.params);
    console.log("queries", req.query);
    const body = req.body;
    return res.json(body);
});

app.put('/usersdata', (req, res) => {
    const body = req.body;
    console.log("body", body);
    res.send("Express put router in the nodeJs");
});

app.delete("/userdelete", (req, res) => {
    console.log("User delete route");
    res.send("Delete route from the server");
})




app.listen(PORT, () => {
    console.log("Hello from server running in the " + PORT);
});


// export PORT = 3005 used for export port env variable.