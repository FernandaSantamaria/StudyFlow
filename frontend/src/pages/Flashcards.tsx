import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: string;
  user_id: number;
}

function Flashcards() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [cards, setCards] = useState<Flashcard[]>([]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [subject, setSubject] = useState("");

  const [difficulty, setDifficulty] = useState("facil");

  const fetchFlashcards = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/mongo/flashcards"
    );

    const data = await response.json();

    setCards(
      data.filter(
        (card: Flashcard) =>
          card.user_id === user.id
      )
    );
  };

  const createFlashcard = async () => {

    if (!question || !answer || !subject) return;

    await fetch(
      "http://127.0.0.1:8000/mongo/flashcards",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question,
          answer,
          subject,
          difficulty,
          user_id: user.id,
        }),
      }
    );

    setQuestion("");
    setAnswer("");
    setSubject("");
    setDifficulty("facil");

    fetchFlashcards();
  };

  const deleteFlashcard = async (id: string) => {

    await fetch(
      `http://127.0.0.1:8000/mongo/flashcards/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchFlashcards();
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const easyCards = cards.filter(
    (card) => card.difficulty === "facil"
  ).length;

  const mediumCards = cards.filter(
    (card) => card.difficulty === "medio"
  ).length;

  const hardCards = cards.filter(
    (card) => card.difficulty === "dificil"
  ).length;

  const difficultyStyle = (
    difficulty: string
  ) => {

    if (difficulty === "dificil") {
      return "bg-pink-100 text-pink-500";
    }

    if (difficulty === "medio") {
      return "bg-orange-100 text-orange-500";
    }

    return "bg-[#F1EAFF] text-[#7E57C2]";
  };

  return (

    <div className="min-h-screen bg-[#F7F4FF] flex">

      <Sidebar
        title="Flashcards"
        icon="🧠"
      />

      <main className="flex-1 p-10">

        <section className="bg-[#DCCBFF] rounded-3xl p-8 shadow-lg flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-[#4A4458]">
              Flashcards 🧠
            </h1>

            <p className="mt-3 text-gray-600">
              Crea tarjetas de estudio para repasar conceptos importantes.
            </p>

          </div>

          <div className="text-7xl">
            💭
          </div>

        </section>

        <section className="grid grid-cols-4 gap-6 mt-8">

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h3 className="text-gray-500">
              Total de tarjetas
            </h3>

            <p className="text-4xl font-bold text-[#7E57C2] mt-2">
              {cards.length}
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h3 className="text-gray-500">
              Fácil
            </h3>

            <p className="text-4xl font-bold text-[#7E57C2] mt-2">
              {easyCards}
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h3 className="text-gray-500">
              Intermedio
            </h3>

            <p className="text-4xl font-bold text-orange-400 mt-2">
              {mediumCards}
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h3 className="text-gray-500">
              Difícil
            </h3>

            <p className="text-4xl font-bold text-pink-400 mt-2">
              {hardCards}
            </p>

          </div>

        </section>

        <section className="grid grid-cols-2 gap-8 mt-10">

          <div className="bg-white rounded-3xl p-8 shadow-lg">

            <h2 className="text-2xl font-bold text-[#4A4458] mb-6">
              Nueva Flashcard ✨
            </h2>

            <div className="flex flex-col gap-4">

              <input
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
                placeholder="Pregunta"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <textarea
                value={answer}
                onChange={(e) =>
                  setAnswer(e.target.value)
                }
                placeholder="Respuesta"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <input
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder="Materia"
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              />

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                className="p-4 rounded-2xl border border-gray-200 outline-none"
              >

                <option value="facil">
                  Fácil
                </option>

                <option value="medio">
                  Intermedio
                </option>

                <option value="dificil">
                  Difícil
                </option>

              </select>

              <button
                onClick={createFlashcard}
                className="bg-[#B799FF] hover:bg-[#a684f5] transition-all text-white p-4 rounded-2xl font-bold"
              >
                Crear Flashcard
              </button>

            </div>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center">

            <h2 className="text-2xl font-bold text-[#4A4458]">
              Tarjetas de estudio
            </h2>

            <p className="text-6xl font-bold text-[#7E57C2] mt-6">
              {cards.length}
            </p>

            <p className="text-gray-500 mt-2">
              tarjetas guardadas en MongoDB
            </p>

            <div className="mt-6 bg-[#F1EAFF] rounded-2xl p-4 text-[#7E57C2] font-semibold">
              Tip: usa flashcards para conceptos cortos y preguntas directas ✨
            </div>

          </div>

        </section>

        <section className="mt-10">

          <h2 className="text-3xl font-bold text-[#4A4458] mb-6">
            Tus Flashcards
          </h2>

          {cards.length === 0 ? (

            <div className="bg-white rounded-3xl p-8 shadow-lg text-gray-500">
              Aún no tienes flashcards. Crea una arriba ✨
            </div>

          ) : (

            <div className="grid grid-cols-3 gap-6">

              {cards.map((card) => (

                <div
                  key={card._id}
                  className="bg-white p-6 rounded-3xl shadow-lg"
                >

                  <div className="text-4xl mb-4">
                    💭
                  </div>

                  <span
                    className={`inline-block text-sm font-bold px-4 py-2 rounded-full ${difficultyStyle(
                      card.difficulty
                    )}`}
                  >

                    {card.subject} · {card.difficulty}

                  </span>

                  <h3 className="text-xl font-bold text-[#4A4458] mt-5">
                    {card.question}
                  </h3>

                  <p className="mt-4 text-gray-600">
                    {card.answer}
                  </p>

                  <button
                    onClick={() =>
                      deleteFlashcard(card._id)
                    }
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

export default Flashcards;