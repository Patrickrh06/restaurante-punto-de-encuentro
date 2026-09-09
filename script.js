// Lista de Platos y Bebidas del Restaurante Punto de Encuentro
const menuItems = [
    {
        id: 1,
        name: "Silpancho Cochabambino",
        category: "platos-diarios",
        price: 25.00,
        description: "Carne apanada crujiente acompañada de arroz, papa frita, huevo frito y picante pico de gallo.",
        image: "img/silpancho.jpeg"
    },
    {
        id: 2,
        name: "Pique Macho (Familiar)",
        category: "platos-diarios",
        price: 70.00,
        description: "Lomo de res, salchichas, papas fritas, locoto, tomate, cebolla y huevo duro con sazón tradicional.",
        image: "img/pique-familiar.jpeg"
    },
    {
        id: 3,
        name: "Pique Macho (Personal)",
        category: "platos-diarios",
        price: 35.00,
        description: "Porción individual de lomo, salchicha, papas crujientes, rodajas de locoto y huevo.",
        image: "img/pique-personal.jpeg"
    },
    {
        id: 4,
        name: "Sopa de Maní",
        category: "platos-diarios",
        price: 15.00,
        description: "Sopa criolla a base de maní molido, carne de res, fideos calientitos y papas hilos crujientes encima.",
        image: "img/sopa-mani.jpeg"
    },
    {
        id: 5,
        name: "Chicharrón de Cerdo",
        category: "especialidades",
        price: 45.00,
        description: "Tierna carne de cerdo dorada en su propia paila, servida con mote, papa huayco y llajwa.",
        image: "img/chicharron.jpeg"
    },
    {
        id: 6,
        name: "Lechón al Horno",
        category: "especialidades",
        price: 50.00,
        description: "Cerdo al horno crujiente y jugoso, acompañado de papa, camote, plátano frito y ensalada.",
        image: "img/lechon.jpeg"
    },
    {
        id: 8,
        name: "Jarra de Garapiña",
        category: "bebidas",
        price: 20.00,
        description: "Bebida tradicional fermentada con un toque de helado de canela o frutilla.",
        image: "img/garapina.jpeg"
    },
    {
        id: 9,
        name: "Vaso de Chicha Tradicional",
        category: "bebidas",
        price: 8.00,
        description: "Chicha de maíz fermentada siguiendo la receta artesanal del valle.",
        image: "img/chicha.jpeg"
    },
    {
        id: 10,
        name: "Mocochinche Frío",
        category: "bebidas",
        price: 6.00,
        description: "Refresco hervido de durazno deshidratado con canela y clavo de olor, bien helado.",
        image: "img/mocochinche.jpeg"
    },
    {
        id: 11,
        name: "Somó",
        category: "bebidas",
        price: 6.00,
        description: "Refresco hervido a base de maíz frangollo tostado y especias dulces.",
        image: "img/somo.jpeg"
    },
    {
        id: 13,
        name: "Helado de Canela",
        category: "reposteria",
        price: 8.00,
        description: "Helado artesanal batido en paila con intenso sabor a canela natural.",
        image: "img/helado-canela.jpeg"
    }
];

// Estado del Carrito
let cart = [];

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    renderMenu(menuItems);
    setupCategoryFilters();
    setupOrderForm();
});

// Función para renderizar el menú
function renderMenu(items) {
    const menuGrid = document.getElementById("menu-grid");
    menuGrid.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("menu-card");

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy" onerror="handleImageError(this)">
            </div>
            <div class="card-content">
                <h4 class="card-title">${item.name}</h4>
                <p class="card-desc">${item.description}</p>
                <div class="card-footer">
                    <span class="card-price">Bs. ${item.price.toFixed(2)}</span>
                    <button class="btn-add" onclick="addToCart(${item.id})">
                        <i class="fa-solid fa-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Control automático si la extensión es .jpg en lugar de .jpeg
function handleImageError(imgElement) {
    if (imgElement.src.endsWith(".jpeg")) {
        imgElement.src = imgElement.src.replace(".jpeg", ".jpg");
    } else if (imgElement.src.endsWith(".jpg")) {
        imgElement.src = imgElement.src.replace(".jpg", ".png");
    }
}

// Filtros por categoría
function setupCategoryFilters() {
    const buttons = document.querySelectorAll(".cat-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.getAttribute("data-category");
            if (category === "todos") {
                renderMenu(menuItems);
            } else {
                const filtered = menuItems.filter(item => item.category === category);
                renderMenu(filtered);
            }
        });
    });
}

// Agregar al carrito
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingIndex = cart.findIndex(i => i.id === itemId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
}

// Cambiar cantidad en el carrito
function changeQuantity(itemId, change) {
    const index = cart.findIndex(i => i.id === itemId);
    if (index > -1) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    updateCartUI();
}

// Actualizar interfaz del carrito
function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Tu carrito está vacío.</p>`;
        cartTotalPrice.textContent = "Bs. 0.00";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemEl = document.createElement("div");
        cartItemEl.classList.add("cart-item");
        cartItemEl.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <span>Bs. ${item.price.toFixed(2)} x ${item.quantity} = Bs. ${itemTotal.toFixed(2)}</span>
            </div>
            <div class="cart-item-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    cartTotalPrice.textContent = `Bs. ${total.toFixed(2)}`;
}

// Cambiar dinámicamente el campo de dirección según el tipo de pedido
function toggleOrderType() {
    const orderType = document.getElementById("order-type").value;
    const addressLabel = document.getElementById("address-label");
    const addressInput = document.getElementById("client-address");

    if (orderType === "mesa") {
        addressLabel.textContent = "Número de Mesa:";
        addressInput.placeholder = "Ej: Mesa 4";
    } else {
        addressLabel.textContent = "Dirección de Entrega:";
        addressInput.placeholder = "Ej: Av. Heroínas y España";
    }
}

// Enviar pedido por WhatsApp
function setupOrderForm() {
    const form = document.getElementById("order-form");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Añade al menos un producto al carrito antes de hacer el pedido.");
            return;
        }

        const orderType = document.getElementById("order-type").value;
        const name = document.getElementById("client-name").value;
        const address = document.getElementById("client-address").value;
        const notes = document.getElementById("client-notes").value;

        const tipoTexto = orderType === "mesa" ? "Consumo en Mesa" : "Entrega a Domicilio";

        let message = `*NUEVO PEDIDO - RESTAURANTE PUNTO DE ENCUENTRO*\n\n`;
        message += `*Tipo de Servicio:* ${tipoTexto}\n`;
        message += `*Cliente:* ${name}\n`;
        
        if (orderType === "mesa") {
            message += `*Mesa:* ${address}\n`;
        } else {
            message += `*Dirección:* ${address}\n`;
        }

        if (notes.trim()) {
            message += `*Notas:* ${notes}\n`;
        }

        message += `\n*Detalle del Pedido:*\n`;

        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `• ${item.name} x${item.quantity} - Bs. ${itemTotal.toFixed(2)}\n`;
        });

        message += `\n*TOTAL A PAGAR:* Bs. ${total.toFixed(2)}`;

        const phoneNumber = "59170000000"; 
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");
    });
}