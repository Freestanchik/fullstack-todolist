const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/registration',
    [
        check('email', 'Неправильний email').isEmail(),
        check('password', 'Неправильний пароль').isLength({min: 6})
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неправильні дані при реєстрації'
                })
            }

            const {email, password} = req.body

            const isUsed = await User.findOne({email})

            if (isUsed) {
                return res.status(300).json({message: 'Такий Email вже зайнято.'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({
                email, password: hashedPassword
            })

            await user.save()

            res.status(201).json({message: 'Користувача створено'})
        } catch (error) {
            console.log(error)
        }
    })

router.post('/login',
    [
        check('email', 'Неправильний email').isEmail(),
        check('password', 'Неправильний пароль').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неправильні дані при авторизації'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: ' Такого Email немає в базі даних'})
            }

            const isMatch = bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: ' Паролі не однакові'})
            }

            const jwtSecret = 'ey8teviuberuvt456345geuveuvtguysvg6w7t467f3gvsgfsu'

            const token = jwt.sign(
                {userId: user.id},
                jwtSecret,
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        } catch (error) {
            console.log(error)
        }
    })

module.exports = router
