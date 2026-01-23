const API_BASE_URL = "http://localhost:3001";

export const getFileUrl = (filePath?: string) => {
  const defaultPhotoPath = "/uploads/image4.jpg";

  const safePath =
    filePath && filePath.trim().length > 0 ? filePath : defaultPhotoPath;

  // already absolute
  if (safePath.startsWith("http://") || safePath.startsWith("https://")) {
    return safePath;
  }

  // treat as backend-served path (e.g. /uploads/xxx.png)
  return `${API_BASE_URL}${safePath}`;
};
