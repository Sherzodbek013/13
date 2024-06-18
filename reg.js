document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', registerUser);
});

function registerUser(event) {
    event.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const userData = {
        phone: phone,
        email: email,
        password: password
    };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        const registrationMessage = document.getElementById('registrationMessage');
        registrationMessage.textContent = data.message;
        registrationForm.reset();
    })
    .catch(error => {
        console.error('Error registering user:', error);
        const registrationMessage = document.getElementById('registrationMessage');
        registrationMessage.textContent = 'Произошла ошибка при регистрации пользователя.';
    });
}

