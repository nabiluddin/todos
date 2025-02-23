import toast from "solid-toast";
import { AxiosApi } from "../../services/axiosApi";
import refetchData from "../../utils/refetchData";
import { useTaskContext } from "../../context/Task";

const DeleteConfirmation = () => {
  const [taskId, setTaskId] = useTaskContext();
  
  const deleteTask = async () => {
    try {
      const result = await AxiosApi.delete(`/tasks/${taskId()}`);
      setTaskId("")
      refetchData("userTasks")
      toast.success(result.data.message, {duration: 3500, position: "bottom-right", className: "mb-4 me-4"});
    } catch (error: any) {
      console.error("Task deletion failed:", error.response?.data?.error);
      toast.error(error.response?.data?.error || "An error occurred while deleting the task.", {duration: 3500, position: "bottom-right", className: "mb-4 me-4"});
    }
  }
  return (
    <div class="modal modal-blur fade" id="delete-confirmation" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-title">Are you sure?</div>
            <div>If you delete, you will lose this todo.</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-link link-secondary me-auto" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={deleteTask}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeleteConfirmation