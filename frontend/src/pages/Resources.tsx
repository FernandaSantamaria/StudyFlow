import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { API_URL } from "../config/api";


interface Resource {
  _id: string;
  title: string;
  url: string;
  subject: string;
  user_id: number;
}

function Resources() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [subject, setSubject] = useState("");

  const fetchResources = async () => {
    const response = await fetch(`${API_URL}/mongo/resources`);
    const data = await response.json();

    setResources(
      data.filter((resource: Resource) => resource.user_id === user.id)
    );
  };

  const createResource = async () => {
    if (!title || !url || !subject) return;

    await fetch(`${API_URL}/mongo/resources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        url,
        subject,
        user_id: user.id,
      }),
    });

    setTitle("");
    setUrl("");
    setSubject("");
    fetchResources();
  };

  const deleteResource = async (id: string) => {
    await fetch(`${API_URL}/mongo/resources/${id}`, {
      method: "DELETE",
    });

    fetchResources();
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const subjectCount = new Set(
    resources.map((resource) => resource.subject)
  ).size;

  return (
    <div className="min-h-screen bg-[#F7F4FF] flex">
      <Sidebar title="Material de apoyo" icon="🔗" />

      <main className="flex-1 p-10">
        <section className="bg-[#DCCBFF] rounded-3xl p-8 shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#4A4458]">
              Material de apoyo 🔗
            </h1>

            <p className="mt-3 text-gray-600">
              Guarda enlaces, documentación y materiales útiles para estudiar.
            </p>
          </div>

          <div className="text-7xl">📎</div>
        </section>

        <section className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Recursos</h3>

            <p className="text-4xl font-bold text-[#7E57C2] mt-2">
              {resources.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Materias</h3>

            <p className="text-4xl font-bold text-pink-400 mt-2">
              {subjectCount}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-gray-500">Enlaces guardados</h3>

            <p className="text-4xl font-bold text-orange-400 mt-2">
              {resources.length}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8 mt-10">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#4A4458] mb-6">
              Nuevo recurso ✨
            </h2>

            <div className="flex flex-col gap-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título del material de apoyo"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Materia"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <button
                onClick={createResource}
                className="bg-[#B799FF] hover:bg-[#a684f5] text-white p-4 rounded-2xl font-bold transition-all"
              >
                Guardar recurso
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#4A4458]">
              Biblioteca de recursos
            </h2>

            <p className="text-6xl font-bold text-[#7E57C2] mt-6">
              {resources.length}
            </p>

            <p className="text-gray-500 mt-2">
              recursos guardados
            </p>

            <div className="mt-6 bg-[#F1EAFF] rounded-2xl p-4 text-[#7E57C2] font-semibold">
              Consejo: guarda documentación, repositorios, videos o lecturas importantes.
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-[#4A4458] mb-6">
            Tu material 📚
          </h2>

          {resources.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 shadow-lg text-gray-500">
              Aún no tienes recursos guardados.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {resources.map((resource) => (
                <div
                  key={resource._id}
                  className="bg-white p-6 rounded-3xl shadow-lg"
                >
                  <div className="text-4xl mb-4">🔗</div>

                  <p className="text-sm text-[#7E57C2] font-bold">
                    {resource.subject}
                  </p>

                  <h3 className="text-2xl font-bold text-[#4A4458] mt-2">
                    {resource.title}
                  </h3>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 mt-4 block font-semibold"
                  >
                    Abrir recurso
                  </a>

                  <button
                    onClick={() => deleteResource(resource._id)}
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

export default Resources;