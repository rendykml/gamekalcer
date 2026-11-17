const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
).replace(/\/+$/, "");

export type AuthRole = "PUBLIC" | "INPUT_USER" | "OWNER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
}

interface ApiErrorBody {
  code?: string;
  message?: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string | undefined;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readApiError(value: unknown, status: number): ApiError {
  if (isRecord(value) && isRecord(value.error)) {
    const body = value.error as ApiErrorBody;
    return new ApiError(
      typeof body.message === "string" ? body.message : "Permintaan gagal.",
      status,
      typeof body.code === "string" ? body.code : undefined,
    );
  }

  return new ApiError(`Permintaan gagal (HTTP ${status}).`, status);
}

function readAuthUser(value: unknown): AuthUser {
  if (!isRecord(value) || !isRecord(value.data) || !isRecord(value.data.user)) {
    throw new Error("Respons autentikasi dari server tidak sesuai kontrak.");
  }

  const user = value.data.user;
  const role = user.role;
  if (
    typeof user.id !== "string"
    || typeof user.name !== "string"
    || typeof user.email !== "string"
    || (role !== "PUBLIC" && role !== "INPUT_USER" && role !== "OWNER")
  ) {
    throw new Error("Data pengguna dari server tidak valid.");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role,
  };
}

async function request(path: string, body?: unknown): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: body === undefined ? "GET" : "POST",
    credentials: "include",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 204) {
    if (!response.ok) {
      throw readApiError(undefined, response.status);
    }
    return undefined;
  }

  const responseText = await response.text();
  let payload: unknown;
  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      if (response.ok) {
        throw new Error("Respons API bukan JSON yang valid.");
      }
    }
  }

  if (!response.ok) {
    throw readApiError(payload, response.status);
  }

  return payload;
}

export async function registerPublic(input: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthUser> {
  return readAuthUser(await request("/auth/register", input));
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<AuthUser> {
  return readAuthUser(await request("/auth/login", input));
}

export async function getCurrentUser(): Promise<AuthUser> {
  return readAuthUser(await request("/auth/me"));
}

export async function logout(): Promise<void> {
  await request("/auth/logout", {});
}
