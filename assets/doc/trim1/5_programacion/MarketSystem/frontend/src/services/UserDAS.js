import axios from "axios"

const URI = 'http://localhost:5411/api'

export const getOneUser = async (id) => {
    return await axios.get(`${URI}/user/id/${id}`)
}

export const getAllUser = async () => {
    return await axios.get(`${URI}/users`)
}

export const userInfo = async () => {
    const getPermissions = axios.get()
    const getPasswords = axios.get()
    const gottenData = {
        permisos: getPermissions,
        contrasenas: getPasswords,
    }

    return gottenData;
    
    res.status(200).send({msg: 'ok', data: { permissions: data.permisos, passwords: data.contrasenas}})

}