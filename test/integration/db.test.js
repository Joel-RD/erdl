import { safeExecute } from "../../dir/src/models/db.js";
import request from "supertest";
import { hashSmall } from "../../dir/src/utils/smalID.js";

describe("DB connection and queries", () => {
  test("should insert and return a row", async () => {
    const uniqueID = hashSmall("https://google.com", "messageExample");
    const query =
      "INSERT INTO url_shortener (short_url, url_id, original_url) VALUES($1, $2, $3) RETURNING *;";
    const params = [`https://${uniqueID}`, uniqueID, "https://google.com"];
    const result = await safeExecute(query, params);
    expect(result.rows[0].url_id).toBe(uniqueID);
  });

  test("should throw if sql is missing", async () => {
    // @ts-ignore: purposely passing invalid value
    await expect(safeExecute(undefined)).rejects.toThrow();
  });

  test("should throw if any parameter is missing", async () => {
    const uniqueID = hashSmall("https://google.com", "messageExample");
    const query =
      "INSERT INTO url_shortener (short_url, url_id, original_url) VALUES($1, $2, $3) RETURNING *;";
    const params = [`https://${uniqueID}`, uniqueID]; // missing original_url

    await expect(safeExecute(query, params)).rejects.toThrow();
  });

  test("should return empty if table is empty", async () => {
    await safeExecute("DELETE FROM url_shortener");
    const result = await safeExecute("SELECT * FROM url_shortener");
    expect(result.rows).toHaveLength(0);
  });
});
