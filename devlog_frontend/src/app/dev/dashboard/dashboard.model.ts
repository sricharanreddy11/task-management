export interface TaskCountData {
    "all_tasks": number,
    "completed_tasks": number,
    "high_priority_open_tasks": number,
    "todo_tasks": number
}

export interface TaskGraphData {
    "completions_per_day": any,
    "tasks_added_per_day": any,
    "tasks_due_next_7_days": any
}
