let products = [];
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    setupLogin();
    setupProductForm();
    renderProducts();
    renderCart();
});

function setupLogin() {
    const loginForm = document.getElementById('login-form');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    if (localStorage.getItem('loggedIn') === 'true') {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'inline';
        document.getElementById('login-section').style.display = 'none';
    } else {
        loginLink.style.display = 'inline';
        logoutLink.style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'user' && password === 'password') {
            localStorage.setItem('loggedIn', 'true');
            loginLink.style.display = 'none';
            logoutLink.style.display = 'inline';
            document.getElementById('login-section').style.display = 'none';
        } else {
            alert('Invalid credentials');
        }
    });

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        loginLink.style.display = 'inline';
        logoutLink.style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    });
}

function setupProductForm() {
    const productForm = document.getElementById('product-form');
    const productId = document.getElementById('product-id');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productImage = document.getElementById('product-image');
    const productDescription = document.getElementById('product-description');

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const id = productId.value;
        const name = productName.value;
        const price = parseFloat(productPrice.value);
        const image = productImage.value;
        const description = productDescription.value;

        if (id) {
            // Update existing product
            const product = products.find(p => p.id === id);
            if (product) {
                product.name = name;
                product.price = price;
                product.image = image;
                product.description = description;
            }
        } else {
            // Add new product
            const newProduct = {
                id: Date.now().toString(),
                name,
                price,
                image,
                description
            };
            products.push(newProduct);
        }

        productForm.reset();
        renderProducts();
    });
}

function renderProducts() {
    const productList = document.getElementById('products');
    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('movie-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
            <button onclick="editProduct('${product.id}')">Edit</button>
            <button onclick="removeProduct('${product.id}')">Delete</button>
        `;
        productList.appendChild(productItem);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total.toFixed(2);
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-description').value = product.description;
    }
}

function removeProduct(productId) {
    products = products.filter(p => p.id !== productId);
    renderProducts();
}

function checkout() {
    alert('Checkout functionality is not implemented.');
}