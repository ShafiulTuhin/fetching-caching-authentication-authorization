import { handlePostAction } from "@/actions/actions";
import { getPosts } from "@/lib/posts";
import {
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  Modal,
  Button,
} from "@heroui/react";

import React from "react";

const PostsPage = () => {
  const posts = getPosts();
  console.log(posts);

  return (
    <div>
      <form
        action={handlePostAction}
        className="flex flex-col gap-4 lg:w-1/2 w-3/4 mx-auto mb-10"
      >
        <h2 className="font-bold text-[22px]">Create Post</h2>
        <TextField className="w-full" name="item" type="text">
          <Label className="font-bold">Item Name</Label>
          <Input placeholder="Enter Item name" />
        </TextField>
        <TextField className="w-full" name="price" type="text">
          <Label className="font-bold">Price</Label>
          <Input placeholder="Input price" />
        </TextField>
        <TextField className="w-full" name="description" type="text">
          <Label className="font-bold">Description</Label>
          <Input placeholder="Write description" />
        </TextField>
        <Select className="" name="category" placeholder="Select category">
          <Label className="font-bold">Category</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="Men" textValue="Men">
                Men
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="Women" textValue="Women">
                Women
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="Electronics" textValue="Electronics">
                Electronics
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
        <Modal.Footer>
          <Button slot="close" type="submit">
            Submit Post
          </Button>
        </Modal.Footer>
      </form>
      {/* Posts */}
      <h2 className="text-2xl font-bold mb-5">All Posts</h2>
      <div className="grid md:grid-cols-3 gap-5 grid-cols-1 lg:px-0 px-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border-1 border-gray-300 p-4 space-y-4 rounded-lg"
          >
            <h2 className="font-bold text-[20px]">{post.item}</h2>
            <h2 className="text-[#626262]">{post.description}</h2>
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Price: {post.price} BDT</h2>
              <h2 className="font-semibold">Category: {post.category}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
