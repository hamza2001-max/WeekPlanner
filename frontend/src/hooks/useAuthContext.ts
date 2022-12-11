import {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw Error("The context must be use inside of the provider.");
    }
  return context;
}
