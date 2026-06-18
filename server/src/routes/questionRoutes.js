import { Router } from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions
} from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);

router.route("/").get(getQuestions).post(createQuestion);
router.route("/:id").get(getQuestionById).delete(deleteQuestion);

export default router;
