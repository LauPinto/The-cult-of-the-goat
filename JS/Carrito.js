document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('carrito-productos');
    const totalGeneral = document.getElementById('total-general');
    const comprarBtn = document.getElementById('comprar-btn');

    let total = 0;

    cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('producto');
        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="producto-img">
            <div class="producto-detalle">
                <h2>${item.title}</h2>
                <p>Precio unitario: ${item.price}</p>
                <div class="cantidad-container">
                    <label for="cantidad-${item.id}">Cantidad:</label>
                    <input type="number" id="cantidad-${item.id}" name="cantidad-${item.id}" value="${item.quantity}" min="1" class="cantidad-input" data-id="${item.id}">
                </div>
                <button class="eliminar-carrito" data-id="${item.id}">Eliminar</button>
            </div>
        `;
        cartContainer.appendChild(productElement);

        total += item.price * item.quantity;
    });

    totalGeneral.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners to quantity inputs
    const quantityInputs = document.querySelectorAll('.cantidad-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', updateQuantity);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.eliminar-carrito');
    deleteButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    // Add event listener to the "Comprar" button
    comprarBtn.addEventListener('click', finalizePurchase);
});

function updateQuantity(event) {
    const input = event.target;
    const productId = input.getAttribute('data-id');
    const newQuantity = parseInt(input.value);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateTotal();
    }
}

function removeFromCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    button.parentElement.parentElement.remove();
    updateTotal();
}

function updateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalGeneral = document.getElementById('total-general');

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    totalGeneral.textContent = `Total: $${total.toFixed(2)}`;
}

function finalizePurchase() {
    localStorage.removeItem('cart');
    Swal.fire({
        icon: 'success',
        title: '¡Compra Exitosa!',
        text: `Bienvenido al culto.`,
        confirmButtonText: 'Aceptar'
    });
    setTimeout(() => {
        window.location.reload();
        window.location.href = 'index.html';
    }, 4000);

}

