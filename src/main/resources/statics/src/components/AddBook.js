import React from 'react';
import { Link } from 'react-router-dom';

class AddBook extends React.Component {
  //Initialize state with empty fields.
  state = {
    name: "",
    author: "",
    shelf: "",
    bookphoto: "",
  };
  
  //Handle form submission
  add = (e) => {
    e.preventDefault();
    const {name,author,shelf,bookphoto}=this.state;

    //Check the field whether they are empty
    if (this.state.name === "" || this.state.author === "" || this.state.shelf === "" || this.state.bookphoto === "") {
      alert("All the fields are mandatory!");
      return;
    }
    
    //create new object
    const newBook = {
  
      name,
      author,
      shelf,
      bookphoto,
    };
    
    //Call the addBookHandler 
    this.props.addBookHandler(newBook);
    this.setState({ name: "", author: "", shelf: "", bookphoto: "" });
  };
  
  //Handle photo selection
  handlePhotoChange=(e)=> {
    const file =e.target.files[0];
     
     //read and convert photo to base64 format
     if (file){
      const reader=new FileReader();
      reader.onloadend = () => {
        this.setState({ bookphoto: reader.result });
      };
      reader.readAsDataURL(file);

     }
    };


  render() {
    return (
      <div className="ui main">
        <style>
          {`
          .ui.menu.fixed {
            width: 100%;
          }
          `}
        </style>
        <h2 className="ui header">Add a Book</h2>
        
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name of the book</label>
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
          </div>
          <div className="field">
            <label>Author</label>
            <input type="text" name="author" placeholder="Author" value={this.state.author} onChange={(e) => this.setState({ author: e.target.value })} />
          </div>
          <div className="field">
            <label>Shelf Number</label>
            <input type="int" name="shelf" placeholder="Shelf Number" value={this.state.shelf} onChange={(e) => this.setState({ shelf: e.target.value })} />
          </div>
          <div className="field">
            <label>Book Photo</label>
            <input type="file" accept="image/*" onChange={this.handlePhotoChange} />
          </div>
          <div>
          <button type="submit">Add</button>
          </div>
        </form>
        <Link to="/booklist">
        <button type="submit">View Book List</button>
      </Link>
      </div>
    );
  }
}

export default AddBook;