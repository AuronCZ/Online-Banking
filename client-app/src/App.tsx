import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get('htpp://localhost:5000/api/accounts').then(response => {
      console.log(response);
      setAccounts(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Banking System'/>
      <header className="App-header">
        <List>
        {accounts.map((account: any) =>(
            <List.Item key={account.id}>
              {account.name}
            </List.Item>
          ))}
        </List>
      </header>
    </div>
  );
}

export default App;
