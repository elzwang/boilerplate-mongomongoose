require('dotenv').config();
const { model } = require('mongoose');
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});

let Person = mongoose.model('Person', new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
}));

const createAndSavePerson = (done) => {
  let ellenDoc = new Person({name: 'Ellen', age: 10, favoriteFoods: ['Chicken Wings', 'Sushi']});
  ellenDoc.save(function(err, data) {
    if (err) return done(err);
    done(null, data);
  })
};

// createAndSavePerson((err, data) => { console.log(data)});

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

// createManyPeople([{name: 'Ellen', age: 10, favoriteFoods: ['Chicken Wings', 'Sushi']},
//                   {name: 'Jack', age: 30, favoriteFoods: ['Pizza', 'Oysters']}], (err, data) => {console.log(data)});


const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

// findPeopleByName("Ellen", (err, data) => { console.log(data)});

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// findOneByFood("Sushi", (err, data) => console.log(data));

const findPersonById = (personId, done) => {
  Person.findById(personId)
    .then((data) => done(null, data))
    .catch((err) => done(err));
};

// findPersonById('62803546bdd6f9206fc2b871', (err, data) => console.log(data));

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, p) => {
    if (err) return done(err);
    else if (!p) return done(new Error("No person with " + personId + " found."));
    p.favoriteFoods.push(foodToAdd);
    p.save((err, updatedP) => {
      if (err) return done(err);
      done(null, p);
    });
  })
};

// findEditThenSave('62803546bdd6f9206fc2b877', (err, data) => console.log("Error: " + err + " | data: " + data));

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name:personName}, {age: ageToSet}, {new: true}, (err, data) => {
    return err ? done(err) : done(null, data);
  });
};

// findAndUpdate('Ellen', (err, data) => console.log("Err: " + err + " | data: " + data));

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    return err ? done(err) : done(null, data);
  });
};

// removeById('628035a63def1f20aaecf68f', (err, data) => console.log("Err: " + err + " | data: " + data));

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({name: nameToRemove}, (err, data) => {
    return err ? done(err) : done(null, data);
  });
};

// removeManyPeople((err, data) => console.log("Err: " + err + " | data: " + data));

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let query = Person.find({favoriteFoods: foodToSearch}).sort('name').limit(2).select('name favoriteFoods');
  query.exec((err, data) => {
    return err ? done(err) : done(null, data);
  });
};

// queryChain((err, data) => console.log("Err: " + err + " | data: " + data));

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
