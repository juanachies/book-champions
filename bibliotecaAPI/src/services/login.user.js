import { User } from "../models/User";
import { validateLoginUser } from "../helpers/validations";

export const loginUser = async (req,res) => {
    const {email, password} = req.body;

    const result = validateLoginUser(req.body);

    if (result.error)
        return res.status(400).send({message: result.message})

    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user)
        return res.status(401).send({message: 'Usuario no existente'});

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison)
        return res.status(401).send({ message: 'Email y/o contraseña incorrecta' })

    // Generar token
    const secretKey = 'programacion3-2025';

    const token = jwt.sign({email}, secretKey, {expiresIn: '1h'});

    return res.json({token})
}
