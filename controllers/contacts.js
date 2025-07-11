const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags ['contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(contacts);
    });
};

const getSingle = async (req ,res) => {
  //#swagger.tags ['contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: userId});
    result.toArray().then((contacts) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(contacts[0]);
    });
};

const createContact = async (req ,res) => {
  //#swagger.tags ['contacts']
    const user = {
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       favoriteColor: req.body.favoriteColor,
       birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.console.error || 'Some error occurred while creating the Contact');
    }
};

const updateContact = async (req ,res) => {
  //#swagger.tags ['contacts']
    const userId = new ObjectId(req.params.id);
    const user = {
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       favoriteColor: req.body.favoriteColor,
       birthday: req.body.birthday,
      
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId} ,user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.console.error || 'Some error occurred while updating the Contact');
    }
};

const deleteContact = async (req ,res) => {
  //#swagger.tags ['contacts']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.console.error || 'Some error occurred while deleting the Contact');
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact

};
