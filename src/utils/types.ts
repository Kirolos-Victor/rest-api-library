export type JwtPayload = {
  sub: string; // User ID
  username: string;
  email: string;
  iat?: number; // Issued at (auto-added by JWT)
  exp?: number; // Expiration time (auto-added by JWT)
};
