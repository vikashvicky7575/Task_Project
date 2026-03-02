import { useParams } from "react-router-dom";
import TaskBoard from "../../components/Task/TaskBoard";

const TaskPage = () => {
  const { projectId } = useParams();

  return (
    <div className="container mt-4">
      <TaskBoard projectId={projectId} />
    </div>
  );
};

export default TaskPage;