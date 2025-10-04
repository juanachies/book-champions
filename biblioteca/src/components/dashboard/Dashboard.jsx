import { useEffect, useState } from "react";
import Books from "../library/books/Books";
import BookForm from "../library/bookForm/bookForm";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { Route, Routes } from "react-router";
import BookDetails from "../library/bookDetails/BookDetails";
import { successToast, errorToast } from "../ui/notifications/notifications";
import ToggleTheme from "../services/theme/toggleTheme/ToggleTheme";
const baseUrl = 'http://localhost:3000'

const Dashboard = ({ signedOut }) => {

  const [bookList, setBookList] = useState([]);

  const handleBookAdded = (enteredBook) => {
    // const bookData = {
    //   ...enteredBook,
    //   id: Math.random()
    // }
    // setBookList(prevBookList => [bookData, ...prevBookList])

    fetch(`${baseUrl}/books`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(enteredBook),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Error al crear el libro");
          });
        }
        return res.json();
      })

      .then((data) => {
        setBookList((prevBookList) => [data, ...prevBookList]);
        successToast(`Libro ${data.title} agregado correctamente`);
      })
      .catch((err) => errorToast(err.message));
  };

  const handleDeleted = (id) => {
    setBookList((prevBooks) => 
      prevBooks.filter((book) => book.id !== id)
    );
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    signedOut(false);
    navigate("/login");
  };

  const handleAddBook = () => {
    navigate("/library/add-book", { replace: true });
  };

  // para conectarse con la api
  const location = useLocation()
  useEffect(() => { 
    if (location.pathname === '/library'){ //para que cuando cambie la bd se muestre
      fetch(`${baseUrl}/books`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('book-champions-token')}`
        }
      })
        .then(async res => {
          if (!res.ok){
              const errData = await res.json();
              throw new Error(errData.message || 'Algo ha salido mal');
          }

          return res.json()
        })
        .then((data) => setBookList([...data]))
        .catch((err) => console.log(err));
    }
  }, [location]);


  return (
    <>
      <div className="d-flex justify-content-end p-3 gap-3">
        <ToggleTheme/>
        <Button onClick={handleAddBook}>Agregar libro</Button>
        <Button onClick={handleSignOut}>Cerrar Sesión</Button>
      </div>

      <div className="d-flex flex-column align-items-center">
        <h1>Book Champions</h1>
        <p>Quiero leer libros</p>
      </div>

      <Routes>
        <Route
          index
          element={<Books books={bookList} onDelete={handleDeleted} />}
        />
        <Route
          path="add-book"
          element={<BookForm onBookAdded={handleBookAdded} />}
        />
        <Route path=":id" element={<BookDetails />} />
      </Routes>
    </>
  );
};

export default Dashboard;
