
import './App.css'
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
//import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }

  }

  //=================GETALLUSERS======================//

  getAllUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => this.setState({ users: data }))
      .catch(err => console.log(err));
  }

  //==================DELETEUSER=================//
  //============== method: 'DELETE' ==============//

  deleteUser = (id) =>{
    fetch(`https://jsonplaceholder.typicode.com/users/${id} `, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          return this.setState({
            users: this.state.users.filter(user =>
              user.id !== id)
          })
        }
      })

  }
    //------------ ADDUSER -------------------//
    //============== method: 'POST' ==============//
  addUser = (name, username, email, phone, website) => {
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        name,
        username,
        email,
        phone,
        website
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json()
        }
      })
      .then((data) => {
        this.setState({ users: [...this.state.users, data] })
      })
      .catch(err => console.log(err));
  }


  //==================== EDITUSER ===================//
  //============== method: 'PUT' ==============//
  editUser = (id, name, username, email, phone, website) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        username,
        email,
        phone,
        website
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json()
        }
      })
      .then(() => {
        // Yeni Array Yarat
        let newUsers = [...this.state.users];

        // Deyiseceyim Usersin kopyasini yaradiram
        let newUser = { ...newUsers[id - 1] }

        // Bu Userse Funksiyada verdiyim argumentleri yerine qoyuram

        newUser = {
          id,
          name,
          username,
          email,
          phone,
          website
        }

        //deyisdiyim useri arrayin icinde yaziram
        newUsers[id-1] = newUser;
        //Bu Usersi state -e yazdirmaq
        this.setState({newUsers})
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getAllUsers();
    this.deleteUser(5);
    this.addUser("Ofeliya", "Ofa", "ofaabdul94@gmail.com", "055-586-87-73", "ofaabdul.com");
    this.editUser(9, "Deyisilen ad","username","525252525","user.com");
  }


  render() {
    const users = this.state.users
    console.log(this.state.users)
    return (
      <div className="App container">
        <h2>Crud With Json PlaceHolder</h2>
        <Table className="table table-success table-striped"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>UserName</th>
              <th>UserEmail</th>
              <th>UserPhone</th>
              <th>UserWebsite</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user.phone}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
export default App;



