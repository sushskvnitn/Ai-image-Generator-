import React, { useEffect, useState } from 'react';

const Home = () => {
  const [imageUrl, setimageUrl] = useState('');
  const [showSpinner, setshowSpinner] = useState(false);

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
      setshowSpinner(true);
    }

    function removeSpinner() {
      setshowSpinner(false);
    }

    const imageForm = document.querySelector('#image-form');
    if (imageForm) {
      imageForm.addEventListener('submit', onSubmit);
    }

    return () => {
      // Clean up event listener
      if (imageForm) {
        imageForm.removeEventListener('submit', onSubmit);
      }
    };
  }, []);

  // const download = e => {
  //   console.log(e.target.href);
  //   fetch(e.target.href, {
  //     method: "GET",
  //     headers: {}
  //   })
  //     .then(response => {
  //       response.arrayBuffer().then(function(buffer) {
  //         const url = window.URL.createObjectURL(new Blob([buffer]));
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.setAttribute("download", "image/png"); //or any other extension
  //         document.body.appendChild(link);
  //         link.click();
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  return (
    <div>
      <main>
        <section className="showcase">
          <div className="container ">
            <form id="image-form">
              <h1 className="text-center">Describe An Image</h1>
              <div className="form-group">
                <input
                  type="text"
                  id="prompt"
                  className="form-control"
                  placeholder="Enter Text"
                />
              </div>
              <div className="form-group">
                <select className="form-control" name="size" id="size">
                  <option value="small">Small</option>
                  <option value="medium" defaultValue>
                    Medium
                  </option>
                  <option value="large">Large</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Generate
              </button>
            </form>
          </div>
        </section>

        <section className="image">
          <div className="container">
            <div className="image-container text-center">
              <h2 className="msg">AI Image Generator</h2>
              <img
                src={imageUrl}
                alt=""
                id="image"
                className="img-fluid"
                download
                // onClick={e=>download(e)}
              />
            </div>
          </div>
        </section>
      </main>

      {showSpinner && (
        <div className="spinner">
          <div className="spinner-inner"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
