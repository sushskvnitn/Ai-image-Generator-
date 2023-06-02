import React,{useState,useRef} from 'react'

const Modal = ({selectedImage,setSelectedImage,handleImageUpload}) => {
    const [error, seterror] = useState(null);
    const ref= useRef(null);
    const closeModal = () => {
        setSelectedImage(null);
    }
    const checkImage =()=>{
        if(ref.current.width===256 && ref.current.height===256){
            handleImageUpload();
        }else{
            seterror("choose 256 x 256 px image")
        }
    }
  return (
    <div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-dark" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} ></button>
      </div>
      <div class="modal-body d-flex justify-content-center">
      {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="jik" height="256" width="256" />} 
      </div>

      <div class="modal-footer">
      <p className="text-secondary" >{error || "image should be 256 x 256 px image" }</p>
      { !error && <button type="button" class="btn btn-secondary" onClick={checkImage}>Generate</button>
     } 
     </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Modal