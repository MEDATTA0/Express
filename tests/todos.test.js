import request from "supertest";
import app from "../index.js";

describe("POST /todos", () => {
  it("should create a new todo and return it with a 201 status", async () => {
    const newTodo1 = {
      title: "Learn Jest",
      todo_description: "Understand testing basics",
    };
    const newTodo2 = {
      title: "Llakj",
      lkdjfls: "skjflksjf",
    };

    const newTodo3 = {
      title: "",
      todo_description: "faire des jest test",
      is_completed: "true",
    };

    const newTodo4 = {
      title: "Mener",
      todo_description: "faire des jest test",
      is_completed: "adfd",
    };
    let response;
    let random;
    for (let i = 0; i < 100; i++) {
      random = Math.floor(Math.random() * 1000);

      switch (random % 4) {
        case 1:
          response = await request(app).post("/users/1/todos").send(newTodo1);
          break;
        case 2:
          response = await request(app).post("/users/1/todos").send(newTodo2);
          break;
        case 3:
          response = await request(app).post("/users/1/todos").send(newTodo3);
          break;
        case 4:
          response = await request(app).post("/users/1/todos").send(newTodo4);
          break;
        default:
          break;
      }

      if (response.status === 201) {
        expect(response.body).toHaveProperty("status", "success");
        expect(response.body).toHaveProperty("data");
      } else {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("status", "failure");
      }
    }
  });
});

describe("GET /todos", () => {
  it("should get users' todos", async () => {
    const response = await request(app).get("/users/1/todos").expect(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GET /allTodos", () => {
  it("should get all todos", async () => {
    const response = await request(app)
      .get("/users/1/todos/allTodos")
      .expect(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GET /users/:userId/todos/:todoId", () => {
  it(" should get todo with todoId", async () => {
    let response;
    for (let i = 1; i < 100; i++) {
      let random = Math.floor(Math.random() * 1000);
      response = await request(app).get(`/users/1/todos/${random}`);
      if (response.status === 200) {
        expect(response.body).toHaveProperty("status", "success");
        expect(response.body).toHaveProperty("data");
      } else {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("status", "failure");
      }
    }
  });
});

describe("PATCH /users/:userId/todos/:todoId", () => {
  it(" should update and get todo with todoId", async () => {
    const todo1 = {
      alkd: "lakdlkjf",
      addsfs: "aldjkafjoiwuoiqw",
      alkdjkd: "ioqueiouojdffksdjlajd",
    };
    const todo2 = {
      title: "aller à l'école",
      todo_description: "faire des jest test",
      is_completed: "sdfas",
    };
    const todo3 = {
      title: "",
      todo_description: "faire des jest test",
      is_completed: "true",
    };
    const todo4 = {
      title: "aller à l'école",
      todo_description: "faire des jest test",
      is_completed: "true",
    };

    let response;
    let random;
    for (let i = 1; i < 100; i++) {
      random = Math.floor(Math.random() * 1000);
      switch (random % 4) {
        case 1:
          response = await request(app)
            .patch(`/users/1/todos/${random}`)
            .send(todo1);
          break;
        case 2:
          response = await request(app)
            .patch(`/users/1/todos/${random}`)
            .send(todo2);
        case 3:
          response = await request(app)
            .patch(`/users/1/todos/${random}`)
            .send(todo3);
        case 4:
          response = await request(app)
            .patch(`/users/1/todos/${random}`)
            .send(todo4);
      }

      if (response.status === 200) {
        expect(response.body).toHaveProperty("status", "success");
        expect(response.body).toHaveProperty("data");
      } else if (response.status === 404) {
        expect(response.body).toHaveProperty("status", "failure");
      } else {
        // it("\n....Oops ! Bad request");
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("status", "failure");
      }
    }
  });
});

describe("DELETE /users/:userId/todos/:todoId", () => {
  it(" should delete todo with todoId", async () => {
    let response;
    for (let i = 1; i < 100; i++) {
      let random = Math.floor(Math.random() * 1000);
      response = await request(app).delete(`/users/1/todos/${random}`);

      if (response.status === 200) {
        expect(response.body).toHaveProperty("status", "success");
        expect(response.body).toHaveProperty("id");
      } else {
        // it("\n...Oops ! Todo Not found");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("status", "failure");
      }
    }
  });
});
