export interface Task {
    id: number,
    name: string,
    comment: string,
    state: TaskState,
    supervisor_id: number,
    assignee_id: string,
    due_date: Date,
    time_target: boolean,
    location_id: number,
    logo: string,
    image_available: boolean,
    image_number: number,
    time_started: Date,
    time_finished: Date,
    creation_dttm: Date,
    display_name: string

  }

export interface TaskResponse {
  count: number;
  tasks: Task[];
}

export enum TaskState {
  UNASSIGNED = 'UNASSIGNED', //Assign
  ASSIGNED = 'ASSIGNED', //UnAssign
  STARTED = 'STARTED', //
  DONE = 'DONE', //Approve Reject
  APPROVED = 'APPROVED', //Archive
  ARCHIVED = 'ARCHIVED', //
  DELETED = 'DELETED', //
}