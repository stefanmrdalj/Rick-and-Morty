import to from "await-to-js";
import { authRepository } from "./auth.repo";
import type { AuthFormData, UploadPhotoResponse } from "./auth.types";

class AuthService {
  async logIn(username: string, password: string) {
    const [err, res] = await to(authRepository.logIn(username, password));
    if (err) {
      throw new Error("Login request failed");
    }
    return res.data;
  }
  async register(user: AuthFormData) {
    const [err, res] = await to(authRepository.register(user));
    if (err) {
      throw new Error("Register request failed.");
    }
    return res.data;
  }

  async isUsernameTaken(username: string) {
    const [err, res] = await to(authRepository.isUsernameTaken(username));
    if (err) {
      throw new Error("Username check failed");
    }
    return Array.isArray(res.data) && res.data.length > 0;
  }

  async isEmailTaken(email: string) {
    const [err, res] = await to(authRepository.isEmailTaken(email));
    if (err) {
      throw new Error("Email check failed");
    }
    return Array.isArray(res.data) && res.data.length > 0;
  }
  async uploadProfilePhoto(file: File) {
    const [err, res] = await to(authRepository.uploadProfilePhoto(file));
    if (err) throw new Error("Upload failed");
    return res.data as UploadPhotoResponse;
  }
}

export const authService = new AuthService();
