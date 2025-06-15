import request from "supertest";
import app from "../../dir/src/app.js";

describe("give on id url GET /:short_url", () => {
  test("case is successful", async () => {
    const response = await request(app).get("/Joel_Reyes-4800cbe8");
    expect([303, 300, 200, 302]).toContain(response.statusCode);
  });

  test("case is Error", async () => {
    const response = await request(app).get("/Juan_Pablo");
    expect(200).toEqual(response.statusCode);
  });
});

describe("Not given string url and string name url short", () => {
  test("Case is Error not body element", async () => {
    const response = await request(app).post("/api/v1/short");
    expect([400, 404, 500]).toContain(response.statusCode);
  });

  test("Case is Error , 1 params", async () => {
    const response = await request(app).post("/api/v1/short").send({
      name: "eudy_joel",
    });
    expect(200).toEqual(response.statusCode);
    console.log(response.text);
  });
});
