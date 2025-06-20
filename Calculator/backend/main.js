const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let number = 0;

function add(number1, number2) {
    let num1 = Number(number1);
    let num2 = Number(number2);
    number = num1 + num2;
    return number;
}

function sub(number1, number2) {
    number = number1 - number2;
    return number;
}

function mul(number1, number2) {
    number = number1 * number2;
    return number;
}

function div(number1, number2) {
    number = number1 / number2;
    return number;
}

// http://localhost:5000/api/add
app.post("/api/add", (req, res) => {
    let data = req.body;
    number = add(data.number1, data.number2);
    const r = {
        message: "Ok",
        result: number
    }
    res.status(201).json(r);

});

app.post("/api/sub", (req, res) => {
    let data = req.body;
    number = sub(data.number1, data.number2);

    const r = {
        message: "Ok",
        result: number
    }

    res.status(201).json(r);

});


app.post("/api/mul", (req, res) => {
    let data = req.body;
    number = mul(data.number1, data.number2);
    const r = {
        message: "Ok",
        result: number
    }
    res.status(201).json(r);
});

app.post("/api/div", (req, res)=> {
    let data = req.body;
    number = div(data.number1, data.number2);

    const r = {
        message: "Ok",
        result: number
    }
    res.status(201).json(r);
});



app.get('/api/get', (req, res) => {

    data = {
        number: number
    }
    res.status(200).json(data);
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});