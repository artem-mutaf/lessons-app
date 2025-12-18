import {useState} from "react";
import "./LessonForm.css";

export default function LessonForm({ onSubmit, selectedLesson }) {
    const [title, setTitle] = useState(selectedLesson?.title || "");
    const [description, setDescription] = useState(selectedLesson?.description || "");
    const [duration, setDuration] = useState(selectedLesson?.duration || "");
    const [error, setError] = useState("");

    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !description || duration <= 0) {
            setError("Заполните все поля корректно");
            return;
        }

        setError("");

        onSubmit({
            title,
            description,
            duration: Number(duration),
        });

        setTitle("");
        setDescription("");
        setDuration("");
    };

    return (
        <form className="lesson-form" onSubmit={handleSubmit}>
            <h2>{selectedLesson ? "Редактировать урок" : "Создать урок"}</h2>

            {error && <p style={{color: "red"}}>{error}</p>}

            <input
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            <br />

            <textarea 
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            
            <br />

            <input
            type="number"
            placeholder="Длительность (мин)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)} 
            />

            <br />

            <button type="submit">
                {selectedLesson ? "Сохранить" : "Создать"}
            </button>
        </form>
    )
}