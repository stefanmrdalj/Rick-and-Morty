import authAxiosInstance from "../../api/authAxiosInstance";
import type { AuthFormData } from "./auth.types";

class AuthRepo {
  logIn(username: string, password: string) {
    return authAxiosInstance.get("/users", {
      params: { username, password },
    });
  }
  register(user: AuthFormData) {
    return authAxiosInstance.post("/users", user);
  }
  isUsernameTaken(username: string) {
    return authAxiosInstance.get("/users", { params: { username } });
  }
  isEmailTaken(email: string) {
    return authAxiosInstance.get("/users", { params: { email } });
  }
  uploadProfilePhoto(file: File) {
    const formData = new FormData();
    formData.append("photo", file);

    return authAxiosInstance.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
export const authRepository = new AuthRepo();
