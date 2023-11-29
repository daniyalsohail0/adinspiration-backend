import bcrypt from "bcrypt";

export const hashedText = async (text: string, salt: number): Promise<string> => {
  const hash = await bcrypt.hash(text, salt);
  return hash;
};

export const compareHashedText = async (
  text: string,
  hashedText: string
): Promise<boolean> => {
  const result = await bcrypt.compare(text, hashedText);
  return result;
};
