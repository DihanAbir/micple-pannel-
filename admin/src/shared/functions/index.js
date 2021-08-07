import { FemaleAvatar, MaleAvatar, GroupAvatar } from '../../assets/profile';

export function getUrl(url = '') {
  const back = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:2300' : 'https://cloud.micple.com';
  return !!url ? `${back}${url}` : '';
}
export function getUserAvatar(url = '', gender = '') {
  if (url) {
    return getUrl(url);
  } else {
    return gender.toLocaleLowerCase() === 'female' ? FemaleAvatar : MaleAvatar;
  }
}
export function getGroupAvatar(url) {
  return getUrl(url) || GroupAvatar;
}
