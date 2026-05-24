import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface Subject {
  id: number;
  name: string;
  user_id: number;
}

function Subjects() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState("");

  const fetchSubjects = async () => {
    const response = await fetch("http://127.0.0.1:8000/subjects");
    const data = await response.json();

    setSubjects(
      data.filter((subject: Subject) => subject.user_id === user.id)
    );
  };

  const createSubject = async () => {
    if (!name) return;

    await fetch("http://127.0.0.1:8000/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        user_id: user.id,
      }),
    });

    setName("");
    fetchSubjects();
  };

  const deleteSubject = async (id: number) => {
    await fetch(`http://127.0.0.1:8000/subjects/${id}`, {
      method: "DELETE",
    });

    fetchSubjects();
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4FF] flex">
      <Sidebar title="Materias" icon="📚" />

      <main className="flex-1 p-10">
        <section className="bg-[#DCCBFF] rounded-3xl p-8 shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#4A4458]">
              Materias 📖
            </h1>

            <p className="mt-3 text-gray-600">
              Organiza tus materias y áreas de estudio.
            </p>
          </div>

          <div className="text-7xl">📘</div>
        </section>

        <section className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Total de materias</h3>

            <p className="text-4xl font-bold text-[#7E57C2] mt-2">
              {subjects.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Materias activas</h3>

            <p className="text-4xl font-bold text-pink-400 mt-2">
              {subjects.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Usuario</h3>

            <p className="text-2xl font-bold text-orange-400 mt-3">
              {user.username || "Estudiante"}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8 mt-10">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#4A4458] mb-6">
              Crear materia ✨
            </h2>

            <div className="flex flex-col gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de la materia"
                className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <button
                onClick={createSubject}
                className="bg-[#B799FF] hover:bg-[#a684f5] transition-all text-white p-4 rounded-2xl font-bold w-full"
              >
                Crear materia
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#4A4458]">
              Biblioteca de materias
            </h2>

            <p className="text-6xl font-bold text-[#7E57C2] mt-6">
              {subjects.length}
            </p>

            <p className="text-gray-500 mt-2">
              materias guardadas en PostgreSQL
            </p>

            <div className="mt-6 bg-[#F1EAFF] rounded-2xl p-4 text-[#7E57C2] font-semibold">
              Consejo: separa tus tareas por materia para organizar mejor tu estudio.
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-[#4A4458] mb-6">
            Tus materias 📚
          </h2>

          {subjects.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 shadow-lg text-gray-500">
              Aún no tienes materias registradas.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-white p-6 rounded-3xl shadow-lg"
                >
                  <div className="text-4xl mb-4">📘</div>

                  <h3 className="text-2xl font-bold text-[#4A4458]">
                    {subject.name}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    ID de materia: {subject.id}
                  </p>

                  <button
                    onClick={() => deleteSubject(subject.id)}
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

export default Subjects;