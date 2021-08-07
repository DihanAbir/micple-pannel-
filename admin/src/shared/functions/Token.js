export function adminHeader() {
  return { Authentication: `Bearer ${localStorage.getItem('t')}` };
}
