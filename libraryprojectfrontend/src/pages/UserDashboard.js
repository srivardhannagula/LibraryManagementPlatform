// import { useState,useEffect } from "react";
// import axios from "../axiosConfig";
// import {useNavigate} from "react-router-dom";
// function UserDashboard(){
//     const [books,setBooks]=useState([]);
//     const [showBooks,setShowBooks]=useState(false);
//     const [showSelectedBooks,setShowSelectedBooks]=useState(false);
//     const [selectedCategory,setSelectedCateory]=useState("General Books");
//     const[currentPage,setCurrentPage]=useState(1);
//     const [query,setQuery]=useState("");
//     const navigate=useNavigate();
//     const categories=[
//        "General Books", "Spiritual", "Philosophical", "History", "Geography", 
//        "Polity", "Economy", "Law", "Science",
//         "Technology", "Current Affairs", "General Knowledge", "Exam Preparation"]
//         const booksPerPage=10;
//         const totalPages=Math.ceil(books.length/booksPerPage);
//         const indexOfLastBook=currentPage*booksPerPage;
//         const indexOfFirstBook=indexOfLastBook-booksPerPage;
//         const currentBooks=books.slice(indexOfFirstBook,indexOfLastBook);
//         useEffect(()=>{
//                fetchBooks();},[query]);
//     const fetchBooks=async ()=>{
//         let response;
//         if(query===""){
//          response=await axios.get("/user/viewBooks");}
//          else{
//             response=await axios.get(`/user/searchBooks?query=${encodeURIComponent(query)}`)
//          }

//         setBooks(response.data);
//         setShowBooks(true);
//         setShowSelectedBooks(false);
//         setCurrentPage(1);
//     }
//     const fetchBooksByCategory=async ()=>{
//         const token=localStorage.getItem("token");
//         const response=await axios.post("/user/viewBooksByCategory",{category:selectedCategory},{ headers:{
//                 Authorization:`Bearer ${token}`,
//             },
//         });
//         setBooks(response.data);
//         setShowBooks(false);
//         setShowSelectedBooks(true);
//         setCurrentPage(1);
//     }
//     const handleLogout=()=>{
//         localStorage.removeItem("token");
//         navigate("/");
//     }

//     return(
//         <center> 
//         <div>
//                 <h1>UserDashboard</h1>
//                 <button onClick={fetchBooks}>View BOoks</button> <br></br><br></br>
//                 <select value={selectedCategory} onChange={(e)=>setSelectedCateory(e.target.value)}>
//                 {categories.map((cat,idx)=>(
//                     <option key={idx}>{cat}</option>
//                 ))}
//                 </select>{" "}<br></br><br></br>
//                 <button onClick={fetchBooksByCategory}>Select Category BOoks</button>
//                 <br></br><br></br>
//                 <button onClick={handleLogout}>Logout</button>
//                 <input type="text" placeholder="Search by title or author" value={query} onChange={(e)=>setQuery(e.target.value)}></input>
//                 {(showBooks||showSelectedBooks)&&(
//                     <div>
//                         <h2>Books List</h2>
//                         <table border="3">
//                             <thead>
//                                 <tr>
//                                     <th>Id</th>
//                                     <th>Book Title</th>
//                                     <th>Author</th>
//                                     <th>Category</th>
//                                     <th>Available Copies</th>
//                                 </tr>
//                             </thead>
//                             <tbody >
//                                 {currentBooks.map((book)=>(
//                                     <tr key={book.id}>
//                                         <td>{book.id}</td>
//                                         <td>{book.bookTitle}</td>
//                                         <td>{book.authorName}</td>
//                                         <td>{book.category}</td>
//                                         <td>{book.booksAvailable}</td>
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
//         </div>  

//         </center>
//     );
// }
// export default UserDashboard;

import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, TextField, Select, MenuItem, Typography,Divider,  Avatar,IconButton,Menu, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";

function UserDashboard() {
    const [books, setBooks] = useState([]);
    const [showBooks, setShowBooks] = useState(false);
    const [showSelectedBooks, setShowSelectedBooks] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("General Books");
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [anchorEl,setAnchorEl]=useState(null);
    const [profile,setProfile]=useState(null);
    const [showProfileInfo,setShowProfileInfo]=useState(false);
    const open=Boolean(anchorEl);
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
            const response=await axios.get("/user/profile",{
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
    

    const categories = [
        "General Books", "Spiritual", "Philosophical", "History", "Geography",
        "Polity", "Economy", "Law", "Science", "Technology", "Current Affairs", 
        "General Knowledge", "Exam Preparation"
    ];

    const booksPerPage = 5;
    const totalPages = Math.ceil(books.length / booksPerPage);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    useEffect(() => {
        fetchBooks();
    }, [query]);

    const fetchBooks = async () => {
        let response;
        if (query === "") {
            response = await axios.get("/user/viewBooks");
        } else {
            response = await axios.get(`/user/searchBooks?query=${encodeURIComponent(query)}`);
        }
        setBooks(response.data);
        setShowBooks(true);
        setShowSelectedBooks(false);
        setCurrentPage(1);
    };

    const fetchBooksByCategory = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.post("/user/viewBooksByCategory", { category: selectedCategory }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setBooks(response.data);
        setShowBooks(false);
        setShowSelectedBooks(true);
        setCurrentPage(1);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
       
        <Box sx={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", padding: "20px" }}>
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
                     <Typography variant="body2" sx={{ color: "#f39c12" }}>Books Borrowed:{profile.numberOfBooksBorrowed}</Typography>
                     </Box>
                )}      
                <MenuItem onClick={()=>{handleClose(); handleLogout();}}> LogOut </MenuItem>
            </Menu>
        </Box>
            <Typography variant="h3" sx={{ color: "#f39c12", textAlign: "center", marginBottom: "20px" }}>
                User Dashboard
            </Typography>
             
            <Box sx={{ textAlign: "center", marginBottom: "20px" ,display:'flex',flexDirection:'column',alignItems :'center',gap:'10px',
                '@media (min-width: 600px)': {  
                flexDirection: 'row',
                justifyContent: 'center',
                },
            }}>
                <Button variant="contained" color="primary" onClick={fetchBooks} sx={{ margin: "5px", backgroundColor: "#f39c12", '&:hover': { backgroundColor: '#e67e22' } }}>
                    View Books
                </Button>
                <Box sx={{ margin: "10px" }}>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        sx={{
                            backgroundColor: "#333", 
                            color: "#fff", 
                            marginRight: {xs:'0',sm:"10px"}, 
                            marginBottom:{xs:'10px',sm:'0'},
                            '& .MuiSelect-icon': { color: "#f39c12" }
                        }}
                    >
                        {categories.map((cat, idx) => (
                            <MenuItem key={idx} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                    <Button variant="contained" color="primary" onClick={fetchBooksByCategory} sx={{ margin: "5px", backgroundColor: "#f39c12", '&:hover': { backgroundColor: '#e67e22' } }}>
                        Select Category Books
                    </Button>
                </Box>
                {/* <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ margin: "5px", backgroundColor: "#e74c3c", '&:hover': { backgroundColor: '#c0392b' } }}>
                    Logout
                </Button> */}
            </Box>
            <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                <TextField
                    label="Search by Title or Author"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{
                        backgroundColor: "#333", 
                        color: "#fff", 
                        width: "300px", 
                        '& .MuiOutlinedInput-root': { backgroundColor: '#333' ,'& input':{color:'#fff'}},
                        '& .MuiInputLabel-root': { color: '#f39c12' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f39c12' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f39c12' },
                    }}
                />
            </Box>
            {(showBooks || showSelectedBooks) && (
                <Box sx={{ marginTop: "20px" }}>
                    <Typography variant="h5" align="center" sx={{ marginBottom: "20px", color: "#f39c12" }}>
                        Books List
                    </Typography>
                    <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: "#f39c12" }}>Id</TableCell>
                                    <TableCell sx={{ color: "#f39c12" }}>Book Title</TableCell>
                                    <TableCell sx={{ color: "#f39c12" }}>Author</TableCell>
                                    <TableCell sx={{ color: "#f39c12" }}>Category</TableCell>
                                    <TableCell sx={{ color: "#f39c12" }}>Available Copies</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentBooks.map((book) => (
                                    <TableRow key={book.id}>
                                        <TableCell sx={{ color: "#000" }}>{book.id}</TableCell>
                                        <TableCell sx={{ color: "#000" }}>{book.bookTitle}</TableCell>
                                        <TableCell sx={{ color: "#000" }}>{book.authorName}</TableCell>
                                        <TableCell sx={{ color: "#000" }}>{book.category}</TableCell>
                                        <TableCell sx={{ color: "#000" }}>{book.booksAvailable}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            sx={{ backgroundColor: "#333", color: "#f39c12", '& .MuiPaginationItem-root': { color: "#f39c12" } }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default UserDashboard;
