export const validateString = (str, minLength, maxLength) => {
    if (minLength && str.length < minLength) {
        return false;
    } else if (maxLength && str.length > maxLength) {
        return false;
    }

    return true;
    };

    export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    };

    export const validatePassword = (
    password,
    minLength,
    maxLength,
    needsUppercase,
    needsNumber
    ) => {
    if (minLength && password.length < minLength) {
        return false;
    } else if (maxLength && password.length > maxLength) {
        return false;
    } else if (needsUppercase && !/[A-Z]/.test(password)) return false;
    else if (needsNumber && !/\d/.test(password)) return false;

    return true;
    };

    export const validateLoginUser = (body) => {
    const result = {
        error: false,
        message: "",
    };

    

    const { email, password } = body;

    if (!email || !validateEmail(email))
        return {
        error: true,
        message: "Email invalido",
        };
    else if (!password || !validatePassword(password, 7, null, true, true)) {
        return {
        error: true,
        message: "Contraseña invalida",
        };
    }

    return result;
    };

    const baseUrl = 'http://localhost:3000'; // o tu URL del backend

export const loginUser = (email, password, onSuccess, onError) => {
    fetch(`${baseUrl}/login`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({email, password})
    })
    .then(async res => {
        if (!res.ok){
            const errData = await res.json();
            throw new Error(errData.message || 'Algo ha salido mal');
        }
        return res.json()
    })
    .then(token => onSuccess(token))
    .catch(err => onError(err))
}

    export const validateRegisterUser = (body) => {
    const { userName, email, password } = body;

    const result = {
        error: false,
        message: "",
    };

    if (!userName) {
        return {
        error: true,
        message: "Username invalido",
        };
    } else if (!email || !validateEmail(email)) {
        return {
        error: true,
        message: "Email invalido",
        };
    } else if (!password || !validatePassword(password, 7, null, true, true)) {
        return {
        error: true,
        message: "Contraseña invalida",
        };
    }

    return result;
};