import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  complete: boolean;
  createdAt: Date;
};
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
// const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");

const tasks: Task[] = loadTask();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    complete: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  addListItem(newTask);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.complete;
  checkbox.addEventListener("change", () => {
    task.complete = checkbox.checked;
    saveTask();
  });
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTask() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTask(): Task[] {
  // return JSON.parse(localStorage.getItem('TASKS'))
  const taskJson = localStorage.getItem("TASKS");
  if (taskJson == null) return [];
  return JSON.parse(taskJson);
}
