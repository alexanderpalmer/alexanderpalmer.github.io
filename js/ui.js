const people = document.querySelector('.people');

document.addEventListener('DOMContentLoaded', function () {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {
    edge: 'right'
  });
  // add people form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {
    edge: 'left'
  });
});

// render people data
const renderPerson = (data, id) => {

  const html = `
    <div class="card-panel person white row" data-id="${id}">
      <img src="/img/avatar3.png" alt="person thumb">
      <div class="person-details">
        <div class="person-firstname">${data.firstname}</div>
        <div class="person-lastname">${data.lastname}</div>
        <div class="person-age"> ${data.age}</div>
      </div>
      <div class="person-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;
  people.innerHTML += html;
};

// remove recipe
const removePerson = (id) => {
  const person = document.querySelector(`.person[data-id=${id}]`);
  console.log(person);
  recipe.remove();
};