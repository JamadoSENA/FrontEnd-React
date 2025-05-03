import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Alert from "@mui/material/Alert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";

const FormProduct = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    cantidad: "",
  });

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [error, setError] = useState(null);
  const { nombre, categoria, precio, cantidad } = producto;

  const onInputChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Validación de campos vacíos
    if (!nombre || !categoria || !precio || !cantidad) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Validación de precio (número positivo)
    const precioValor = parseFloat(precio);
    if (isNaN(precioValor) || precioValor <= 0) {
      setError("El precio debe ser un número positivo.");
      return;
    }

    // Validación de cantidad (entero positivo)
    const cantidadValor = parseInt(cantidad);
    if (!Number.isInteger(Number(cantidad)) || Number(cantidad) <= 0) {
      setError("La cantidad debe ser un número entero positivo.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8086/api/producto/update/${id}`,
        producto
      );
      setAlertaVisible(true);
      setError(null);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error al guardar el producto. Intente nuevamente.");
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      const result = await axios.get(
        `http://localhost:8086/api/producto/list/${id}`
      );
      setProducto(result.data.data);
    };
    loadProduct();
  }, [id]);

  return (
    <Stack spacing={{ xs: 5, sm: 5 }} useFlexGap onSubmit={onSubmit}>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          sx={{
            flexDirection: { sm: "column", md: "row" },
            gap: 2,
          }}
        >
          <Card
            sx={{
              maxWidth: { sm: "100%", md: "50%" },
              flexGrow: 1,
              outline: "1px solid",
            }}
          >
            <CardActionArea>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Inventory2Icon color="dark" fontSize="small" />
                <Typography fontWeight="medium">Producto</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
            height: { xs: 350, sm: 400, md: 480 },
            width: "100%",
            borderRadius: "20px",
            border: "0.2px solid ",
            borderColor: "gray",
            backgroundColor: "background.paper",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Editar Producto</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="nombre">Nombre</InputLabel>
              <Input
                className="form-control"
                onChange={onInputChange}
                value={nombre}
                type="text"
                name="nombre"
                placeholder="Asigne un nuevo nombre"
                required
              />
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="categoria">Categoria</InputLabel>
              <Input
                className="form-control"
                onChange={onInputChange}
                value={categoria}
                type="text"
                name="categoria"
                placeholder="Asigne una nueva categoria"
                required
              />
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="precio">Precio</InputLabel>
              <Input
                className="form-control"
                onChange={onInputChange}
                value={precio}
                type="number"
                name="precio"
                placeholder="Asigne un nuevo precio al producto"
                required
              />
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="cantidad">Cantidad</InputLabel>
              <Input
                className="form-control"
                onChange={onInputChange}
                value={cantidad}
                type="number"
                name="cantidad"
                placeholder="Asigne una nueva cantidad al producto"
                required
              />
            </FormControl>
          </Box>
        </Box>
        <ButtonGroup
          color="success"
          variant="text"
          aria-label="Basic button group"
        >
          <Button type="submit" color="primary" onClick={onSubmit}>
            Guardar
          </Button>
          <Button color="primary" component={Link} to="/">
            Cancelar
          </Button>
        </ButtonGroup>
        
        {error && (
          <Alert
            icon={<ErrorOutlineIcon fontSize="inherit" />}
            severity="error"
          >
            {error}
          </Alert>
        )}
        {alertaVisible && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            ¡El producto se actualizo exitosamente!
          </Alert>
        )}
      </Box>
    </Stack>
  );
};

export default FormProduct;
