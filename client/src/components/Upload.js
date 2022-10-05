import { useMutation } from "@apollo/client";
import { UPLOAD, FILE_UPLOAD } from "../api/uploadApi";

const Upload = () => {
    const [ upload ] = useMutation(FILE_UPLOAD)

    const handleUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        upload({ variables: { file }})
    }

    return (
        <>
            <input type="file" onChange={handleUpload}/>
        </>
    )
}
export default Upload;