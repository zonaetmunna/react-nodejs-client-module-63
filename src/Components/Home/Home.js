import React, { useEffect, useRef, useState } from 'react';

const Home = () => {
     const [users, setUsers] = useState([]);
     const nameRef = useRef();
     const emailRef = useRef();
     useEffect(() => {
          fetch('http://localhost:3000/users')
               .then(res => res.json())
               .then(data => setUsers(data))
     }, [])


     const handleAddUser = (e) => {

          const name = nameRef.current.value;
          const email = emailRef.current.value;

          const newUser = { name: name, email: email }

          // fetch
          fetch('http://localhost:3000/users', {
               method: 'post',
               headers: {
                    'content-type': 'application/json'
               },
               body: JSON.stringify(newUser)
          })
               .then(res => res.json())
               .then(data => {
                    console.log(data);
                    const addedUser = data;
                    const newUser = [...users, addedUser];
                    setUsers(newUser);

               })
          nameRef.current.value = '';
          emailRef.current.value = '';

          e.preventDefault();
     }

     return (
          <div>
               <form onSubmit={handleAddUser} >
                    <input type="text" name="" id="" ref={nameRef} placeholder="your name" />
                    <input type="email" name="" id="" ref={emailRef} placeholder="your email" />
                    <input type="submit" value="Submit" />
               </form>
               <ul>
                    {
                         users.map(user => <li>{user.name}</li>)
                    }
               </ul>
          </div>
     );
};

export default Home;