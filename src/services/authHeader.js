export default function authHeader() {
    const authorization = JSON.parse(localStorage.getItem('authorization'));

    if (authorization && authorization.token) {
        return { headers: {'Bearer ' : authorization.token, 'Content-Type': 'multipart/form-data'} };
    } else {
        return {};
    }
}
