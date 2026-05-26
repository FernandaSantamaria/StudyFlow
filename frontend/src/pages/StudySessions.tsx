import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { API_URL } from "../config/api";


interface StudySession {
  _id: string;
  subject: string;
  duration_minutes: number;
  user_id: number;
}

function StudySessions() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");

  const fetchSessions = async () => {
    const response = await fetch(
      `${API_URL}/mongo/study-sessions`
    );

    const data = await response.json();

    setSessions(
      data.filter((session: StudySession) => session.user_id === user.id)
    );
  };

  const createSession = async () => {
    if (!subject || !duration) return;

    await fetch(`${API_URL}/mongo/study-sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        duration_minutes: Number(duration),
        user_id: user.id,
      }),
    });

    setSubject("");
    setDuration("");
    fetchSessions();
  };

  const deleteSession = async (id: string) => {
    await fetch(`${API_URL}/mongo/study-sessions/${id}`, {
      method: "DELETE",
    });

    fetchSessions();
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const totalMinutes = sessions.reduce(
    (total, session) => total + session.duration_minutes,
    0
  );

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const averageMinutes =
    sessions.length > 0 ? Math.round(totalMinutes / sessions.length) : 0;

  return (
    <div className="min-h-screen bg-[#F7F4FF] flex">
      <Sidebar title="Sesiones de estudio" icon="⏱️" />

      <main className="flex-1 p-10">
        <section className="bg-[#DCCBFF] rounded-3xl p-8 shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#4A4458]">
              Sesiones de estudio ⏱️
            </h1>

            <p className="mt-3 text-gray-600">
              Registra tus sesiones de estudio y mide tu constancia.
            </p>
          </div>

          <div className="text-7xl">🧠</div>
        </section>

        <section className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Sesiones</h3>

            <p className="text-4xl font-bold text-[#7E57C2] mt-2">
              {sessions.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Tiempo total</h3>

            <p className="text-4xl font-bold text-pink-400 mt-2">
              {totalHours}h {remainingMinutes}m
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Promedio</h3>

            <p className="text-4xl font-bold text-orange-400 mt-2">
              {averageMinutes}m
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8 mt-10">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#4A4458] mb-6">
              Nueva sesión ✨
            </h2>

            <div className="flex flex-col gap-4">
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Materia"
                className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duración en minutos"
                type="number"
                className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <button
                onClick={createSession}
                className="bg-[#B799FF] hover:bg-[#a684f5] transition-all text-white p-4 rounded-2xl font-bold w-full"
              >
                Guardar sesión
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#4A4458]">
              Resumen de estudio
            </h2>

            <p className="text-6xl font-bold text-[#7E57C2] mt-6">
              {totalMinutes}
            </p>

            <p className="text-gray-500 mt-2">
              minutos estudiados en total
            </p>

            <div className="mt-6 bg-[#F1EAFF] rounded-2xl p-4 text-[#7E57C2] font-semibold">
              Cada sesión guardada se almacena en MongoDB 🍃
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-[#4A4458] mb-6">
            Tus sesiones 📚
          </h2>

          {sessions.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 shadow-lg text-gray-500">
              Aún no tienes sesiones registradas.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {sessions.map((session) => (
                <div
                  key={session._id}
                  className="bg-white p-6 rounded-3xl shadow-lg"
                >
                  <div className="text-4xl mb-4">🧠</div>

                  <h3 className="text-2xl font-bold text-[#4A4458]">
                    {session.subject}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    {session.duration_minutes} minutos
                  </p>

                  <button
                    onClick={() => deleteSession(session._id)}
                    className="mt-5 bg-pink-400 hover:bg-pink-500 transition-all text-white px-5 py-3 rounded-2xl font-bold"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default StudySessions;