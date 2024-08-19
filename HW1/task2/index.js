document.addEventListener('DOMContentLoaded', function() {
    const usersData = [
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Everardo",
                "last": "Nunes"
            },
            "location": {
                "city": "Rondonópolis",
                "state": "Tocantins",
                "country": "Brazil"
            },
            "email": "everardo.nunes@example.com",
            "phone": "(71) 2120-7996",
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/48.jpg"
            }
        },
        {
            "gender": "female",
            "name": {
                "title": "Ms",
                "first": "Rosemary",
                "last": "da Cunha"
            },
            "location": {
                "city": "Ferraz de Vasconcelos",
                "state": "Tocantins",
                "country": "Brazil"
            },
            "email": "rosemary.dacunha@example.com",
            "phone": "(93) 8037-5459",
            "picture": {
                "large": "https://randomuser.me/api/portraits/women/1.jpg"
            }
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "نيما",
                "last": "جعفری"
            },
            "location": {
                "city": "ارومیه",
                "state": "گلستان",
                "country": "Iran"
            },
            "email": "nym.jaafry@example.com",
            "phone": "033-70596959",
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/73.jpg"
            }
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "René",
                "last": "Frühauf"
            },
            "location": {
                "city": "Solms",
                "state": "Saarland",
                "country": "Germany"
            },
            "email": "rene.fruhauf@example.com",
            "phone": "0411-6654871",
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/75.jpg"
            }
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Nooa",
                "last": "Kilpela"
            },
            "location": {
                "city": "Hattula",
                "state": "Kymenlaakso",
                "country": "Finland"
            },
            "email": "nooa.kilpela@example.com",
            "phone": "04-986-940",
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/91.jpg"
            }
        }
    ];

    usersData.forEach(user => {
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

        document.body.appendChild(container);
    });
});