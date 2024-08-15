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
               
                const editTaskInput = document.createElement('input');
                editTaskInput.type = 'text';
                editTaskInput.value = taskName;

                const editStatusInput = document.createElement('select');
                statuses.forEach(statusOption => {
                    const option = document.createElement('option');
                    option.value = statusOption;
                    option.textContent = statusOption;
                    if (statusOption === statusCell.textContent) {
                        option.selected = true;
                    }
                    editStatusInput.appendChild(option);
                });

                const saveBtn = document.createElement('button');
                saveBtn.textContent = 'Save';
                saveBtn.addEventListener('click', function () {
                    nameCell.textContent = editTaskInput.value;
                    statusCell.textContent = editStatusInput.value;
                    editCell.replaceChild(editBtn, saveBtn);
                    row.replaceChild(nameCell, editTaskInput);
                    row.replaceChild(statusCell, editStatusInput);
                });

                row.replaceChild(editTaskInput, nameCell);
                row.replaceChild(editStatusInput, statusCell);
                editCell.replaceChild(saveBtn, editBtn);
            });
            editCell.appendChild(editBtn);
            row.appendChild(editCell);
            const deleteCell = document.createElement('td');
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function () {
                tbody.removeChild(row);
            });
            deleteCell.appendChild(deleteBtn);
            row.appendChild(deleteCell);

            tbody.appendChild(row);
            taskId++;
            taskInput.value = '';
        }
    });
});