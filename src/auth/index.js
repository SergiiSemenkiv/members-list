import api from '@/services/api';

export async function authLogin(login, password) {
  return new Promise((resolve, reject) => {
    api.get('members', { login }, false)
      .then((user) => {
        if (user && user.password === password) {
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Bad credentials'));
        }
      });
  });
}

export function authLogOut() {
  localStorage.removeItem('user');
}
