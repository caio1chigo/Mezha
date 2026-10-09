const selectedProducts = new Map();

const favoriteButtons = document.querySelectorAll(".favorite-button");
const removeButtons = document.querySelectorAll(".remove-button");
const highlightOrder = document.querySelector(".highlight-order");

const orderHeaderButton = document.querySelector("#order-header-button");
const orderHeaderLabel = document.querySelector("#order-header-label");
const headerOrderCount = document.querySelector("#header-order-count");

function getProductFromCard(card) {
  return {
    id: card.dataset.id,
    name: card.dataset.name,
    price: card.dataset.price,
  };
}

function getTotalItems() {
  return [...selectedProducts.values()].reduce(
    (total, product) => total + product.quantity,
    0
  );
}

function updateCardState(card) {
  const product = selectedProducts.get(card.dataset.id);
  const quantity = product ? product.quantity : 0;

  const favoriteButton = card.querySelector(".favorite-button");
  const removeButton = card.querySelector(".remove-button");

  card.classList.toggle("is-selected", quantity > 0);

  if (favoriteButton) {
    favoriteButton.textContent = quantity > 0 ? "♥" : "♡";

    favoriteButton.setAttribute(
      "aria-label",
      `Adicionar ${card.dataset.name} ao pedido. Quantidade atual: ${quantity}`
    );
  }

  if (removeButton) {
    removeButton.setAttribute(
      "aria-label",
      `Remover uma unidade de ${card.dataset.name}. Quantidade atual: ${quantity}`
    );
  }
}

function updateOrderInterface() {
  const totalItems = getTotalItems();

  orderHeaderLabel.textContent =
    totalItems > 0 ? "Fechar pedido" : "Fazer pedido";

  headerOrderCount.textContent = totalItems;
  headerOrderCount.classList.toggle("has-items", totalItems > 0);
}

function addProduct(product, card) {
  const currentProduct = selectedProducts.get(product.id);

  if (currentProduct) {
    currentProduct.quantity += 1;
  } else {
    selectedProducts.set(product.id, {
      ...product,
      quantity: 1,
    });
  }

  updateCardState(card);
  updateOrderInterface();
}

function removeProduct(productId, card) {
  const currentProduct = selectedProducts.get(productId);

  if (!currentProduct) {
    return;
  }

  currentProduct.quantity -= 1;

  if (currentProduct.quantity <= 0) {
    selectedProducts.delete(productId);
  }

  updateCardState(card);
  updateOrderInterface();
}

/* Coração: sempre adiciona uma unidade */
favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const product = getProductFromCard(card);

    addProduct(product, card);
  });
});

/* Botão de menos: remove uma unidade */
removeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");

    removeProduct(card.dataset.id, card);
  });
});

/* Botão da seção de destaque */
highlightOrder?.addEventListener("click", () => {
  const product = {
    id: highlightOrder.dataset.id,
    name: highlightOrder.dataset.name,
    price: highlightOrder.dataset.price,
  };

  const currentProduct = selectedProducts.get(product.id);

  if (currentProduct) {
    currentProduct.quantity += 1;
  } else {
    selectedProducts.set(product.id, {
      ...product,
      quantity: 1,
    });
  }

  highlightOrder.textContent = "Adicionar mais um";
  updateOrderInterface();
});

/* Fazer pedido / Fechar pedido */
orderHeaderButton?.addEventListener("click", () => {
  if (selectedProducts.size === 0) {
    document.querySelector(".menu-catalog")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    return;
  }

  const itemList = [...selectedProducts.values()]
    .map((product) => {
      const formattedPrice = product.price.replace(".", ",");

      return `• ${product.quantity}x ${product.name} — R$ ${formattedPrice}`;
    })
    .join("\n");

  const totalPrice = [...selectedProducts.values()]
    .reduce(
      (total, product) => total + Number(product.price) * product.quantity,
      0
    )
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const message = encodeURIComponent(
    `Olá, Mezha! Gostaria de fazer este pedido:\n\n${itemList}\n\nTotal estimado: ${totalPrice}\n\nPode me informar disponibilidade e tempo de preparo?`
  );

  window.open(
    `https://wa.me/5561999999999?text=${message}`,
    "_blank"
  );
});

updateOrderInterface();