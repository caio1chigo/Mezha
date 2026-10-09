const reservationForm = document.querySelector("#reservation-form");

reservationForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(reservationForm);

  const message = [
    "Olá, Mezha! Gostaria de solicitar uma reserva.",
    "",
    `Nome: ${data.get("nome")}`,
    `WhatsApp: ${data.get("whatsapp")}`,
    `Data: ${data.get("data")}`,
    `Horário: ${data.get("horario")}`,
    `Pessoas: ${data.get("pessoas")}`,
    `Observações: ${data.get("observacoes") || "Nenhuma"}`,
  ].join("\n");

  const whatsappMessage = encodeURIComponent(message);

  window.open(
    `https://wa.me/5561999999999?text=${whatsappMessage}`,
    "_blank"
  );
});

const topButton = document.querySelector(".reservation-top-button");

topButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});