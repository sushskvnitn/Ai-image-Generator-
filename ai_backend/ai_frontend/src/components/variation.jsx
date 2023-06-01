import React, { useState, useEffect } from "react";

const Variation = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async () => {
    try {
      const response = await fetch("/generateAiImage", {
        method: "POST",
        body: selectedImage,
      });
      const data = await response.json();
      const { imageUrl } = data;

      setImageUrl(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };
  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  return (
    <div className="">
      <div className="">
        <div class="input-group">
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              onChange={handleImageSelect}
              id="inputGroupFile04"
            />
            <label class="custom-file-label" for="inputGroupFile04">
              Choose file
            </label>
          </div>
          <div class="input-group-append">
            <button
              class="btn btn-primary"
              onClick={handleImageUpload}
              type="button"
            >
              Button
            </button>
          </div>
        </div>
        {imageUrl && (
          <div className="mt-4">
            <img src={imageUrl} alt="Genmage" className="img-fluid" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Variation;
