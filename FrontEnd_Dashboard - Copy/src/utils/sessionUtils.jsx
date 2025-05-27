const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

// Set the session expiration time in localStorage
export const setSessionTimeout = (callback) => {
  const timeout = setTimeout(() => {
    callback(); // Log the user out when the session expires
  }, SESSION_TIMEOUT);

  // Store the timeout ID in localStorage to clear the timeout when the user logs out or reloads
  localStorage.setItem("sessionTimeout", timeout);
};

// Clear session timeout (e.g., when the user logs out)
export const clearSessionTimeout = () => {
  const timeout = localStorage.getItem("sessionTimeout");
  if (timeout) {
    clearTimeout(Number(timeout));
    localStorage.removeItem("sessionTimeout");
  }
};