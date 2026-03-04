export const logout = (navigate) => {
  localStorage.clear();
  navigate("/", { replace: true });
};
