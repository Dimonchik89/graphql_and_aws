import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER, GET_USERS } from "../../api/userApi";
import { nanoid } from 'nanoid'

const UserForm = () => {
    const [name, setName] = useState("")
    const [photo, setPhoto] = useState(null);
    const [createUser, { data }] = useMutation(CREATE_USER, {
        refetchQueries: [
            {query: GET_USERS},
            "getUsers"
        ]
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(photo);
        createUser({
            variables: {
                input: {
                    id: nanoid(),
                    name,
                    photo
                }
            }
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <input
                type="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="file"
                onChange={e => setPhoto(e.target.files[0])}
            />
            <button
                type="submit"
            >
                Send
            </button>
        </form>
    )
}
export default UserForm;