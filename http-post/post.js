document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://solar-poised-salad.glitch.me/students';

    const container = document.createElement('div');
    document.body.appendChild(container);

    const header = document.createElement('h1');
    header.textContent = 'Student Data';
    container.appendChild(header);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Enter full name';
    container.appendChild(nameInput);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Enter email';
    container.appendChild(emailInput);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Student';
    container.appendChild(addButton);

    const studentListContainer = document.createElement('div');
    const studentListHeader = document.createElement('h2');
    studentListHeader.textContent = 'Student List';
    studentListContainer.appendChild(studentListHeader);
    const studentList = document.createElement('ul');
    studentListContainer.appendChild(studentList);
    container.appendChild(studentListContainer);

    const getData = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                studentList.innerHTML = ''; 
                data.forEach(student => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${student.fullname} - ${student.email}`;
                    studentList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const addData = () => {
        const data = {
            fullname: nameInput.value.trim(),
            email: emailInput.value.trim(),
            isActive: true
        };

        if (data.fullname && data.email) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add data');
                }
                return response.json();
            })
            .then(() => {
                getData(); 
                nameInput.value = ''; 
                emailInput.value = '';
            })
            .catch(error => console.error('Error adding data:', error));
        } else {
            alert('Please enter both name and email');
        }
    };

    addButton.addEventListener('click', addData);   
    getData();
});