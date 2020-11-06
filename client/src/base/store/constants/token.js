const token = localStorage.getItem('token');
export const options = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
    }
}
