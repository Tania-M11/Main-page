const $menu = document.querySelector(".burger-menu");
const $navigation = document.querySelector(".navigation");
const $body = document.querySelector("body");
const $img = document.querySelectorAll("img");
const $dishes = document.querySelectorAll(".dish");
const $btnAll = document.querySelector(".all");
const $containerDishes = document.querySelector(".dishes");
const $btnProductoDia = document.querySelector(".producto-del-dia");
const $btnFrutas = document.querySelector(".frutas");
const $btnVerduras = document.querySelector(".verduras");
const $btnTuberculos = document.querySelector(".tuberculos");
const $btnLegumbres= document.querySelector(".legumbres");
const $btnCereales = document.querySelector(".cereales");
const $btnCondimentos = document.querySelector(".condimentos");
const $btnPecuarios = document.querySelector(".pecuarios");
const $btnDerivados = document.querySelector(".derivados");



document.addEventListener("DOMContentLoaded", () => {
  events();
  dishes();
});

// const events = () => {
//   $menu.addEventListener("click", openMenu);
// };

//  LazyLoad--img de forma asincrona
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const imagen = entry.target;
      imagen.src = imagen.dataset.src;
      observer.unobserve(imagen);
    }
  });
});

// Imágenes
$img.forEach((imagen) => {
  observer.observe(imagen);
});

const openMenu = () => {
  $navigation.classList.remove("hidden");
  closeButton(); //solo se quiere que se dibuje el boton cuando se abra el menu
};

// creando el boton de cerrar
const closeButton = () => {
  const btnClose = document.createElement("p");
  const overlay = document.createElement("div");
  overlay.classList.add("full-screen");

  //Con qsALL se crea una coleccion de datos, un arreglo, tiene todos los everlay creados por el user
  //si los div creados es >0 termine ya ejecucuón del programa
  if (document.querySelectorAll(".full-screen").length > 0) return;

  //inyectar el overlay al body
  $body.appendChild(overlay);

  btnClose.textContent = "X";
  btnClose.classList.add("btn-close");
  // agregar la x con los estilos al html

  //Para agregar el botón de cerrar al menú
  $navigation.appendChild(btnClose);
  closeMenu(btnClose, overlay);
};








//Manejo del menu con  los links
const events = () => {
  $menu.addEventListener("click", openMenu);

  // Detectar clics en los enlaces del menú
  const $menuLinks = document.querySelectorAll(".navigation a"); // Selecciona los enlaces del menú
  $menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenuHandler(); // Llama a la función que cierra el menú
    });
  });
};


// Nueva función para cerrar el menú al hacer clic en un enlace
const closeMenuHandler = () => {
 $navigation.classList.add("hidden");
 const overlay = document.querySelector(".full-screen");
 const closeButton = document.querySelector(".btn-close");

 // Elimina el overlay y el botón de cerrar si existen
 if (overlay) overlay.remove();
 if (closeButton) closeButton.remove();
};









//Para quitar el menú
const closeMenu = (button, overlay) => {
  button.addEventListener("click", () => {
    $navigation.classList.add("hidden");
    // Para que el overlay no se cree una y otra vez una vez se preciona el botón, se quita el overlay
    overlay.remove();
    //para que no se genere una div de boton por cada click --->
    button.remove();
  });

  // Para cuando el overlay este activo, al precionar en la pantalla se debe quitar
  overlay.onclick = function () {
    overlay.remove();
    $navigation.classList.add("hidden");
    //-->
    button.remove();
  };
};

// Función para filtrar los productos por categorías
const dishes = () => {
  let dishesArray = [];
  $dishes.forEach((dish) => (dishesArray = [...dishesArray, dish]));

  const productoDelDia = dishesArray.filter(
    (dish) => dish.getAttribute("data-dish") === "productoDelDia"
  );
  const frutas = dishesArray.filter(
    (dish) => dish.getAttribute("data-dish") === "frutas"
  );
  const verduras = dishesArray.filter(
    (dish) => dish.getAttribute("data-dish") === "verduras"
  );
  const tuberculos = dishesArray.filter(
    (dish) => dish.getAttribute("data-dish") === "tuberculos"
  );
  const legumbres = dishesArray.filter(
    (dish) => dish.getAttribute("data-dish") === "legumbres"
  );
  const cereales = dishesArray.filter(
    (dish) => dish.getAttribute("data-dish") === "cereales"
  );
  const condimentos = dishesArray.filter(
    (dish) => dish.getAttribute("data-dish") === "condimentos"
  );
  const pecuarios = dishesArray.filter(
    (dish) => dish.getAttribute("data-dish") === "pecuarios"
  );
  const derivados = dishesArray.filter(
    (dish) => dish.getAttribute("data-dish") === "derivados"
  );

  showDishes(productoDelDia, frutas, verduras, tuberculos, legumbres, cereales, condimentos, pecuarios, derivados, dishesArray);
};

// Función para mostrar los productos filtrados
const showDishes = (productoDelDia, frutas, verduras, tuberculos, legumbres, cereales, condimentos, pecuarios, derivados, dishesArray) => {
  // Evento para el botón de "Productos del Día"
  document.querySelector(".all").addEventListener("click", () => {
    clearHtml($containerDishes);
    dishesArray.forEach((dish) => $containerDishes.appendChild(dish));
  });

  // Eventos para cada categoría de productos
  document.querySelector(".frutas").addEventListener("click", () => {
    clearHtml($containerDishes);
    frutas.forEach((dish) => $containerDishes.appendChild(dish));
  });
  
  document.querySelector(".verduras").addEventListener("click", () => {
    clearHtml($containerDishes);
    verduras.forEach((dish) => $containerDishes.appendChild(dish));
  });
  
  document.querySelector(".tuberculos").addEventListener("click", () => {
    clearHtml($containerDishes);
    tuberculos.forEach((dish) => $containerDishes.appendChild(dish));
  });
  
  document.querySelector(".legumbres").addEventListener("click", () => {
    clearHtml($containerDishes);
    legumbres.forEach((dish) => $containerDishes.appendChild(dish));
  });
  
  document.querySelector(".cereales").addEventListener("click", () => {
    clearHtml($containerDishes);
    cereales.forEach((dish) => $containerDishes.appendChild(dish));
  });
  
  document.querySelector(".condimentos").addEventListener("click", () => {
    clearHtml($containerDishes);
    condimentos.forEach((dish) => $containerDishes.appendChild(dish));
  });
  
  document.querySelector(".pecuarios").addEventListener("click", () => {
    clearHtml($containerDishes);
    pecuarios.forEach((dish) => $containerDishes.appendChild(dish));
  });
  
  document.querySelector(".derivados").addEventListener("click", () => {
    clearHtml($containerDishes);
    derivados.forEach((dish) => $containerDishes.appendChild(dish));
  });
};

// Función para limpiar el contenedor de productos antes de añadir los nuevos
const clearHtml = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};


// Llamar la función para inicializar la tienda
dishes();

// -------MODALES-------


// Obtener los elementos necesarios
const basketButtons = document.querySelectorAll('.dish button');
const modal = document.getElementById('productModal');
const closeButtonS = document.querySelector('.close-button');
const similarProductsContainer = document.querySelector('.similar-products');

// Función para cargar los productos similares en la ventana modal
function loadSimilarProducts(productData) {
  // Limpiar el contenido actual de la ventana modal
  similarProductsContainer.innerHTML = '';

  // Agregar los productos similares al contenedor
  productData.forEach(product => {
    const productElement = createProductElement(product);
    similarProductsContainer.appendChild(productElement);
  });

  // Inicializar la observación de las imágenes
  initImageObserver();
}

// Función para crear un elemento HTML para un producto
function createProductElement(product) {
  // Crear y configurar el elemento HTML para el producto
  const productElement = document.createElement('div');
  productElement.classList.add('dish');

  const img = document.createElement('img');
  img.dataset.src = product.image;
  img.alt = product.name;

  const h2 = document.createElement('h2');
  h2.textContent = product.name;

  const p = document.createElement('p');
  p.textContent = product.description;

  const priceDiv = document.createElement('div');
  priceDiv.classList.add('price');

  const priceP = document.createElement('p');
  priceP.textContent = `$${product.price.toFixed(2)}`;

  const button = document.createElement('button');
  button.innerHTML = '<i class="fa-solid fa-basket-shopping"></i>';

  priceDiv.appendChild(priceP);
  priceDiv.appendChild(button);

  productElement.appendChild(img);
  productElement.appendChild(h2);
  productElement.appendChild(p);
  productElement.appendChild(priceDiv);

  return productElement;
}

// Función para inicializar la observación de las imágenes
function initImageObserver() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const imagen = entry.target;
        imagen.src = imagen.dataset.src;
        observer.unobserve(imagen);
      }
    });
  });

  const img = document.querySelectorAll('.similar-products .dish img');
  img.forEach((imagen) => {
    observer.observe(imagen);
  });
}

// Agregar eventos a los botones de la cesta
basketButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Obtener los datos del producto actual
    const productData = {
      name: button.parentElement.parentElement.querySelector('h2').textContent,
      description: button.parentElement.parentElement.querySelector('p').textContent,
      price: parseFloat(button.parentElement.querySelector('p').textContent.slice(1)),
      image: button.parentElement.parentElement.querySelector('img').dataset.src,
    };

    // Cargar los productos similares en la ventana modal
    loadSimilarProducts([
      { name: 'Tienda 1', description: 'Description 1', price: 9.99, image: 'assets/img/48.jpg' },
      { name: 'Tienda 2', description: 'Description 2', price: 8.99, image: 'assets/img/49.jpg' },
      { name: 'Tienda 3', description: 'Description 3', price: 10.99, image: 'assets/img/50.jpg' }
    ]);

    // Mostrar la ventana modal
    modal.style.display = 'block';
  });
});

// Agregar evento al botón de cerrar la ventana modal
closeButtonS.addEventListener('click', () => {
  modal.style.display = 'none';
});



// --------------

const userModal = document.getElementById('userModal');
const userIcon = document.querySelector('.fa-user'); // Ícono de usuario
const userCloseButton = document.querySelector('.user-close');

// Evento para abrir el modal del usuario
userIcon.addEventListener('click', () => {
  userModal.style.display = 'block';
 
});

// Evento para cerrar el modal del usuario
userCloseButton.addEventListener('click', () => {
  userModal.style.display = 'none';
});

// Opción para cerrar el modal haciendo clic fuera del contenido
window.addEventListener('click', (event) => {
  if (event.target === userModal) {
    userModal.style.display = 'none';
  }
});


// ------
// Elementos del modal
const cartModal = document.getElementById('cartModal');
const cartCloseButton = document.querySelector('.cart-close');
const cartTableBody = document.querySelector('.cart-table tbody');
const totalAmount = document.getElementById('total-amount');
const cartIconLink = document.querySelector('.link-car'); // Enlace del carrito

// Simulación de productos en el carrito
const cartItems = [
  { name: 'Producto 1', price: 10, quantity: 1 },
  { name: 'Producto 2', price: 20, quantity: 1 },
  { name: 'Producto 3', price: 15, quantity: 1 },
];

// Abrir modal de carrito al hacer clic en el enlace del carrito
cartIconLink.addEventListener('click', (e) => {
  e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
  loadCartItems(); // Cargar los productos del carrito
  cartModal.style.display = 'block'; // Mostrar el modal
});

// Cerrar modal de carrito
cartCloseButton.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Cargar productos en el carrito
function loadCartItems() {
  cartTableBody.innerHTML = '';
  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" data-index="${index}" />
      </td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button class="delete-button" data-index="${index}">🗑️</button>
      </td>
    `;
    cartTableBody.appendChild(row);
  });

  totalAmount.textContent = `$${total.toFixed(2)} USD`;

  // Actualizar cantidad y eliminar
  document.querySelectorAll('.delete-button').forEach((button) =>
    button.addEventListener('click', (e) => removeCartItem(e.target.dataset.index))
  );
  document.querySelectorAll('input[type="number"]').forEach((input) =>
    input.addEventListener('change', (e) => updateQuantity(e.target.dataset.index, e.target.value))
  );
}

// Actualizar cantidad de producto
function updateQuantity(index, quantity) {
  cartItems[index].quantity = parseInt(quantity);
  loadCartItems();
}

// Eliminar producto del carrito
function removeCartItem(index) {
  cartItems.splice(index, 1);
  loadCartItems();
}

