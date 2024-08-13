document.addEventListener('DOMContentLoaded', function () {
    // Create container
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Create header
    const header = document.createElement('h1');
    header.textContent = 'TODO List Demo App';
    container.appendChild(header);

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Do it now.';
    container.appendChild(subtitle);

    // Create Add Task button
    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add Task';
    container.appendChild(addTaskBtn);

    // Create table
    const table = document.createElement('table');
    container.appendChild(table);

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['#', 'Task Name', 'Status', 'Edit', 'Remove'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    let taskId = 1;

    // Add Task function
    addTaskBtn.addEventListener('click', function () {
        const taskName = prompt('Enter task name:');
        if (taskName) {
            const row = document.createElement('tr');

            // Task ID
            const idCell = document.createElement('td');
            idCell.textContent = taskId;
            row.appendChild(idCell);

            // Task Name
            const nameCell = document.createElement('td');
            nameCell.textContent = taskName;
            row.appendChild(nameCell);

            // Task Status
            const statusCell = document.createElement('td');
            statusCell.textContent = 'Todo';
            row.appendChild(statusCell);

            // Edit Button
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

            // Remove Button
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
});