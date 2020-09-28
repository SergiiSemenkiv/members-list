export function isAuthenticated() {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
}

export function isAdminUser() {
  const user = isAuthenticated();
  if (!user) return false;
  return (user.role === 'admin');
}

export function isGrantedForEditing(id) {
  const user = isAuthenticated();
  if (!user) return false;
  return (isAdminUser() || user.id === id);
}

export default {
  isAuthenticated,
  isAdminUser,
  isGrantedForEditing,
};
