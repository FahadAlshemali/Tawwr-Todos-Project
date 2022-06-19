const form = document.querySelector("form");
const inputUser = document.getElementById("input-user");
const listGroup = document.querySelector(".list-group");
let tasks = [];
getDataFromLocalStorage();

form.addEventListener("submit", function (event) {
  const task = {
    id: Date.now(),
    title: inputUser.value,
    completed: false,
  };
  tasks.push(task);
  addDataToLocalStorageFrom();
  console.log(tasks);
  listGroup.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" id=${task.id}>
        <h3 class="saber">${inputUser.value}</h3>
        <span class="fs-3">
            <i class="bi bi-x-square-fill text-danger" id="delete-btn"></i>
            <i class="bi bi-check fs-3 text-muted" id="check-btn"></i>
        </span>
    </li>`;

  inputUser.value = "";

  event.preventDefault();
});

listGroup.addEventListener("click", function (event) {
  console.log(event.target.classList);
  if (event.target.id == "delete-btn") {
    var removedtaskid = event.target.parentElement.parentElement.id;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == removedtaskid) {
        tasks.splice(i, 1);
      }
    }
    addDataToLocalStorageFrom();
    event.target.parentElement.parentElement.remove();
  } else if (event.target.id == "check-btn") {
    var checkedtaskid = event.target.parentElement.parentElement.id;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == checkedtaskid) {
        tasks[i].completed = true;
      }
    }
    addDataToLocalStorageFrom();
    event.target.parentElement.previousElementSibling.style.setProperty(
      "text-decoration",
      "line-through"
    );
  }
});
function addDataToLocalStorageFrom() {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getDataFromLocalStorage() {
  var chachedtasks = window.localStorage.getItem("tasks");
  if (chachedtasks) {
    tasks = JSON.parse(chachedtasks);
    rendarTasks();
  }
}

function rendarTasks() {
  for (let i = 0; i < tasks.length; i++) {
    listGroup.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" id=${tasks[i].id}>
        <h3 class="saber">${tasks[i].title}</h3>
        <span class="fs-3">
            <i class="bi bi-x-square-fill text-danger" id="delete-btn"></i>
            <i class="bi bi-check fs-3 text-muted" id="check-btn"></i>
        </span>
    </li>`;
    if (tasks[i].completed) {
      let x = document.getElementById(tasks[i].id).firstElementChild;
      console.log(x);
      x.setAttribute("style", "text-decoration: line-through;");
      //x.setAttribute("style", "text-decoration: line-through;");
    }
  }
}
