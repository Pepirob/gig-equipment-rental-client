import service from "./config.services";

const signupService = (newUser) => {
  return service.post("/auth/signup", newUser);
};

export { signupService };
