type ClassPart = string | false | null | undefined;

export const cx = (...parts: ClassPart[]): string => parts.filter(Boolean).join(' ');
