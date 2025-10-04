import {Bounce, toast} from 'react-toastify'

const defaultNotificationsConfig = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
}

export const errorToast = (message, config) => {
    return toast.error(message, {
        ...defaultNotificationsConfig,
        ...config
    })
}

export const successToast = (message, config) => {
    return toast.success(message, {
        ...defaultNotificationsConfig,
        ...config
    })
}