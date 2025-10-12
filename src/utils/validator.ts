export function validateEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function validatePassword(password: string) {
  return password.length >= 8;
}

export function validateNickname(nickname: string) {
  return nickname.length <= 10;
}
