import { Component, createEffect } from "solid-js"
import TaskCard from "./TaskCard"
import { TaskType } from "../../types/task"

const ArchivedTasks: Component<{ statusType: string, tasks: TaskType[] | undefined }> = (props) => {
  return (
    <section class="row row-cards">
      {props.tasks?.map((task: TaskType) => (
        <div class="col-sm-6 col-lg-3">
          <TaskCard id={task.id} title={task.title} description={task.description} dueDate={task.due_date} status={task.status?.status} archived={task.archived}  completed={task.completed}  />
        </div>
      ))}
    </section>
  )
}
export default ArchivedTasks
