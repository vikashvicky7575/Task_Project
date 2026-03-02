import { useEffect, useState } from 'react';
import { fetchProjects } from '../../api/projectApi';
import AddProject from '../../components/Project/Addproject';
import ProjectList from '../../components/Project/ProjectList';

const Dashboard = () => {

  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const res = await fetchProjects();
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
      {/* add project components passing the data using props */}
      <AddProject onProjectAdded={loadProjects} />

      {/* Project List components passing the data using props */}
      <ProjectList
        projects={projects}
        refreshProjects={loadProjects}
      />
    </>
  )
}

export default Dashboard