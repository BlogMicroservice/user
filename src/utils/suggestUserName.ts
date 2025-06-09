import prisma from "../config/prismaClient";

function generateCandidate(base: string): string {
  const rand = Math.floor(Math.random() * 10000);
  const formats = [
    `${base}${rand}`,
    `${base}_${Date.now().toString().slice(-4)}`,
    `${base}.${Math.floor(1000 + Math.random() * 9000)}`,
  ];
  return formats[Math.floor(Math.random() * formats.length)];
}
export async function suggestUniqueUsernames(
  name: string,
  count = 3,
): Promise<string[]> {
  const base = name.trim().toLowerCase().replace(/\s+/g, '');
  const suggestions = new Set<string>();

  while (suggestions.size < count) {
    const candidate = generateCandidate(base);
    const existing = await prisma.profile.findUnique({
      where: { userName: candidate },
      select: { userName: true },
    });

    if (!existing) {
      suggestions.add(candidate);
    }
  }

  return Array.from(suggestions);
}