"use client"

import React, { Suspense } from 'react';
import { type Task as TaskType } from "#/generated/zod";
import { Task } from './task';  // 先ほど作成したTaskコンポーネントをインポート
import { api } from "@/trpc/react";

const Tasks: React.FC = () => {
  const [tasks] = api.task.getAll.useSuspenseQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task: TaskType) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      )}
    </div>
  );
};

const LoadingFallback: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Tasks</h2>
    <p className="text-gray-600">Loading tasks...</p>
  </div>
);

export const TasksSuspense: React.FC = () => (
  <Suspense fallback={<LoadingFallback />}>
    <Tasks />
  </Suspense>
);
