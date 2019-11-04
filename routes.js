var Player = require('./models/player');


module.exports = function(app) {

    app.get('/getUser', (req, user) => {
        //get specific user in db using mongo: Now set to get all
        Player.find((err, res) => {
            if (err) { res.send(err) };

            res.json(user)

        });
    });

    //app.post('/newUser', ())



    // Frontend
    app.get('*', (req, res) => {
        res.sendfile('public/views/index.html');
    });
}