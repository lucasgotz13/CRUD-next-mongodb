"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

 
export default function AddNewTask() {
  const [taskTitle, setTaskTitle] = useState<string>("")
  const [taskDescription, setTaskDescription] = useState<string>("")
  const router = useRouter()

  const addTask = async () => {
    const newTask = {
      title: taskTitle,
      description: taskDescription
    }
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (res.status === 200) {
        router.refresh() 
      }
      const data = res.json();
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">
          <PlusCircle className="mr-2" />
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task name:
            </Label>
            <Input id="name" placeholder="Task 1" className="col-span-3" onChange={(e) => setTaskTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="This is task 1"
              className="col-span-3"
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="success" onClick={() => addTask()}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
