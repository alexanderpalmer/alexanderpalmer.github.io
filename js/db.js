// enable offline data
db.enablePersistence()
  .catch(function (err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

// real-time listener
db.collection('people').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      console.log(change);
      renderPerson(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      removePerson(change.doc.id);
    }
  });
});

// add new person
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const person = {
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    age: form.age.value
  };

  db.collection('people').add(person)
    .catch(err => console.log(err));

  form.firstname.value = '';
  form.lastname.value = '';
  form.age.value = '';
});

// remove a person
const recipeContainer = document.querySelector('.people');
recipeContainer.addEventListener('click', evt => {
  if (evt.target.tagName === 'I') {
    const id = evt.target.getAttribute('data-id');
    console.log(id);
    db.collection('people').doc(id).delete();
  }
})