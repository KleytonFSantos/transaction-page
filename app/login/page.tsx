"use client";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { LinkText } from "../components/LinkText";
import { loginSchema } from "../Schemas/LoginSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginUser } from "../Services/useLoginUser";
import CircleSVG from "../components/CircleSVG";

export type FormSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const login = useLoginUser()

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    login.mutate(data);
  };

  if (login.isLoading) {
    return (
      <div className="flex min-h-screen flex-1 align-middle justify-center px-6 py-12 lg:px-8">
        <CircleSVG />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        {login.error?.response?.data && (
          <div className="flex justify-center align-middle font-bold">
            <p className="text-xs italic text-red-500 mt-2">
              {login.error.response.data?.message}
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.email?.message}
            </p>
          )}
          <Input label="Password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password?.message}
            </p>
          )}
          <Button text="Login" type="submit" />
        </form>
        <LinkText link="#" text="Forgot your password?" />
        <LinkText link="/register" text="Register" preText="Not a member? " />
      </div>
    </div>
  );
}
