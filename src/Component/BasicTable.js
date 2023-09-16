import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormControl , Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicTable({data}) {
  const DATA_FROM_API = 'https://dummyjson.com/products';
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [percentage, setPercentage] = useState("");
  const [price, setPrice] = useState(0);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`${DATA_FROM_API}/${id}`);
    console.log("DELETE RESPONSE: ", response);
  } catch (err) {
    console.error(err.response || "Error in deleting data");
  }
};

  const handleEdit = (id, title, brand, category, price , description, rating, stock, discountPercentage) => {
    setShow(true);
    setEditId(id);
    setTitle(title);
    setPrice(price);
    setCategory(category);
    setRating(rating);
    setStock(stock);
    setBrand(brand);
    setDescription(description);
    setPercentage(discountPercentage);
  }

  const confirmUpdate = async () => {

    setShow(false);
    console.log("EDITED VALUES");
    console.log("Title", title);
    console.log("Category", category);
    console.log("Rating", rating);
    console.log("Brand", brand);
    console.log("Stock", stock);
    console.log("price", price);
    console.log("Percentage", percentage);
    console.log("Description", description);


    const formData = new FormData();
     formData.append("Title", title);
     formData.append("Category", category);
     formData.append("Rating", rating);
     formData.append("Brand", brand);
     formData.append("Stock", stock);
     formData.append("price", price);
     formData.append("Percentage", percentage);
     formData.append("Description", description);

    try {
      const response = await axios.put(`${DATA_FROM_API}/${editId}`, formData, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("UPDATE RESPONSE", response);
    } catch (err) {
      console.error(err.response || "Error in editing data");
    }
   
  }

  return (<>
  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
    <TableCell component="th" scope="data">{data.id}</TableCell>
    <TableCell >{data?.title}</TableCell>
    <TableCell >{data?.brand}</TableCell>
    <TableCell >{data?.category}</TableCell>
    <TableCell >{data?.price}</TableCell>
    <TableCell >
      <IconButton  color="primary" aria-label="delete"
        onClick={() => handleDelete(data.id)}>
        <DeleteIcon />
      </IconButton>
      <IconButton color="primary" aria-label="edit"
        onClick={() => handleEdit(data.id, data.title, data.brand, data.category, data.price, 
          data.description, 
          data.rating, data.discountPercentage, data.stock, data.thumbnail, data.images )}>
        <Edit />
      </IconButton>
    </TableCell>
  </TableRow>
 
  <Modal  style={{color: "black"}} open={show} onClose={() => setShow(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
    <Box sx={style }>
      <FormControl sx={{ my: 1, mx: 1}} >
      <InputLabel htmlFor="title" >Title</InputLabel>
      <Input id="title" type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl sx={{ my: 2 ,  mx: 1}} >
      <InputLabel htmlFor="description" >Description</InputLabel>
      <Input id="description" type='text' value={description} onChange={(e) => setDescription(e.target.value)}  />
      </FormControl>
      <Box sx={{ flexGrow: 1 }} pt={3}>
      <Grid container spacing={2}>
      <Grid item xs={6} >
      <FormControl sx={{ my: 2,  mx: 1}} >
      <InputLabel htmlFor="category" >Category</InputLabel>
      <Input id="category" type='text' value={category} onChange={(e) => setCategory(e.target.value)}/> 
      </FormControl>
      </Grid>
      <Grid item xs={6} >
      <FormControl sx={{ my: 2,  mx: 1}} >
      <InputLabel htmlFor="brand" >Brand</InputLabel>
      <Input id="brand" type='text' value={brand} onChange={(e) => setBrand(e.target.value)} /> 
      </FormControl>
      </Grid>
      <Grid item xs={6} >
      <FormControl sx={{ my: 2,  mx: 1}} >
      <InputLabel htmlFor="discountPercentage">Discount Percentage</InputLabel>
      <Input id="discountPercentage" type='number' value={percentage} onChange={(e) => setPercentage(e.target.value)} /> 
      </FormControl>
      </Grid>
      <Grid item xs={6} >
      <FormControl sx={{ my: 2,  mx: 1}} >
      <InputLabel htmlFor="price">Price</InputLabel>
      <Input id="price" type='number'  value={rating} onChange={(e) => setPrice(e.target.value)} /> 
      </FormControl>
      </Grid>
      <Grid item xs={6} >
      <FormControl sx={{ my: 2,  mx: 1}} >
      <InputLabel htmlFor="stock" >Stock</InputLabel>
      <Input id="stock" type='number' value={stock} onChange={(e) => setStock(e.target.value)}/> 
      </FormControl>
      </Grid>
      <Grid item xs={6} >
      <FormControl sx={{ my: 2,  mx: 1}} >
      <InputLabel htmlFor="rating">Rating</InputLabel>
      <Input id="rating" type='number'  value={rating} onChange={(e) => setRating(e.target.value)} /> 
      </FormControl>
      </Grid>
     
      <Grid item xs={6} >
      <Button sx={{ my: 2, mx:2}} onClick={() => confirmUpdate()}>Save</Button>
      </Grid>
      <Grid item  xs={6}>
      <Button sx={{ my: 2, mx:2}} onClick={() => setShow(false)}>Cancel</Button>
      </Grid>
      </Grid>
    </Box>
    </Box>      
  </Modal>
  </>);
}


