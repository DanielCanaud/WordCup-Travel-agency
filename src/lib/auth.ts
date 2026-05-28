export type User = { name: string; email: string; password: string };

const USERS_KEY = "wcv_users";
const SESSION_KEY = "wcv_session";

const isBrowser = () => typeof window !== "undefined";

export function getUsers(): User[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function registerUser(user: User): { ok: boolean; error?: string } {
  if (!isBrowser()) return { ok: false, error: "Indisponível" };
  const users = getUsers();
  if (users.find((u) => u.email === user.email))
    return { ok: false, error: "E-mail já cadastrado" };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: user.email, name: user.name }),
  );
  return { ok: true };
}

export function loginUser(
  email: string,
  password: string,
): { ok: boolean; error?: string } {
  if (!isBrowser()) return { ok: false };
  const user = getUsers().find(
    (u) => u.email === email && u.password === password,
  );
  if (!user) return { ok: false, error: "Credenciais inválidas" };
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: user.email, name: user.name }),
  );
  return { ok: true };
}

export function logout() {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): { email: string; name: string } | null {
  if (!isBrowser()) return null;
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}
