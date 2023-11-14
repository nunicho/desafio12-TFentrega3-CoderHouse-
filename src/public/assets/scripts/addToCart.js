document.addEventListener("DOMContentLoaded", function () {
  const limpiarCarritoButton = document.getElementById("limpiarCarrito");
  const finalizarCompraButton = document.getElementById("finalizarCompra");
  const carritoContainer = document.getElementById("carritoProductos");
  const carritoProductos = [];

  async function agregarAlCarrito(productId, productName, quantity, price) {
    const itemDiv = document.createElement("div");

    const productNameText = document.createTextNode(productName);
    itemDiv.appendChild(productNameText);

    const quantityText = document.createElement("span");
    quantityText.textContent = `Cantidad: ${quantity}`;
    itemDiv.appendChild(quantityText);

    const priceText = document.createElement("span");
    priceText.textContent = `Precio: $${(quantity * price).toFixed(2)}`;
    itemDiv.appendChild(priceText);

    carritoContainer.appendChild(itemDiv);
  }

  finalizarCompraButton.addEventListener("click", async () => {
    try {
      let totalAmount = 0;
    for (const product of carritoProductos) {
      totalAmount += product.quantity * product.price};
      const products = carritoProductos.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));

      const response = await fetch("/api/carts/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.insufficientStockProducts) {
          alert("Stock insuficiente para algunos productos en el carrito.");
          return;
        }

        throw new Error(
          `La solicitud no fue exitosa. Código de estado: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Compra finalizada:", data);

      if (data.carritoInsertado && data.carritoInsertado._id) {
        alert(`Carrito ${data.carritoInsertado._id} creado exitosamente`);
      }

      // Aquí puedes realizar acciones adicionales después de la compra

      limpiarCarrito();
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
    }
  });

  const addToCartLinks = document.querySelectorAll("[data-product-id]");
addToCartLinks.forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();

    const productId = link.getAttribute("data-product-id");
    const productName = link.getAttribute("data-product-name");
    const price = parseFloat(link.getAttribute("data-product-price"));

    const quantity = parseInt(prompt(`Cantidad de ${productName}:`), 10);

    if (!isNaN(quantity) && quantity > 0) {
      agregarAlCarrito(productId, productName, quantity, price);
      carritoProductos.push({ id: productId, quantity, price });
    } else {
      alert("La cantidad ingresada no es válida.");
    }
  });
});
});

/*
finalizarCompraButton.addEventListener("click", async () => {
    try {
      const products = carritoProductos.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));

      const response = await fetch("/api/carts/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        throw new Error(
          `La solicitud no fue exitosa. Código de estado: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Compra finalizada:", data);

      if (data.carritoInsertado && data.carritoInsertado._id) {
        alert(`Carrito ${data.carritoInsertado._id} creado exitosamente`);
      }

      // Aquí puedes realizar acciones adicionales después de la compra

      limpiarCarrito();
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
    }
  });

  const addToCartLinks = document.querySelectorAll("[data-product-id]");
  addToCartLinks.forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();

      const productId = link.getAttribute("data-product-id");
      const productName = link.getAttribute("data-product-name");

      const quantity = parseInt(prompt(`Cantidad de ${productName}:`), 10);

      if (!isNaN(quantity) && quantity > 0) {
        agregarAlCarrito(productId, productName, quantity);
        carritoProductos.push({ id: productId, quantity });
      } else {
        alert("La cantidad ingresada no es válida.");
      }
    });
  });
});
*/
