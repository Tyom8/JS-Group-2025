import fs from "fs";
import http from "http";
import path from "path";
import {
  IAddNewProject,
  IAddTaskbarForm,
  IAddUser,
  ILoginForm,
} from "../types";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const USERS_FILE_PATH = path.join(__dirname, process.env.PATH_TO_USERS_DATA || "");
const PROJECTS_FILE_PATH = path.join(__dirname, process.env.PATH_TO_PROJECTS_DATA || "");
const TASKBARS_FILE_PATH = path.join(__dirname, process.env.PATH_TO_TASKBARS_DATA || "");
const AUTHORIZED_USERS_FILE_PATH = path.join(__dirname, process.env.PATH_TO_AUTH_USERS_DATA || "");

const server = http.createServer((req, res) => {
  switch (req.url) {
    case process.env.AUTH_USERS:
      if (req.method === "POST") {
        let authUsersBody = "";

        req.on("data", (chunk) => {
          authUsersBody += chunk.toString();
        });

        req.on("end", () => {
          try {
            const AUTH_USERS_DATA = JSON.parse(authUsersBody);

            const LOGIN = {
              // That is if we did not entered id manially it will generate the random one
              // In that case AUTH_USERS_DATA.id will be undefined / null
              id: AUTH_USERS_DATA.id ?? Date.now(),
              email: AUTH_USERS_DATA.email,
              password: AUTH_USERS_DATA.password,
            };

            const existingSignedInData = fs.existsSync(
              AUTHORIZED_USERS_FILE_PATH
            )
              ? JSON.parse(fs.readFileSync(AUTHORIZED_USERS_FILE_PATH, "utf-8"))
              : [];

            const isDuplicated = existingSignedInData.find(
              (user: ILoginForm) =>
                user.email === LOGIN.email             
            );

            if (isDuplicated) {
              res.writeHead(409, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({
                  errorMessage: "User is already exist with that id",
                })
              );
            }

            existingSignedInData.push(LOGIN);

            fs.writeFileSync(
              AUTHORIZED_USERS_FILE_PATH,
              JSON.stringify(existingSignedInData, null, 2)
            );
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User logged in successfully" }));
          } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ errorMessage: "Failed to login user" }));
          }
        });
      } else if (req.method === "GET") {
        try {
          const GET_AUTH_USERS_DATA = fs.existsSync(AUTHORIZED_USERS_FILE_PATH)
            ? fs.readFileSync(AUTHORIZED_USERS_FILE_PATH, "utf-8")
            : [];

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(GET_AUTH_USERS_DATA);
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ errorMessage: "Failed to get logged in users" })
          );
        }
      } else if (req.method === "PUT") {
        let updatedBody = "";

        req.on("data", (chunk) => {
          updatedBody += chunk.toString();
        });

        req.on("end", () => {
          try {
            const UPDATED_DATA = JSON.parse(updatedBody);

            if (!UPDATED_DATA.id) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({ errorMessage: "User id is not found" })
              );
            }

            const existingData = fs.existsSync(AUTHORIZED_USERS_FILE_PATH)
              ? JSON.parse(fs.readFileSync(AUTHORIZED_USERS_FILE_PATH, "utf-8"))
              : [];

            const index = existingData.findIndex(
              (data: ILoginForm) => data.id === UPDATED_DATA.id
            );

            if (index === -1) {
              res.writeHead(404, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({ errorMessage: "User not found" })
              );
            }

            existingData[index].password = UPDATED_DATA.password;

            fs.writeFileSync(
              AUTHORIZED_USERS_FILE_PATH,
              JSON.stringify(existingData, null, 2)
            );
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ message: "Password updated successfully" })
            );
          } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ errorMessage: "Failed to update the password" })
            );
          }
        });
      }
      break;
    case process.env.USERS:
      if (req.method === "POST") {
        let usersBody = "";
        req.on("data", (chunk) => {
          usersBody += chunk.toString();
        });

        req.on("end", () => {
          try {
            const USERS_DATA = JSON.parse(usersBody);

            const ADD_USER = {
              id: USERS_DATA.id ?? Date.now(),
              firstName: USERS_DATA.firstName,
              lastName: USERS_DATA.lastName,
              email: USERS_DATA.email,
              password: USERS_DATA.password,
              phoneNumber: USERS_DATA.phoneNumber,
              gender: USERS_DATA.gender,
              userImg: USERS_DATA.userImg || "",
            };

            // Checking for existing users
            const existingUsers = fs.existsSync(USERS_FILE_PATH)
              ? JSON.parse(fs.readFileSync(USERS_FILE_PATH, "utf-8"))
              : [];

            const isDuplicated = existingUsers.find(
              (user: IAddUser) => user.id === ADD_USER.id
            );

            if (isDuplicated) {
              res.writeHead(409, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({
                  errorMessage: "User is already exist with that id",
                })
              );
            }

            existingUsers.push(ADD_USER);

            // Saving back to file
            fs.writeFileSync(
              USERS_FILE_PATH,
              JSON.stringify(existingUsers, null, 2)
            );
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User added successfully" }));
          } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ errorMessage: "Cannot add user" }));
          }
        });
      } else if (req.method === "GET") {
        try {
          const GET_USERS_DATA = fs.existsSync(USERS_FILE_PATH)
            ? fs.readFileSync(USERS_FILE_PATH, "utf-8")
            : [];

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(GET_USERS_DATA);
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ errorMessage: "Failed to get users" }));
        }
      }
      break;
    case process.env.PROJECTS:
      if (req.method === "POST") {
        let projectsBody = "";

        req.on("data", (chunk) => {
          projectsBody += chunk.toString();
        });

        req.on("end", () => {
          try {
            const PROJECTS_DATA = JSON.parse(projectsBody);

            const ADD_PROJECT = {
              id: PROJECTS_DATA.id || Date.now(),
              name: PROJECTS_DATA.name,
              description: PROJECTS_DATA.description,
              startDate: PROJECTS_DATA.startDate,
              endDate: PROJECTS_DATA.endDate,
            };

            const existingProjects = fs.existsSync(PROJECTS_FILE_PATH)
              ? JSON.parse(fs.readFileSync(PROJECTS_FILE_PATH, "utf-8"))
              : [];

            const isDuplicated = existingProjects.find(
              (project: IAddNewProject) => project.id === ADD_PROJECT.id
            );

            if (isDuplicated) {
              res.writeHead(409, { "Content-Type": "application/json" });
              return res.end({
                errorMessage: "Project is already exist with that id",
              });
            }

            existingProjects.push(ADD_PROJECT);

            fs.writeFileSync(
              PROJECTS_FILE_PATH,
              JSON.stringify(existingProjects, null, 2)
            );
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Project added successfully" }));
          } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ errorMessage: "Cannot add project" }));
          }
        });
      } else if (req.method === "GET") {
        try {
          const GET_PROJECTS_DATA = fs.existsSync(PROJECTS_FILE_PATH)
            ? fs.readFileSync(PROJECTS_FILE_PATH, "utf-8")
            : [];

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(GET_PROJECTS_DATA);
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end({ errorMessage: "Failed to get projects" });
        }
      } else if (req.method === "PUT") {
        let updatedProjectsBody = "";

        req.on("data", (chunk) => {
          updatedProjectsBody += chunk.toString();
        });

        req.on("end", () => {
          try {
            const UPDATED_PROJECT = JSON.parse(updatedProjectsBody);

            // Checking if user updates with / without id
            if (!UPDATED_PROJECT.id) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({ errorMessage: "Project ID is required" })
              );
            }

            const existingProjects = fs.existsSync(PROJECTS_FILE_PATH)
              ? JSON.parse(fs.readFileSync(PROJECTS_FILE_PATH, "utf-8"))
              : [];

            const projectIndex = existingProjects.findIndex(
              (project: IAddNewProject) => project.id === UPDATED_PROJECT.id
            );

            if (projectIndex === -1) {
              res.writeHead(404, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({ errorMessage: "User not found" })
              );
            }

            // Merging existing project with new values
            existingProjects[projectIndex] = {
              ...existingProjects[projectIndex],
              ...UPDATED_PROJECT,
            };

            fs.writeFileSync(
              PROJECTS_FILE_PATH,
              JSON.stringify(existingProjects, null, 2)
            );
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ message: "Project updated successfully" })
            );
          } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ errorMessage: "Failed to update project" })
            );
          }
        });
      }
      break;
    case process.env.TASKBARS:
      if (req.method === "POST") {
        let taskbarBody = "";

        req.on("data", (chunk) => {
          taskbarBody += chunk.toString();
        });

        req.on("end", () => {
          try {
            const TASKBAR_DATA = JSON.parse(taskbarBody);

            const ADD_TASKBAR = {
              id: TASKBAR_DATA.id ?? Date.now(),
              date: TASKBAR_DATA.date,
              title: TASKBAR_DATA.title,
              image: TASKBAR_DATA.image || "",
              description: TASKBAR_DATA.description,
              category: TASKBAR_DATA.category,
              member: TASKBAR_DATA.member,
              status: TASKBAR_DATA.status,
            };

            const existingTaskbars = fs.existsSync(TASKBARS_FILE_PATH)
              ? JSON.parse(fs.readFileSync(TASKBARS_FILE_PATH, "utf-8"))
              : [];

            const isDuplicated = existingTaskbars.find(
              (taskbar: IAddTaskbarForm) => taskbar.id === ADD_TASKBAR.id
            );

            if (isDuplicated) {
              res.writeHead(500, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({
                  errorMessage: "Taskbar is already exist with that id",
                })
              );
            }

            existingTaskbars.push(ADD_TASKBAR);

            fs.writeFileSync(
              TASKBARS_FILE_PATH,
              JSON.stringify(existingTaskbars, null, 2)
            );
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Taskbar added successfully" }));
          } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ errorMessage: "Failed to add taskbar" }));
          }
        });
      } else if (req.method === "GET") {
        try {
          const GET_TASKBARS_DATA = fs.existsSync(TASKBARS_FILE_PATH)
            ? fs.readFileSync(TASKBARS_FILE_PATH, "utf-8")
            : [];

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(GET_TASKBARS_DATA);
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ errorMessage: "Failed to get taskbars data" })
          );
        }
      } else if (req.method === "PUT") {
        let updatedTaskbarsBody = "";

        req.on("data", (chunk) => {
          updatedTaskbarsBody += chunk.toString();
        });

        req.on("end", () => {
          try {
            const UPDATED_TASKBAR = JSON.parse(updatedTaskbarsBody);

            if (!UPDATED_TASKBAR.id) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(
                JSON.stringify({ errorMessage: "Taskbar id is required" })
              );
            }

            const isExist = fs.existsSync(TASKBARS_FILE_PATH)
              ? JSON.parse(fs.readFileSync(TASKBARS_FILE_PATH, "utf-8"))
              : [];

            const taskbarIndex = isExist.findIndex(
              (taskbar: IAddTaskbarForm) => taskbar.id === UPDATED_TASKBAR.id
            );

            if (taskbarIndex === -1) {
              res.writeHead(404, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ errorMessage: "Taskbar not found" }));
            }

            isExist[taskbarIndex] = {
              ...isExist[taskbarIndex],
              ...UPDATED_TASKBAR,
            };

            fs.writeFileSync(
              TASKBARS_FILE_PATH,
              JSON.stringify(isExist, null, 2)
            );
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Taskbar upated successfully" }));
          } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ errorMessage: "Failed to update taskbar" })
            );
          }
        });
      }
      break;
  }
});

server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
