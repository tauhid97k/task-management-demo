"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  AlertCircle,
  Timer,
  Check,
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
import { toast, Toaster } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: number;
  link: string;
  username: string;
  email: string;
  password: string;
  status: "pending" | "completed" | "not-completed";
  timeAllotted: number; // in seconds
  timeRemaining: number | null; // in seconds, null if timer not started
  timerActive: boolean;
  timerExpired: boolean;
  extraTimeSpent: number; // in seconds
  totalTimeSpent: number; // in seconds
}

// Function to generate random time between 30 seconds and 3 minutes
const generateRandomTime = (): number => {
  return Math.floor(Math.random() * (180 - 30 + 1)) + 30; // 30 to 180 seconds
};

// Format seconds to MM:SS
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      link: "https://www.behance.net/luzy-ostreicher",
      username: "luzy-ostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
      timeAllotted: generateRandomTime(),
      timeRemaining: null,
      timerActive: false,
      timerExpired: false,
      extraTimeSpent: 0,
      totalTimeSpent: 0,
    },
    {
      id: 2,
      link: "https://www.youtube.com/@luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
      timeAllotted: generateRandomTime(),
      timeRemaining: null,
      timerActive: false,
      timerExpired: false,
      extraTimeSpent: 0,
      totalTimeSpent: 0,
    },
    {
      id: 3,
      link: "https://www.crunchbase.com/person/luzy-os",
      username: "luzy-ostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "completed", // This task is completed for demonstration
      timeAllotted: generateRandomTime(),
      timeRemaining: null,
      timerActive: false,
      timerExpired: false,
      extraTimeSpent: 0,
      totalTimeSpent: 120,
    },
    {
      id: 4,
      link: "https://muckrack.com/luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
      timeAllotted: generateRandomTime(),
      timeRemaining: null,
      timerActive: false,
      timerExpired: false,
      extraTimeSpent: 0,
      totalTimeSpent: 0,
    },
    {
      id: 5,
      link: "https://issuu.com/luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "not-completed", // This task is not completed for demonstration
      timeAllotted: generateRandomTime(),
      timeRemaining: null,
      timerActive: false,
      timerExpired: true,
      extraTimeSpent: 45,
      totalTimeSpent: 180,
    },
    {
      id: 6,
      link: "https://about.me/luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
      timeAllotted: generateRandomTime(),
      timeRemaining: null,
      timerActive: false,
      timerExpired: false,
      extraTimeSpent: 0,
      totalTimeSpent: 0,
    },
    {
      id: 7,
      link: "https://flipboard.com/@luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "completed", // This task is completed for demonstration
      timeAllotted: generateRandomTime(),
      timeRemaining: null,
      timerActive: false,
      timerExpired: false,
      extraTimeSpent: 30,
      totalTimeSpent: 150,
    },
    {
      id: 8,
      link: "https://linktr.ee/luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
      timeAllotted: generateRandomTime(),
      timeRemaining: null,
      timerActive: false,
      timerExpired: false,
      extraTimeSpent: 0,
      totalTimeSpent: 0,
    },
    {
      id: 9,
      link: "https://foursquare.com/luzy0836114",
      username: "luzy0836114",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
      timeAllotted: generateRandomTime(),
      timeRemaining: null,
      timerActive: false,
      timerExpired: false,
      extraTimeSpent: 0,
      totalTimeSpent: 0,
    },
    {
      id: 10,
      link: "https://hubpages.com/@luzyostreicher",
      username: "luzyostreicher",
      email: "luzyostreicher55@gmail.com",
      password: "W3n98$c@pM2xl5zL",
      status: "pending",
      timeAllotted: generateRandomTime(),
      timeRemaining: null,
      timerActive: false,
      timerExpired: false,
      extraTimeSpent: 0,
      totalTimeSpent: 0,
    },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalTasks = 14; // Based on the pagination in the image showing "1-10 of 14"

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerConflictModalOpen, setIsTimerConflictModalOpen] =
    useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [pendingTimerTaskId, setPendingTimerTaskId] = useState<number | null>(
    null
  );
  const [showTimeExpiredAlert, setShowTimeExpiredAlert] = useState(false);
  const [expiredTaskId, setExpiredTaskId] = useState<number | null>(null);

  // Timer interval reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Extra time interval reference
  const extraTimeRef = useRef<NodeJS.Timeout | null>(null);

  // Get currently active task
  const getActiveTask = () => {
    return tasks.find((task) => task.timerActive);
  };

  // Effect to handle the countdown timer
  useEffect(() => {
    // Check if any timers are active
    const activeTask = getActiveTask();

    if (activeTask) {
      // Set up the interval to update timers every second
      timerRef.current = setInterval(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task.timerActive && task.timeRemaining !== null) {
              // Increment total time spent
              const newTotalTimeSpent = task.totalTimeSpent + 1;

              // Decrement the timer
              const newTimeRemaining = task.timeRemaining - 1;

              // Check if timer has expired
              if (newTimeRemaining <= 0) {
                // Show alert for expired timer
                setExpiredTaskId(task.id);
                setShowTimeExpiredAlert(true);

                // Play alert sound
                const audio = new Audio("/alert.mp3");
                audio.play().catch((e) => console.log("Audio play failed:", e));

                // Show toast notification
                toast.error(
                  `Time Expired! The timer for task #${task.id} has expired.`
                );

                // Start tracking extra time
                startExtraTimeTracking(task.id);

                // Return updated task with expired timer
                return {
                  ...task,
                  timeRemaining: 0,
                  timerActive: false,
                  timerExpired: true,
                  totalTimeSpent: newTotalTimeSpent,
                };
              }

              // Return updated task with decremented timer
              return {
                ...task,
                timeRemaining: newTimeRemaining,
                totalTimeSpent: newTotalTimeSpent,
              };
            }
            return task;
          })
        );
      }, 1000);
    }

    // Clean up interval on unmount or when no active timers
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [tasks]);

  // Start tracking extra time for a task
  const startExtraTimeTracking = (taskId: number) => {
    // Clear any existing extra time interval
    if (extraTimeRef.current) {
      clearInterval(extraTimeRef.current);
    }

    // Set up interval to track extra time
    extraTimeRef.current = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (
            task.id === taskId &&
            task.timerExpired &&
            task.status !== "completed"
          ) {
            return {
              ...task,
              extraTimeSpent: task.extraTimeSpent + 1,
              totalTimeSpent: task.totalTimeSpent + 1,
            };
          }
          return task;
        })
      );
    }, 1000);
  };

  // Stop tracking extra time for a task
  const stopExtraTimeTracking = () => {
    if (extraTimeRef.current) {
      clearInterval(extraTimeRef.current);
      extraTimeRef.current = null;
    }
  };

  const handleStartTimer = (id: number) => {
    // Check if there's already an active timer
    const activeTask = getActiveTask();

    if (activeTask) {
      // If there's an active timer, show conflict modal
      setPendingTimerTaskId(id);
      setIsTimerConflictModalOpen(true);
      return;
    }

    // No active timer, start this one
    startTimerForTask(id);
  };

  const startTimerForTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          // If timer was expired, stop tracking extra time
          if (task.timerExpired) {
            stopExtraTimeTracking();
          }

          return {
            ...task,
            timeRemaining:
              task.timeRemaining === null
                ? task.timeAllotted
                : task.timeRemaining,
            timerActive: true,
            timerExpired: false,
          };
        }
        return task;
      })
    );
  };

  const handlePauseCurrentTimer = () => {
    // Pause the currently active timer
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.timerActive) {
          return {
            ...task,
            timerActive: false,
          };
        }
        return task;
      })
    );

    // Start the pending timer if there is one
    if (pendingTimerTaskId !== null) {
      startTimerForTask(pendingTimerTaskId);
      setPendingTimerTaskId(null);
    }

    // Close the conflict modal
    setIsTimerConflictModalOpen(false);
  };

  const handleCancelTimerStart = () => {
    setPendingTimerTaskId(null);
    setIsTimerConflictModalOpen(false);
  };

  const handleResetTimer = (id: number) => {
    // Stop tracking extra time if this task was expired
    const task = tasks.find((t) => t.id === id);
    if (task && task.timerExpired) {
      stopExtraTimeTracking();
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            timeRemaining: task.timeAllotted,
            timerActive: false,
            timerExpired: false,
          };
        }
        return task;
      })
    );
  };

  const handleCheckboxClick = (id: number) => {
    setSelectedTaskId(id);
    setIsModalOpen(true);
  };

  const handleTaskStatus = (status: "completed" | "not-completed") => {
    if (selectedTaskId) {
      const task = tasks.find((t) => t.id === selectedTaskId);

      // If task was expired, stop tracking extra time
      if (task && task.timerExpired) {
        stopExtraTimeTracking();
      }

      setTasks(
        tasks.map((task) =>
          task.id === selectedTaskId
            ? {
                ...task,
                status,
                timerActive: false, // Stop timer when status is updated
                // If marked as completed, reset timer expired state
                timerExpired:
                  status === "completed" ? false : task.timerExpired,
              }
            : task
        )
      );

      // Show toast notification for task completion
      if (status === "completed") {
        toast.success(`Task #${selectedTaskId} has been marked as completed.`);
      }
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

  const handleCloseAlert = () => {
    setShowTimeExpiredAlert(false);
    setExpiredTaskId(null);
  };

  // Calculate progress percentage for timer
  const calculateProgress = (task: Task): number => {
    if (task.timeRemaining === null) return 100;
    return (task.timeRemaining / task.timeAllotted) * 100;
  };

  // Get tasks with extra time spent
  const tasksWithExtraTime = tasks.filter((task) => task.extraTimeSpent > 0);

  // Get incomplete tasks (not completed and not marked as not-completed)
  const incompleteTasks = tasks.filter((task) => task.status !== "completed");

  // Get completed tasks
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Tasks Management</h1>

      {showTimeExpiredAlert && (
        <Alert variant="destructive" className="mb-6 animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Time Expired!</AlertTitle>
          <AlertDescription>
            The timer for task #{expiredTaskId} has expired. Please complete
            this task as soon as possible.
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCloseAlert}
            className="ml-auto mt-2"
          >
            Dismiss
          </Button>
        </Alert>
      )}

      {/* Extra Time Summary */}
      {tasksWithExtraTime.length > 0 && (
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
              <Timer className="h-5 w-5" />
              Tasks Exceeding Allotted Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-200">
                    <th className="px-4 py-2 text-left text-sm font-medium text-amber-800">
                      Task
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-amber-800">
                      Allotted Time
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-amber-800">
                      Extra Time
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-amber-800">
                      Total Time
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-amber-800">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasksWithExtraTime.map((task) => (
                    <tr
                      key={`extra-${task.id}`}
                      className="border-b border-amber-100"
                    >
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-white">
                            #{task.id}
                          </Badge>
                          <span className="text-sm truncate max-w-[200px]">
                            {task.link.split("/").pop()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-mono text-sm">
                        {formatTime(task.timeAllotted)}
                      </td>
                      <td className="px-4 py-2">
                        <Badge variant="destructive" className="font-mono">
                          +{formatTime(task.extraTimeSpent)}
                        </Badge>
                      </td>
                      <td className="px-4 py-2 font-mono text-sm">
                        {formatTime(task.totalTimeSpent)}
                      </td>
                      <td className="px-4 py-2">
                        {task.status === "completed" ? (
                          <Badge
                            variant="success"
                            className="bg-green-100 text-green-800 hover:bg-green-100"
                          >
                            Completed
                          </Badge>
                        ) : task.status === "not-completed" ? (
                          <Badge
                            variant="destructive"
                            className="bg-red-100 text-red-800 hover:bg-red-100"
                          >
                            Not Completed
                          </Badge>
                        ) : task.timerExpired ? (
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-800 border-amber-300"
                          >
                            Time Expired
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-100">
                            Pending
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-sm">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm">
                <div className="flex items-center">
                  Timer
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
            {/* Incomplete Tasks First */}
            {incompleteTasks.map((task) => (
              <tr
                key={task.id}
                className={`border-b hover:bg-muted/20 transition-colors ${
                  task.status === "not-completed" || task.timerExpired
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
                    {task.status === "not-completed" ? (
                      <XCircle className="h-6 w-6 text-red-600" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-sm" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 min-w-[200px]">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`font-mono font-medium text-sm ${
                            task.timerExpired
                              ? "text-red-600"
                              : task.timeRemaining !== null &&
                                task.timeRemaining < 10
                              ? "text-red-600"
                              : task.timeRemaining !== null &&
                                task.timeRemaining < 30
                              ? "text-amber-600"
                              : "text-slate-700"
                          }`}
                        >
                          {formatTime(
                            task.timeRemaining !== null
                              ? task.timeRemaining
                              : task.timeAllotted
                          )}
                        </div>

                        {task.extraTimeSpent > 0 && (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 text-xs"
                          >
                            +{formatTime(task.extraTimeSpent)}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {task.timerExpired ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleResetTimer(task.id)}
                            className="h-7 w-7 rounded-full"
                          >
                            <RotateCcw className="h-3.5 w-3.5 text-slate-600" />
                            <span className="sr-only">Reset timer</span>
                          </Button>
                        ) : task.timerActive ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setTasks((prevTasks) =>
                                prevTasks.map((t) =>
                                  t.id === task.id
                                    ? { ...t, timerActive: false }
                                    : t
                                )
                              );
                            }}
                            className="h-7 w-7 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                          >
                            <Pause className="h-3.5 w-3.5" />
                            <span className="sr-only">Pause timer</span>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStartTimer(task.id)}
                            className="h-7 w-7 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                          >
                            <Play className="h-3.5 w-3.5" />
                            <span className="sr-only">Start timer</span>
                          </Button>
                        )}
                      </div>
                    </div>

                    <Progress
                      value={calculateProgress(task)}
                      className={`h-1.5 ${
                        task.timerExpired
                          ? "bg-red-200"
                          : task.timeRemaining !== null &&
                            task.timeRemaining < 10
                          ? "bg-red-200"
                          : task.timeRemaining !== null &&
                            task.timeRemaining < 30
                          ? "bg-amber-200"
                          : "bg-slate-200"
                      }`}
                      indicatorClassName={`${
                        task.timerExpired
                          ? "bg-red-600"
                          : task.timeRemaining !== null &&
                            task.timeRemaining < 10
                          ? "bg-red-600"
                          : task.timeRemaining !== null &&
                            task.timeRemaining < 30
                          ? "bg-amber-600"
                          : "bg-blue-600"
                      }`}
                    />
                  </div>
                </td>
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

            {/* Completed Tasks */}
            {completedTasks.map((task) => (
              <tr
                key={task.id}
                className="border-b hover:bg-muted/20 transition-colors bg-green-50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center w-6 h-6">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </td>
                <td className="px-4 py-3 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="success"
                      className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" />
                      Completed
                    </Badge>

                    {task.totalTimeSpent > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 font-mono text-xs"
                      >
                        {formatTime(task.totalTimeSpent)}
                      </Badge>
                    )}
                  </div>
                </td>
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

      {/* Timer Conflict Modal */}
      <Dialog
        open={isTimerConflictModalOpen}
        onOpenChange={setIsTimerConflictModalOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Timer Already Running
            </DialogTitle>
            <DialogDescription>
              You already have an active timer running. Would you like to pause
              the current timer and start a new one?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert className="bg-amber-50 border-amber-200 text-amber-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Only one timer can be active at a time</AlertTitle>
              <AlertDescription>
                To maintain accurate time tracking, you can only run one timer
                at a time.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleCancelTimerStart}
              className="sm:order-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePauseCurrentTimer}
              className="bg-blue-600 hover:bg-blue-700 sm:order-2"
            >
              Pause Current & Start New Timer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default TasksPage;
