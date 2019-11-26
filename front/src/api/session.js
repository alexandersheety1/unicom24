import axios from 'axios';

const CSRF_COOKIE_NAME = 'csrftoken';
const CSRF_HEADER_NAME = 'X-CSRFToken';

const session = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
});

function login(username, password) {

  return session.post(
    '/api/registration/login/',
    {
      'username': username,
      'password': password,
    },
    {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    }
  )
}

function logout() {
  return session.post('/api/registration/logout/', {})
}

session.login = login;
session.logout = logout;
export default session;