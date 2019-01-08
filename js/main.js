const 	form = document.querySelector('#task-form'),
		taskList = document.querySelector('.collection'),
		clearBtn = document.querySelector('.clear-tasks'),
		filter = document.querySelector('#filter'),
		taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
	form.addEventListener('submit', addTask);
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
	link.innerHTML = '<i class="fa fa-remove></i>';

	// append link to li
	li.appendChild(link);

	// append li to ul
	taskList.appendChild(li);

}