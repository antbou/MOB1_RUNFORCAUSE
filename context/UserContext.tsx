import React from 'react';

type MyState = {
    user: {}
}

const UserContext = React.createContext({ user: {} });

export default UserContext;