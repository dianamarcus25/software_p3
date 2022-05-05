import React from 'react';
import SideNavbar from '../header/SideNavbar.jsx';
import TopNavbar from '../header/TopNavbar.jsx'
import '../css/search.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //create an array for the users 
      mentorsInfo: []
    };  
  }

  handleInput = (event) => {
    event.preventDefault();
    const { value } = event.target;
    console.log('Value', value)
    this.setState({
      query: value
    });
    this.listMentors(value);
  };

  listMentors = query => {
    //fetch data from database of registered users and select only the 
    //first name, last name and the users with the role of "mentor"
      axios.get('/api/users/register')
       .then(res =>{
        const mentorsInfo = (res.data || []).map(object => ({ 
          firstname: object.firstname,
          lastname: object.lastname,
          role: object.role="mentor",
          }));
          this.setState({ mentorsInfo });
       })
    };

  componentDidMount() {
    this.listMentors("");
  }
  render() {
    return(
<>
{/* navigation bars */}
<SideNavbar/>
<TopNavbar/>

  <div className="container-search">
	<div className="row" id="search">
		<form id="search-form" action="" data-spy="scroll" >
			<div className="form-filter col-sm-3 col-xs-6">
				<input className="form-control" 
        type="text" 
        placeholder="Search"  
        onChange={this.handleInput}/> 

   <label htmlFor="industry">Industry</label>
				<select data-filter="industry" className="filter-industry filter form-control">
					<option value="Select industry">Select industry</option>
					<option value="Show all">Show All</option>
				</select>

      <label htmlFor="job-title">Job title</label>
				<select data-filter="job" className="filter-job filter form-control">
					<option value="Select job title">Select job title</option>
					<option value="Show all">Show All</option>
				</select>
      
      <label htmlFor="sort-by">Sort by</label>
				<select data-filter="by" className="filter-by filter form-control">
					<option value="Sort by">Sort by</option>
					<option value="Show all">Show All</option>
				</select>

			<div className="button-filter">
				<button type="submit" className="btn btn-primary" >Search</button>
			
      </div>
      </div>
      
		</form>
  </div>


<div className='row'>
<ul>

{/* mapping the information retreived to the client side */}
    {this.state.mentorsInfo.map(function(mentorsInfo, index){
      return (
        <span> 
          <div className="col-sm-6">
              <div className='container-mentors'>
             <div className='card-mentors'> 

             {/* list first name and last name */}
            <div className="card-header" key={[index.firstname,index.lastname]}>Name: {mentorsInfo.firstname} {mentorsInfo.lastname}</div>

            <div className="card-body"> Other information they will 
            have on their profile such as job title, 
            industry and university attended</div>

            {/* list the role */}
            <div className="card-body" key={index.role}>Role: {mentorsInfo.role="mentor"}</div>
            
            {/* redirect to joining a room page */}
            <Link to="/JoinRoom" className="btn btn-primary">Join a chat</Link>
           </div>
            </div>
           </div>
           </span>
         )
      }
    )}
  </ul>
  </div>

</div> 

      </>
    );
  }
}

  export default Search;










