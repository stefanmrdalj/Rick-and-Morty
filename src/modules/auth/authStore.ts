import { makeAutoObservable } from "mobx";
import to from "await-to-js";
import { authService } from "./auth.service";
import type { AuthFormData } from "./auth.types";

const AUTH_STORAGE_KEY = "auth_user";

class AuthStore {
  loggedInUser: AuthFormData | null = null;
  isLoggingIn = false;
  loginErrorMessage: string | null = null;

  isRegistering = false;
  registerErrorMessage: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.restoreSession();
  }

  async logIn(username: string, password: string) {
    this.isLoggingIn = true;
    this.loginErrorMessage = null;

    const [error, users] = await to(authService.logIn(username, password));

    if (error || !Array.isArray(users) || users.length !== 1) {
      this.loggedInUser = null;
      this.loginErrorMessage = "Invalid username or password.";
      this.isLoggingIn = false;
      return;
    }

    this.loggedInUser = users[0];
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users[0]));
    this.isLoggingIn = false;
  }

  logOut() {
    this.loggedInUser = null;
    this.loginErrorMessage = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem("favorites");
  }
  // authStore.ts
  async register(user: AuthFormData, profilePhotoFile?: File) {
    this.isRegistering = true;
    this.registerErrorMessage = null;

    const [checkError, checkResult] = await to(
      (async () => {
        const [usernameTakenError, usernameTaken] = await to(
          authService.isUsernameTaken(user.username ?? ""),
        );
        if (usernameTakenError) throw usernameTakenError;

        const [emailTakenError, emailTaken] = await to(
          authService.isEmailTaken(user.email ?? ""),
        );
        if (emailTakenError) throw emailTakenError;

        return { usernameTaken, emailTaken };
      })(),
    );

    if (checkError) {
      this.registerErrorMessage = "Registration failed. Please try again.";
      this.isRegistering = false;
      return false;
    }

    if (checkResult.usernameTaken) {
      this.registerErrorMessage = "Username is already taken.";
      this.isRegistering = false;
      return false;
    }

    if (checkResult.emailTaken) {
      this.registerErrorMessage = "Email is already in use.";
      this.isRegistering = false;
      return false;
    }

    // Upload photo (optional)
    let photoUrl = "/uploads/image4.jpg";
    if (profilePhotoFile) {
      const [uploadError, uploadResult] = await to(
        authService.uploadProfilePhoto(profilePhotoFile),
      );

      if (uploadError || !uploadResult?.photoUrl) {
        this.registerErrorMessage = "Photo upload failed.";
        this.isRegistering = false;
        return false;
      }

      photoUrl = uploadResult.photoUrl;
    }

    const userToCreate: AuthFormData = {
      ...user,
      photo: photoUrl,
    };

    const [registerError] = await to(authService.register(userToCreate));

    if (registerError) {
      this.registerErrorMessage = "Registration failed. Please try again.";
      this.isRegistering = false;
      return false;
    }

    this.isRegistering = false;
    return true;
  }
  private restoreSession() {
    const savedUserJson = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedUserJson) {
      this.loggedInUser = JSON.parse(savedUserJson);
    }
  }
}

export const authStore = new AuthStore();
