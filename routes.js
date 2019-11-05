var Player = require('./models/player');

module.exports = function(app) {

    app.get('/getUser', (req, user) => {
        //get specific user in db using mongo: Now set to get all
        Player.find((err, res) => {
            if (err) { res.send(err) };

            res.json(user)

        });
    });

    app.post('/submit', (req, res) => {
        console.log("SUBMITTING")

        var new_user = new Player({
            first: req.body.first, 
            last: req.body.last,
            email: req.body.email,
            cell: req.body.cell
        })

        console.log("Created player")
        var errHappened = false;

        //save to db
        new_user.save(function(err, new_user) {
            if (err) {
                console.log("ERROR")
                console.log(err)
                errHappened = true
            }
            else {
                errHapened = false
            }
        })

        if (errHappened) {
            res.sendfile('./public/views/dbfail.html')
        }
        else {
            res.sendfile('public/views/dbaccept.html')
        }
    })

    // Frontend
    app.get('*', (req, res) => {
        res.sendfile('public/views/index.html');
    });
}