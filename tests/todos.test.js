import request from "supertest";
import app from "../app.js";
import { response } from "express";

describe("POST /api/v1/users/1/todos", () => {
  it("should create a new todo and return it with a 201 status", async () => {
    const newTodo0 = {
      title: "Jouer",
      is_completed: "true",
    };
    const newTodo1 = {
      title: "Learn Jest",
      todo_description: "Understand testing basics",
    };
    let response;
    for (let i = 0; i <= 1; i++) {
      switch (i) {
        case 0:
          response = await request(app)
            .post("/api/v1/users/1/todos")
            .send(newTodo0);
          break;
        case 1:
          response = await request(app)
            .post("/api/v1/users/1/todos")
            .send(newTodo1);
          break;
      }
      expect(response.status === 201);
      expect(response.body).toHaveProperty("status", "success");
      expect(response.body).toHaveProperty("data");
    }
  });

  it(" should deny because of wrong fields in the body of request and return 400", async () => {
    const newTodo2 = {
      title: "Llakj",
      lkdjfls: "skjflksjf",
    };
    const response = await request(app)
      .post("/api/v1/users/1/todos")
      .send(newTodo2);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "fields not allowed !");
  });

  it(" should deny because the body of the request is empty and return 400", async () => {
    const newTodo3 = {};
    const response = await request(app)
      .post("/api/v1/users/1/todos")
      .send(newTodo3);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "no field entered");
  });

  it(" should deny because the title is empty and return 400", async () => {
    const newTodo4 = {
      title: "",
    };
    const response = await request(app)
      .post("/api/v1/users/1/todos")
      .send(newTodo4);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "please enter a title");
  });

  it(" should deny because the field is_completed is not a boolean", async () => {
    const newTodo5 = {
      title: "Mener",
      todo_description: "faire des jest test",
      is_completed: "adfd",
    };
    const response = await request(app)
      .post("/api/v1/users/1/todos")
      .send(newTodo5);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty(
      "message",
      "is_completed must be boolean"
    );
  });
});

describe("GET /api/v1/users/1/todos", () => {
  it(" should get all todos", async () => {
    const response = await request(app)
      .get("/api/v1/users/1/todos/allTodos")
      .expect(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("message", "todos found");
    expect(response.body).toHaveProperty("data");
  });

  // it(" shouldn't get anything because there is no todo in the database", async () => {
  //   const response = await request(app)
  //     .get("/api/v1/users/1/todos/allTodos")
  //     .expect(404);
  //   expect(response.body).toHaveProperty("status", "failure");
  //   expect(response.body).toHaveProperty("message", "no todo found");
  // });

  it(" should get user's todos", async () => {
    const response = await request(app)
      .get("/api/v1/users/1/todos")
      .expect(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("message", "todos found");
    expect(response.body).toHaveProperty("data");
  });

  // it(" shouldn't get anything because user doesn't have any todo", async () => {
  //   const response = await request(app)
  //     .get("/api/v1/users/2/todos")
  //     .expect(404);
  //   expect(response.body).toHaveProperty("status", "failure");
  //   expect(response.body).toHaveProperty("message", "no todo found");
  // });

  it(" should get user's todo that have todoId", async () => {
    const response = await request(app)
      .get("/api/v1/users/1/todos/5")
      .expect(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("message", "todo found");
    expect(response.body).toHaveProperty("data");
  });

  it(" should be empty because the todoId doesn't exist", async () => {
    let random = Math.floor(Math.random() * 1000000);
    const response = await request(app)
      .get(`/api/v1/users/1/todos/1000`)
      .expect(404);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "no todo found");
  });

  it(" shouldn't reach database because todoId is not a number", async () => {
    const response = await request(app)
      .get("/api/v1/users/1/todos/asds")
      .expect(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "bad todo id");
  });
});

describe("UPDATE /api/v1/users/1/todos/todoId", () => {
  it(" should update the todo that has todoId", async () => {
    const todo = {
      todo_description: "J'y suis presque",
      is_completed: "true",
    };
    const response = await request(app)
      .patch("/api/v1/users/1/todos/5")
      .send(todo);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty(
      "message",
      "todo updated successfully"
    );
    expect(response.body).toHaveProperty("data");
  });

  it(" should deny because todoId is not a number", async () => {
    const response = await request(app).patch("/api/v1/users/1/todos/asfsd");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "bad todo id");
    expect(response.body).toHaveProperty("id");
  });

  it(" should deny because the request body is empty", async () => {
    const response = await request(app).patch("/api/v1/users/1/todos/10");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "no field entered");
  });
  it(" should deny because the title field is empty", async () => {
    const response = await request(app).patch("/api/v1/users/1/todos/10").send({
      title: "",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "please enter a title");
  });

  it(" should deny because of wrong fields in the request body", async () => {
    const todo = {
      title: "Aller a la maison",
      lkdsf: "Partir",
      dkweow: "akjlsd",
    };
    const response = await request(app)
      .patch("/api/v1/users/1/todos/10")
      .send(todo);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "fields not allowed");
  });

  it(" should deny because is_completed must be a boolean", async () => {
    const todo = {
      title: "ls /",
      is_completed: "nottrue",
    };
    const response = await request(app)
      .patch("/api/v1/users/1/todos/20")
      .send(todo);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty(
      "message",
      "is_completed must be boolean"
    );
  });
});

describe("DELETE /api/v1/users/1/todos", () => {
  it(" should delete todo that has todoId", async () => {
    const response = await request(app).delete("/api/v1/users/1/todos/49");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty(
      "message",
      "todo deleted successfully"
    );
    expect(response.body).toHaveProperty("id");
  });

  it(" shoudn't delete todo because todoId doesn't exist", async () => {
    const response = await request(app).delete("/api/v1/users/1/todos/200");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "todo not found");
    expect(response.body).toHaveProperty("id");
  });

  it(" shouldn't reach the database because todoId is not a number", async () => {
    const response = await request(app).delete("/api/v1/users/1/todos/ald");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "failure");
    expect(response.body).toHaveProperty("message", "bad todo id");
    expect(response.body).toHaveProperty("id");
  });
});

// describe("GET /allTodos", () => {
//   it("should get all todos", async () => {
//     const response = await request(app)
//       .get("/api/v1/users/1/todos/allTodos")
//       .expect(200);
//     expect(response.body).toHaveProperty("data");
//   });
// });

// describe("GET /users/:userId/todos/:todoId", () => {
//   it(" should get todo with todoId", async () => {
//     let response;
//     for (let i = 1; i < 100; i++) {
//       let random = Math.floor(Math.random() * 1000);
//       response = await request(app).get(`/api/v1/users/1/todos/${random}`);
//       if (response.status === 200) {
//         expect(response.body).toHaveProperty("status", "success");
//         expect(response.body).toHaveProperty("data");
//       } else {
//         expect(response.status).toBe(404);
//         expect(response.body).toHaveProperty("status", "failure");
//       }
//     }
//   });
// });

// describe("PATCH /users/:userId/todos/:todoId", () => {
//   it(" should update and get todo with todoId", async () => {
//     const todo1 = {
//       alkd: "lakdlkjf",
//       addsfs: "aldjkafjoiwuoiqw",
//       alkdjkd: "ioqueiouojdffksdjlajd",
//     };
//     const todo2 = {
//       title: "aller à l'école",
//       todo_description: "faire des jest test",
//       is_completed: "sdfas",
//     };
//     const todo3 = {
//       title: "",
//       todo_description: "faire des jest test",
//       is_completed: "true",
//     };
//     const todo4 = {
//       title: "aller à l'école",
//       todo_description: "faire des jest test",
//       is_completed: "true",
//     };

//     let response;
//     for (let i = 1; i < 10; i++) {
//       let random = Math.floor(Math.random() * 1000);
//       //To test different cases
//       switch (random % 4) {
//         case 1:
//           response = await request(app)
//             .patch(`/api/v1/users/1/todos/${random}`)
//             .send(todo1);
//           break;
//         case 2:
//           response = await request(app)
//             .patch(`/api/v1/users/1/todos/${random}`)
//             .send(todo2);
//         case 3:
//           response = await request(app)
//             .patch(`/api/v1/users/1/todos/${random}`)
//             .send(todo3);
//         case 4:
//           response = await request(app)
//             .patch(`/api/v1/users/1/todos/${random}`)
//             .send(todo4);
//       }

//       if (response.statusCode === 200) {
//         expect(response.body).toHaveProperty("status", "success");
//         expect(response.body).toHaveProperty("data");
//       } else if (response.status === 404) {
//         expect(response.body).toHaveProperty("status", "failure");
//       } else {
//         expect(response.status).toBe(400);
//         expect(response.body).toHaveProperty("status", "failure");
//       }
//     }
//   }, 10000);
// });

// describe("DELETE /users/:userId/todos/:todoId", () => {
//   it(" should delete todo with todoId", async () => {
//     const id = "asl";
//     let response;
//     for (let i = 1; i < 100; i++) {
//       switch (i % 2) {
//         case 0:
//           let random = Math.floor(Math.random() * 1000);
//           response = await request(app).delete(
//             `/api/v1/users/1/todos/${random}`
//           );
//           break;
//         case 1:
//           response = await request(app).delete(`/api/v1/users/1/todos/${id}`);
//           break;
//         default:
//           break;
//       }

//       if (response.status === 200) {
//         expect(response.body).toHaveProperty("status", "success");
//         expect(response.body).toHaveProperty("id");
//       } else if (response.status === 404) {
//         expect(response.body).toHaveProperty("status", "failure");
//       } else {
//         expect(response.status).toBe(400);
//         expect(response.body).toHaveProperty("status", "failure");
//       }
//     }
//   });
// });
