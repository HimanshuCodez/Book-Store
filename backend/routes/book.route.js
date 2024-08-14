import express from 'express'
import { getBook } from '../controllers/book.controller.js'

const router=express.Router()

router.get("/",getBook)
export default router;
