document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('order-form');
    
   
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Ваша корзина пуста!');
            return;
        }
    
        const orderData = {
            customer_name: form.name.value,
            customer_email: form.email.value,
            customer_phone: form.phone.value,
            delivery_address: form.address.value,
            payment_method: form.payment.value,
            delivery_method: form.delivery.value,
            total_price: cart.reduce((total, item) => total + item.price * item.quantity, 0)
        };
    
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
    
        if (response.ok) {
            alert('Заказ успешно оформлен!');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        } else {
            alert('Ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
        }
    });
    });
    Reg.JS
    document.getElementById('show-register').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    });
    
    document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    });




