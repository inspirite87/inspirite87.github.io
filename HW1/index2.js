document.addEventListener('DOMContentLoaded', function () {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const header = document.createElement('h1');
    header.textContent = 'TODO List';
    container.appendChild(header);

    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Enter task name';
    container.appendChild(taskInput);

    const statusInput = document.createElement('select');
    const statuses = ['Todo', 'Good', 'Bad'];
    statuses.forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        statusInput.appendChild(option);
    });
    container.appendChild(statusInput);

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
        const taskName = taskInput.value.trim();
        const status = statusInput.value;

        if (taskName) {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = taskId;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = taskName;
            row.appendChild(nameCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = status;
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
            taskInput.value = '';
        }
    });
});