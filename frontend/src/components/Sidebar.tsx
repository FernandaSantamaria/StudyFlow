import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  title: string;
  icon: string;
}

function Sidebar({ title, icon }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { label: "Panel principal", path: "/dashboard" },
    { label: "Tareas", path: "/tasks" },
    { label: "Materias", path: "/subjects" },
    { label: "Sesiones de estudio", path: "/study-sessions" },
    { label: "Flashcards", path: "/flashcards" },
    { label: "Notificaciones", path: "/notifications" },
    { label: "Metas de estudio", path: "/study-goals" },
    { label: "Material de apoyo", path: "/resources" },
  ];

  return (
    <aside className="w-[260px] bg-[#B799FF] min-h-screen p-6 text-white shadow-2xl">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center text-5xl shadow-md">
          {icon}
        </div>

        <h2 className="mt-4 text-2xl font-bold">
          Hola, {user.username || "Estudiante"} 👋
        </h2>

        <p className="text-sm opacity-80">{title}</p>
      </div>

      <nav className="mt-10 flex flex-col gap-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={
                isActive
                  ? "bg-white text-[#7E57C2] p-3 rounded-2xl font-bold shadow"
                  : "bg-[#C9B3FF] hover:bg-white hover:text-[#7E57C2] transition-all p-3 rounded-2xl"
              }
            >
              {item.label}
            </button>
          );
        })}

        <button
          onClick={logout}
          className="mt-6 bg-white text-[#7E57C2] p-3 rounded-2xl font-bold shadow"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;