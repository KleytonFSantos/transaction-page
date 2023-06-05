"use client";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { LinkText } from "../components/LinkText";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { formSchema } from "../Schemas/RegisterSchema";
import { createUser } from "../Services/UserRegister";
import { useRouter } from "next/navigation";

export type FormSchemaType = z.infer<typeof formSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter()
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(createUser, {
    onSuccess: data => {
      router.push("/login");
    },
    onError: () => {
      console.log(error)
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    }
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register a new account
        </h2>
      </div>
      {isLoading && <div> Loading... </div>}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.email?.message}
            </p>
          )}
          <Input label="Name" type="text" {...register("name")} />
          {errors.name && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.name?.message}
            </p>
          )}
          <Input label="Password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password?.message}
            </p>
          )}
          <Input
            label="Confirm Password"
            type="text"
            {...register("password_confirmation")}
          />
          {errors.password_confirmation && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password_confirmation?.message}
            </p>
          )}
          <Button text="Register" type="submit" />
        </form>
        <LinkText link="/login" text="Login" preText="Already have a account? " />
      </div>
    </div>
  );
}
