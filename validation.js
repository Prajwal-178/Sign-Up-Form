document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const terms = document.getElementById('terms');
    
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const termsError = document.getElementById('terms-error');
    
    const strengthIndicator = document.getElementById('strength-indicator');
    const strengthText = document.getElementById('password-strength-text');
    
    const errorPopup = document.getElementById('error-popup');
    const successPopup = document.getElementById('success-popup');
    const errorMessage = document.getElementById('error-message');
    const closeErrorPopup = document.getElementById('close-error-popup');
    const closeSuccessPopup = document.getElementById('close-success-popup');

    // Password Strength Checker
    function checkPasswordStrength(password) {
        let strength = 0;
        const strengthChecks = [
            { regex: /.{8,}/, message: 'At least 8 characters' },
            { regex: /[a-z]+/, message: 'Lowercase letter' },
            { regex: /[A-Z]+/, message: 'Uppercase letter' },
            { regex: /[0-9]+/, message: 'Number' },
            { regex: /[^a-zA-Z0-9]+/, message: 'Special character' }
        ];

        strengthChecks.forEach(check => {
            if (check.regex.test(password)) {
                strength++;
            }
        });

        // Update strength meter and text
        switch(strength) {
            case 0:
            case 1:
                strengthIndicator.className = 'h-1 bg-red-500 w-1/4 rounded-full';
                strengthText.textContent = 'Very weak password';
                break;
            case 2:
                strengthIndicator.className = 'h-1 bg-orange-500 w-1/2 rounded-full';
                strengthText.textContent = 'Weak password';
                break;
            case 3:
                strengthIndicator.className = 'h-1 bg-yellow-500 w-3/4 rounded-full';
                strengthText.textContent = 'Moderate password';
                break;
            case 4:
            case 5:
                strengthIndicator.className = 'h-1 bg-green-500 w-full rounded-full';
                strengthText.textContent = 'Strong password';
                break;
        }

        return strength;
    }

    // Validation Functions
    function validateUsername() {
        const usernameValue = username.value.trim();
        const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;

        if (!usernameValue) {
            usernameError.textContent = 'Username is required';
            usernameError.classList.remove('hidden');
            return false;
        }

        if (!usernamePattern.test(usernameValue)) {
            usernameError.textContent = 'Username must be 4-20 characters, only letters, numbers, and underscore';
            usernameError.classList.remove('hidden');
            return false;
        }

        usernameError.classList.add('hidden');
        return true;
    }

    function validateEmail() {
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValue) {
            emailError.textContent = 'Email is required';
            emailError.classList.remove('hidden');
            return false;
        }

        if (!emailPattern.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.classList.remove('hidden');
            return false;
        }

        emailError.classList.add('hidden');
        return true;
    }

    function validatePassword() {
        const passwordValue = password.value;
        const passwordStrength = checkPasswordStrength(passwordValue);

        if (!passwordValue) {
            passwordError.textContent = 'Password is required';
            passwordError.classList.remove('hidden');
            return false;
        }

        if (passwordValue.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long';
            passwordError.classList.remove('hidden');
            return false;
        }

        if (passwordStrength < 3) {
            passwordError.textContent = 'Password is too weak';
            passwordError.classList.remove('hidden');
            return false;
        }

        passwordError.classList.add('hidden');
        return true;
    }

    function validateConfirmPassword() {
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;

        if (!confirmPasswordValue) {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordError.classList.remove('hidden');
            return false;
        }

        if (passwordValue !== confirmPasswordValue) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordError.classList.remove('hidden');
            return false;
        }

        confirmPasswordError.classList.add('hidden');
        return true;
    }

    function validateTerms() {
        if (!terms.checked) {
            termsError.textContent = 'You must agree to the terms and conditions';
            termsError.classList.remove('hidden');
            return false;
        }

        termsError.classList.add('hidden');
        return true;
    }

    // Real-time validation
    username.addEventListener('input', validateUsername);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', () => {
        validatePassword();
        validateConfirmPassword();
    });
    confirmPassword.addEventListener('input', validateConfirmPassword);
    terms.addEventListener('change', validateTerms);

    // Popup Close Handlers
    closeErrorPopup.addEventListener('click', () => {
        errorPopup.classList.add('hidden');
    });

    closeSuccessPopup.addEventListener('click', () => {
        successPopup.classList.add('hidden');
    });

    // Form Submission Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsAccepted = validateTerms();

        // Check if all validations pass
        if (isUsernameValid && isEmailValid && isPasswordValid && 
            isConfirmPasswordValid && isTermsAccepted) {
            // Simulate form submission (replace with actual submission logic)
            try {
                // Here you would typically send data to a backend server
                console.log('Form submitted successfully');
                
                // Show success popup
                successPopup.classList.remove('hidden');
            } catch (error) {
                // Show error popup
                errorMessage.textContent = 'An error occurred during signup. Please try again.';
                errorPopup.classList.remove('hidden');
            }
        } else {
            // Show error popup if validation fails
            errorMessage.textContent = 'Please correct the errors in the form.';
            errorPopup.classList.remove('hidden');
        }
    });
});