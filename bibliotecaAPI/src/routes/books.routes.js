import { Router }   from "express";
import { createBook, deleteBook, findBook, findBooks, updateBook } from "../services/book.services.js";
import { verifyToken } from "../services/verify.token.js";

const router = Router();

router.get('/books', verifyToken, findBooks)
router.get('/books/:id', verifyToken, findBook)
router.post('/books', verifyToken, createBook)
router.put('/books/:id', verifyToken, updateBook)
router.delete('/books/:id', verifyToken, deleteBook)

export default router;