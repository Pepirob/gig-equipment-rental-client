import service from "./config.services";

const signupService = (newUser) => {
  return service.post("/auth/signup", newUser);
};

const loginService = (credentials) => {
  return service.post("/auth/login", credentials);
};

const verifyService = () => {
  return service.get("/auth/verify");
};

export { signupService, loginService, verifyService };
