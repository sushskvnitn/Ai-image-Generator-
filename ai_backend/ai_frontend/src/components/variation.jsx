import React, { useState } from "react";
import Modal from "./Modal";
const Variation = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState("");

  const handleImageUpload = async () => {
    setImages(null);
    if(selectedImage===null){
      alert("Please select an image to go next!!");
      return;
    }
    try {
      const response = await fetch("/generateAiImage", {
        method: "POST"
      });
      const data = await response.json();
     console.log(data);
     setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageSelect = async(event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    setSelectedImage(event.target.files[0]);
    event.target.value = null;
    try {
      const options={
        method: "POST",
        body: formData,
      }
      const response = await fetch("/upload",options)
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="container">
      <span className="text-center">
          <label htmlFor="files">upload an image</label>
          <input id="files" data-bs-toggle="modal" data-bs-target="#exampleModal" onChange={handleImageSelect} className="form-input" accept="image/*" type="file" hidden/>

      </span>
      
      <Modal 
      selectedImage={selectedImage} 
      setSelectedImage={setSelectedImage}
      handleImageUpload={handleImageUpload}
      />
      {images && images.map((imgurl)=>{
        return(<img src={imgurl.url} alt="dkfmg"/>)
      })}
       </div>
  );
};

export default Variation;
