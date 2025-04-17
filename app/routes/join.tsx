import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return { };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  console.log("formData", formData);

  if (!validateEmail(email)) {
    return new Response(
      JSON.stringify({ errors: { email: "Email is invalid", password: null } }),
      { 
        status: 400,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return new Response(
      JSON.stringify({ errors: { email: null, password: "Password is required" } }),
      { 
        status: 400,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  if (password.length < 8) {
    return new Response(
      JSON.stringify({ errors: { email: null, password: "Password is too short" } }),
      { 
        status: 400,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return new Response(
      JSON.stringify({
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      }),
      { 
        status: 400,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  if (typeof username !== "string" || username.length === 0) {
    return new Response(
      JSON.stringify({ errors: { username: "Username is required", password: null } }),
      { 
        status: 400,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  if (await getUserByUsername(username)) {
    return new Response(
      JSON.stringify({
        errors: {
          username: "A user already exists with this username",
          password: null,
        },
      }),
      { 
        status: 400,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  await createUser(email, password, username);

  const user = await getUserByUsername(username);

  if (!user) {
    throw new Error("User creation failed: user not found after creation.");
  }

  console.log("user", user);

  const redirectTo = `/`;

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.pk,
  });
};