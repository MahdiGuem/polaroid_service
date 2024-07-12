import React, {useState, useRef} from 'react';
import Polaroid from './components/Polaroid';
import { toPng, toJpeg } from 'html-to-image';

function App() {
  const [imageSrc, setImageSrc] = useState('/flowers.jpg');
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [rotationAngle, setRotationAngle] = useState(0);
  const [fontSize, setFontSize] = useState(1)
  const [txt, setTxt] = useState('Write text here <3');
  const polaroidRef = useRef(null);

  const handleInputChange = (event) => {
    setTxt(event.target.value);
  };

  function handleFontSizeChange() {
    setFontSize(document.getElementById("fontSize").value);

  }

  const handleRotationChange = (event) => {
    setRotationAngle(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScaleChange = (event) => {
    setImageScale(event.target.value);
  };

  const handleReset = () => {
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
    setRotationAngle(0);
  };


  const handleExportAsPng = () => {
    if (polaroidRef.current === null) {
      return;
    }

    toPng(polaroidRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'polaroid.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error exporting as PNG:', err);
      });
  };

  const handleExportAsJpg = () => {
    if (polaroidRef.current === null) {
      return;
    }
    
    toJpeg(polaroidRef.current, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'polaroid.jpg';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error exporting as JPG:', err);
      });
  };

  return (
    <div className='bg-black h-screen w-screen flex flex-col items-center justify-center'>
      <div className='bg-blue-400 p-2 flex flex-col items-center justify-center rounded'>
        <p className="text-white p-1">Polaroid Maker</p>
        
        <div className="m-1 p-1 flex flex-row items-center justify-center bg-blue-700 rounded text-white w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="m-1 bg-blue-700 rounded text-white w-full" />
        </div>
        <div className="m-1 p-1 flex flex-row items-center justify-center bg-blue-700 rounded text-white w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input type="range" min="0" max="10" step="0.1" value={imageScale} onChange={handleScaleChange} className="m-1 w-full"/>
        </div>

        <div className="m-1 p-1 flex flex-row items-center justify-center bg-blue-700 rounded text-white w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <input type="range" min="0" max="360" step="1" value={rotationAngle} onChange={handleRotationChange} className="m-1 w-full"/>
        </div>

        <div className="m-1 p-2 flex flex-row items-center justify-center bg-blue-700 rounded text-white w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>

          <button onClick={handleReset} className="w-full bg-blue-500 text-white mx-1 py-1 px-2 rounded">Reset</button>
        </div>
        <div className='flex flex-row w-full'>
          <div className="mr-1 my-1 p-2 flex flex-row items-center justify-center bg-blue-700 rounded text-white w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>

            <input type="text" value={txt} onChange={handleInputChange} className='w-full text-black mx-1 py-1 px-2 rounded'/>
          </div>
          <div className="ml-1 my-1 p-2 flex flex-row items-center justify-center bg-blue-700 rounded text-white w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>

            <select id="fontSize" name="fontSize" className='text-black m-1'>
              <option value="">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
              <option value="4">5</option>
              <option value="5">6</option>
              <option value="6">7</option>
              <option value="7">8</option>
            </select>
          </div>
        </div>

        <div ref={polaroidRef} className='m-1'>
          <Polaroid  img={imageSrc} text={txt} scale={imageScale} position={imagePosition} setPosition={setImagePosition} rotation={rotationAngle} fontSize={fontSize}/>
        </div>

        <div className="m-1 p-2 flex flex-row items-center justify-center bg-blue-700 rounded text-white w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>

          <button onClick={handleExportAsPng} className="  bg-blue-500 text-white py-1 px-2 mx-1 rounded ">Export as PNG</button>
          <button onClick={handleExportAsJpg} className=" bg-blue-500 text-white py-1 px-2 mx-1 rounded">Export as JPG</button>
        </div>
      </div>
    </div>
  );
}

export default App;
