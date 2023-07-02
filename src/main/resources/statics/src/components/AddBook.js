import React from 'react';
import { Link } from 'react-router-dom';

class AddBook extends React.Component {
  state = {
    name: "",
    author: "",
    shelf: "",
    bookphoto: "",
    
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.author === "" || this.state.shelf === "",this.state.photo === "") {
      alert("All the fields are mandatory!");
      return;
    }

    const newBook = {
      name: this.state.name,
      author: this.state.author,
      shelf: this.state.shelf,
      bookphoto: this.state.bookphoto,
    };

    this.props.addBookHandler(newBook);
    this.setState({ name: "", author: "", shelf: "",bookphoto: "" });
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
            <label>Shelf Number</label>
            <input type="int" name="bookphoto" placeholder="bookphoto" value={this.state.shelf} onChange={(e) => this.setState({ bookphoto: e.target.value })} />
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
