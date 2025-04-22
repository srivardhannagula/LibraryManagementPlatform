// import { use, useEffect, useRef, useState } from "react";
// import axios from "../axiosConfig";
// import {useNavigate} from "react-router-dom";
// function AdminDashboard(){
//     const useref=useRef(null);
//     const [books,setBooks]=useState([]);
//     const [showBooks,setShowBooks]=useState(false);
//     const [bookTitle,setBookTitle]=useState("");
//     const [authorName,setAuthorName]=useState("");
//     const [booksAvailable,setBooksAvailable]=useState("");
//     const [category,setCategory]=useState("General Books");
//     const[currentPage,setCurrentPage]=useState(1);
//     const[showAddBook,setShowAddBook]=useState(false);
//     const[username,setUsername]=useState("");
//     const[issuedBooks,setIssuedBooks]=useState([]);
//     const[showIssuedBooks,setShowIssuedBooks]=useState(false);
//     const navigate=useNavigate();
//     const booksPerPage=10;
//     const totalPages=Math.ceil(books.length/booksPerPage);
//     const indexOfLastBook=currentPage*booksPerPage;
//     const indexOfFirstBook=indexOfLastBook-booksPerPage;
//     const currentBooks=books.slice(indexOfFirstBook,indexOfLastBook);
//     const [query,setQuery]=useState("");
//     const [users,setUsers]=useState([]);
//     const[showUsers,setShowUsers]=useState(false);
//     const[bookId,setBookId]=useState("");
//     const[errorMessage,setErrorMessage]=useState("");
//     useEffect(()=>{
//         fetchBooks();},[query]);
//     const fetchBooks=async ()=>{
//         let response;
//         if(query===""){
//          response=await axios.get("/admin/viewBooks");}
//          else{
//             response=await axios.get(`/admin/searchBooks?query=${encodeURIComponent(query)}`)
//          }
//         setBooks(response.data);
//         setShowBooks(true);
//         setCurrentPage(1);
//         setShowIssuedBooks(false);
//         setShowUsers(false);
//     }
//     const saveBooks=async (e)=>{
//         e.preventDefault();
//         const bookData={
//             bookTitle,
//             authorName,
//             booksAvailable:parseInt(booksAvailable),
//             category
//         }
//         const response= await axios.post("/admin/addBooks",bookData);
//         console.log("Response :"+response);
//         if(response.status===200){
            
//             setBookTitle("");
//             setAuthorName("");
//             setBooksAvailable("");
//             setCategory("");
//             useref.current.reset();
//             //alert("Stored Successfully");
//         }

//     }
//     const deleteBook=async (id)=>{
//         await axios.delete(`/admin/deleteBook/${id}`);
//         setBooks((prev)=>prev.filter((book=>book.id!==id)));
//     }
//     const increaseBook=async (id)=>{
//         const response= await axios.put(`/admin/increaseBook/${id}`);
//         const updatedBook=response.data;
//         setBooks( (books)=>books.map((book)=>book.id===updatedBook.id?updatedBook:book)
//     );}
//     const decreaseBook=async (id)=>{
//         const response=await axios.put(`/admin/decreaseBook/${id}`);
//         const updatedBook=response.data;
//         setBooks( (books)=>books.map((book)=>book.id===updatedBook.id?updatedBook:book)
//     );}
//     const handleLogout=()=>{
//         localStorage.removeItem("token");
//         navigate("/");
//     }
//     const issueBook=async (bookId)=>{
//         const response=await axios.post("/admin/issueBook",{
            
//             bookId:bookId,
//             username:username

//         });
//         fetchBooks();
//     }
//     const fetchIssuedBooks=async ()=>{
//         const token=localStorage.getItem("token");
//         const response=await axios.get("/admin/issueBooks",{
//             headers:{
//                 Authorization:`Bearer ${token}`
//             }
//         });
//         setIssuedBooks(response.data);
//         setShowIssuedBooks(true);
//         setShowBooks(false);
//         setShowUsers(false);

//     }
//     const issuedBooksPerPage=10;
//     const [issuedCurrentPage,setIssuedCurrentPage]=useState(1);
//     const issuedIndexOfLast=issuedCurrentPage*issuedBooksPerPage;
//     const issuedIndexOfFirst=issuedIndexOfLast-issuedBooksPerPage;
//     const actualIssuedBooks=Array.isArray(issuedBooks)?issuedBooks:[issuedBooks];
//     const currentIssuedBooks=actualIssuedBooks.slice(issuedIndexOfFirst,issuedIndexOfLast);
//     const totalIssuedPages=Math.ceil(issuedBooks.length/issuedBooksPerPage);
//     const fetchUser=async()=>{
//         const response =await axios.get("/admin/fetchUsers");
//         setUsers(response.data);
//         console.log(response.data)
//         setShowIssuedBooks(false);
//         setShowBooks(false);
//         setShowUsers(true);
        

//     }
//     const numberOfUsersPerPage=10;
//     const [usersCurrentPage,setUsersCurrentPage]=useState(1);
//     const usersIndexOfLast=numberOfUsersPerPage*usersCurrentPage;
//     const usersIndexOfFirst=usersIndexOfLast-numberOfUsersPerPage;
//     const currentUsers=users.slice(usersIndexOfFirst,usersIndexOfLast);
//     const totalCurrentUsersPages=Math.ceil(users.length/numberOfUsersPerPage);
//     const returnBook=async (id)=>{
//         const numericId=Number(id);
//         if(isNaN(numericId)||numericId<=1000){
//             setErrorMessage("Invalid Id");
//             return;
//         }
//         try{
//         const response=await axios.post(`admin/returnBook/${numericId}`);
//         setIssuedBooks(response.data);
//         setErrorMessage("");
//         setShowIssuedBooks(true);
//         setShowBooks(false);
//         setShowUsers(false);}
//         catch(error){
//             setErrorMessage("Invalid Book Id");
//         }

//     }
//     return(
//         <center> 
//         <div>
//                 <h1>AdminDashboard</h1>
//                 <form ref={useref} onSubmit={saveBooks}>
//                 <input type="text" name="bookTitle" placeholder="Title of Book" onChange={(e)=>setBookTitle(e.target.value)} required></input> <br></br><br></br>
//                 <input type="text" name="authorName" placeholder="Author Name" onChange={(e)=>setAuthorName(e.target.value)} required></input> <br></br><br></br>
//                 <input type="text" name="booksAvailable" placeholder="Number of Books" onChange={(e)=>setBooksAvailable(e.target.value)} required></input> <br></br><br></br>
//                 <select name="role" onChange={e=>setCategory(e.target.value)}>
//                         <option>General Books</option>
//                         <option>Spiritual</option>
//                         <option>Philosphical</option>
//                         <option>History</option>
//                         <option>Geography</option>
//                         <option>Polity</option>
//                         <option>Economy</option>
//                         <option>Law</option>
//                         <option>Science</option>
//                         <option>Technology</option>
//                         <option>Current Affairs</option>
//                         <option>General Knowledge</option>
//                         <option>Exam Preparation</option>

//                 </select><br></br><br></br>
//                 <button >Add Book</button>
//                 </form><br></br><br></br>
//                 <div> 
//                 <input type="text" placeholder="Enter User name to issue Books" onChange={(e)=>setUsername(e.target.value)}/>
//                 </div>
//                 <div>
//                    <input type="text" placeholder="Enter the book Id to return Book" onChange={(e)=>setBookId(e.target.value)}></input> 
//                    <button disabled={!bookId} onClick={()=>returnBook(bookId)}>Return Book</button>
//                    {errorMessage&&(
//                     <div style={{color:"red"}}>{errorMessage}</div>
//                    )}
//                 </div>

//                 <button onClick={fetchBooks}>View Books</button><br></br><br></br>
//                 <button onClick={fetchIssuedBooks}>View Issued Books</button><br></br><br></br>
//                 <button onClick={fetchUser}>Show Users</button><br></br><br></br>
                   
//                 <button onClick={handleLogout}>Logout</button>
//                 <input type="text" placeholder="Search by title or author" value={query} onChange={(e)=>setQuery(e.target.value)}></input>

//                 {showBooks&&(
//                     <div>
//                         <h2>Books List</h2>
//                         <table border="1">
//                             <thead>
//                                 <tr>
//                                     <th>Id</th>
//                                     <th>Book Title</th>
//                                     <th>Author</th>
//                                     <th>Category</th>
//                                     <th>Available Copies</th>
//                                     <th>Actions</th>
//                                     <th> Increase</th>
//                                     <th> Decrease</th>
//                                     <th> Issue</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentBooks.map((book)=>(
//                                     <tr key={book.id}>
//                                         <td>{book.id}</td>
//                                         <td>{book.bookTitle}</td>
//                                         <td>{book.authorName}</td>
//                                         <td>{book.category}</td>
//                                         <td>{book.booksAvailable}</td>
//                                         <td> 
//                                         <button onClick={()=>deleteBook(book.id)}>Delete</button></td>
//                                     <td>    <button onClick={()=>increaseBook(book.id)}>+</button></td> 
//                                    <td>     <button onClick={()=>decreaseBook(book.id)}>-</button></td> 
//                                     <td>       <button onClick={()=>issueBook(book.id)}
//                                             disabled={book.booksAvailable<=0||username===""}>IssueBook</button></td> 

//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
                        
//                         <div>
//                             <button onClick={()=>setCurrentPage(prev=>Math.max(prev-1,1))}
//                                 disabled={currentPage===1}> Previous</button>
//                             <span> Page{currentPage} of {totalPages}</span>
//                             <button onClick={()=>setCurrentPage(prev=>Math.min(prev+1,totalPages))}
//                                 disabled={currentPage===totalPages}> Next</button>


//                             </div>

//                         </div>
//                 )}

//                 {showIssuedBooks&&(
//                             <div>
//                                 <h2>Issued BOoks</h2>
//                                 <table border="1">
//                                     <thead>
//                                         <tr>
//                                             <th>Book Id</th>
//                                             <th>Username</th>
                                             
//                                             <th>Book Title</th>
//                                             <th>Issue Date</th>
//                                             <th>Due Date</th>
//                                             <th>Returned  Date</th>
//                                             <th>Fine Amount</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {currentIssuedBooks.map((issue)=>(
//                                             <tr key={issue.id}>
//                                                 <td>{issue.bookId}</td>
//                                                 <td>{issue.userName} </td>
//                                                 <td>{issue.bookTitle} </td>
                                                 
//                                                 <td>{issue.tookDate} </td>
//                                                 <td>{issue.dueDate}</td>
//                                                 <td>{issue.returnDate}</td>
//                                                 <td>{issue.fineAmount}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>

                           
                        
//                     <div>
//                         <button onClick={()=>setIssuedCurrentPage(prev=>Math.max(prev-1,1))}
//                             disabled={issuedCurrentPage===1}>Previous</button>
//                          <span> Page{issuedCurrentPage} of {totalIssuedPages}</span>
//                             <button onClick={()=>setIssuedCurrentPage(prev=>Math.min(prev+1,totalIssuedPages))}
//                                 disabled={issuedCurrentPage===totalIssuedPages}> Next</button>

//                     </div>
//                      </div>)}  
//                      {showUsers&&(
//                         <div>
//                             <h2>Users</h2>
//                             <table border="1">
//                                 <thead>
//                                     <tr>
//                                         <th>User Name</th>
//                                         <th> Borrowed Book Count</th>
//                                     </tr>

//                                 </thead>
//                                 <tbody>
//                                     {currentUsers.map((user)=>(
//                                         <tr>
//                                             <td>{user.username}</td>
//                                             <td>{user.bookCount}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             <div>
//                                 <button onClick={()=>setUsersCurrentPage(prev=>Math.max(prev-1,1))} 
//                                     disabled={usersCurrentPage===1}
//                                     >Previous</button>
//                                 <span>Page {usersCurrentPage} of {totalCurrentUsersPages}</span>
//                                 <button onClick={()=>setUsersCurrentPage(prev=>Math.max(prev+1,totalCurrentUsersPages))} 
//                                     disabled={usersCurrentPage===totalCurrentUsersPages}
//                                     >Next</button>
//                             </div>
//                         </div>
//                      )


//                      } 
                
//         </div>

//         </center>
    
// );
// }
// export default AdminDashboard;

import React, { useRef, useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  TextField,
  Typography,
  Table,
  Grid,
  Divider, Avatar,IconButton,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Paper,
  Pagination,
  InputLabel,
  FormControl,
  TableContainer,
  Menu,
  
   
} from "@mui/material";

function AdminDashboard() {
  const useref = useRef(null);
  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [booksAvailable, setBooksAvailable] = useState("");
  const [category, setCategory] = useState("General Books");
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUsername] = useState("");
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [query, setQuery] = useState("");
  const [usernameError,setUsernameError]=useState(false);
  const[bookId,setBookId]=useState("");
  const[errorMessage,setErrorMessage]=useState("");
  const [showBookLendingInfo,setShowBookLendingInfo]=useState(false);
  const [users,setUsers]=useState([]);
  const[showUsers,setShowUsers]=useState(false);
  const [bookCatalogue,setBookCatalogue]=useState(true);
  const navigate = useNavigate();
  const [anchorEl,setAnchorEl]=useState(null);
  const [profile,setProfile]=useState(null);
  const [showProfileInfo,setShowProfileInfo]=useState(false);
  const open=Boolean(anchorEl);
  const [disableConformReturn,setDisableConformReturn]=useState(false);
  const [usersInfo,setUsersInfo]=useState(false);
  const [fullUserInfo,setFullUserInfo]=useState([]);
  const handleAvatarClick=(event)=>{
      if(anchorEl){
          setAnchorEl(null);
          setShowProfileInfo(false);
      }else{
      setAnchorEl(event.currentTarget);}
       
  }
  const handleClose=()=>{
      setProfile(null);
     setShowProfileInfo(false);
  }
  const handleViewProfile=()=>{
      if(showProfileInfo){
          setShowProfileInfo(false);
      }else{
      
      fetchProfile();}
      
  }
  const fetchProfile=async()=>{
      try{
          const token=localStorage.getItem("token");
          const response=await axios.get("/admin/profile",{
              headers:{
                  Authorization:`Bearer ${token}`,
              }
          });
          console.log(response.data)
          setProfile(response.data);
          setShowProfileInfo(true);
      }
      catch(error){
          alert("Unable to fetch profile");
      }
  }
  const booksPerPage = 5;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const issuedBooksPerPage = 5;
  const [issuedCurrentPage, setIssuedCurrentPage] = useState(1);
  const issuedIndexOfLast = issuedCurrentPage * issuedBooksPerPage;
  const issuedIndexOfFirst = issuedIndexOfLast - issuedBooksPerPage;
  const actualIssuedBooks=Array.isArray(issuedBooks)?issuedBooks:[issuedBooks];
  const currentIssuedBooks = actualIssuedBooks.slice(
    issuedIndexOfFirst,
    issuedIndexOfLast
  );
  const totalIssuedPages = Math.ceil(issuedBooks.length / issuedBooksPerPage);

  useEffect(() => {
    fetchBooks();
  }, [query]);

  const fetchBooks = async () => {
    let response;
    if (query === "") {
      response = await axios.get("/admin/viewBooks");
    } else {
      response = await axios.get(
        `/admin/searchBooks?query=${encodeURIComponent(query)}`
      );
    }
    setBooks(response.data);
    setShowBooks(true);
    setCurrentPage(1);
    setShowIssuedBooks(false);
    setShowUsers(false);
    setShowBookLendingInfo(false)
    setBookCatalogue(true);
    setUsersInfo(false);
  };

  const saveBooks = async (e) => {
    e.preventDefault();
    const bookData = {
      bookTitle,
      authorName,
      booksAvailable: parseInt(booksAvailable),
      category,
    };
    const response = await axios.post("/admin/addBooks", bookData);
    if (response.status === 200) {
      setBookTitle("");
      setAuthorName("");
      setBooksAvailable("");
      setCategory("");
      useref.current.reset();
    }
  };

  const deleteBook = async (id) => {
    await axios.delete(`/admin/deleteBook/${id}`);
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const increaseBook = async (id) => {
    const response = await axios.put(`/admin/increaseBook/${id}`);
    const updatedBook = response.data;
    setBooks((books) =>
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const decreaseBook = async (id) => {
    const response = await axios.put(`/admin/decreaseBook/${id}`);
    const updatedBook = response.data;
    setBooks((books) =>
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const issueBook = async (bookId) => {
    try{
    const response=await axios.post("/admin/issueBook", {
      bookId: bookId,
      username: username,
    });
    if(response.status===200){
        setUsernameError(false);
        fetchBooks();
    }
    }
    catch(error){
      if(error.response){
        if(error.response.status===400){
          if(error.response.data=="Already this book issued"){
            alert("You already have this copy");
          }else{
            setUsernameError(true);
          }
        } 
    }
  }};

      const fetchUser=async()=>{
        const response =await axios.get("/admin/fetchUsers");
        setUsers(response.data);
        console.log(response.data)
        setShowIssuedBooks(false);
        setShowBooks(false);
        setShowUsers(true);
        setShowBookLendingInfo(false)
        setBookCatalogue(false);
        setUsersInfo(false);
        

    }
    const getUsersInfo=async()=>{
      const response=await axios.get("/admin/getAllUsers");
      setFullUserInfo(response.data);
      setShowIssuedBooks(false);
      setShowBooks(false);
      setShowUsers(false);
      setShowBookLendingInfo(false)
      setBookCatalogue(false);
      setUsersInfo(true);

    }

    const numberOfFullUsersPerPage=5;
    const [usersFullCurrentPage,setUsersFullCurrentPage]=useState(1);
    const usersFullIndexOfLast=numberOfFullUsersPerPage*usersFullCurrentPage;
    const usersFullIndexOfFirst=usersFullIndexOfLast-numberOfFullUsersPerPage;
    const currentFullUsers=fullUserInfo.slice(usersFullIndexOfFirst,usersFullIndexOfLast);
    const totalCurrentFullUsersPages=Math.ceil(fullUserInfo.length/numberOfFullUsersPerPage);

    const numberOfUsersPerPage=5;
    const [usersCurrentPage,setUsersCurrentPage]=useState(1);
    const usersIndexOfLast=numberOfUsersPerPage*usersCurrentPage;
    const usersIndexOfFirst=usersIndexOfLast-numberOfUsersPerPage;
    const currentUsers=users.slice(usersIndexOfFirst,usersIndexOfLast);
    const totalCurrentUsersPages=Math.ceil(users.length/numberOfUsersPerPage);

  const fetchIssuedBooks = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/admin/issueBooks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 
    setIssuedBooks(response.data);
    setDisableConformReturn(false);
    setUsersInfo(false);
    setShowIssuedBooks(true);
    setShowBooks(false);
    setShowUsers(false);
    setShowBookLendingInfo(true);
    setBookCatalogue(false);
  };
      const returnBook=async (id)=>{
        const numericId=Number(id);
        if(isNaN(numericId)||numericId<=1000){
            setErrorMessage("Invalid Id");
            setShowIssuedBooks(false);
        setShowBooks(false);
        setShowUsers(false);
        setShowBookLendingInfo(false);
            return;
        }
        try{
        const response=await axios.post(`/admin/returnBook/${numericId}`);
        setIssuedBooks(response.data);
        setErrorMessage("");
        setShowIssuedBooks(true);
        setShowBooks(false);
        setShowUsers(false);
        
        
    }
        catch(error){
            setErrorMessage("Invalid Book Id");
        }

    }
    const handleReturnBook=async (issueId,bookId)=>{
      
      try{
        const response =await axios.put(`/admin/returnIssuedBooks/${issueId}/${bookId}`);
        setIssuedBooks(response.data);
        setShowIssuedBooks(true);
        setShowBooks(false);
        setShowUsers(false);
        setDisableConformReturn(true);
        
        if(response.ok){
          setIssuedBooks(prev=>prev.filter(issue=>issue.id!==issueId));
        }
        
      }catch(error){
        if(error.response&&error.response.status===400){
          alert(error.response.data);
        //  handleReturnBook(issueId,bookId);
          //handleConformReturn(issueId,bookId);
          //setDisableConformReturn(true);
        }else{
        alert("Failed to return book");}
      }
    }
    const handleConformReturn=async (issueId,bookId)=>{
      if (window.confirm("Are you sure you want to delete this issued record?")) {
      try{
        await axios.delete(`/admin/deleteIssued/${issueId}/${bookId}`);
        //setIssuedBooks((prev)=>prev.filter((book)=>book.id!==issueId));
        fetchIssuedBooks();
        alert("Issued record delete succesfully");
        setShowIssuedBooks(true);
        setShowBooks(false);
        setShowUsers(false);
      }
      catch(error){
        alert("Not deleted ");
      }}
    };

  return (
    <Box sx={{ bgcolor: "#121212", color: "#FFA500", p: 3, minHeight: "100vh",padding:"20px" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleAvatarClick}>
                <Avatar sx={{ bgcolor: "#f39c12" }}>
                    <AccountCircleIcon/>
                </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl}
                    open={open}
                    onClose={()=>{setAnchorEl(null);setShowProfileInfo(false);}}
                    PaperProps={{
                        sx:{backgroundColor: "#333", color: "#fff" }
                    }}
                    >
                <MenuItem onClick={()=>{handleViewProfile();}}>My Profile</MenuItem>  
                {showProfileInfo&&profile&&(
                     <Box sx={{ paddingX: 2, paddingY: 1 }}>
                     <Divider sx={{ my: 1, borderColor: "#444" }} />
                     <Typography variant="body1" sx={{ color: "#f39c12", fontWeight: "bold" }}>{profile.username}</Typography>
                     <Typography variant="body1" sx={{ color: "#f39c12", fontWeight: "bold" }}>Registered Users  :{profile.numberOfLibraryUsers}</Typography>
                     <Typography variant="body1" sx={{ color: "#f39c12", fontWeight: "bold" }}>Total Books Lent :{profile.numberOfBooksBorrowed}</Typography>
                     
                     </Box>
                )}      
                <MenuItem onClick={()=>{handleClose(); handleLogout();}}> LogOut </MenuItem>
            </Menu>
        </Box>
      <Typography variant="h3" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box
        ref={useref}
        component="form"
        onSubmit={saveBooks}
        sx={{  mx: "auto", mb: 4,px:2 }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          sx={{ mb: 2, input: { color: "white" }, label: { color: "#FFA500" },
            '& .MuiOutlinedInput-root':{
                '& fieldset':{
                    borderColor:"#FFA500",
                },
            },
        }}
          required
        />
        </Grid>
        <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          sx={{ mb: 2, input: { color: "white" }, label: { color: "#FFA500" } ,
          '& .MuiOutlinedInput-root':{
            '& fieldset':{
                borderColor:"#FFA500",
            },
        },}}
          required
        />
        </Grid>
        <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Available Copies"
          value={booksAvailable}
          onChange={(e) => setBooksAvailable(e.target.value)}
          sx={{ mb: 2, input: { color: "white" }, label: { color: "#FFA500" } ,
          '& .MuiOutlinedInput-root':{
            '& fieldset':{
                borderColor:"#FFA500",
            },
        },}}
          required
        />
        </Grid>
        <Grid item xs={12} md={3}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "#FFA500" }}>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ color: "white" ,'& .MuiSelect-icon':{color:"#FFA500",right:10,},}}
          >
            {["General Books", "Spiritual", "Philosphical", "History", "Geography", "Polity", "Economy", "Law", "Science", "Technology", "Current Affairs", "General Knowledge", "Exam Preparation"].map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
        <Button type="submit" variant="contained" sx={{ bgcolor: "#FFA500", color: "black", mb: 2 }}fullWidth>
            Register Book
        </Button>
        </Grid>
        </Grid>
      </Box>

       
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button onClick={fetchBooks} variant="contained"sx={{ bgcolor: "#FFA500", color: "black", mb: 2 }}>
          Books Catalogue
          </Button>
          <Button onClick={fetchIssuedBooks} variant="contained" sx={{ bgcolor: "#FFA500", color: "black", mb: 2 }}>
           Book Lending Info
          </Button>
          <Button onClick={fetchUser} variant="contained" sx={{ bgcolor: "#FFA500", color: "black", mb: 2 }}>
          User Borrowing Summary
</Button>

<Button onClick={getUsersInfo} variant="contained" sx={{ bgcolor: "#FFA500", color: "black", mb: 2 }}>
          All Users Info
</Button>

          {/* <Button onClick={handleLogout} variant="contained" color="error" sx={{ m: 1 }}>
            Logout
          </Button> */}
        </Box>
        

        <Box sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    px: 3}}>
        
      {bookCatalogue&& ( <TextField
          label="Search by title or author"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb:2,input: { color: "white" }, label: { color: "#FFA500" },'& .MuiOutlinedInput-root':{
            '& fieldset':{
                borderColor:"#FFA500",
            },
        },width:"22%" }}
        />)}
         {bookCatalogue&& (  <TextField
          label="Enter Valid Username to Issue a Book"
          variant="outlined"
          onChange={(e) =>{ setUsername(e.target.value);setUsernameError(false)}

        }
        error={usernameError}
        helperText={usernameError?"Invalid username":""}
          sx={{ mb: 2, input: { color: "white" }, label: { color: "#FFA500" }, '& .MuiOutlinedInput-root':{
            '& fieldset':{
                borderColor:usernameError?"red":"#FFA500",
            },
        },
        width:"22%"}}
        /> )}
      </Box>

      {showBooks && (
        <Box mt={4}>
          <Typography variant="h5" align="center">Books List</Typography>
          <Paper sx={{ mt: 2 }}>
          <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Available</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.id}</TableCell>
                    <TableCell>{book.bookTitle}</TableCell>
                    <TableCell>{book.authorName}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.booksAvailable}</TableCell>
                    <TableCell>
                      <Button onClick={() => deleteBook(book.id)} color="error">Delete</Button>
                      <Button onClick={() => increaseBook(book.id)} color="success">+</Button>
                      <Button onClick={() => decreaseBook(book.id)} color="warning">-</Button>
                      <Button
                        onClick={() => issueBook(book.id)}
                        disabled={book.booksAvailable <= 0 || username === ""||usernameError}
                        color="info"
                      >
                        Issue
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
          </Paper>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="warning"
            sx={{ backgroundColor: "#333", color: "#f39c12", '& .MuiPaginationItem-root': { color: "#f39c12" } }}
          />
          </Box>
        </Box>
      )}

      {showIssuedBooks && (
        <Box mt={4}>
          <Typography variant="h5" align="center">Issued Books</Typography>
          <Paper sx={{ mt: 2 }}>
          <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book Id</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Issue Date</TableCell>
                  <TableCell>Due Date </TableCell>
                  <TableCell>Return Date</TableCell>
                  <TableCell>Fine Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentIssuedBooks.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>{issue.bookId}</TableCell>
                    <TableCell>{issue.userName}</TableCell>
                    <TableCell>{issue.bookTitle}</TableCell>
                    <TableCell>{issue.tookDate}</TableCell>
                    <TableCell>{issue.dueDate}</TableCell>
                    <TableCell>{issue.returnedDate}</TableCell>
                    <TableCell>{issue.fineAmount}</TableCell>
                    <TableCell>
                      <Button 
                        variant="contained"
                        color="primary"
                        onClick={()=>handleReturnBook(issue.id,issue.bookId)}
                        sx={{ mr: 1 }}
                      >
                        Return Book
                      </Button>
                      <Button 
                        variant="contained"
                        color="error"
                        onClick={()=>handleConformReturn(issue.id,issue.bookId)}
                         disabled={!issue.returnedDate}
                      >
                        Delete Record
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
          </Paper>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination
            count={totalIssuedPages}
            page={issuedCurrentPage}
            onChange={(e, value) => setIssuedCurrentPage(value)}
            color="warning"
            sx={{ backgroundColor: "#333", color: "#f39c12", '& .MuiPaginationItem-root': { color: "#f39c12" } }}
          />
          </Box>
        </Box>
      )}
      {showUsers && (
  <Box mt={4}>
    <Typography variant="h5" align="center" gutterBottom>
      Users
    </Typography>

    <Paper sx={{ overflowX: "auto", mt: 2 }}>
       <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}> 
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Borrowed Book Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.bookCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Paper>

    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination
            count={totalCurrentUsersPages}
            page={usersCurrentPage}
            onChange={(e, value) => setUsersCurrentPage(value)}
            color="warning"
            sx={{ backgroundColor: "#333", color: "#f39c12", '& .MuiPaginationItem-root': { color: "#f39c12" } }}
          />
          </Box>
    </Box>)}
    {usersInfo && (
  <Box mt={4}>
    <Typography variant="h5" align="center" gutterBottom>
      Users
    </Typography>

    <Paper sx={{ overflowX: "auto", mt: 2 }}>
       <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}> 
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentFullUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Paper>

    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination
            count={totalCurrentFullUsersPages}
            page={usersFullCurrentPage}
            onChange={(e, value) => setUsersFullCurrentPage(value)}
            color="warning"
            sx={{ backgroundColor: "#333", color: "#f39c12", '& .MuiPaginationItem-root': { color: "#f39c12" } }}
          />
          </Box>

          
  </Box>
)}

    </Box>
  );
}

export default AdminDashboard;




