import React, { useState, useCallback, useEffect, useRef } from 'react'
import './App.css';
import HTMLFlipBook from 'react-pageflip';
import Explore from './components/Explore';
import Page from './components/page'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Flatsurface from './components/Flatsurface';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Camera } from "react-camera-pro";
//open passport function

function Passport() {
  const pdfRef = useRef();
  const onFlip = useCallback((e) => {
    console.log('Current page: ' + e.data);
  }, []);

  return (
    <HTMLFlipBook
      /* props */
      onFlip={onFlip}

    >
      /* ... pages */
    </HTMLFlipBook>
  )
}

function App(props) {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState(true);
  const [click,setClick] = useState(false)
  const [beginGame, setBeginGame] = useState(true);
  const [showText, setTextHide] = useState(false)
  const [popup, setPopup] = useState(false);
  const [preview,setPreview]=useState(true);

  // const arscene = document.getElementById('arscene')

  // arscene.style.display="block"  
  const Arscene = () => {
    // window.location.reload();
    setDisplay(false)
    const arscene = document.getElementById('arscene')
    arscene.style.display = "block"
  }
  const startToExplore = () => {
    let name = document.getElementById("typeEmailX");
    //username is stored in vaiable, this can be used for passport.
    let username = document.getElementById("typeEmailX").value
    console.log(username, "username");
    let form = document.getElementById("form");
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (name.value === '') {
        // alert("vlaid")
      } else {
        setBeginGame(false);
        const exploring = document.getElementById('screen-2')
        exploring.style.display = "block"
        setTimeout(() => {
          setTextHide(true)
        }, 3000);
      }
    })
  }
  const save = () => {
    let username = document.getElementById("playerfirstname").value
    let usernameonpassport = document.getElementById("usernameonpassport").innerHTML = username;
    if (usernameonpassport == username) {
      setPopup(false);
    }
  }
  const editableOption = () => {
    setPopup(!popup);
  }
  const closeOption = () => {
    setPopup(false);
  }
  const hideCamera = () => {
    setImage(camera.current.takePhoto())
    setPreview(false)
  }
  const enableCamera = () => {
   console.log("clicked");
   setPreview(true)
  }
  const pdfRef = useRef();
  const downloadPdf = () => {
    const capture=document.querySelector('.downloaderpassport');
    html2canvas(capture).then((canvas)=>{
     const srcpath = canvas.toDataURL('img/png');
     const doc = new jsPDF('p','mm','a4');
     const componentWidth = doc.internal.pageSize.getWidth();
     const componentHeight = doc.internal.pageSize.getHeight();
     doc.addImage(srcpath,'PNG',0,0,componentWidth,componentHeight);
     doc.save('passport.png')

    })
    console.log("DOWNLOAD");
    // const input = pdfRef.current;
    // html2canvas(input).then((canvas) => {
    //   const imageData = canvas.toDataURL('/images/png');
    //   const pdf = new jsPDF('p', 'mm', 'a4', false);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = pdf.internal.pageSize.getHeight();
    //   const imgWidth = canvas.width;
    //   const imgHeight = canvas.height;
    //   const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    //   const imgX = (pdfWidth - imgWidth * ratio) / 2;
    //   const imgY = 30;
    //   pdf.addImage(imageData,'PNG',
    //     imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    //   pdf.save('Passport.pdf');
    // })


  }
  
  return (
    <>

      <Router>
        {/* <div id='mobile-view'>Please open in mobile....</div> */}
        {/* <Routes>
    <Route path='/explore' element={<Explore/>}/>
   </Routes> */}
        {/* <Flatsurface/>  */}





        {/* <Explore/> */}

        {/* passport working */}
        <div id='mobilebiewonly'>
          <div className='container milkybar-bg'>
            <div className="d-flex  py-3">
              <div className="p-1 flex-grow-1 px-2"><img src="/images/milkybarLogo.png" height="78px" width="160px" alt='logo' /></div>
              <div className="p-2">
                <img  className='' src='/images/treasureicon.png' />
                <span className='badge text-center'>9+</span>
                <img className='sovunier py-1 d-flex align-items-center' src="/images/treasure.png" height="46px" width="40px" alt='info' />
              </div>
              <div className="p-2 align-items-center">
                <img className='' src='/images/backgrounds.png' />
                <img className='homoIcons d-flex align-items-center' src="/images/Vector.png" alt='info' />
              </div>
            </div>
          </div>
          <div>
            <div className='container justify-content-center align-items-center downloaderpassport' ref={pdfRef}>
              <img className='landingfly' src='/images/backgroundpassport.png' />
              <div className='bluepassbook'>
                <img className='mypass' src='/images/mypassport.png' />
                <div>
                  <div className='passportsection'>
                    <div className=""><div className=''>
                      <div className=''>
                        <img className='pages' src='/images/pages.png' />
                        <div className='top d-flex justify-content-end'>
                          <div className='px-1 py-2'>
                          <img className='profilesection' src="/images/fallback.png" width="20px" height="40px" />
                            <img className='profilesection' src={image} width="20px" height="40px" />
                          </div>
                          <div className='px-2 py-2 text-dark font-face-gm'>
                            <font className="passportusername">Name</font> <br />
                            <font id="usernameonpassport" className="passportUser">John</font>
                            <p className='texttitle  font-face-gm'>IAM READY TO DISCOVER<br /> THE WORLD!</p>
                          </div>
                        </div>
                      </div>
                      <div className='bottompages'>
                        <img className='continentpages' src='/images/bottompage.png' />
                        <div className='bottom font-face-gm text-center px-2 py-1 yellow'><p className='yellow'> Containents Explored</p>
                          <div className='continents'>
                            <img className='northamerica' src='/images/northamerica.svg' />
                            <img className='southamerica' src='/images/southamerica.svg' />
                            <img className='antratica' src='/images/antratica.svg' />
                            <img className='australia' src='/images/australia.png' />
                            <img className='africa' src='/images/africa.png' />
                            <img className='asia' src='/images/asia.png' />
                            <img className='europe' src='/images/europe.svg' />
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div className="editBtn d-flex justify-content-end">
          <img onClick={downloadPdf}  className='downloadpassport' src='/images/downloadpassport.png'/>
            <img className='editing' onClick={editableOption} src='/images/editing.png'/>
          </div>        
          {popup ? <div className='w3-container w3-center w3-animate-top'>
            <div className='popupModal'>
              <div className='d-flex justify-content-end px-3 py-2'>
                <div className='close' onClick={closeOption}><img src='/images/closebtn.png' width="25px" /></div>
              </div>
              <div>
                <div className='camera'>
                {preview ? <div className='photo'>
                    <Camera className="smileplease" ref={camera} />
                    <div className='capturedPic' onClick={() => hideCamera()}><img src='/images/shutterbutton.png' /></div>
                  </div> :   <div className='photo'>
                    <div className=''>
                    <img className='previewProfileSection' src={image} width="170px" height="160px" />
                    <div className='capturedPreviewPic' onClick={() => enableCamera()}><img className='retake' src='/images/preview.png' /></div>
                    </div>
                  </div>}
                </div>
                <div className='playerName'>
                  <input id="playerfirstname" className='player font-face-gm  py-2' type='text' placeholder='Enter your first name ' required={true} />
                </div>
                <div className='saveBtn'>
                  <button onClick={save} className='font-face-gm savingBtn px-3 py-1'>Save</button>
                </div>
              </div>
            </div>
          </div> : ""}
        </div>
      </Router>
    </>
  );
}

export default App;
