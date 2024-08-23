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
    const form = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const imageUrl = document.getElementById('image-url').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);

        const product = {
            imageUrl: imageUrl,
            title: title,
            description: description,
            price: price
        };

        console.log('Submitting product:', product); // Отладка

        try {
            const response = await fetch('https://solar-poised-salad.glitch.me/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newProduct = await response.json();
            console.log('Product added:', newProduct); 
            form.reset(); // Очистка формы после успешного добавления продукта
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    function displayProduct(product) {
        if (!product || !product.title || !product.price) {
            console.error('Invalid product data');
            return;
        }

        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.id = `product-${product.id}`;

        const imageUrl = product.imageUrl || 'default-image.png'; // Устанавливаем изображение по умолчанию

        productItem.innerHTML = `
            <img src="${imageUrl}" alt="${product.title}" class="product-image" onerror="this.src='default-image.png';">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description || 'No description available.'}</p>
            <p class="product-price">$${parseFloat(product.price).toFixed(2)}</p>
            <button class="remove-button" data-id="${product.id}">Remove</button>
        `;

        productList.appendChild(productItem);

        productItem.querySelector('.remove-button').addEventListener('click', () => {
            removeProduct(product.id);
        });
    }

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

    async function loadProducts() {
        try {
            const response = await fetch('https://solar-poised-salad.glitch.me/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const products = await response.json();
            products.forEach(product => displayProduct(product));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    loadProducts();
});