import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface Notification {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  user_id: number;
}

function Notifications() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const fetchNotifications = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/mongo/notifications"
    );

    const data = await response.json();

    setNotifications(
      data.filter(
        (item: Notification) =>
          item.user_id === user.id
      )
    );
  };

  const createNotification = async () => {

    if (!title || !message) return;

    await fetch(
      "http://127.0.0.1:8000/mongo/notifications",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          message,
          read: false,
          user_id: user.id,
        }),
      }
    );

    setTitle("");
    setMessage("");

    fetchNotifications();
  };

  const deleteNotification = async (id: string) => {

    await fetch(
      `http://127.0.0.1:8000/mongo/notifications/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const totalNotifications =
    notifications.length;

  const unreadNotifications =
    notifications.filter(
      (item) => !item.read
    ).length;

  const readNotifications =
    notifications.filter(
      (item) => item.read
    ).length;

  return (

    <div className="min-h-screen bg-[#F7F4FF] flex">

      <Sidebar
        title="Notificaciones"
        icon="🔔"
      />

      <main className="flex-1 p-10">

        <section className="bg-[#DCCBFF] rounded-3xl p-8 shadow-lg flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-[#4A4458]">
              Notificaciones 🔔
            </h1>

            <p className="mt-3 text-gray-600">
              Crea avisos rápidos para tareas, materias o sesiones de estudio.
            </p>

          </div>

          <div className="text-7xl">
            📢
          </div>

        </section>

        <section className="grid grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h3 className="text-gray-500">
              Total
            </h3>

            <p className="text-4xl font-bold text-[#7E57C2] mt-2">
              {totalNotifications}
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h3 className="text-gray-500">
              Pendientes
            </h3>

            <p className="text-4xl font-bold text-pink-400 mt-2">
              {unreadNotifications}
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h3 className="text-gray-500">
              Revisadas
            </h3>

            <p className="text-4xl font-bold text-orange-400 mt-2">
              {readNotifications}
            </p>

          </div>

        </section>

        <section className="grid grid-cols-2 gap-8 mt-10">

          <div className="bg-white rounded-3xl p-8 shadow-lg">

            <h2 className="text-2xl font-bold text-[#4A4458] mb-6">
              Nueva notificación ✨
            </h2>

            <div className="flex flex-col gap-4">

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Título de la notificación"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Mensaje"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <button
                onClick={createNotification}
                className="bg-[#B799FF] hover:bg-[#a684f5] text-white p-4 rounded-2xl font-bold transition-all"
              >
                Crear notificación
              </button>

            </div>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center">

            <h2 className="text-2xl font-bold text-[#4A4458]">
              Avisos activos
            </h2>

            <p className="text-6xl font-bold text-[#7E57C2] mt-6">
              {unreadNotifications}
            </p>

            <p className="text-gray-500 mt-2">
              notificaciones sin leer
            </p>

            <div className="mt-6 bg-[#F1EAFF] rounded-2xl p-4 text-[#7E57C2] font-semibold">
              Usa este módulo para avisos rápidos y recordatorios académicos ✨
            </div>

          </div>

        </section>

        <section className="mt-10">

          <h2 className="text-3xl font-bold text-[#4A4458] mb-6">
            Tus notificaciones 📨
          </h2>

          {notifications.length === 0 ? (

            <div className="bg-white rounded-3xl p-8 shadow-lg text-gray-500">
              Aún no tienes notificaciones.
            </div>

          ) : (

            <div className="grid grid-cols-3 gap-6">

              {notifications.map((item) => (

                <div
                  key={item._id}
                  className="bg-white p-6 rounded-3xl shadow-lg"
                >

                  <div className="text-4xl mb-4">
                    🔔
                  </div>

                  <h3 className="text-2xl font-bold text-[#4A4458]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    {item.message}
                  </p>

                  <span className="inline-block mt-4 text-sm bg-[#F1EAFF] text-[#7E57C2] px-4 py-2 rounded-full">

                    {item.read
                      ? "Leída"
                      : "Pendiente"}

                  </span>

                  <button
                    onClick={() =>
                      deleteNotification(item._id)
                    }
                    className="mt-5 bg-pink-400 hover:bg-pink-500 transition-all text-white px-5 py-3 rounded-2xl font-bold block"
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

export default Notifications;