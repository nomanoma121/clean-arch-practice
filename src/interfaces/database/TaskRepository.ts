import { Task } from "../../domain/models/Task";
import { ITaskRepository } from "../../interfaces/database/TaskRepository";
import { IDBConnection } from "../../interfaces/database/DBConnection";
import moment from "moment-timezone";

export class TaskRepository extends ITaskRepository {
  private connection: IDBConnection;

  constructor(connection: IDBConnection) {
    super();
    this.connection = connection
  }

  async persist(task: Task): Promise<Task> {
    const result = await this.connection.execute(
      "INSERT INTO tasks (title, description, created_at, updated_at) VALUES (?, ?, ?, ?)",
      [
        task.title,
        task.description,
        task.getUTCCreatedAt(),
        task.getUTCUpdatedAt(),
      ]
    )
    task.id = result.insertId;
  }
}
