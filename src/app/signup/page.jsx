"use client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { data, error } = await authClient.signUp.email(
      {
        name,
        email,
        password,
        // callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      },
    );

    // const formData = new FormData(e.currentTarget);
    // const userData = Object.fromEntries(formData.entries());

    // const { data, error } = await authClient.signUp.email({
    //   name: userData.name,
    //   email: userData.email,
    //   password: userData.password,
    //   callbackURL: "/",
    // });
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success("Signup successfully! Please verify your account");
    }
    console.log(data, error);
  };
  return (
    <Form
      className="flex lg:w-1/2 w-3/4 mx-auto flex-col gap-4 shadow-2xl p-10 rounded-2xl"
      onSubmit={onSubmit}
    >
      <TextField
        isRequired
        name="name"
        type="text"
        validate={(value) => {
          if (value === "") {
            return "Name cannot be empty";
          }
        }}
      >
        <Label>Name</Label>
        <Input placeholder="John Doe" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>
          Must be at least 8 characters with 1 uppercase and 1 number
        </Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Sign Up
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default SignUpPage;
