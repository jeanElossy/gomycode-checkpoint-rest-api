
const express = require('express');
const app = express();
require('./model/db-config');
const PostModel = require('./model/user');
const bodyParser = require('body-parser')
require('dotenv').config();
// import de ObjectId pour faire le put
const ObjectID = require('mongoose').Types.ObjectId;
const db = require('db')
require("./config/.env");

app.connect({
    host: process.env.APP_HOST,
    port: process.env.APP_PORT
})

db.connect({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    nom: process.env.DB_NOM,
	prenom: process.env.DB_PRENOM
})
console.log(app, db);


app.use('/', bodyParser.json());
app.listen(8080, (err) => {
    !err ? console.log(`server starting`) : console.log(`error server: ${err}`)
})

//obtenir les donnees
app.get('/', (req, res) => {
    //le header
    res.setHeader('Content-Type', 'text/html');

    //le corps
    PostModel.find((err, docs) => {
        if(!err) {
            res.send(docs);
        }else{
            console.log(`error get: ${err}`)
        }
    })
})

// methode post
app.post('/', (req, res) => {
	const newUser = new PostModel({
		nom  : req.body.nom,
		prenom : req.body.prenom
	});

	newUser.save((err, docs) => {
		if (!err) {
			res.send(docs);
		}
		else {
			console.log(err);
		}
	});
});

// methode put
app.put('/:id', (req, res) => {
	if (!ObjectID.isValid(req.params.id)) {
		res.status(400).send(`ID pas connu: ${req.params.id}`);
	}
	else {
		const udpdateUser = {
			nom: req.body.nom,
			prenom: req.body.prenom,
		};

		PostModel.findByIdAndUpdate(
			req.params.id,
			{
				$set : udpdateUser,
			},
			{
				new : true,
			},
			(err, docs) => {
				if (!err) {
					res.send(docs);
				}
				else {
					console.log(`update error: ${err}`);
				}
			},
		);
	}
});

// methode delete
app.delete('/:id', (req, res) => {
	if (!ObjectID.isValid(req.params.id)) {
		res.status(400).send('ID non connu : ' + err);
	}
	else {
		PostModel.findOneAndRemove(req.params.id, (err, docs) => {
			if (!err) {
				res.send(docs);
			}
			else {
				console.log(err);
			}
		});
	}
});


