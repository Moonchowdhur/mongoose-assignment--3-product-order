import  express  from "express";
import { ProductController } from "./product.controller";

const router=express.Router()

// produt router
router.post("/", ProductController.createProduct )
router.get("/", ProductController.getAllProduct )
router.get("/:productId", ProductController.getSingleProduct )
router.put("/:productId", ProductController.updateSingleProduct )
router.delete("/:productId", ProductController.deleteSingleProduct )



export const ProdutRoute=router