import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@bar.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_PASSWORD_HASH = bcryptjs.hashSync(ADMIN_PASSWORD, 10);
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'tu_clave_secreta_super_segura';

export async function verifyCredentials(email: string, password: string) {
  if (email !== ADMIN_EMAIL) {
    return false;
  }

  try {
    return await bcryptjs.compare(password, ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
}

export function generateToken(email: string) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string };
  } catch (error) {
    return null;
  }
}
