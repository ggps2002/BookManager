import React, { useState ,useEffect, useRef} from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import Add from './Add';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const Header = (props) => {
  const [add, setAdd] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hamClick, setHamClick] = useState(false);
  const [sorting, setSorting] = useState({
    Recent: false,
    Title: false,
    Rating: false,
  })
  const addRef = useRef(null);
  const handleDocumentClick = (event) => {
    if (addRef.current && !addRef.current.contains(event.target)) {
      setAdd(false);
    }
  };

  useEffect(() => {
    if (add) {
      document.addEventListener('click', handleDocumentClick);
      document.body.style.overflow="hidden"
    } else {
      document.removeEventListener('click', handleDocumentClick);
      document.body.style.overflow="auto"
    }

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.body.style.overflow="auto"
    };
  }, [add]);
  const handleSortMouseEnter = () => {
    console.log("entered");
    setDropdownOpen(true);
  };
  const handleHamClick = () => {
    setHamClick((prev) => !prev)
  }
  const handleSortMouseLeave = () => {
    console.log("left");
    setDropdownOpen(false);
  };
  const handleAddOffCanvas = () => {
    setAdd(false);
  }
  const handleAddClick = () => {
    setAdd((prev) => !prev);
  };
  return (
    <>
      <div className='w-full flex justify-between px-10 pt-[2vh] bg-white '>
        <div >
          <h5 >{props.username}</h5>
        </div>
        <div className='xs:hidden xlg:block flex items-center'>
          <ul className='flex gap-10 '>
            <li>
              <div className='flex items-center gap-7 cursor-pointer' onClick={(e)=>{
                e.stopPropagation();
                handleAddClick()
                }}>
                <div className='relative'>
                  <div className={`absolute h-0.5 w-5 bg-black transition-transform`}></div>
                  <div className={`absolute h-0.5 w-5 bg-black transition-transform ${!add ? 'rotate-90' : ''}`}></div>
                </div>
                <div>
                  Add Book
                </div>
              </div>
            </li>
            <div onMouseEnter={handleSortMouseEnter} onMouseLeave={handleSortMouseLeave}>
              <li className='relative' >
                <div className='flex items-center cursor-pointer'>
                  Sort By <ArrowForwardIosOutlinedIcon className={`ml-2 transition-transform ${dropdownOpen ? 'rotate-90' : ''}`} />
                </div>
                <ul className={`absolute -left-4 bg-white shadow-lg rounded z-20 m-0 p-0 ${!dropdownOpen && 'hidden'} cursor-pointer`}>
                  <li className='w-full hover:bg-slate-300 px-7 py-2' onClick={() => {
                    props.changeSortingBasis("Recent")
                  }}>Read recently</li>
                  <li className='w-full hover:bg-slate-300 px-7 py-2' onClick={() => {
                    props.changeSortingBasis("Title")
                  }}>Title</li>
                  <li className='w-full hover:bg-slate-300 px-7 py-2' onClick={() => {
                    props.changeSortingBasis("Rating")
                  }}>Rating</li>
                </ul>
              </li>
            </div>
          </ul>
        </div>
        <div className='xlg:hidden'>
          <ul className='absolute z-20 right-0 '>
            <div className='relative cursor-pointer top-3 w-8 h-8' onClick={handleHamClick} >
              <div className={`absolute h-0.5 w-5 bg-black ${hamClick ? "rotate-45" : "-top-1"} transition-all ease-in-out`}></div>
              <div className={`absolute h-0.5 w-5 bg-black ${hamClick ? "-rotate-45" : "top-1"} transition-all ease-in-out`}></div>
            </div>
            <div className={`absolute bg-white right-0 mr-2 shadow-lg px-4  py-5 ${!hamClick && "hidden"}`}>
              <li><span onClick={(e) => {
                e.stopPropagation();
                handleAddClick()
                handleHamClick()
              }}>Add Book</span></li>
              <li className='-ml-3'>
                <button class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Sort by
                </button>
                <ul class="dropdown-menu" >
                  <li><a class="dropdown-item" href="#" onClick={() => {
                    props.changeSortingBasis("Title")
                  }}>Title</a></li>
                  <li><a class="dropdown-item" href="#" onClick={() => {
                    props.changeSortingBasis("Recent")
                  }}>Read recently</a></li>
                  <li><a class="dropdown-item" href="#" onClick={() => {
                    props.changeSortingBasis("Rating")
                    
                  }}>Rating</a></li>
                </ul>
              </li>

            </div>

          </ul>
        </div>
        <div ref={addRef} className={`no-scrollbar absolute top-0 xs:p-0 lg:p-5 overflow-y-auto z-50 md:w-3/4 xs:w-full bg-orange-200 h-screen ${add ? "-translate-x-10" : "-translate-x-[200%]"} transition-all ease-in-out`}>
          <ClearIcon fontSize='large' onClick={handleAddClick} className='lg:hidden cursor-pointer' />
          <Add className="absolute top-0" head="Add" id={props.id} add={handleAddOffCanvas} sortingBasis={props.sortingBasis}/>
        </div>
      </div>
    </>
  );
};

export default Header;
