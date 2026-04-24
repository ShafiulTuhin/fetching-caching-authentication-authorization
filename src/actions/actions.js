"use server";

import { createPost } from "@/lib/posts";
import { revalidatePath } from "next/cache";

export const handlePostAction = async (formData) => {
  const item = formData.get("item");
  const price = formData.get("price");
  const description = formData.get("description");
  const category = formData.get("category");
  console.log({ item, price, description, category });

  createPost({ item, price, description, category });
  revalidatePath("/posts");
};
