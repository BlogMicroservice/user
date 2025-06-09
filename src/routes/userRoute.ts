import express from "express"
import { CheckUserName } from "../controllers/userName"
import { createProfile } from "../controllers/createProfile"
import { getProfile } from "../controllers/getProfile"
export const route=express.Router()
route.get("/username/check",CheckUserName)
route.post("/create-profile",createProfile)
route.get("/profile/:id",getProfile)