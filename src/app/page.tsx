import { api, HydrateClient } from "@/trpc/server";
import { TasksSuspense } from "./_components/tasks/tasks";
import { TaskInput } from "./_components/tasks/input";

export default async function Home() {
  const connected = await api.hello.hello();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {connected ? connected : "Loading tRPC query..."}
            </p>
          </div>

          <TasksSuspense />
          <TaskInput />
      </main>
    </HydrateClient>
  );
}
