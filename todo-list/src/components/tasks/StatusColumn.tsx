import { Component } from "solid-js";
import TaskCard from "./TaskCard";
import { TaskType } from "../../types/task";

const StatusColumn: Component<{ statusType: string, tasks: TaskType[] | undefined }> = (props) => {
  return (
    <section class="col-12 col-md-6 col-lg">
      <h2 class="mb-3">{props.statusType}</h2>
      <div class="mb-4">
        <div class="row row-cards">
          <div class="col-12">
            {props.tasks?.map((task: TaskType) => (
              (task.status?.status === props.statusType) &&
              <TaskCard id={task.id} title={task.title} description={task.description} dueDate={task.due_date} status={task.status.status} archived={task.archived}  completed={task.completed}  />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default StatusColumn;