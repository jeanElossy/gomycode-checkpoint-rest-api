const express = require('express');
const app = express();
require('./model/db-config');
const PostModel = require('./model/user');
const bodyParser = require('body-parser')

// import de ObjectId pour faire le put
const ObjectID = require('mongoose').Types.ObjectId;


require('dotenv').config();
require('./index')

// un middleware
app.use('/', bodyParser.json());

// execution de app sur le port 8080
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


