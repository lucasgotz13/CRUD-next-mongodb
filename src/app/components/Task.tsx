"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskComponent({ title, description, id,}: { title: string; description: string; id: string;}) {
  
  const [taskTitle, setTaskTitle] = useState<string>("")
  const [taskDescription, setTaskDescription] = useState<string>("")
  const router = useRouter();

  const updateTask = async (id: string) => {
    const newTask = {
      title: taskTitle,
      description: taskDescription
    }

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (res.status === 200) {
        router.refresh()
      }
      const data = res.json()
      console.log(data)
    } catch (err) {
      console.log(err) 
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        router.refresh();
      }
      const data = res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="border text-balance">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between gap-5">
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task name:
            </Label>
            <Input id="name" defaultValue={title} placeholder="Task name" className="col-span-3" onChange={(e) => setTaskTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description:
            </Label>
            <Input
              id="description"
              defaultValue={description}
              placeholder="Task description"
              className="col-span-3"
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="update" onClick={() => updateTask(id)}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        <Button variant="destructive" onClick={() => deleteTask(id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
