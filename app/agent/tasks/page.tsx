"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Task {
  id: number;
  link: string;
  username: string;
  email: string;
  password: string;
  status: "pending" | "completed" | "not-completed";
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      link: "https://www.behance.net/luzy-ostreicher",
      username: "luzy-ostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
    },
    {
      id: 2,
      link: "https://www.youtube.com/@luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
    },
    {
      id: 3,
      link: "https://www.crunchbase.com/person/luzy-os",
      username: "luzy-ostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
    },
    {
      id: 4,
      link: "https://muckrack.com/luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
    },
    {
      id: 5,
      link: "https://issuu.com/luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
    },
    {
      id: 6,
      link: "https://about.me/luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
    },
    {
      id: 7,
      link: "https://flipboard.com/@luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
    },
    {
      id: 8,
      link: "https://linktr.ee/luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
    },
    {
      id: 9,
      link: "https://foursquare.com/luzy0836114",
      username: "luzy0836114",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
    },
    {
      id: 10,
      link: "https://hubpages.com/@luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
    },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalTasks = 14; // Based on the pagination in the image showing "1-10 of 14"

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleCheckboxClick = (id: number) => {
    setSelectedTaskId(id);
    setIsModalOpen(true);
  };

  const handleTaskStatus = (status: "completed" | "not-completed") => {
    if (selectedTaskId) {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTaskId ? { ...task, status } : task
        )
      );
    }
    setIsModalOpen(false);
    setSelectedTaskId(null);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(totalTasks / rowsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Tasks Management</h1>
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-sm">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm">
                <div className="flex items-center">
                  SL
                  <ArrowUp className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm">
                <div className="flex items-center">
                  Link
                  <ArrowUp className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm">
                <div className="flex items-center">
                  Username
                  <ArrowUp className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm">
                <div className="flex items-center">
                  Email
                  <ArrowUp className="h-4 w-4 ml-1" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm">
                <div className="flex items-center">
                  Password
                  <ArrowUp className="h-4 w-4 ml-1" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className={`border-b hover:bg-muted/20 transition-colors ${
                  task.status === "completed"
                    ? "bg-green-50"
                    : task.status === "not-completed"
                    ? "bg-red-50"
                    : ""
                }`}
              >
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleCheckboxClick(task.id)}
                    className="flex items-center justify-center w-6 h-6 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`Update status for task ${task.id}`}
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : task.status === "not-completed" ? (
                      <XCircle className="h-6 w-6 text-red-600" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-sm" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">{task.id}</td>
                <td className="px-4 py-3">
                  <Link
                    href={task.link}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    {task.link}
                  </Link>
                </td>
                <td className="px-4 py-3">{task.username}</td>
                <td className="px-4 py-3">{task.email}</td>
                <td className="px-4 py-3 font-mono text-sm">{task.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end mt-4 gap-2">
        <div className="flex items-center">
          <span className="mr-2 text-sm text-muted-foreground">
            Rows per page
          </span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="ml-4 text-sm text-muted-foreground">
          {(currentPage - 1) * rowsPerPage + 1}-
          {Math.min(currentPage * rowsPerPage, totalTasks)} of {totalTasks}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextPage}
          disabled={currentPage * rowsPerPage >= totalTasks}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Status Update Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Task Status</DialogTitle>
            <DialogDescription>
              Is this task completed or not completed?
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              onClick={() => handleTaskStatus("completed")}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="h-5 w-5" />
              Completed
            </Button>
            <Button
              onClick={() => handleTaskStatus("not-completed")}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
            >
              <XCircle className="h-5 w-5" />
              Not Completed
            </Button>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TasksPage;
