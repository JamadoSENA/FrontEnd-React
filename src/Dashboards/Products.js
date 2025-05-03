import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fab,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Title from "./Title";

export default function Products() {
  const [ListProductos, setListProductos] = useState([]);
  const [message, setMessage] = useState(""); 
  const [severity, setSeverity] = useState("success"); 
  const [openSnackbar, setOpenSnackbar] = useState(false); 

  useEffect(() => {
    getProductos();
  }, []);

  //GET ALL PRODUCTS
  const getProductos = () => {
    axios
      .get("http://localhost:8086/api/producto/all")
      .then((response) => {
        setListProductos(response.data.data);
      })
      .catch((e) => {
        setMessage("Error al cargar los productos");
        setSeverity("error");
        setOpenSnackbar(true);
        console.log(e);
      });
  };

  //DELETE PRODUCTS
  const deleteProducto = async (idProducto) => {
    await axios
      .delete(`http://localhost:8086/api/producto/delete/${idProducto}`)
      .then(() => {
        setMessage("Producto eliminado exitosamente");
        setSeverity("success");
        setOpenSnackbar(true);
        getProductos();
      })
      .catch((e) => {
        setMessage("Error al eliminar el producto");
        setSeverity("error");
        setOpenSnackbar(true);
        console.log(e);
      });
  };

  //Cerrar el snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <React.Fragment>
      <Title
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Lista de productos
      </Title>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        style={{ marginBottom: "15px" }}
        component={Link}
        to="/products/create"
      >
        <AddIcon />
      </Fab>
      <Box sx={{ height: 400, width: "100%" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListProductos.map((producto, index) => (
              <TableRow key={index}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.categoria}</TableCell>
                <TableCell>{producto.precio}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell align="center">
                  <Link to={`/products/edit/${producto.id}`}>
                    <Fab color="primary" aria-label="edit">
                      <EditIcon />
                    </Fab>
                  </Link>
                  <IconButton
                    onClick={() => deleteProducto(producto.id)}
                    aria-label="delete"
                    size="large"
                    style={{ marginLeft: "8px" }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Snackbar para mostrar el mensaje */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
