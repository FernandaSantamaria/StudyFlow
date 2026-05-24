import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface StudyGoal {
  _id: string;
  title: string;
  target_hours: number;
  current_hours: number;
  user_id: number;
}

function StudyGoals() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [title, setTitle] = useState("");
  const [targetHours, setTargetHours] = useState("");
  const [currentHours, setCurrentHours] = useState("");

  const fetchGoals = async () => {
    const response = await fetch("http://127.0.0.1:8000/mongo/study-goals");
    const data = await response.json();

    setGoals(data.filter((goal: StudyGoal) => goal.user_id === user.id));
  };

  const createGoal = async () => {
    if (!title || !targetHours) return;

    await fetch("http://127.0.0.1:8000/mongo/study-goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        target_hours: Number(targetHours),
        current_hours: Number(currentHours || 0),
        user_id: user.id,
      }),
    });

    setTitle("");
    setTargetHours("");
    setCurrentHours("");
    fetchGoals();
  };

  const deleteGoal = async (id: string) => {
    await fetch(`http://127.0.0.1:8000/mongo/study-goals/${id}`, {
      method: "DELETE",
    });

    fetchGoals();
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const totalTarget = goals.reduce(
    (total, goal) => total + goal.target_hours,
    0
  );

  const totalCurrent = goals.reduce(
    (total, goal) => total + goal.current_hours,
    0
  );

  const averageProgress =
    totalTarget > 0
      ? Math.min(Math.round((totalCurrent / totalTarget) * 100), 100)
      : 0;

  return (
    <div className="min-h-screen bg-[#F7F4FF] flex">
      <Sidebar title="Metas de estudio" icon="🎯" />

      <main className="flex-1 p-10">
        <section className="bg-[#DCCBFF] rounded-3xl p-8 shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#4A4458]">
              Metas de estudio 🎯
            </h1>

            <p className="mt-3 text-gray-600">
              Define metas de estudio y mide tu progreso académico.
            </p>
          </div>

          <div className="text-7xl">🌟</div>
        </section>

        <section className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Metas</h3>

            <p className="text-4xl font-bold text-[#7E57C2] mt-2">
              {goals.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Horas completadas</h3>

            <p className="text-4xl font-bold text-pink-400 mt-2">
              {totalCurrent}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Progreso</h3>

            <p className="text-4xl font-bold text-orange-400 mt-2">
              {averageProgress}%
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8 mt-10">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#4A4458] mb-6">
              Nueva meta ✨
            </h2>

            <div className="flex flex-col gap-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título de la meta"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <input
                value={targetHours}
                onChange={(e) => setTargetHours(e.target.value)}
                placeholder="Horas objetivo"
                type="number"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <input
                value={currentHours}
                onChange={(e) => setCurrentHours(e.target.value)}
                placeholder="Horas actuales"
                type="number"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <button
                onClick={createGoal}
                className="bg-[#B799FF] hover:bg-[#a684f5] text-white p-4 rounded-2xl font-bold transition-all"
              >
                Crear meta
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#4A4458]">
              Resumen de metas
            </h2>

            <p className="text-6xl font-bold text-[#7E57C2] mt-6">
              {averageProgress}%
            </p>

            <p className="text-gray-500 mt-2">progreso general</p>

            <div className="mt-6 bg-[#F1EAFF] rounded-2xl p-4 text-[#7E57C2] font-semibold">
              Consejo: las metas pequeñas y medibles son más fáciles de cumplir.
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-[#4A4458] mb-6">
            Tus metas 📈
          </h2>

          {goals.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 shadow-lg text-gray-500">
              Aún no tienes metas de estudio.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {goals.map((goal) => {
                const progress = Math.min(
                  Math.round((goal.current_hours / goal.target_hours) * 100),
                  100
                );

                return (
                  <div
                    key={goal._id}
                    className="bg-white p-6 rounded-3xl shadow-lg"
                  >
                    <div className="text-4xl mb-4">🎯</div>

                    <h3 className="text-2xl font-bold text-[#4A4458]">
                      {goal.title}
                    </h3>

                    <p className="mt-3 text-gray-600">
                      {goal.current_hours} / {goal.target_hours} horas
                    </p>

                    <div className="w-full bg-[#F1EAFF] rounded-full h-4 mt-4">
                      <div
                        className="bg-[#B799FF] h-4 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {progress}% completado
                    </p>

                    <button
                      onClick={() => deleteGoal(goal._id)}
                      className="mt-5 bg-pink-400 hover:bg-pink-500 transition-all text-white px-5 py-3 rounded-2xl font-bold"
                    >
                      Eliminar
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default StudyGoals;