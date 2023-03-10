import service from "./config.services";

const signupService = (newUser) => {
  return service.post("/auth/signup", newUser);
};

const loginService = (credentials) => {
  return service.post("/auth/login", credentials);
};

export { signupService, loginService };
