const inMemoryJWTManager = () => {

  const getToken = () =>  localStorage.getItem("token");

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    return true;
  };

  const eraseToken = () => {
    localStorage.removeItem("token");
    return true;
  };

  return {
    eraseToken,
    getToken,
    setToken,
  };
};

export default inMemoryJWTManager();
