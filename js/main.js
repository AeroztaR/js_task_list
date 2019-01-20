const 	form = document.querySelector('#task-form'),
		taskList = document.querySelector('.collection'),
		clearBtn = document.querySelector('.clear-tasks'),
		filter = document.querySelector('#filter'),
		taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
	document.addEventListener('DOMContentLoaded', getTasks);

	form.addEventListener('submit', addTask);

	taskList.addEventListener('click', removeTask);

	clearBtn.addEventListener('click', clearTasks);

	filter.addEventListener('keyup', filterTasks);
}

// get tasks from LocalStorage
function getTasks() {
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task){
		// create li elem
		const li = document.createElement('li');

		li.className = 'collection-item';

		// create text and append to li
		li.appendChild(document.createTextNode(task));

		// create new link elem
		const link = document.createElement('a');

		link.className = 'delete-item secondary-content';

		// add icon
		link.innerHTML = '<i class="fa fa-remove"></i>';

		// append link to li
		li.appendChild(link);

		// append li to ul
		taskList.appendChild(li);
	});
}

// Add Task

function addTask(e) {
	e.preventDefault();
	if(taskInput.value === '') {
		alert('Add a task!');
	}

	// create li elem
	const li = document.createElement('li');

	li.className = 'collection-item';

	// create text and append to li
	li.appendChild(document.createTextNode(taskInput.value));

	// create new link elem
	const link = document.createElement('a');

	link.className = 'delete-item secondary-content';

	// add icon
	link.innerHTML = '<i class="fa fa-remove"></i>';

	// append link to li
	li.appendChild(link);

	// append li to ul
	taskList.appendChild(li);

	// store task in LocalStorage
	storeInLocalStorage(taskInput.value);

	// clear input
	taskInput.value = '';
}

// store task
function storeInLocalStorage(task) {
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Delete task?')) {
			e.target.parentElement.parentElement.remove();

			// remove from LocalStorage
			removeFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// remove from LocalStorage
function removeFromLocalStorage(taskItem) {
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task, index){
		if(taskItem.textContent === task){
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks() {
	while(taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// clear from LocalStorage
	clearFromLocalStorage();
}

// clear from LocalStorage
function clearFromLocalStorage() {
	localStorage.clear();
}

// filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(
		function(task) {
			const item = task.firstChild.textContent;
			if(item.toLowerCase().indexOf(text) != -1) {
				task.style.display = 'block';
			} else {
				task.style.display = 'none';
			}
		}
	);
}