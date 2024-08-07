import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import TaskTitle from "../components/TaskTitle";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import Tabs from "../components/Tabs";

const TABS = [
  { title: "List View" },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const status = params?.status || "";
  const { data, error } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed:"",
    search: "",
  });

  useEffect(() => {
    if (data) {
      setTasks(data.task || []);
    }
  }, [data]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map((task)=>
        task._id === id ? { ...task, stage: "completed" } : task
      )
    );
  };

  if (error) {
    return <div>Error loading tasks: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />
        
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex items-center bg-purple-700 text-white rounded-full py-2 px-4 gap-"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
            <TaskTitle label="Completed" className={TASK_TYPE.completed} />
          </div>
        )}
        <div className="w-full">
          <Table tasks={data?.tasks} />
        </div>

      </Tabs>

      <AddTask open={open} setOpen={setOpen} onAddTask={handleAddTask} />
    </div>
  );
};

export default Tasks;
