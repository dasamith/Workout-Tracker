const express = require('express')
let mongoose = require("mongoose");

var app = express()
const port = 3000

app.use(express.static('public'))
var path = require('path')

var workoutmodel = require("./models/workout")

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
})

app.get('/exercise', function (req, res) {
    res.sendFile(path.join(__dirname, '/public', 'exercise.html'));
})

app.post('/api/workouts', function (req, res) {

    console.log("we hit the workput route")
    workoutmodel.create({}).then(function (newWorkoutWeMade) {
        res.json(newWorkoutWeMade)
    })

})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))