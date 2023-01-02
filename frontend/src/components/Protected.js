import { useHistory } from 'react-router-dom'

export const Protected = ({fileState, children}) => {
    const history = useHistory()

    if (fileState){
        return children
    }
    history.push("/")

    return 0;
}


