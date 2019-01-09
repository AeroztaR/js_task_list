const 	form = document.querySelector('#task-form'),
		taskList = document.querySelector('.collection'),
		clearBtn = document.querySelector('.clear-tasks'),
		filter = document.querySelector('#filter'),
		taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
	form.addEventListener('submit', addTask);

	taskList.addEventListener('click', removeTask);

	clearBtn.addEventListener('click', clearTasks);

	filter.addEventListener('keyup', filterTasks);
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

	// clear input
	taskInput.value = '';
}

// remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Delete task?')) {
			e.target.parentElement.parentElement.remove();
		}
	}
}

// clear tasks
function clearTasks() {
	while(taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
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