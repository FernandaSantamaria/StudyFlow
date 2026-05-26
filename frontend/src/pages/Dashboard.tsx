import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { API_URL } from "../config/api";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  user_id: number;
}

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();

    const userTasks = data.filter((task: Task) => task.user_id === user.id);
    setTasks(userTasks);
  };

  const createTask = async () => {
    if (!title || !description) return;

    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        user_id: user.id,
      }),
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="min-h-screen bg-[#F7F4FF] flex">
      <Sidebar title="Panel principal" icon="👩🏻‍💻" />

      <main className="flex-1 p-10">
        <section className="bg-[#DCCBFF] rounded-3xl p-8 shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#4A4458]">
              ¡Te deseamos un día lleno de éxito!
            </h1>

            <p className="mt-3 text-gray-600">
              Organiza tus tareas, materias y sesiones de estudio.
            </p>
          </div>

          <div className="text-7xl">📚</div>
        </section>

        <section className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Total de tareas</h3>

            <p className="text-4xl font-bold text-[#7E57C2] mt-2">
              {tasks.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Tareas completadas</h3>

            <p className="text-4xl font-bold text-pink-400 mt-2">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Tareas pendientes</h3>

            <p className="text-4xl font-bold text-orange-400 mt-2">
              {pendingTasks}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8 mt-10">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#4A4458] mb-6">
              Crear tarea rápida ✨
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Título de la tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <textarea
                placeholder="Descripción de la tarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <button
                onClick={createTask}
                className="bg-[#B799FF] hover:bg-[#a684f5] transition-all text-white p-4 rounded-2xl font-bold"
              >
                Crear tarea
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#4A4458]">
              Importantes hoy
            </h2>

            <p className="text-6xl font-bold text-[#7E57C2] mt-6">
              {pendingTasks}
            </p>

            <p className="text-gray-500 mt-2">
              tareas pendientes requieren tu atención
            </p>

            <div className="mt-6 bg-[#F1EAFF] rounded-2xl p-4 text-[#7E57C2] font-semibold">
              Consejo: termina primero la tarea más pequeña para tomar ritmo.
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-[#4A4458] mb-6">
            Tareas recientes 📋
          </h2>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 shadow-lg text-gray-500">
              Aún no tienes tareas registradas. Crea una arriba.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-6 rounded-3xl shadow-lg"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-[#4A4458]">
                      {task.title}
                    </h3>

                    <span className="text-2xl">
                      {task.completed ? "✅" : "🕒"}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-600">{task.description}</p>

                  <div className="mt-6 text-sm text-gray-400">
                    Usuario ID: {task.user_id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;