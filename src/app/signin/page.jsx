"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      // callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success(`${data?.user?.name} successfully logged in.`, {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  };
  return (
    <Form
      onSubmit={onSubmit}
      className="space-y-4 lg:w-1/2 w-3/4 mx-auto shadow-2xl p-10 rounded-2xl"
    >
      <h2 className="text-center font-bold text-2xl mb-8">Sign In form</h2>

      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" name="email" />
        <FieldError />
      </TextField>

      <TextField
        className="w-full"
        name="password"
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
        <InputGroup>
          <InputGroup.Input
            className="w-full "
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="Enter password"
          />
          <InputGroup.Suffix className="pr-0">
            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onPress={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <Eye className="size-4" />
              ) : (
                <EyeSlash className="size-4" />
              )}
            </Button>
          </InputGroup.Suffix>
        </InputGroup>
        <FieldError />
      </TextField>

      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Sign In
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default SignInPage;
