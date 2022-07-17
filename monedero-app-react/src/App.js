
import { useState, useEffect } from "react";
import axios from "axios";

const initValues = {
  _id: "",
  nombre: "",
  tipo: "",
  monto: ""
};

function App() {

  const URL_API = "http://localhost:3001/registro";
  const [datos, setDatos] = useState(initValues);
  const [lista, setLista] = useState([]);
  const [titulo, setTitulo] = useState("Nuevo Registro");

  const listar = () => {
    axios.get(`${URL_API}/listar`).then((result)=>{
      console.log(result);
      setLista(result.data);
    });
  };

  const handleChange = (e) => {
    console.log('e.target.name: ', e.target.name);
    console.log('e.target.value: ', e.target.value);
    const { name, value} = e.target;
    let nDatos = {...datos, [name]: value};
    console.log(nDatos);
    setDatos(nDatos);
};

  const handleSelect = (id) => {
    axios.get(`${URL_API}/detalle/${id}`).then((result)=>{
      setTitulo("Editar Registro");
      setDatos(result.data);
    });
  };

  const handleDelete = (id) => {
    if(window.confirm('Desea eliminar este registro?')){
      axios.delete(`${URL_API}/eliminar/${id}`).then((result)=>{
        listar();
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(datos._id){
      console.log("editar");
      axios.put(`${URL_API}/editar`, datos).then((result)=>{
        listar();
      });
    }else{
      console.log("guardar");
      axios.post(`${URL_API}/guardar`, datos).then((result)=>{
        listar();
      });
    }
    setTitulo("Nuevo Registro");
    setDatos(initValues);
};

  useEffect(()=>{
    listar();
  },[]);

  return (
    <div className="container">
      <h2 className="mt-3">Monedero App</h2>
      <div className="row">
        <div className="col-md-4">
          <h3>{titulo}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tipo:</label>
              <select onChange={handleChange} name="tipo" value={datos.tipo} className="form-select" required >
                <option value="">Seleccione una opción</option>
                <option value="I">Ingreso</option>
                <option value="E">Egreso</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input type="text" onChange={handleChange} name="nombre" value={datos.nombre} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Monto:</label>
              <input type="number" onChange={handleChange} name="monto" value={datos.monto} className="form-control" required />
            </div>
            <div className="mb-3">
            <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
        <div className="col-md-8">
          <h3>Lista de Registros</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Id</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            {lista.map((elem)=>(
              <tr key={elem._id}>
                <td>{elem.nombre}</td>
                <td>{elem.tipo==='I' ? 'Ingreso': 'Egreso'}</td>
                <td>S/ {elem.monto}</td>
                <td>{elem._id}</td>
                <td>
                  <button type="button" onClick={()=>handleSelect(elem._id)} className="btn btn-info btn-sm me-2"><i className="bi bi-pencil-square"></i></button>
                  <button type="button" onClick={()=>handleDelete(elem._id)}  className="btn btn-danger btn-sm"><i className="bi bi-trash-fill"></i></button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;