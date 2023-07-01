export function clearLocalStorageData(key) {
  if (key in localStorage) {
    localStorage.removeItem(key);
  }
}
