import { useNavigate } from 'react-router-dom';

const Logout = function () {
    const navigate = useNavigate();
    const authorization = JSON.parse(localStorage.getItem('authorization'));

    if (authorization && authorization.token) {
        localStorage.clear();
        navigate('/', { replace: true });
    } 
}

export default Logout;
