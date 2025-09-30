import { User } from "../models/User";
import bcrypt from bcrypt

export const registerUser = async (req,res) => {
    const {name, email, password} = req.body;

    const user = await User.findOne({
        where: {
            email
        }
    })

    if (user)
        return res.status(400).send({ message: 'Usuario existente' });

    //Hash de password
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name, 
        email,
        password: hashedPassword
    })

    res.json(newUser.id)
}