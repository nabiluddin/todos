import { Component, createMemo } from "solid-js";
import { IconArchive, IconArchiveFilled, IconCircleCheckFilled, IconCircleDashedCheck, IconEdit, IconStar, IconTrash } from '@tabler/icons-solidjs';
import { createForm, reset, setValue, toCustom } from "@modular-forms/solid";
import { useTaskContext } from "../../context/Task";
import { A, createAsync } from "@solidjs/router";
import { AxiosApi } from "../../services/axiosApi";
import { getTaskStatus } from "../../utils/queries";
import { TaskStatus } from "../../types/taskStatus";
import { TaskType } from "../../types/task";
import toast from "solid-toast";
import refetchData from "../../utils/refetchData";
import TextInput from "../form/TextInput";
import Select from "../form/Select";
import Checkbox from "../form/Checkbox";

type CardType = {
  id: string,
  title: string,
  description?: string,
  dueDate: string,
  status?: string,
  archived?: boolean,
  completed?: boolean
}


const TaskCard: Component<CardType> = (props) => {
  const [taskId, setTaskId] = useTaskContext();
  const [taskCard, { Form, Field }] = createForm<TaskType>();
  const taskStatus = createAsync<TaskStatus[] | undefined>(() => getTaskStatus());
  const doneStatusId = createMemo(() => taskStatus()?.find((status) => status.status === "Done")?.id || "");

  const readableDate = createMemo(() =>
    new Date(props.dueDate).toLocaleString("en-us", { day: "2-digit", month: "short" })
  );

  const isDueDateNear = createMemo(() => {
    const dueDate = new Date(props.dueDate);
    const today = new Date();

    // Get only the date part (ignore time)
    const dueDay = dueDate.getDate();
    const todayDay = today.getDate();

    return dueDay === todayDay || dueDay === todayDay - 1;
  });

  const handleInputChange = async (taskId: string, data: { [key: string]: string | boolean | undefined }, refetch?: boolean) => {
    try {
      if (!data.completed && data.status_id === doneStatusId()) return;

      if (!Object.keys(data).length) {
        refetchData("userTasks");
        return;
      }
      if (data.due_date) data.due_date = new Date(data.due_date as string).toISOString();
      const result = await AxiosApi.put(`/tasks/${taskId}`, data);
      if ("archived" in data) {
        toast.success(
          data.archived ? "Task archived!" : "Task unarchived!",
          { duration: 3500, position: "bottom-right", className: "mb-4 me-4" }
        );
      } else if (!("title" in data || "description" in data)) {
        toast.success(result.data.message, { duration: 3500, position: "bottom-right", className: "mb-4 me-4" });
      }
      if (refetch) refetchData("userTasks");
    } catch (error: any) {
      console.error("Task submission failed:", error.response?.data);
      toast.error(error.response?.data?.error || "An error occurred while submitting the task.", { duration: 3500, position: "bottom-right", className: "mb-4 me-4" });
    }
  }

  return (
    <div
      class="card card-sm my-4">
      <div class="card-status-top bg-blue"></div>
      {props?.status === "Done" && <div class="ribbon ribbon-top ribbon-bookmark bg-yellow"><IconStar /></div>}

      <div class="card-body ps-3" onClick={() => setTaskId(props.id)}>
        <Form>
          <div class="d-flex justify-content-between">
            <h3 class="mb-0 d-flex w-100">
              <div class="col-auto text-green cursor-pointer my-auto me-1" data-bs-toggle="modal" data-bs-target="#task-form">
                <IconEdit size={22} />
              </div>
              <Field name="title">
                {(field, fieldProps) => (
                  <TextInput
                    {...fieldProps}
                    formElement="input"
                    value={props.title}
                    error={field.error}
                    type="text"
                    placeholder="Task Title"
                    class="p-0 m-0 bg-none card-title border-0 shadow-none"
                    superClasses="w-75"
                    onInput={(e) => handleInputChange(props.id, { [field.name]: (e.target as HTMLInputElement).value }, false)}
                  />
                )}
              </Field>
            </h3>
            {
              isDueDateNear() && props?.status !== "Done" && (
                <A href="" title="Finish soon" class="d-flex align-items-center">
                  <span class="status-indicator status-warning status-indicator-animated">
                    <span class="status-indicator-circle"></span>
                    <span class="status-indicator-circle"></span>
                    <span class="status-indicator-circle"></span>
                  </span>
                </A>
              )}
          </div>

          <Field name="description">
            {(field, fieldProps) => (
              <TextInput
                {...fieldProps}
                formElement="input"
                value={props.description}
                error={field.error}
                class="px-0 pt-0 pb-2 m-0 text-secondary text-sm mb-0 bg-none border-0 resize-none shadow-none"
                onInput={(e) => handleInputChange(props.id, { [field.name]: (e.target as HTMLInputElement).value }, false)}
              />
            )}
          </Field>

          <div class="row">
            <div class="col gap-3 d-flex">
              <Field name="status_id">
                {(field, selectProps) => (
                  <Select
                    {...selectProps}
                    value={props.status}
                    error={field.error}
                    options={taskStatus()?.map((status) => ({ label: status.status, value: status.id })) || []}
                    placeholder="⏳"
                    class="bg-none border-0 p-0 m-0 cursor-pointer shadow-none"
                    onChange={(e) => handleInputChange(props.id, { [field.name]: (e.target as HTMLSelectElement).value, completed: field.value === doneStatusId() }, true)}
                  />
                )}
              </Field>
            </div>

            <div class="col-auto text-info fw-bold position-relative d-flex align-items-center gap-4 pt-1">
              <span class="datepicker-toggle-button position-absolute left-0 top-0 pb-4 w-100 h-100"></span>
              <Field name="due_date">
                {(field, inputProps) => (
                  <TextInput
                    {...inputProps}
                    formElement="input"
                    value={props.dueDate}
                    error={field.error}
                    type="date"
                    class="datepicker-input position-absolute left-0 top-0 pb-4 w-100 h-100 opacity-0"
                    onChange={(e) => handleInputChange(props.id, { [field.name]: (e.target as HTMLInputElement).value }, true)}
                  />
                )}
              </Field>
              <span>{readableDate()}</span>
            </div>

            <span class="col-auto text-green cursor-pointer" onClick={(e) => handleInputChange(props.id, { status_id: doneStatusId(), completed: !props.completed }, true)}>
              <Field name="completed" type="boolean"
                transform={toCustom(
                  (value, event) => {
                    if (value) {
                      setValue(taskCard, "status_id", doneStatusId())
                    } else {
                      reset(taskCard, "status_id", { initialValue: '' })
                    }
                    return value
                  },
                  { on: 'input' }
                )}
              >
                {(field, checkboxProps) => (
                  <>
                    <Checkbox
                      {...checkboxProps}
                      checked={props.completed}
                      error={field.error}
                      class="d-none"
                    />
                    {
                      field.value ?
                        <IconCircleCheckFilled size={22} />
                        :
                        <IconCircleDashedCheck size={22} />
                    }
                  </>
                )}
              </Field>
            </span>

            <span class="col-auto text-teal cursor-pointer" onClick={(e) => handleInputChange(props.id, { archived: !props.archived }, true)}>
              <Field name="archived" type="boolean">
                {(field, checkboxProps) => {
                  return (
                    <>
                      <Checkbox
                        {...checkboxProps}
                        checked={props.archived}
                        error={field.error}
                        class="d-none"
                      />
                      {
                        field.value ?
                          <IconArchiveFilled size={22} />
                          :
                          <IconArchive size={22} />
                      }
                    </>
                  )
                }}
              </Field>
            </span>

            <div class="col-auto text-danger cursor-pointer" data-bs-toggle="modal" data-bs-target="#delete-confirmation">
              <IconTrash size={22} />
            </div>
          </div>
        </Form>
      </div>
    </div>

  )
}

export default TaskCard
