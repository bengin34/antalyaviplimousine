import { describe, expect, test } from "vitest";
import { clientIp, consumeRateLimit } from "./client-ip";

const req = (headers: Record<string, string>) => new Request("http://x", { headers });

describe("clientIp", () => {
  test("header precedence", () => {
    expect(clientIp(req({ "cf-connecting-ip": "1.1.1.1", "x-real-ip": "2.2.2.2", "x-forwarded-for": "3.3.3.3" }))).toBe("1.1.1.1");
    expect(clientIp(req({ "x-real-ip": "2.2.2.2", "x-forwarded-for": "3.3.3.3" }))).toBe("2.2.2.2");
  });
  test("first x-forwarded-for entry, trimmed", () => {
    expect(clientIp(req({ "x-forwarded-for": " 3.3.3.3 , 4.4.4.4" }))).toBe("3.3.3.3");
  });
  test("null when absent", () => {
    expect(clientIp(req({}))).toBeNull();
  });
});

describe("consumeRateLimit", () => {
  const rpc = (result: { data: unknown; error: unknown }) => ({ rpc: async () => result });
  test("true / false / null", async () => {
    expect(await consumeRateLimit(rpc({ data: true, error: null }), "b", "ip", 1, 1)).toBe(true);
    expect(await consumeRateLimit(rpc({ data: false, error: null }), "b", "ip", 1, 1)).toBe(false);
    expect(await consumeRateLimit(rpc({ data: null, error: { message: "boom" } }), "b", "ip", 1, 1)).toBeNull();
  });
});
