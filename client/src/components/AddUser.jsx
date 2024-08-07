import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/authApiSlice";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";

const AddUser = ({ open, setOpen, userData, onSubmit }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  const dispatch=useDispatch
  const [addNewUser] = useRegisterMutation();
  const[updateUser]= useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    try {
      console.log("Form Data:", data); // Form verilerini kontrol edin
      if (userData) {
        const result= await updateUser(data).unwrap()

        toast.success(result?.message)

        if(userData?._id == user>_id){S
          dispatch(setCredentials({...result.user}))
        }

      } else {
        await addNewUser({ ...data, password: data.email, }).unwrap();
        console.log("API Result:", result); // API sonucunu kontrol edin
        toast.success("Yeni kullanıcı eklendi");
      }

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Error:", error); // Hataları kontrol edin
      toast.error("Bir şeyler yanlış gitti");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
          {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Full name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full rounded"
            register={register("name", { required: "Full name is required!" })}
            error={errors.name ? errors.name.message : ""}
          />
          <Textbox
            placeholder="Title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required!" })}
            error={errors.title ? errors.title.message : ""}
          />
          <Textbox
            placeholder="Email Address"
            type="email"
            name="email"
            label="Email Address"
            className="w-full rounded"
            register={register("email", { required: "Email Address is required!" })}
            error={errors.email ? errors.email.message : ""}
          />
          <Textbox
            placeholder="Role"
            type="text"
            name="role"
            label="Role"
            className="w-full rounded"
            register={register("role", { required: "User role is required!" })}
            error={errors.role ? errors.role.message : ""}
          />
        </div>
        <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
          <Button
            type="submit"
            className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
            label="Submit"
          />
          <Button
            type="button"
            className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
            onClick={() => setOpen(false)}
            label="Cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddUser;
