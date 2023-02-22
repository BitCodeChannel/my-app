import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [image,setImage] = useState(null)
  const [imageURL,setImageURL] = useState(null)

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("image",image);
    await axios.post('http://localhost:3001/upload',formData)
  }

  const fetchData =async () => {
    const response = await fetch('http://localhost:3001/images/1')
    if(response.ok){
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setImageURL(url)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  
  return (
   <>
   <form onSubmit={handleSubmit}>
    <input type="file" onChange={handleImageChange}/>
    <button type="submit">Upload</button>
   </form>
   <img src={imageURL} alt="downloaded image" width="200px"/>
   </>
  );
}

export default App;