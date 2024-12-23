const productsContainer = document.querySelector('#Productos');
console.log(productsContainer);

const localImages = [
    "Imagenes/corset01.PNG",
    "Imagenes/corset02.PNG",
    "Imagenes/corset03.PNG",
    "Imagenes/underbust01.PNG",
    "Imagenes/underbust02.PNG",
    "Imagenes/underbust03.PNG",
    "Imagenes/falda01.png",
    "Imagenes/falda02.png",
    "Imagenes/falda03.png"
];

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        json.forEach((product, index) => {
            const imageUrl = localImages[index % localImages.length];
            productsContainer.innerHTML += `
                <div class="product">
                    <img src="${imageUrl}" alt="${product.title}" width="200">
                    <p class="corset1">${product.title}</p>
                    <p class="precio">${product.price}</p>
                    <button class="añadir-carrito" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${imageUrl}">Añadir al carrito</button>
                </div>
            `;
        });

        // "Añadir al carrito"
        const addToCartButtons = document.querySelectorAll('.añadir-carrito');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    });

function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const productTitle = button.getAttribute('data-title');
    const productPrice = button.getAttribute('data-price');
    const productImage = button.getAttribute('data-image');

    const cartItem = {
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire({
        icon: 'success',
        title: '¡Producto añadido!',
        text: `${productTitle} ha sido añadido al carrito.`,
        confirmButtonText: 'Aceptar'
    });
}