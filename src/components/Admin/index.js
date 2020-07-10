import React, { Component, useContext } from "react";
import { FirebaseContext } from "../Firebase";
export class AdminPage extends Component {
  static contextType = FirebaseContext;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }
  componentDidMount() {
    const firebase = this.context;
    this.setState({ loading: true });
    firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();
      console.log(usersObject);
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      console.log(usersList);
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }
  componentWillUnmount() {
    const firebase = this.context;
    firebase.users().off(); //to turn off the listener
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {loading && <p>Loadinng...... Please Wait</p>}
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

export default AdminPage;
