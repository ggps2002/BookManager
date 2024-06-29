import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import Add from "./Add";
import DOMPurify from 'dompurify';
import { getPages, getLength, paginationRange } from "../../constants/Booksdata";
import ReactTimeAgo from 'react-time-ago';

const Card = (props) => {
    const [offCanvas, setOffCanvas] = useState({
        edit: false,
        del: false,
        slide: false,
    })
    const editRef = useRef(null);
    const delRef = useRef(null);
    const slideRef = useRef(null);
    const handleEditOffCanvas = () => {
        setOffCanvas((prev) => ({ ...prev, edit: false }))
    }
    const handleDocumentClick = (event) => {
        console.log('editRef:', editRef.current, 'delRef:', delRef.current, 'slideRef:', slideRef.current);
        console.log('event.target:', event.target);
        if (editRef.current && !editRef.current.contains(event.target)) {
            setOffCanvas((prev) => ({ ...prev, edit: false }));
        }
        if (delRef.current && !delRef.current.contains(event.target)) {
            setOffCanvas((prev) => ({ ...prev, del: false }));
        }
        if (slideRef.current && !slideRef.current.contains(event.target)) {
            setOffCanvas((prev) => ({ ...prev, slide: false }));
        }
    };

    const handleOffCanvasToggle = (key) => {
        setOffCanvas((prev) => {
            return {
                ...prev,
                [key]: !prev[key]
            }
        })
    }
    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [offCanvas]);
    const handleDeleteCard = async () => {
        setOffCanvas((prev) => ({ ...prev, del: !prev.del }))
        try {
            await fetch(`http://localhost:5000/delete?id=${encodeURIComponent(props.bookID)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const rawHtmlContent = props.summary;
    const sanitizedHtmlContent = DOMPurify.sanitize(rawHtmlContent);
    return (
        <div className={`max-w-full `}>
            <div className="card mb-3 max-w-[500px] relative  xlg:mt-5 md:ml-5">
                <div className="row g-0 relative ">
                    <div className="col-md-4">
                        <img src={`https://covers.openlibrary.org/b/isbn/${props.isbn}-L.jpg`} className="img-fluid rounded-start object-cover" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.title}</h5>
                            <p className="card-text"><span className="font-semibold">Author</span>: {props.author}</p>
                            <p className="card-text"><span className="font-semibold">Rating</span>: {props.rating}/10</p>
                            <p className="card-text"><span className="font-semibold">Done reading on</span>: {props.DOC}</p>
                            <p className="card-text">
                                {props.brief}.   <span className="cursor-pointer text-blue-500" onClick={(e) => {
                                    e.stopPropagation()
                                    handleOffCanvasToggle('slide')
                                }}>Read More...</span>
                            </p>
                            <p className="card-text"><small className="text-body-secondary">Last updated {<ReactTimeAgo date={props.time} locale="en-US" />}</small></p>
                            <div className="flex justify-end gap-6">
                                <div><button type="button" className="w-10 border-black border-[1px]" onClick={(e) => {
                                    e.stopPropagation()
                                    handleOffCanvasToggle('edit', e)
                                }}>Edit</button></div>
                                <div>
                                    <button type="button" className="border-black border-[1px] px-2" onClick={(e) => {
                                        e.stopPropagation()
                                        handleOffCanvasToggle('del')
                                    }}>
                                        Delete
                                    </button>
                                </div>
                                <div className={`${offCanvas.del ? "bg-gray-700 bg-opacity-50" : "hidden"} fixed top-0 left-0 w-full h-full flex items-center justify-center  z-50`}>
                                    <div ref={delRef} className="bg-white shadow-lg px-3 py-2 rounded-md">
                                        <div>Are you sure you want to delete this?</div>
                                        <div className="flex justify-center gap-3 mt-2">
                                            <div><button type="button" className="border-black border-[1px] px-2" onClick={handleDeleteCard}>Yes</button></div>
                                            <div><button type="button" className="border-black border-[1px] px-2" onClick={(e) => {
                                                e.stopPropagation()
                                                handleOffCanvasToggle('del')
                                            }}>No</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {offCanvas.slide && (<div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-30 xs:hidden lg:block"></div>)}
            <div className={`fixed top-0 z-50 max-w-full h-screen right-0 lg:w-full  xs:w-full ${offCanvas.slide ? "translate-x-0 " : "translate-x-full"} transition-all duration-500 ease-out text-balanced overflow-y-auto `}>
                <div ref={slideRef} className=" lg:w-3/4 bg-white absolute right-0 top-0 xs:p-1 sm:p-3 md:p-10">
                    <div onClick={(e) => {
                        e.stopPropagation()
                        handleOffCanvasToggle('slide')
                    }} className="cursor-pointer"><ClearIcon fontSize="large" /></div>
                    <div className="text-center"><h3>{props.title}</h3></div>
                    <div className="mt-5">
                        <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
                    </div>
                </div>
            </div>


            <div ref={editRef} class="no-scrollbar" className={`fixed top-0 right-0 lg:w-1/2 xs:w-full md:w-3/4 h-screen lg:p-10 xs:p-2 bg-orange-200 z-50 ${offCanvas.edit ? "translate-x-0 " : "translate-x-full"} transition-transform overflow-y-auto`}>
                <div >
                    <ClearIcon fontSize="large" className="cursor-pointer" onClick={(e) => {
                        e.stopPropagation()
                        handleOffCanvasToggle('edit')
                    }} />
                    <Add head="Edit" data={props} edit={handleEditOffCanvas} />
                </div>
            </div>
        </div>
    );
}

const Bookcards = (props) => {
    const [isPresent, setIsPresent] = useState(false);
    const [userBooksDetails, setUserBooksDetails] = useState([{}]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    useEffect(() => {
        try {
            fetch(`http://localhost:5000/bookDetails?id=${encodeURIComponent(props.id)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(async response => {
                const data = await response.json();
                if (data.val && data.val.length > 0) {
                    setIsPresent(true);
                    setUserBooksDetails(data.val)
                } else {
                    console.log("No Data");
                }
            })
        } catch (error) {
            console.log(error)
        }
    }, [userBooksDetails])
    const booksPerPage = getPages(userBooksDetails, page, limit);
    const totalPages = Math.ceil(getLength(userBooksDetails) / limit);
    const pageInd = paginationRange(totalPages, page, limit, 1);
    return (
        <div className="flex flex-col w-full h-full">
            <div className="mt-3">
                {isPresent && booksPerPage.map((bookDetails, index) => {
                    return (
                        bookDetails && <Card key={index} id={index} bookID={bookDetails.bookid} title={bookDetails.title} author={bookDetails.author} rating={bookDetails.rating} DOC={bookDetails.doc} brief={bookDetails.brief} isbn={bookDetails.isbn} summary={bookDetails.summary} time={bookDetails.updation} />
                    )
                })}
            </div>
            <div className={`self-center mt-4 ${userBooksDetails.length < 5 && "hidden"}`}>
                <nav aria-label="Page navigation example">
                    <ul class="pagination" >
                        <li class="page-item" className={`${page === 1 && "hidden"}`} onClick={() => {
                            setPage(page - 1)
                        }}>
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true" >&laquo;</span>
                            </a>
                        </li>
                        {pageInd.map(val => (
                            <li key={val} class={`page-item ${val === page && "active"}`}><a class="page-link" href="#" onClick={() => {
                                window.scrollTo(0, 0)
                                setPage(val);
                            }}>{val}</a></li>
                        ))}
                        <li class="page-item" className={`${page === totalPages && "hidden"}`} onClick={() => {
                            setPage(page + 1)
                        }}>
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Bookcards;
