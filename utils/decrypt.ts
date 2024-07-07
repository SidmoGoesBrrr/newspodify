import crypto from 'crypto';
import fs from 'fs';

const loadKey = (): string => {
    // key = .env
    const secret_key = process.env.SECRET_KEY||"";
    return fs.readFileSync(secret_key, 'utf8');
};

const decryptMessage = (encryptedMessage: string, key: string): string => {
  const decipher = crypto.createDecipher('aes-256-ctr', key);
  let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const key = loadKey();

const getDecryptedData = (data: Record<string, string>) => {
  return {
    api_key: decryptMessage(data.api_key, key),
    supabase_url: decryptMessage(data.supabase_url, key),
    supabase_key: decryptMessage(data.supabase_key, key),
    resend_key: decryptMessage(data.resend_key, key),
  };
};

export { getDecryptedData };
