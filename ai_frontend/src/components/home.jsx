import React, { useEffect,useState } from 'react';

const Home = () => {
  const [imageUrl, setimageUrl] = useState("");
  useEffect(() => {
    function onSubmit(e) {
      e.preventDefault();
      document.querySelector('.msg').textContent = '';
      document.querySelector('#image').src = '';
      const prompt = document.querySelector('#prompt').value;
      const size = document.querySelector('#size').value;
      if (prompt === '') {
        alert('Please add some text');
        return;
      }
      generateImageRequest(prompt, size);
    }
    async function generateImageRequest(prompt, size) {
      try {
        showSpinner();
        const response = await fetch('/generateimage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            size,
          }),
        });
        if (!response.ok) {
          removeSpinner();
          throw new Error('That image could not be generated');
        }
        const data = await response.json();
        const imageUrl = data.data;
        setimageUrl(imageUrl);
        document.querySelector('#image').src = imageUrl;
        removeSpinner();
      } catch (error) {
        document.querySelector('.msg').textContent = error;
      }
    }
    function showSpinner() {
      document.querySelector('.spinner').classList.add('show');
    }
    function removeSpinner() {
      document.querySelector('.spinner').classList.remove('show');
    }
    const imageForm = document.querySelector('#image-form');
    if (imageForm) {
      imageForm.addEventListener('submit', onSubmit);
    }
    return () => {
      // Clean up event listener
      if (imageForm) {
        imageForm.removeEventListener('submit', onSubmit);
      } };
  }, []);
   function downloadImage(imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'image.jpg';
      link.click();
    }

    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container">
              <a className="navbar-brand" href="/">
                OpenAI Image Generator
              </a>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://beta.openai.com/docs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenAI API Docs
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
  
        <main>
          <section className="showcase">
            <div className="container">
              <form id="image-form">
                <h1>Describe An Image</h1>
                <div className="form-group">
                  <input
                    type="text"
                    id="prompt"
                    className="form-control"
                    placeholder="Enter Text"
                  />
                </div>
                {/* Size */}
                <div className="form-group">
                  <select className="form-control" name="size" id="size">
                    <option value="small">Small</option>
                    <option value="medium" defaultValue>
                      Medium
                    </option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Generate
                </button>
              </form>
            </div>
          </section>
  
          <section className="image">
            <div className="container">
              <div className="image-container">
                <h2 className="msg">Ai Image Generator</h2>
                <img
                  src=""
                  alt=""
                  id="image"
                  className="img-fluid"
                  onClick={(e) => downloadImage(imageUrl)}
                />
              </div>
            </div>
          </section>
        </main>
  
        <div className="spinner"></div>
      </div>
    );
  };
  
  export default Home;