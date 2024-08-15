/*document.addEventListener('DOMContentLoaded', function () {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const header = document.createElement('h1');
    header.textContent = 'TODO List';
    container.appendChild(header);

    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add Task';
    container.appendChild(addTaskBtn);
    const table = document.createElement('table');
    container.appendChild(table);
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['#', 'Task Name', 'Status', 'Edit', 'Remove'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    let taskId = 1;
    addTaskBtn.addEventListener('click', function () {
        const taskName = prompt('Enter task name:');
        if (taskName) {
            const row = document.createElement('tr');
            const idCell = document.createElement('td');
            idCell.textContent = taskId;
            row.appendChild(idCell);
            const nameCell = document.createElement('td');
            nameCell.textContent = taskName;
            row.appendChild(nameCell);
            const statusCell = document.createElement('td');
            statusCell.textContent = 'Good';
            row.appendChild(statusCell);

            const editCell = document.createElement('td');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', function () {
                const newTaskName = prompt('Edit task name:', taskName);
                if (newTaskName) {
                    nameCell.textContent = newTaskName;
                }
                const newStatus = prompt('Update status (Todo, In Progress, Complete):', statusCell.textContent);
                if (newStatus) {
                    statusCell.textContent = newStatus;
                }
            });
            editCell.appendChild(editBtn);
            row.appendChild(editCell);
            const removeCell = document.createElement('td');
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', function () {
                if (confirm('Are you sure you want to remove this task?')) {
                    tbody.removeChild(row);
                }
            });
            removeCell.appendChild(removeBtn);
            row.appendChild(removeCell);

            tbody.appendChild(row);
            taskId++;
        }
    });
});*/


/*document.addEventListener('DOMContentLoaded', function () {

    const container = document.createElement('div');
    document.body.appendChild(container);

    const header = document.createElement('h1');
    header.textContent = 'TODO List';
    container.appendChild(header);


    const form = document.createElement('form');
    container.appendChild(form);

    const taskNameInput = document.createElement('input');
    taskNameInput.placeholder = 'Enter task name';
    taskNameInput.required = true;
    form.appendChild(taskNameInput);

    const statusSelect = document.createElement('select');
    ['Good', 'Bad'].forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        statusSelect.appendChild(option);
    });
    form.appendChild(statusSelect);

    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add Task';
    addTaskBtn.type = 'submit';
    form.appendChild(addTaskBtn);


    const table = document.createElement('table');
    container.appendChild(table);
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['#', 'Task Name', 'Status', 'Edit', 'Delete'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    let taskId = 1;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskName = taskNameInput.value.trim();
        const status = statusSelect.value;

        if (taskName) {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = taskId;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = taskName;
            nameInput.disabled = true;
            nameCell.appendChild(nameInput);
            row.appendChild(nameCell);

            const statusCell = document.createElement('td');
            const statusSelect = document.createElement('select');
            ['Good', 'Bad'].forEach(statusOption => {
                const option = document.createElement('option');
                option.value = statusOption;
                option.textContent = statusOption;
                if (statusOption === status) {
                    option.selected = true;
                }
                statusSelect.appendChild(option);
            });
            statusSelect.disabled = true;
            statusCell.appendChild(statusSelect);
            row.appendChild(statusCell);

            const editCell = document.createElement('td');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', function () {
                if (editBtn.textContent === 'Edit') {
                    nameInput.disabled = false;
                    statusSelect.disabled = false;
                    editBtn.textContent = 'Save';
                } else {
                    nameInput.disabled = true;
                    statusSelect.disabled = true;
                    editBtn.textContent = 'Edit';
                }
            });
            editCell.appendChild(editBtn);
            row.appendChild(editCell);

            const deleteCell = document.createElement('td');
            const deleteInput = document.createElement('input');
            deleteInput.type = 'button';
            deleteInput.value = 'Delete';
            deleteInput.addEventListener('click', function () {
                console.log('Delete button clicked');
                if (confirm('Are you sure you want to delete this task?')) {
                    console.log('Deleting row:', row)
                    tbody.deleteChild(row);
                }
            });
            deleteCell.appendChild(deleteInput);
            row.appendChild(deleteCell);

            tbody.appendChild(row);
            taskId++;

            taskNameInput.value = '';
            statusSelect.value = 'Good';
        }
    });
});*/

// I have to have an array for tasks
// when user clicks "add" button, I have to push task to the array
// then clear the input
// render the tasks array
// delete function: ==>

    const tasks = [];

    const ul = document.querySelector("ul");
    const input = document.querySelector("input");
    const addBtn = document.querySelector(".add-btn");
    const h1 = document.querySelector("h1");
    
    function checkTasks() {
      if (tasks.length === 0) {
        h1.style.visibility = "visible";
      } else {
        h1.style.visibility = "hidden";
      }
    }
    
    function renderTasks() {
      checkTasks();
      ul.innerHTML = "";
    
      tasks.forEach(({ id, status, title }) => {
        const li = `<li>
      <span># ${id}</span> 
      <span>${title}</span> 
       <span>${status}</span> 
      <button id=${id}>Delete</button>
      </li>`;
    
        ul.insertAdjacentHTML("beforeend", li);
      });
    
      document.querySelectorAll("li button").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
          tasks.splice(index, 1);
          renderTasks();
        });
      });
    }
    
    renderTasks();
    
    addBtn.addEventListener("click", () => {
      const newTask = {
        id: tasks.length + 1,
        title: input.value,
        status: "In Progress",
      };
      tasks.push(newTask);
      renderTasks();
      input.value = "";
    });