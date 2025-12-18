import { useEffect, useState, useCallback } from 'react'
import { lessonsApi } from './api/lessonsApi'
import LessonForm from './components/LessonForm'
import LessonList from './components/LessonList'
import './App.css'

function App() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const loadLessons = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await lessonsApi.getAll(page);

      if(response && response.data){
        setLessons(response.data);
        setCurrentPage(page);
      }
    } catch (err) {
      console.error("Ошибка при загрузке уроков:", err);
      setError("не удалось загрузить уроки")
    } finally {
      setLoading(false);
    }
    
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) {
      setLoading(true);
      try{
        const response = await lessonsApi.getAll();
        if(isMounted && response?.data) {
          setLessons(response.data);
        }
      } catch (err){
        if (isMounted) {
          setError("Ошибка загрузки уроков");
          console.error(err);
        }
      } finally {
        if(isMounted) {
          setLoading(false);
        }
      }
    }
  };
    
  fetchData();

  return () => {
    isMounted = false;
  };

  }, []);

  const handleCreateOrUpdate = async (lesson) => {
    if(selectedLesson) {
      await lessonsApi.update(selectedLesson.id, lesson);
      setSelectedLesson(null);
    } else {
      await lessonsApi.create(lesson);
    }

    loadLessons();
  }

  const handleDelete = async (id) => {
    if (window.confirm("Удалить урок?")) {
      await lessonsApi.delete(id);
      loadLessons();
    }
  }

  const handlePageChange = (newPage) => {
    loadLessons(newPage);
  };

  return (
    <div>
      <header>
        <h1>Каталог уроков</h1>
        {error && (
          <div>
            <span>{error}</span>
          </div>
        )}
      </header>
      <LessonForm 
      onSubmit={handleCreateOrUpdate}
      selectedLesson={selectedLesson}
      />

      <hr />

      <LessonList
      lessons={lessons}
      onEdit={setSelectedLesson}
      onDelete={handleDelete} 
      />
       <div>
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          Назад
        </button>
        <span> Страница {currentPage} </span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={loading}
        >
          Вперед
        </button>
        </div>
    </div>
  )
}

export default App