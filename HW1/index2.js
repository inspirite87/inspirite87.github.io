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
    const statuses = ['Todo', 'In Progress', 'Complete'];
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
            editBtn.addEventListener('​⬤