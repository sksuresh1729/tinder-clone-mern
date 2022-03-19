import express from "express";
import mongoose from "mongoose";
import cards from "./dbCards.js";
import Cors from "cors";

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://admin:admin1234@cluster0.mimc8.mongodb.net/tinder-clone?retryWrites=true&w=majority"

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//API Endpoint
app.get('/', (req,res) => {
    console.log("GET/")
    res.status(200).send("Hello Suresh!!!");
})

app.post('/tinder/cards', (req,res) => {
    const dbCards = req.body;
    
    cards.create(dbCards, (err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
})

app.get('/tinder/cards', (req,res) => {
    cards.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    })
})

//Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));