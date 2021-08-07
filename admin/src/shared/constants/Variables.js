export const BACKEND_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:2100/ap' : `${window.location.origin}/ap`;
export const audioTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'];
export const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
export const videoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
