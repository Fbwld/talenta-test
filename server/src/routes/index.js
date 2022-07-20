const express = require('express')
const router = express.Router()
const{auth} =require('../middlewares/auth')
const { addMember, getMembers, getMember, updateMember, deleteMember } = require('../controllers/member')
const { register, login, checkAuth } = require('../controllers/auth')
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')

router.post('/user', addUser)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.post('/member', addMember)
router.get('/members', getMembers)
router.get('/member/:id',  getMember)
router.patch('/member/:id',auth,  updateMember)
router.delete('/member/:id', deleteMember)

router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);


module.exports= router