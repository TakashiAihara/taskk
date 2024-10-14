"use client";

import React from 'react';
import { type Task as TaskType } from "#/generated/zod";
import { Calendar, CheckSquare, Clock } from "lucide-react";
import { api } from "@/trpc/react";

export const Task: React.FC<TaskType> = ({
  id,
  completed,
  createdAt,
  title,
  updatedAt,
  dueDate,
  endDate,
  startDate
}) => {
  const utils = api.useUtils();
  const updateTask = api.task.update.useMutation({
    onSuccess: async () => {
      await utils.task.invalidate();
    },
  });

  const formatDate = (date: Date | null | undefined) => {
    return date ? new Date(date).toLocaleDateString() : 'Not set';
  };

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask.mutate({ id, completed: e.target.checked });
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center mb-2">
          <span className="text-lg font-medium text-gray-500 mr-2">{`<${id}>`}</span>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        </div>
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChange}
            className="form-checkbox h-5 w-5 text-blue-600 mr-2"
          />
          <CheckSquare className={`mr-1.5 h-5 w-5 flex-shrink-0 ${completed ? 'text-green-500' : 'text-gray-400'}`} />
          <p>{completed ? 'Completed' : 'In Progress'}</p>
        </div>
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <Calendar className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          <p>Start: {formatDate(startDate)}</p>
        </div>
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <Calendar className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          <p>End: {formatDate(endDate)}</p>
        </div>
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <Clock className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          <p>Due: {formatDate(dueDate)}</p>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 bg-gray-50">
        <div className="text-sm">
          <p className="text-gray-500">Created: {formatDate(createdAt)}</p>
          <p className="text-gray-500">Updated: {formatDate(updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};
