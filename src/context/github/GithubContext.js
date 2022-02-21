import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Get initial users (testing purposes)
    const fetchUsers = async () => {
        setLoading()

        const response = await fetch(`https://api.github.com/users`
        // , {
        //     headers: {
        //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        //     }
        // }
        )

        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    // Set Loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext