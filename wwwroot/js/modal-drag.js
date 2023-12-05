const modal = document.getElementById("patientsModal");

let isDragging = false;
let offsetX, offsetY;

modal.addEventListener("mousedown", (e) => {
  isDragging = true;
  let rect = modal.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  modal.style.transition = "none"; // Отключаем анимацию при перетаскивании
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const currentLeft = e.clientX - offsetX;
  const currentTop = e.clientY - offsetY;

  modal.style.left = currentLeft + "px";
  modal.style.top = currentTop + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  modal.style.transition = ""; // Включаем анимацию после перетаскивания
});
