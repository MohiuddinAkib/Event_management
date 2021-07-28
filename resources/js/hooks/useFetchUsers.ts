import React from "react"
import axios from "axios";

export const useFetchUsers = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true)
        axios.get(window.route("users.dropdown.list")).then(response => {
            const users = response.data
            setUsers(users)
        })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return {
        data: users,
        loading
    }
}
