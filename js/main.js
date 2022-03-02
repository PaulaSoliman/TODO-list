/* === Selectors === */
let inputTask = document.getElementById('inputTask');
let entryButton = document.getElementById('entryButton');
let star = document.querySelector('.star');
let trash = document.querySelector('.trash');
let angryFace = document.querySelector('.angryFace');
let happyFace = document.querySelector('.happyFace');
let taskContent = document.querySelector('.taskContent');
let displayDataForWeb = document.getElementById('displayDataForWeb');
let tasksArray;
/*--------------------------------------------------- */
// Apend Date in HTML
let date = new Date()
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()
let fulldate = day + "/" + month + "/" + year;
document.getElementById('sessionDate').innerHTML = fulldate;

// Check on localStorage
if (localStorage.getItem('tasks') == null) {
  tasksArray = [];
}
else {
  tasksArray = JSON.parse(localStorage.getItem('tasks'));
  displayData();
}

// Enter the tasks and Adding
entryButton.addEventListener('click', () => {
  // Display Data in webpage by Button
  addTasks()
})
inputTask.addEventListener('keyup', (e) => {
  // Display Data in webpage by keboard
  if (e.key == 'Enter') {
    addTasks()
  }
})
/*----------------------------------------------------- */
function addTasks() {
  let tasks = {
    id: Date.now(),
    taskTitle: inputTask.value,
    comleted: false,
  }
  tasksArray.push(tasks);
  localStorage.setItem('tasks', JSON.stringify(tasksArray))
  displayData();
  clearData()
}

function displayData() {
  let temp = '';
  for (let i = 0; i < tasksArray.length; i++) {
    temp += `
    <div class="task  container my-3 d-flex justify-content-between align-items-center">
                <i class="fas fa-star star" style='color:#d1d5de;' onclick="importantTask(${i})"></i>
                <div class="taskContent"">${tasksArray[i].taskTitle}</div>
                <div class="icons">
                <i class="bx bxs-trash trash" onclick="deleteData(${i})" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Task"></i>
                <i class="bx bx-angry angryFace" onclick="tasksComplete(${i})" data-bs-toggle="tooltip" data-bs-placement="top" title="End task"></i>
                <i class="bx bx-happy-heart-eyes happyFace"></i>
                </div>
                </div>    
                `
  }
  document.getElementById('displayDataForWeb').innerHTML = temp;
}
function clearData() {
  inputTask.value = "";
}

function deleteData(index) {
  tasksArray.splice(tasksArray[index], 1);
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
  displayData();
}

function tasksComplete(index) {
  displayDataForWeb.addEventListener('click', function (e) {
    let elementConversion = e.target;
    elementConversion.classList.remove('bx-angry');
    elementConversion.classList.add('bx-happy-heart-eyes');
    elementConversion.parentElement.parentElement.getElementsByClassName('taskContent')[0].classList.add('taskContentFinished');
  })
}

function importantTask(index) {
  let shiftedTask = tasksArray.splice(index, 1);
  tasksArray.splice(0, 0, shiftedTask[0]);
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
  displayData();
}
