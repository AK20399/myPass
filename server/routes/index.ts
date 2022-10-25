import express from 'express'
import { mfa } from './mfa'
import {user} from './user'

const router = express.Router()

router.use('/',user)
router.use('/mfa',mfa)


export { router }