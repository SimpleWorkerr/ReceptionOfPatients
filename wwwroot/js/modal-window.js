document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            hideModal();
        }
    });
});

// Работа с модальными окнами
function showModal() {
    var overlay = document.getElementById("overlay");
    var modal = document.getElementById("modal");
    overlay.style.display = "block";
    modal.style.display = "block";
    setTimeout(() => {
        overlay.style.opacity = 1;
        modal.style.opacity = 1;
        modal.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10); // Маленькая задержка, чтобы CSS успел обнаружить изменение display
}

function hideModal() {
    var overlay = document.getElementById("overlay");
    var modal = document.getElementById("modal");
    overlay.style.opacity = 0;
    modal.style.opacity = 0;
    modal.style.transform = "translate(-50%, -50%) scale(0.9)";
    setTimeout(() => {
        overlay.style.display = "none";
        modal.style.display = "none";
    }, 500); // Задержка соответствует продолжительности анимации
}
