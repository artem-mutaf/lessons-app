export default function LessonList({lessons, onEdit, onDelete}) {
    return(
        <div>
            <h2>Список уроков</h2>

            {lessons.length === 0 && <p>Уроков пока нет</p>}

            <ul>
                {lessons.map((lesson) =>(
                    <li key={lesson.id}>
                        <b>{lesson.title}</b> ({lesson.duration} мин)
                        <br/>
                        {lesson.description}
                        <br/>
                        <button onClick={() => onEdit(lesson)}>Редактировать</button>
                        <button onClick={() => onDelete(lesson.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}