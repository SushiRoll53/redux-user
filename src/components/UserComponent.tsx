import { createUser, fetchUsers } from '@/redux/reducer/userSlice';
import { AppDispatch, RootState } from '@/redux/store/store';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const UsersComponent: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { entities, loading, error } = useSelector((state: RootState) => state.users);


    function addUser() {
        dispatch(createUser())
    }

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div>
            <h1>Users</h1>
            {loading === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {entities.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            {/* <button onClick={addUser}> */}
            <button onClick={() => { dispatch(createUser()) }}>
                Click me!
            </button>

        </div>
    );
};

export default UsersComponent;
