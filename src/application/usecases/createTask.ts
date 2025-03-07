import { Task } from "../domain/models/Task";
import { ITaskRepository } from "../../interfaces/database/TaskRepository";

export class CreateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(title: string, description: string): Promise<Task> {
    const task = new Task(title, description);
    return await this.taskRepository.persist(task);
  }
}
