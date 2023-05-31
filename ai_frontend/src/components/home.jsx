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
        <div className="navbar">
          <div className="logo">
            <h2>OpenAI Image Genrator</h2>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <a rel="noreferrer" href="https://beta.openai.com/docs" target="_blank">
                  OpenAI API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section className="showcase">
          <form id="image-form">
            <h1>Describe An Image</h1>
            <div className="form-control">
              <input type="text" id="prompt" placeholder="Enter Text" />
            </div>
            {/* size */}
            <div className="form-control">
              <select name="size" id="size">
                <option value="small">Small</option>
                <option value="medium" selected>Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button type="submit" className="btn">Generate</button>
          </form>
        </section>

        <section className="image">
          <div className="image-container">
            <h2 className="msg"> Ai Image Generator </h2>
           <img src="" alt="" id="image"  onClick={(e) => downloadImage(imageUrl)} />  
          </div>
        </section>
      </main>
      <div className="spinner"></div>
    </div>
  );
};

export default Home;
