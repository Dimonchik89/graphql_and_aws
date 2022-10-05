import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../api/userApi";

const UserList = () => {
    const { data, loading, error } = useQuery(GET_USERS)

    if(loading) {
        return <h2>Loading...</h2>
    }

    if(error) {
        return <h2>Error</h2>
    }

    const content = data?.getUsers.map(item => <div key={item.id}>
        <img src={item.photo} />
        <span>{item.id}</span>
        <span>{item.name}</span>
    </div>)
 
    return (
        <>
            {content}
        </>
    )
}
export default UserList;