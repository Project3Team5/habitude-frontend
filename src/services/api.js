const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getUsers() {
    const res = await fetch(`${API_BASE_URL}/api/users`);
    return res.json();
}
