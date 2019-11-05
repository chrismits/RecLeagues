var Player = require('./models/player');

module.exports = function(app) {
    app.post('/submit', (req, res) => {

        var new_user = new Player({
            first: req.body.first, 
            last: req.body.last,
            email: req.body.email,
            cell: req.body.cell
        })

        //save to db
        new_user.save(function(err, new_user, tmp = res) {
            if (err) {
                console.log("ERROR ADDING USER TO DB")
                console.log(err)
                tmp.sendfile('public/views/dbfail.html')
            }
            else {
                console.log("USER ADDED TO DB")
                tmp.sendfile('public/views/dbaccept.html')
            }
        })
    })

    // Frontend
    app.get('*', (req, res) => {
        res.sendfile('public/views/index.html');
    });
}