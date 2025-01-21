export type TaskType = {
  id: string;
  created_at: Date | null;
  modified_at: Date | null;
  title: string;
  description: string;
  completed: boolean;
  archived: boolean;
  due_date: string;
  status_id: string;
  created_by: string;
  status: { status: string } | null
}