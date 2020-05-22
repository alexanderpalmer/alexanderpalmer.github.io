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
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      removeRecipe(change.doc.id);
    }
  });
});

// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const person = {
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    age: 0
  };

  db.collection('people').add(person)
    .catch(err => console.log(err));

  form.firstname.value = '';
  form.lastname.value = '';
});

// remove a recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt => {
  if (evt.target.tagName === 'I') {
    const id = evt.target.getAttribute('data-id');
    console.log(id);
    db.collection('people').doc(id).delete();
  }
})