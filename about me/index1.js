document.addEventListener('DOMContentLoaded', function() {
    const container = document.createElement('div');
    container.className = 'about-container';

    const header = document.createElement('header');
    header.className = 'about-header';
    const nav = document.createElement('nav');
    nav.className = 'about-nav';

    const links = {
        Music: 'music.html',  
        Homework: 'homework.html',  
        Contact: 'contact.html'  
    };

    Object.keys(links).forEach(linkText => {
        const link = document.createElement('a');
        link.href = links[linkText];
        link.textContent = linkText;
        nav.appendChild(link);
    });

    header.appendChild(nav);
    container.appendChild(header);

    const mainSection = document.createElement('section');
    mainSection.className = 'about-main';
    const title = document.createElement('h1');
    title.textContent = 'So, who am I?';
    mainSection.appendChild(title);

    const description = document.createElement('p');
    description.textContent = `As a new Software Development Engineer in Test (SDET), I am embarking on an exciting journey in the world of software development and testing. My mission is to ensure that the software applications I work on are of the highest quality, with a strong focus on automation, reliability, and efficiency. I am passionate about learning and implementing best practices in software testing and look forward to contributing to the success of the projects I am involved in.`;
    mainSection.appendChild(description);

    const contactButton = document.createElement('button');
    contactButton.textContent = 'Contact me';
    mainSection.appendChild(contactButton);

    container.appendChild(mainSection);

    const imageSection = document.createElement('section');
    imageSection.className = 'about-image';
    const image = document.createElement('img');
    image.src = 'foto.jpg'; 
    image.alt = 'Your Photo';
    imageSection.appendChild(image);

    container.appendChild(imageSection);

    document.body.appendChild(container);
});