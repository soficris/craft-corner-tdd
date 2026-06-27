import express from "express"; 
import * as tutorialController from "./tutorialController"; 
const router = express.Router(); 

router.post("/", tutorialController.create); 
router.delete("/:id", tutorialController.remove); 

export default router; 