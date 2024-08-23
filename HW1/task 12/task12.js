/* add product page
-product image input (type text)
-product title
product description (textarea)
product price
add button
{
imageUril: ""
title: "",
description: "",
price: 0,
}
*/               
document.addEventListener('DOMContentLoaded', () => {
    // Создание формы
    const form = document.createElement('form');
    form.id = 'product-form';

    // Создание элементов формы
    const imageUrlInput = document.createElement('input');
    imageUrlInput.id = 'image-url';
    imageUrlInput.type = 'text';
    imageUrlInput.placeholder = 'Product Image URL';
    
    const titleInput = document.createElement('input');
    titleInput.id = 'title';
    titleInput.type = 'text';
    titleInput.placeholder = 'Product Title';
    
    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'description';
    descriptionInput.placeholder = 'Product Description';
    
    const priceInput = document.createElement('input');
    priceInput.id = 'price';
    priceInput.type = 'number';
    priceInput.placeholder = 'Product Price';
    
    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.textContent = 'Add Product';

    // Добавление элементов в форму
    form.appendChild(imageUrlInput);
    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(priceInput);
    form.appendChild(addButton);

    // Создание контейнера для списка продуктов
    const productList = document.createElement('div');
    productList.id = 'product-list';

    // Добавление формы и списка продуктов в body
    document.body.appendChild(form);
    document.body.appendChild(productList);

    let editingProductId = null;

    // Обработчик отправки формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const imageUrl = document.getElementById('image-url').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);

        if (!imageUrl || !title || isNaN(price)) {
            alert('Please fill out all fields correctly.');
            return;
        }

        const product = {
            imageUrl: imageUrl,
            title: title,
            description: description,
            price: price
        };

        try {
            let response;
            if (editingProductId) {
                // Обновление существующего продукта
                response = await fetch(`https://solar-poised-salad.glitch.me/products/${editingProductId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });
            } else {
                // Добавление нового продукта
                response = await fetch('https://solar-poised-salad.glitch.me/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resultProduct = await response.json();
            form.reset();
            editingProductId = null;
            loadProducts(); // Перезагрузка списка продуктов после добавления/обновления
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Функция отображения продукта
    function displayProduct(product) {
        if (!product || !product.title || !product.price) {
            console.error('Invalid product data');
            return;
        }

        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.id = `product-${product.id}`;

        const imageUrl = product.imageUrl || 'default-image.png';

        productItem.innerHTML = `
            <img src="${imageUrl}" alt="${product.title}" class="product-image" onerror="this.src='default-image.png';">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description || 'No description available.'}</p>
            <p class="product-price">$${parseFloat(product.price).toFixed(2)}</p>
            <button class="edit-button" data-id="${product.id}">Edit</button>
            <button class="remove-button" data-id="${product.id}">Remove</button>
        `;

        productList.appendChild(productItem);

        // Добавление обработчика для кнопки редактирования
        productItem.querySelector('.edit-button').addEventListener('click', () => {
            editProduct(product);
        });

        // Добавление обработчика для кнопки удаления
        productItem.querySelector('.remove-button').addEventListener('click', () => {
            removeProduct(product.id);
        });
    }

    // Функция редактирования продукта
    function editProduct(product) {
        document.getElementById('image-url').value = product.imageUrl || '';
        document.getElementById('title').value = product.title || '';
        document.getElementById('description').value = product.description || '';
        document.getElementById('price').value = product.price || '';

        editingProductId = product.id;
    }

    // Функция удаления продукта
    async function removeProduct(productId) {
        try {
            const response = await fetch(`https://solar-poised-salad.glitch.me/products/${productId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const productElement = document.getElementById(`product-${productId}`);
            if (productElement) {
                productElement.remove();
            }
        } catch (error) {
            console.error('Error removing product:', error);
        }
    }

    // Функция загрузки продуктов
    async function loadProducts() {
        try {
            const response = await fetch('https://solar-poised-salad.glitch.me/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const products = await response.json();
            productList.innerHTML = ''; // Очистка существующих продуктов
            products.forEach(product => displayProduct(product));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    loadProducts(); // Загрузка продуктов при запуске скрипта
});