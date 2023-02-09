const newTask = document.querySelector('.new-task');
const newTaskButton = document.querySelector('.new-task-btn');
const tasks = document.querySelector('.tasks');

function createdTask() {
    const li = document.createElement('li');
    return li;
}

newTask.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        if (!newTask.value) return;
        createTask(newTask.value);
    }
})

function clearInput() {
    newTask.value = '';
    newTask.focus();
}

function createDelBtn(li) {
    li.innerText += ' ';
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.setAttribute('class', 'delete-task')
    deleteButton.setAttribute('title', 'Apagar esta tarefa')
    li.appendChild(deleteButton);
}

function createTask(textInput) {
    const createdTasks = createdTask();
    createdTasks.innerText = textInput;
    tasks.appendChild(createdTasks);
    clearInput();
    createDelBtn(createdTasks);
    saveTask();
}

newTaskButton.addEventListener('click', function() {
    if (!newTask.value) return;
    createTask(newTask.value);
});

document.addEventListener('click', function(event) {
    const element = event.target;
    
    if (element.classList.contains('delete-task')) {
        element.parentElement.remove();
        saveTask();
    }
})

function saveTask() {
    const allTasks = tasks.querySelectorAll('li');
    const taskList = [];

    for (let task of allTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('X', '').trim();
        taskList.push(taskText);
    }

    const taskJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', taskJSON);
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks)
    
    for (let task of taskList) {
        createTask(task);
    }
}

addSavedTasks();