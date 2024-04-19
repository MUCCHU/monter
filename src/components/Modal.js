import React, {useState, useEffect} from 'react'
import { RiCloseLine } from "react-icons/ri";
import { TbChevronRightPipe, TbChevronLeftPipe, TbFilter, TbFileDownload  } from "react-icons/tb";

function Modal(props) { 
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const rowOptions = [ 4, 5, 10, 12, 15];
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if(i === currentPage){
        pageNumbers.push(
          <div className='cursor-pointer p-2 border-2 rounded-md mx-2 w-8 h-8 flex justify-center items-center border-solid bg-orange-500 text-white' key={i} onClick={() => handleClick(i)}>
            {i}
          </div>
        );
        continue;
      }
      pageNumbers.push(
        <div className='cursor-pointer p-2 border-2 rounded-md mx-2 w-8 h-8 flex justify-center items-center border-solid' style={{ borderColor : '#EFEEEE'}} key={i} onClick={() => handleClick(i)}>
          {i}
        </div>
      );
    }
    return pageNumbers;
  };
  const fillerRows = ()=> {
    let emptyRows = 0
    if(itemsPerPage > pageData.length){
      emptyRows = itemsPerPage - pageData.length;
    }
    const rows = [];
    for (let i = 0; i < emptyRows; i++) {
      rows.push(
        <tr key={i}>
          <td className='px-4 py-3' >
            <div className='text-sm'> &nbsp; </div>
            <div className='text-xs'> &nbsp;</div>
          </td>
          <td className='px-4 py-3 text-sm' ></td>
          <td className='px-4 py-3' ></td>
        </tr>
      );
    }
    return rows;
  }
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const updatePageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log("range = " , startIndex, endIndex);
    setPageData(props.data.slice(startIndex, endIndex));
  }
  const nextPage = () => {
    if(currentPage < totalPages){
      setCurrentPage(currentPage + 1);
    }
  }
  const prevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }
  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.ceil(props.data.length / itemsPerPage));
    updatePageData();
  }, [itemsPerPage])

  useEffect(() => {
    updatePageData();
  }, [currentPage])

  const handleDownload = () => {
    const pdfUrl = "dummy_file.csv";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "dummy_file.csv"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function formatDate(date) {
    date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
  
    // Add leading zeros if needed
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
  
    return day + '.' + month + '.' + year;
  }
  function formatTime(date) {
    date = new Date(date);
    var hour = date.getHours();
    var minute = date.getMinutes();
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
  
    return hour + ':' + minute;
  }
  return (
    <div className="absolute z-10 bg-white text-black py-5 rounded-lg" >
      <div className='relative'>
        <div className="font-semibold flex justify-center text-xl" style={{marginBottom: '1.5rem'}}> Recently Generated Reports </div>
        <div className='absolute top-0 flex justify-end w-full px-4 py-2'>
        <div className='mx-3 cursor-pointer rounded-md p-1' style={{border: '2px solid #656564'}}>
          <TbFilter />
          </div>
          <div className='cursor-pointer rounded-md p-1' style={{border: '2px solid #656564'}} onClick={()=> props.close()}>
            <RiCloseLine />
          </div>
        </div>
      </div>
        <table style={{minWidth: '740px'}} className="w-full">
          <thead style={{backgroundColor: '#F4F5F4', color: 'rgb(126,126,127)', padding: '10px'}}>
            <tr>
              {props.columns.map((column, index) => (
                <th key={index} className="px-4 text-left">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, index) => (
              <tr key={index}>
                <td className='px-4 py-3' >
                  <div className='text-sm'>
                    {formatDate(row.date)}
                  </div>
                  <div className='text-xs'>
                    {formatTime(row.date)}
                  </div>
                </td>
                <td className='px-4 py-3 text-sm' >{row.name}</td>
                <td className='px-4 py-3 flex justify-center' >
                <TbFileDownload onClick={handleDownload} size={27} className='cursor-pointer' />
                </td>
              </tr>
            ))}
            { fillerRows() }
          </tbody>
        </table>
        <hr />  
        <div style={{marginTop: '20px'}} className='flex justify-center text-sm' id="page-numbers">
        <div onClick={prevPage} className='flex flex-row cursor-pointer'>
          <div className='mx-2 flex justify-center items-center'>
          <TbChevronLeftPipe />
          </div>
          <div className='flex justify-center items-center'>Prev</div>
          </div>
           {renderPageNumbers()}
           <div onClick={nextPage} className='flex flex-row cursor-pointer'>
           <div className='flex justify-center items-center'>Next</div>
            <div className='mx-2 flex justify-center items-center'>
            <TbChevronRightPipe />
            </div>
            </div>

            <div className='flex items-center mx-6'>Rows per page: 
              <select style={{ border: '1px solid #ccc'}} className='mx-3 py-1 px-2 bg-white rounded-md' defaultValue={itemsPerPage} value={itemsPerPage} onChange={(e)=> setItemsPerPage(Number(e.target.value))} name="itemsPerPage" id="">
                {rowOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

          </div>
    </div>
  )
}

export default Modal