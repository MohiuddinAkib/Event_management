import React from "react"
import axios from "axios";

export const useFetchResources = () => {
    const [rooms, setRooms] = React.useState<{ id: number; color: string; text: string }[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true)
        axios.get(window.route("room.dropdown.list")).then(response => {
            const rooms = response.data
            setRooms(rooms)
        })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return {
        data: rooms,
        loading
    }
}
