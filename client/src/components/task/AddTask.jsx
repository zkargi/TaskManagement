import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "react-toastify";
import {getStorage, ref, getDownloadURL} from "firebase/storage"
const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen, task }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );

  const[assets,setAssets]=useState([]);
  const [uploading, setUploading] = useState(false);

  const [createTask]=useCreateTaskMutation();
  const[updateTask]=useUpdateTaskMutation();
  const URLS = task?.assets ?[...task.assets]:[];

  const submitHandler = async(data) => {
    for(const file of assets){
        setUploading(true);
      try{
        await uploadFile(file);
      }catch (error){
        console.error("error uploading file:",error.message);
        return;
      }finally{
        setUploading(false);
      }
    }

      try{
        const newData={
          ...data,
          assets:[...URLS,...uploadedFileURLs],
          team,
          stage,
          priority,
        };
        const res= task?._id
          ? await updateTask({...newData, _id:task._id}).unwrap()
          :await createTask(newData).unwrap();
        toast.success(res.message);

        setTimeout(()=>{
          setOpen(false);
        },500);
      }catch (error){
        console.log(error);
        toast.error(error.data?.message || error.error)
      }
  
    };
  

  

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const uploadFile=async(file)=>{
    const storage=getStorage(app);

    const name=new Date().getTime()+ file.name;
    const storageRef=ref(storage,name);

    const uploadTask=uploadBytesResumable(storageRef,file);

    return new Promise((resolve,reject)=>{
      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          console.log( "uploading");
        },
        (error)=>{
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL)=>{
              uploadedFileURLs.push(downloadURL);
              resolve();
            })
            .catch((error)=>{
              reject(error);
            });
        }
      );
    });
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className="mt-4 space-y-4">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <UserList setTeam={setTeam} team={team} />

          <div className="grid grid-cols-2 gap-4">
            <SelectList
              label="Task Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />

            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="rounded"
              register={register("date", {
                required: "Date is required!",
              })}
              error={errors.date ? errors.date.message : ""}
            />
          </div>

          <SelectList
            label="Priority Level"
            lists={PRIORIRY}
            selected={priority}
            setSelected={setPriority}
          />

          <div className="flex justify-end space-x-4">
            {uploading ? (
              <span className="text-sm py-2 text-red-500">Uploading assets</span>
            ) : (
              <Button
                label="Submit"
                type="submit"
                className="bg-blue-600 px-8 py-2 text-sm font-semibold text-white rounded hover:bg-blue-700"
              />
            )}

            <Button
              type="button"
              className="bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-900 rounded hover:bg-gray-300"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;