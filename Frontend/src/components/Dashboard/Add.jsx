import React, {useState} from 'react'

const Add = (props) => {
    const [details, setDetails] = useState({
        id: props.id,
        bookID: props.data ? props.data.bookID : "",
        title: props.data? props.data.title : '',
        author: props.data? props.data.author : '',
        brief: props.data? props.data.brief : '',
        isbn: props.data? props.data.isbn : '',
        rating: props.data? props.data.rating : '',
        DOC: props.data? props.data.DOC : '',
        summary: props.data? props.data.summary : ''

    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name);
        console.log(value);
        setDetails((prev) => {
            return {
                ...prev,
                [name] : value,
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(props.edit){
            props.edit();
        }
        if(props.add){
            props.add();
        }
        window.location.reload();
         try {
            await fetch(`http://localhost:5000/${props.head}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
                credentials:'include',
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Network response is not ok")
                }
                const data = response.json();
                console.log(data.message);
            })
         } catch (error) {
            console.log(error)
         }
         
    }
    return (
       <><div className='text-center'><h1>{props.head} Book Details</h1></div>
        <form onSubmit={handleSubmit}>
            <div className='md:p-10 xs:p-3 w-full'>
                <div  className='my-7'>
                    <label htmlFor="title">Title</label><br />
                    <input className='mt-2 md:w-[85%] xs:w-full h-10 indent-3' type="text" placeholder='Title of the book' name='title' onChange={handleChange} value={details.title}/>    
                </div>
                <div className='my-7'>
                    <label htmlFor="Author">Author</label><br/>
                    <input className='mt-2 md:w-[85%] xs:w-full h-10 indent-3' type="text" placeholder='Author name' name='author' onChange={handleChange} value={details.author}/>    
                </div>
                <div className='my-7'>
                    <label htmlFor="Short Description">Describe in few lines</label><br/>
                    <input className='mt-2 md:w-[85%] xs:w-full h-10 indent-3' type="text" placeholder='Write a few lines describing the book' name='brief' onChange={handleChange} value={details.brief}/>    
                </div>
                <div className='my-7'>
                    <label htmlFor="ISBN">ISBN</label><br/>
                    <input className='mt-2 md:w-[85%] xs:w-full h-10 indent-3' type="text" placeholder=' ISBN' name="isbn" onChange={handleChange} value={details.isbn}/>    
                </div>
                <div className='my-7'>
                    <label htmlFor="Rating">Rating</label><br/>
                    <input className='mt-2 md:w-[85%] xs:w-full h-10 indent-3' type="text" placeholder='My rating' name='rating' onChange={handleChange} value={details.rating}/>    
                </div>
                <div className='my-7'>
                    <label htmlFor="Finishing Date">Finishing Date</label><br/>
                    <input className='mt-2 md:w-[85%] xs:w-full h-10 indent-3' type="text" placeholder='Eg. 26th July 2024' name='DOC' onChange={handleChange} value={details.DOC}/>    
                </div>
                <div className='my-7'>
                <textarea rows={20} className='md:w-[85%] xs:w-full indent-3 p-2' placeholder="Summary (Maintain the HTML tags)" name='summary' onChange={handleChange} value={details.summary}></textarea>   
                </div>
                <div>
                    <button type="submit" className=' bg-white p-2.5'>Submit</button>
                </div>
            </div>
        </form>
       </>
    )
}

export default Add