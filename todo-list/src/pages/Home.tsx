import { Component, createEffect, createMemo, createSignal, Show } from "solid-js";
import { IconCopyCheckFilled, IconLayoutKanbanFilled, IconMoon, IconPlus, IconSun, IconUserFilled } from "@tabler/icons-solidjs";
import { A, createAsync } from "@solidjs/router";
import { useUserContext } from "../context/User";
import { TaskType } from "../types/task";
import { TaskContextProvider } from "../context/Task";
import { getUserTasks } from "../utils/queries";
import { switchTheme } from "../utils/switchTheme";
import { ArchivedTasks, DeleteConfirmation, Loading, Logout, StatusColumn, TaskForm } from "../components";

type TaskState = {
  archived: TaskType[];
  nonArchived: TaskType[];
};

const HomeComponent: Component = () => {
  const userTasksData = createAsync<TaskType[] | undefined>(() => getUserTasks());
  const [user] = useUserContext();
  const [userTasks, setUserTasks] = createSignal<TaskState>({ archived: [], nonArchived: [] });
  const [sortByTasks, setSortBy] = createSignal("due_date");

  const splitTasks = createMemo(() => {
    const tasks = userTasksData();
    if (!tasks) return { archived: [], nonArchived: [] };

    return tasks.reduce(
      (result: { archived: TaskType[], nonArchived: TaskType[] }, task) => {
        task.archived ? result.archived.push(task) : result.nonArchived.push(task);
        return result;
      },
      { archived: [], nonArchived: [] }
    );
  });

  const sortTasks = (tasks: TaskType[], field: string) => {
    return tasks.sort((a, b) => {
      if (field === "title") {
        return a.title.localeCompare(b.title);
      } else if (field === "due_date") {
        const dateDiff = Date.parse(a.due_date) - Date.parse(b.due_date);
        return dateDiff === 0 ? a.title.localeCompare(b.title) : dateDiff;
      }
      return 0;
    });
  };

  createEffect(() => {
    const { archived, nonArchived } = splitTasks();
    setUserTasks({
      archived: sortTasks(archived, sortByTasks()),
      nonArchived: sortTasks(nonArchived, sortByTasks())
    });
  });

  return (
    <main class="">
      <div class="page">
        <header class="navbar navbar-expand-md d-print-none">
          <div class="container-xl">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-menu"
              aria-controls="navbar-menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
              <A href="/" class="d-flex justify-content-center align-items-center gap-1">
                <span><img src="/src/assets/images/logo.svg" width="28" alt="logo" /></span>
                <span><h1 class="mt-3 text-primary">Todos</h1></span>
              </A>
            </h1>
            <div class="navbar-nav flex-row order-md-last  ">
              <div class="d-none d-md-flex">
                <button
                  onClick={() => switchTheme()}
                  class="nav-link px-0 hide-theme-dark"
                  title="Enable dark mode"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                >
                  <IconMoon stroke="1" />
                </button>
                <button
                  onClick={() => switchTheme()}
                  class="nav-link px-0 hide-theme-light"
                  title="Enable light mode"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                >
                  <IconSun stroke="1" />
                </button>
              </div>
              <div class="nav-item d-none d-md-flex mx-2">
                <h3 class="my-auto avatar px-3 text-info text-capitalize w-100">
                  <IconUserFilled color="red" />
                  {user()?.username?.split(" ")[0]}
                </h3>
              </div>
              <div class="nav-item d-none d-md-flex ms-4">
                <div class="btn-list">
                  <Logout />
                </div>
              </div>
            </div>
          </div>
        </header>
        <header class="navbar-expand-md d-flex d-md-none">
          <div class="collapse navbar-collapse" id="navbar-menu">
            <div class="navbar">
              <div class="container-xl">
                <ul class="navbar-nav">
                  <li class="nav-item mx-auto my-2">
                    <button
                      onClick={switchTheme}
                      class="nav-link px-0 hide-theme-dark"
                      title="Enable dark mode"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                    >
                      <IconMoon stroke="1" />
                    </button>
                    <button
                      onClick={switchTheme}
                      class="nav-link px-0 hide-theme-light"
                      title="Enable light mode"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                    >
                      <IconSun stroke="1" />
                    </button>
                  </li>
                  <li class="nav-item me-3 ms-4">
                    <h3 class="mx-auto mb-1 avatar px-3 text-info text-capitalize w-50">
                      <IconUserFilled color="red" />
                      {user()?.username?.split(" ")[0]}
                    </h3>
                  </li>
                  <li class="nav-item my-3 w-50 mx-auto">
                    <div class="btn-list">
                      <Logout />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <div class="page-wrapper">
          <div class="page-header d-print-none">
            <div class="container-xl">
              <div class="row g-2 align-align-items-center mt-2">
                <div class="col">
                  <h2 class="page-title">Todos List</h2>
                </div>
                <div class="col-auto ms-auto d-print-none">
                  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#task-form">
                    <IconPlus />
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="page-body">
            <div class="container-xl">
              <div class="row ">
                <div class="card">
                  <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" data-bs-toggle="tabs">
                      <li class="nav-item">
                        <a href="#tab-tasks" class="nav-link gap-1 active" data-bs-toggle="tab"><IconLayoutKanbanFilled  stroke="1" size={20} /> Tasks</a>
                      </li>
                      <li class="nav-item">
                        <a href="#tab-archived" class="nav-link gap-1" data-bs-toggle="tab"><IconCopyCheckFilled stroke="1" size={20} /> Archived</a>
                      </li>
                      <li class="nav-item ms-auto text-secondary d-flex gap-2 justify-content-end gap-0 pb-1">
                        <label class="form-label my-auto fs-4 d-none d-md-flex" for="sortByTasks" >Sort By:</label>
                        <select
                          class="form-control w-100"
                          id="sortByTasks"
                          onChange={(e) => setSortBy(e.target.value)}
                          value={sortByTasks()}
                        >
                          <option value="due_date">Due Date</option>
                          <option value="title">Title</option>
                        </select>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="tab-pane active show" id="tab-tasks">
                        <div class="row">
                          <Show when={userTasks()?.nonArchived} fallback={<Loading />}>
                            <StatusColumn statusType="Todo" tasks={userTasks()?.nonArchived} />
                            <StatusColumn statusType="In Progress" tasks={userTasks()?.nonArchived} />
                            <StatusColumn statusType="Done" tasks={userTasks()?.nonArchived} />
                          </Show>
                        </div>
                      </div>
                      <div class="tab-pane" id="tab-archived">
                        <Show when={userTasks()?.archived} fallback={<Loading />}>
                          <ArchivedTasks statusType="Archived" tasks={userTasks()?.archived} />
                        </Show>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TaskForm />
            <DeleteConfirmation />
          </div>
        </div>
      </div>
    </main>
  );
}

const Home: Component = () => (
  <TaskContextProvider>
    <HomeComponent />
  </TaskContextProvider>
)

export default Home
