document.addEventListener('DOMContentLoaded', function() {
    const numberOfUsers = 8;

    const fetchUsersData = async (count) => {
        try {
            const response = await fetch(`https://randomuser.me/api/?results=${count}`);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const displayUsersData = (users) => {
        if (!users) return;
        const profilesContainer = document.createElement('div');
        profilesContainer.className = 'profiles-container';

        users.forEach(user => {
            
            const container = document.createElement('div');
            container.className = 'profile-container';

           
            const profileImage = document.createElement('img');
            profileImage.src = user.picture.large;
            profileImage.alt = 'Profile Image';
            profileImage.className = 'profile-image';

            const name = document.createElement('h2');
            name.className = 'profile-name';
            name.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;


            const location = document.createElement('p');
            location.className = 'profile-location';
            location.textContent = `${user.location.city}, ${user.location.state}, ${user.location.country}`;

            const email = document.createElement('p');
            email.className = 'info-text';
            email.textContent = `Email: ${user.email}`;

            const phone = document.createElement('p');
            phone.className = 'info-text';
            phone.textContent = `Phone: ${user.phone}`;

            container.appendChild(profileImage);
            container.appendChild(name);
            container.appendChild(location);
            container.appendChild(email);
            container.appendChild(phone);


            profilesContainer.appendChild(container);
        });


        document.body.appendChild(profilesContainer);
    };

    fetchUsersData(numberOfUsers).then(users => {
        displayUsersData(users);
    });
});