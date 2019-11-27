import axios from 'axios';

const CSRF_COOKIE_NAME = 'csrftoken';
const CSRF_HEADER_NAME = 'X-CSRFToken';

const session = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
});

function login(username, password) {

  return session.post(
    '/api/login/',
    {
      'login': username,
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
  return session.post('/api/logout/', {})
}

function registration(username, email, password, password_confirm) {
  return session.post(
    '/api/register/',
    {
      'username': username,
      'email': email,
      'password': password,
      'password_confirm': password_confirm
    },
    {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    }
  )
}

session.login = login;
session.logout = logout;
session.registration = registration;
export default session;
