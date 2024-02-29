function showEmailLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
}

function showPhoneNumberForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('email').setAttribute('type', 'tel');
    document.getElementById('email').setAttribute('placeholder', 'Enter your number');
}

function validateLogin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('Please fill in all fields');
    } else {
        // Assuming validation is successful, redirect to player page
        window.location.href = 'player.html';
    }
}

function signup() {
    window.location.href = 'signupplayer.html';
}
