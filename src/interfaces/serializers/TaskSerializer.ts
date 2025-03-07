import { Task } from "../../domain/models/Task";
import moment from "moment-timezone";

const _serializeSingleTask = (task: Task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    createdAt: task.getUTCCreatedAt().format(),
    updatedAt: task.getUTCUpdatedAt()format(),
  }
}

export class TaskSerializer {
  serialize(data: any) {
    if (!data) {
      throw new Error("expected data to be not undefined");
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleTask);
    }
    return _serializeSingleTask(data);
  }
}
