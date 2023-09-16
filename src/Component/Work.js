import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasicTable from './BasicTable';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Work() {
  const DATA_FROM_API = 'https://dummyjson.com/products';
  const [data, setData] = useState([]);


  async function fetchData() {
    try {
      const response = await axios.get(DATA_FROM_API);
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (<>
    <h1>List of Products</h1>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data && data?.products?.map((data) =>  <BasicTable key={data.id} data={data} />   )}         
         </TableBody>
      </Table>
    </TableContainer> 
  </>)
}

export default Work;
