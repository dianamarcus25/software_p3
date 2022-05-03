// import {useState, useEffect} from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Private = () =>{
//   const navigate = useNavigate
//     const [error, setError] = useState('');
//     const [privateData, setPrivateData]= useState('');

//     useEffect(() => {
//         const fetchPrivateData = async () => {
//           const config = {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             },
//           };
    
//           try {
//             const { data } = await axios.get("/api/private", config);
//             setPrivateData(data.data);
//           } catch (error) {
//             localStorage.removeItem("authToken");
//             setError("You are not authorized please login");
//           }
//         };
    
//         fetchPrivateData();
//       }, [navigate]);

//       //handling the log out 
//       const logoutHandle = () => {
//           localStorage.removeItem('authToken');
//           navigate('/login')
//       }

//     return <>error? (<span className='error-msg'> {error}</span> ):( <>
// <div style={{background: "green", color: "white"}}>{privateData}</div>
// <button onClick={logoutHandle}> Logout</button>
// </>
// );
// </>

// }
// export default Private;