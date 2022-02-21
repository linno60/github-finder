import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Get search results
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`https://api.github.com/search/users?${params}`
        // , {
        //     headers: {
        //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        //     }
        // }
        )

        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    // Set Loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext