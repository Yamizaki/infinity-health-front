import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendExerciseProgress } from "../services/exerciseProgressService"; // Asegúrate de que la ruta sea correcta

interface Props {
  exerciseId: number | string;
}

export default function ExerciseProgressForm({ exerciseId }: Props) {
  const [tab, setTab] = useState<"registro" | "comentarios">("registro");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendExerciseProgress({
        exerciseId,
        repetitions: reps,
        weight,
        comment,
        date: new Date().toISOString(),
      });
      toast.success("Registro Guardado");
      setReps("");
      setWeight("");
      setComment("");
    } catch (error) {
      toast.error("Error al guardar el progreso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 max-w-3xl mx-auto mb-4"
    >
      {/* Tabs */}
      <div
        className="flex flex-wrap border-b border-gray-200 mb-4
            text-sm font-semibold 
            sm:px-3 sm:py-2 sm:text-sm
            md:px-4 md:py-2 md:text-base"
      >
        <button
          type="button"
          className={`
            px-2 py-1 transition
            ${
              tab === "registro"
                ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                : "text-gray-500"
            }
          `}
          onClick={() => setTab("registro")}
        >
          Registra tu progreso
        </button>
        <button
          type="button"
          className={`ml-2 sm:ml-4 px-2 py-1 transition ${
            tab === "comentarios"
              ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
              : "text-gray-500"
          }`}
          onClick={() => setTab("comentarios")}
        >
          Comentarios
        </button>
      </div>

      {/* Formulario */}
      {tab === "registro" ? (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-600 text-sm sm:text-base mb-1">
              Repeticiones
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-[var(--color-primary)]"
              placeholder="12 repeticiones"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 text-sm sm:text-base mb-1">
              Peso
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-[var(--color-primary)]"
              placeholder="2 kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-gray-600 text-sm sm:text-base mb-1">
            Comentario
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-[var(--color-primary)]"
            placeholder="Agrega un comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      )}

      {/* Botón */}
      <button
        type="submit"
        className="w-full mt-2 py-2 sm:py-3 rounded-full text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2 shadow"
        style={{ background: "var(--gradient-primary)" }}
        disabled={loading}
      >
        {loading ? "Guardando..." : "Registrar Progreso"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </button>
    </form>
  );
}
