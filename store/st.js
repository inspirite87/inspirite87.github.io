document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    let cart = [];
    let currentCategory = '';
    let currentSort = 'default';

    
    const productList = document.getElementById('product-list');
    const productModal = document.getElementById('product-modal');
    const addProductModal = document.getElementById('add-product-modal');
    const editProductModal = document.getElementById('edit-product-modal');
    const cartDiv = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const cartBtn = document.getElementById('cart-btn');
    const addProductBtn = document.getElementById('add-product-btn');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const closeBtns = document.querySelectorAll('.close');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const addProductForm = document.getElementById('add-product-form');
    const editProductForm = document.getElementById('edit-product-form');
    const productTitleInput = document.getElementById('product-title');
    const productImageInput = document.getElementById('product-image');
    const productDescriptionInput = document.getElementById('product-description');
    const productPriceInput = document.getElementById('product-price');
    const productCategoryInput = document.getElementById('product-category');
    const editProductTitleInput = document.getElementById('edit-product-title');
    const editProductImageInput = document.getElementById('edit-product-image');
    const editProductDescriptionInput = document.getElementById('edit-product-description');
    const editProductPriceInput = document.getElementById('edit-product-price');
    let currentEditProductId = null;

    
    const fetchProducts = async () => {
        const response = await fetch('https://solar-poised-salad.glitch.me/timur');
        products = await response.json();
        renderProducts();
    };

    
    const renderProducts = () => {
        let filteredProducts = products;

        
        const searchTerm = searchInput.value.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        
        if (currentCategory) {
            filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
        }

     
        if (currentSort === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'title-asc') {
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (currentSort === 'title-desc') {
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        }

        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <button data-id="${product.id}" class="view-details-btn">View Details</button>
                <button data-id="${product.id}" class="edit-product-btn">Edit</button>
                <button data-id="${product.id}" class="remove-product-btn">Remove</button>
            `;
            productItem.querySelector('.view-details-btn').addEventListener('click', () => showProductDetails(product));
            productItem.querySelector('.edit-product-btn').addEventListener('click', () => showEditProductForm(product));
            productItem.querySelector('.remove-product-btn').addEventListener('click', () => removeProduct(product.id));
            productList.appendChild(productItem);
        });
    };

    
    const showProductDetails = (product) => {
        document.getElementById('modal-title').textContent = product.title;
        document.getElementById('modal-image').src = product.image;
        document.getElementById('modal-description').textContent = product.description;
        document.getElementById('modal-price').textContent = `$${product.price}`;
        document.getElementById('add-to-cart-btn').onclick = () => addToCart(product);
        productModal.style.display = 'block';
    };

    
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        productModal.style.display = 'none';
    };

    
    const updateCart = () => {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.title} - $${item.price} x ${item.quantity}
                <button data-id="${item.id}" class="remove-cart-item-btn">Remove</button>
                <button data-id="${item.id}" class="increase-quantity-btn">+</button>
                <button data-id="${item.id}" class="decrease-quantity-btn">-</button>
            `;
            li.querySelector('.remove-cart-item-btn').addEventListener('click', () => removeCartItem(item.id));
            li.querySelector('.increase-quantity-btn').addEventListener('click', () => updateQuantity(item.id, 1));
            li.querySelector('.decrease-quantity-btn').addEventListener('click', () => updateQuantity(item.id, -1));
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });
        cartBtn.textContent = `Cart (${cart.length})`;
        document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
    };

    
    const addProduct = async () => {
        const newProduct = {
            title: productTitleInput.value,
            image: productImageInput.value,
            description: productDescriptionInput.value,
            price: parseFloat(productPriceInput.value),
            category: productCategoryInput.value
        };
        const response = await fetch('https://solar-poised-salad.glitch.me/timur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        const addedProduct = await response.json();
        products.push(addedProduct);
        renderProducts();
        addProductModal.style.display = 'none';
        addProductForm.reset();
    };

    
    const showEditProductForm = (product) => {
        currentEditProductId = product.id;
        editProductTitleInput.value = product.title;
        editProductImageInput.value = product.image;
        editProductDescriptionInput.value = product.description;
        editProductPriceInput.value = product.price;
        editProductModal.style.display = 'block';
    };

    
    const editProduct = async () => {
        const productIndex = products.findIndex(p => p.id === currentEditProductId);
        if (productIndex !== -1) {
            const updatedProduct = {
                id: currentEditProductId,
                title: editProductTitleInput.value,
                image: editProductImageInput.value,
                description: editProductDescriptionInput.value,
                price: parseFloat(editProductPriceInput.value)
            };
            const response = await fetch(`https://solar-poised-salad.glitch.me/timur/${currentEditProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });
            const savedProduct = await response.json();
            products[productIndex] = savedProduct;
            renderProducts();
            editProductModal.style.display = 'none';
            editProductForm.reset();
        }
    };

    
    const removeProduct = async (id) => {
        await fetch(`https://solar-poised-salad.glitch.me/timur/${id}`, {
            method: 'DELETE'
        });
        products = products.filter(product => product.id !== id);
        cart = cart.filter(item => item.id !== id);
        renderProducts();
        updateCart();
    };

    
    const removeCartItem = (id) => {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    };

   
    const updateQuantity = (id, change) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeCartItem(id);
            } else {
                updateCart();
            }
        }
    };

    
    const toggleCart = () => {
        cartDiv.style.display = cartDiv.style.display === 'block'            ? 'none' 
        : 'block';
};


addProductBtn.addEventListener('click', () => {
    addProductModal.style.display = 'block';
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addProduct();
});

editProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    editProduct();
});

cartBtn.addEventListener('click', toggleCart);

searchInput.addEventListener('input', renderProducts);

categoryFilter.addEventListener('change', (event) => {
    currentCategory = event.target.value;
    renderProducts();
});

sortFilter.addEventListener('change', (event) => {
    currentSort = event.target.value;
    renderProducts();
});


fetchProducts();
});