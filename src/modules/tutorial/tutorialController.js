import * as tutorialService from "./tutorialService"; 
import Tutorial from "./tutorialModel"; 

export async function create(req, res) {
    try {
        const tutorial = await tutorialService.createTutorial(
            req.body,
            Tutorial
        );
        return res.status(201).json(tutorial);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

export async function remove(req, res) {
    try {
        const result = await tutorialService.deleteTutorial(
            req.params.id,
            Tutorial
        );
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            error: error.message
        });
    }
}