import { TaskSerializer } from "../serializers/TaskSerializer";
import { TaskRepository } from "../database/TaskRepository";
import { GetTask } from "../../application/usecases/getTask";
import { CreateTask } from "../../application/usecases/createTask";
import { UpdateTask } from "../../application/usecases/updateTask";
import { DeleteTask } from "../../application/usecases/deleteTask";
import { IDBConnection } from "../database/DBConnection";

export class TaskController {
  private taskSerializer: TaskSerializer;
  private taskRepository: TaskRepository;

  constructor(dbConnection: IDBConnection) {
    this.taskRepository = new TaskRepository(dbConnection);
    this.taskSerializer = new TaskSerializer();
  }

  async createTask(req: any, res: any) {
    const { title, description } = req.body;
    const createTask = new CreateTask(this.taskRepository);
    const result = await createTask.execute(title, description);
    return this.taskSerializer.serialize(result);
  }
}
