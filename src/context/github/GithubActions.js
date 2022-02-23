import axios from 'axios'

const github = axios.create({
    baseURL: 'https://api.github.com'
})

// Get search results
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    })

    const response = await github.get(`/search/users?${params}`)
    return response.data.items
}

// Get user and repos
export const getUserAndRepos = async(login) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`users/${login}/repos?${params}`)
    ])

    return { user: user.data, repos: repos.data}
}