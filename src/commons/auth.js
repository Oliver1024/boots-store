import jwt_decode from 'jwt-decode';

const JWT = 'store_token_id';

const setToken = token => {
    localStorage.setItem(JWT, token);
};
const getToken = () => {
    return localStorage.getItem(JWT);
};

const isLogin = () => {
    const jwToken = getToken();
    console.log(jwToken)
    return !!jwToken && !isTokenExpired(jwToken);  // !!jwToken represtents a token string that the length is great than 0;
    // ! can change the varaible to a boolean, null and undefined and "" is false, others are true
};

const isTokenExpired = token => {
    try {
        const _info = jwt_decode(token);
        if (_info.exp < Date.now() / 1000) {
            return true;
        } else return false;
    } catch (error) {
        return false;
    }
};

const getUser = () => {
    const jwToken = getToken();
    if (isLogin()) {
        const user = jwt_decode(jwToken);
        return user;
    } else {
        return null;
    }
};

const logout = () => {
    localStorage.removeItem(JWT)
}

global.auth = {
    setToken,
    getUser,
    logout,
    isLogin,
    getToken
};