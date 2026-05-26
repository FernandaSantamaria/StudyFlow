import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";


function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } else {
      alert(data.detail || "Correo o contraseña incorrectos");
    }
  };

  const handleRegister = async () => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Usuario registrado correctamente");

      setIsRegister(false);

      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      alert(data.detail || "No se pudo registrar el usuario");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4FF] flex items-center justify-center p-8">

      <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <div className="bg-[#C8A8FF] p-10 flex flex-col justify-center items-center text-white">

          <div className="text-8xl mb-6">
            📚
          </div>

          <h1 className="text-4xl font-bold">
            StudyFlow
          </h1>

          <p className="mt-4 text-center opacity-90">
            Organiza tus tareas, materias y sesiones de estudio.
          </p>

        </div>

        <div className="p-12">

          <h2 className="text-4xl font-bold text-[#4A4458]">

            {isRegister
              ? "Crear cuenta ✨"
              : "Bienvenido de nuevo 💜"}

          </h2>

          <p className="text-gray-500 mt-3">

            {isRegister
              ? "Regístrate para comenzar"
              : "Inicia sesión para continuar"}

          </p>

          <div className="mt-8 flex flex-col gap-4">

            {isRegister && (

              <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

            )}

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-2xl border border-gray-200 outline-none"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 rounded-2xl border border-gray-200 outline-none"
            />

            <button
              onClick={isRegister ? handleRegister : handleLogin}
              className="bg-[#B799FF] hover:bg-[#a684f5] text-white p-4 rounded-2xl font-bold transition-all"
            >

              {isRegister
                ? "Registrarse"
                : "Iniciar sesión"}

            </button>

          </div>

          <p className="mt-6 text-center text-gray-500">

            {isRegister
              ? "¿Ya tienes cuenta?"
              : "¿No tienes cuenta?"}

            <button
              onClick={() => setIsRegister(!isRegister)}
              className="ml-2 text-[#8B5CF6] font-bold"
            >

              {isRegister
                ? "Iniciar sesión"
                : "Registrarse"}

            </button>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;