import { createForm, minLength, required, reset, setValue, SubmitHandler, toCustom, ValidateField } from "@modular-forms/solid"
import { Component, createEffect, createMemo, onCleanup, onMount } from "solid-js";
import { getTaskDetails, getTaskStatus } from "../../utils/queries";
import { useTaskContext } from "../../context/Task";
import { useUserContext } from "../../context/User";
import { createAsync } from "@solidjs/router";
import { TaskStatus } from "../../types/taskStatus";
import { AxiosApi } from "../../services/axiosApi";
import { TaskType } from "../../types/task";
import TextInput from "./TextInput";
import Select from "./Select";
import Checkbox from "./Checkbox";
import FormSubmit from "./FormSubmit";
import toast from "solid-toast";
import refetchData from "../../utils/refetchData";


const taskValidations: Record<string, ValidateField<any>[]> = {
  title: [
    required('Please enter task title.'),
    minLength(3, 'Title must have 3 characters or more.')
  ],
  completed: [
    required('Please specify task completed or not'),
  ],
  archived: [
    required('Please specify task archived or not'),
  ],
  due_date: [
    required('Please enter due date.'),
  ],
  status: [
    required('Please specify task status.'),
  ]
};

const TaskForm: Component = () => {

  const [taskId, setTaskId] = useTaskContext();
  const [user] = useUserContext();

  const taskDetails = createAsync<TaskType | undefined>(async () =>
    taskId() ? getTaskDetails(taskId()) : undefined);

  const taskStatus = createAsync<TaskStatus[] | undefined>(() => getTaskStatus());
  const doneStatusId = createMemo(() => taskStatus()?.find((status) => status.status === "Done")?.id || "");
  const [taskForm, { Form, Field }] = createForm<TaskType>()
  let taskFormModal!: HTMLDivElement;

  createEffect(() => {
    if (taskDetails()) {
      reset(taskForm, { initialValues: taskDetails() });
    }
    if(!taskId()){
      reset(taskForm, { initialValues: {} });
    }
  })

  onMount(() => {
    const closeTaskForm = () => {
      setTaskId("")
    };
    taskFormModal?.addEventListener("hidden.bs.modal", closeTaskForm);
    onCleanup(() => {
      taskFormModal?.removeEventListener("hidden.bs.modal", closeTaskForm);
    });
  });


  const handleSubmit: SubmitHandler<TaskType> = async (props: TaskType) => {
    const taskData = { ...props, created_by: user()?.id, due_date: new Date(props.due_date).toISOString() }
    try {
      let result;
      if (taskId()) {
        result = await AxiosApi.put(`/tasks/${taskId()}`, taskData);
      } else {
        result = await AxiosApi.post("/tasks", taskData);
      }
      refetchData("userTasks");
      toast.success(result.data.message, { duration: 3500, position: "bottom-right", className: "mb-4 me-4" });
      window.bootstrap.Modal.getOrCreateInstance(taskFormModal).toggle()
    } catch (error: any) {
      console.error("Task submission failed:", error.response?.data?.error);
      toast.error(error.response?.data?.error || "An error occurred while submitting the task.", { duration: 3500, position: "bottom-right", className: "mb-4 me-4" });
    }
  }
  
  return (
    <div>
      <div class="modal modal-blur fade" id="task-form" tabindex="-1" role="dialog" aria-hidden="true" ref={taskFormModal}>
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{taskId() ? "Update Task" : "Create New Task"}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <Form onSubmit={handleSubmit}>
              <div class="modal-body">
                <div class="row">
                  <div class="col-lg-6 mb-3">
                    <Field name="title" validate={taskValidations.title} >
                      {(field, props) => (
                        <TextInput
                          {...props}
                          formElement="input"
                          value={field.value}
                          error={field.error}
                          type="text"
                          label="Title"
                          placeholder="Task Title"
                        />
                      )}
                    </Field>
                  </div>
                  <div class="col-lg-6 mb-3 my-auto mb-4 d-flex justify-content-between pe-6">
                    <Field name="completed" type="boolean"
                      transform={toCustom(
                        (value, event) => {
                          if (value) {
                            setValue(taskForm, "status_id", doneStatusId())
                          } else {
                            reset(taskForm, "status_id", {initialValue: ''})
                          }
                          return value
                        },
                        { on: 'input' }
                      )}
                    >
                      {(field, props) => (
                        <Checkbox
                          {...props}
                          checked={field.value}
                          error={field.error}
                          label="Completed"
                        />
                      )}
                    </Field>
                    <Field name="archived" type="boolean">
                      {(field, props) => (
                        <Checkbox
                          {...props}
                          checked={field.value}
                          error={field.error}
                          label="Archived"
                        />
                      )}
                    </Field>
                  </div>
                  <div class="col-lg-6 mb-3">
                    <Field name="due_date" validate={taskValidations.due_date} >
                      {(field, props) => (
                        <TextInput
                          {...props}
                          formElement="input"
                          value={field.value}
                          error={field.error}
                          type="date"
                          label="Due Date"
                        />
                      )}
                    </Field>
                  </div>
                  <div class="col-lg-6 mb-3">
                    <Field name="status_id" validate={taskValidations.status}
                      transform={toCustom(
                        (value, event) => {
                          if (value === doneStatusId()) {
                            setValue(taskForm, "completed", true)
                          } else {
                            setValue(taskForm, "completed", false)
                          }
                          return value
                        },
                        { on: 'input' }
                      )}
                    >
                      {(field, props) => (
                        <Select
                          {...props}
                          value={field.value}
                          error={field.error}
                          label="Status"
                          options={taskStatus()?.map((status) => ({ label: status.status, value: status.id })) || []}
                          placeholder="Status"
                        />
                      )}
                    </Field>
                  </div>
                  <div class="col-lg-12 mb-3">
                    <Field name="description">
                      {(field, props) => (
                        <TextInput
                          {...props}
                          formElement="textarea"
                          value={field.value}
                          error={field.error}
                          label="Description"
                          row="4"
                        />
                      )}
                    </Field>
                  </div>
                </div>
              </div>
              <FormSubmit formName={taskId() ? "Update" : "Add"} of={taskForm} isSubmitting={taskForm.submitting} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TaskForm