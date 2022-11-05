import {Router} from 'express';
import { sample_foods, sample_tags } from '../data';
import asyncHandler from 'express-async-handler';
import { FoodModel } from '../models/food.model';
const router = Router();

/* router.get("/seed", asyncHandler(
 async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if(foodsCount> 0){
      res.send("Seed is already done!");
      return;
    }

    await FoodModel.create(sample_foods);
    res.send("Seed Is Done!");
}
)) */


// router libreria para saber por que medio lo mando POST, DELETE, GET, PUT
// Post: Enviar un dato o objeto, Delete: Eliminar, Put: Actualizar, Get: Traer info
router.get("/",asyncHandler(
  async (req, res) => {
    const foods = await FoodModel.find();
      res.send(foods);
  }
))

// : en una api signfica que trae un parametro ( : )
// req: peticion del frontend, res: lo que devolvera el backend
router.get("/search/:searchTerm", asyncHandler(
  async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    console.log("🚀 ~ req.params.searchTerm", req.params.searchTerm)
    const foods = await FoodModel.find({name: {$regex:searchRegex}})
    res.send(foods);
  }
))

router.get("/tags", asyncHandler(
  async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind:'$tags'
      },
      {
        $group:{
          _id: '$tags',
          count: {$sum: 1}
        }
      },
      {
        $project:{
          _id: 0,
          name:'$_id',
          count: '$count'
        }
      }
    ]).sort({count: -1});

    const all = {
      name : 'All',
      count: await FoodModel.countDocuments()
    }

    tags.unshift(all);
    res.send(tags);
  }
))

router.get("/tag/:tagName",asyncHandler(
  async (req, res) => {
    const foods = await FoodModel.find({tags: req.params.tagName})
    res.send(foods);
  }
))

router.get("/:foodId", asyncHandler(
  async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
  }
))


export default router;