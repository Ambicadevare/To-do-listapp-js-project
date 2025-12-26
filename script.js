const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');

addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearAllTasks);
window.addEventListener('load', showTasks);

// Show tasks from localStorage
function showTasks() {
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        // Toggle complete
        li.addEventListener('click', () => toggleComplete(index));

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = '❌';

        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(index);
        });

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

// Add task
function addTask() {
    const text = input.value.trim();

    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: text, completed: false });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    showTasks();
}

// Toggle complete task
function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();
}

// Delete task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();
}

// Clear all tasks
function clearAllTasks() {
    const confirmDelete = confirm("Are you sure you want to delete all tasks?");
    if (confirmDelete) {
        localStorage.removeItem('tasks');
        taskList.innerHTML = '';
        alert('All tasks have been cleared!');
    }
}