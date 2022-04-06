
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const SOCKET_HOST = development ? "http://localhost:3001" : "https://projet-pompier.herokuapp.com"

export const PEERJS_HOST = development ? "localhost" : "projet-pompier.herokuapp.com"
export const PEERJS_SECURE = !development
export const PEERJS_PORT = development ? 3001 : 443
