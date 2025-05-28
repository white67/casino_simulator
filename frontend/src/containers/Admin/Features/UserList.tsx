import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container,
    Alert,
} from '@mui/material';
import api from "../../../services/AuthService.tsx";

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('api/admin/users/')
                setUsers(response.data);
                console.log('Fetched users:', response.data); // Log users after fetch
            } catch (error) {
                setError('Error fetching users');
                console.error('Fetch error:', error); // Log error for debugging
            }
        };

        fetchUsers();
    }, []);  // Empty dependency array ensures this runs only once

    return (
        <Container>
            <Typography variant="h4" gutterBottom>User List</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Is Admin</TableCell>
                            <TableCell>Date Joined</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.is_superuser ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{new Date(user.date_joined).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminUserList;
