import { createContext, useReducer } from 'react';
import { resolvePath } from 'react-router-dom';
import githubReducer from './GithubReducer';

const GithubContext = createContext()

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
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

    // Get single user
    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`https://api.github.com/users/${login}`)

        if(response.status === 404) {
            window.loacation = '/notfound'
        } else {
            const data = await response.json()

            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }        
    }

    // Clear users from state
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

    // Set Loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext