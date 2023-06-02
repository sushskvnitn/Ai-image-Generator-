
// https://www.smashingmagazine.com/2021/06/image-text-conversion-react-tesseract-js-ocr
import { useState} from 'react';
import Tesseract from 'tesseract.js';
import './imagetotext.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [showloading, setshowloading] = useState(false);
  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  }
 
  const handleClick = () => {
    setshowloading(true);
    setText("");
    Tesseract.recognize(
      imagePath,'eng',
      { 
        logger: m => console.log(m) 
      }
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
      // Get Confidence score
      console.log(result.data.text);
      let confidence = result.confidence
      setshowloading(false)
      let text = result.data.text
      setText(text);
    })
  }
 
  return (
    <div className="App1">
      <main className="App-main">
        <h3>Image Uploaded</h3>
        {imagePath &&<img 
           src={imagePath} className="App-image" alt="logo"/>
        }
          <h3>Extracted text</h3>
        <div className="text-box">
          <p> {text} </p>
          {text && <CopyToClipboard text={text}>
  <button className="btn btn-small btn-secondary">Copy </button>
</CopyToClipboard>}
          {showloading && <div className="spinner-border " role="status"> <span className="visually-hidden">Loading...</span>  </div> }
        </div>
        <div className="d-flex justify-content-center">
        <input type="file" className="my-2 custom-file-input" onChange={handleChange} />
        <button  className=" my-1 btn btn-sm btn-secondary"onClick={handleClick} style={{height:50}}> convert to text</button>
     </div> </main>
    </div>
  );
}
 
export default App
