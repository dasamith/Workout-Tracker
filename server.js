const express = require('express')
let mongoose = require("mongoose");

var app = express()
const port = 3000

app.use(express.static('public'))
var path = require('path')

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

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

app.get('/stats', function (req, res) {
    res.sendFile(path.join(__dirname, '/public', 'stats.html'));
})

app.get('/api/workouts/range', function (request, response) {
    console.log('we smacked the rnage route!! time to get ppl out of database!!')
    workoutmodel.find({}).limit(10).then(function (pplFromDB) {
        response.json(pplFromDB)
    })
})




app.post('/api/workouts', function (req, res) {

    console.log("we hit the workput route")
    workoutmodel.create({}).then(function (newWorkoutWeMade) {
        res.json(newWorkoutWeMade)
    })
})

app.put('/api/workouts/:id', function (req, res) {

    console.log("we hit the PUT route", req.params)
    console.log('add this exercies', req.body)
    // workoutmodel.create({}).then(function (newWorkoutWeMade) {
    //     res.json(newWorkoutWeMade)
    // })
    var newExercise = req.body
    // workoutmodel.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: newExercise } }).then(function (data, err) {
    //     console.log('this is the data and err', data, err)
    // })

    workoutmodel.update(
        { _id: req.params.id },
        { $push: { exercises: newExercise } },
        function (data, err) {
            console.log('this is the data and err', data, err)
        }
    );

})






app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))