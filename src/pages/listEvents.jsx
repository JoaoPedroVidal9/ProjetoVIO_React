import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import ModalCriarIngresso from "../components/ModalCriarIngresso";

function listEvents() {
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState({
    // Visibilidade (false - oculto/true - visível)
    open: false,
    // Nível do alerta (Success, Error, Warning, etc)
    severity: "",
    // Mensagem exibida
    message: "",
  });

  // Função para exibir o alerta
  const showAlert = (sev, message) => {
    setAlert({ open: true, severity: sev, message });
  };

  const hideAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const navigate = useNavigate();

  async function getEvents() {
    // Chamada da Api
    await api.getEvents().then(
      (response) => {
        console.log(response.data.eventos);
        setEvents(response.data.eventos);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  async function deleteEvent(id) {
    // Chamada da Api
    try {
      await api.deleteEvent(id);
      await getEvents();
      showAlert("success", "Evento deletado com sucesso");
    } catch (error) {
      console.log("Erro ao deletar Evento", error);
      showAlert("error", error.response.data.error);
    }
  }

  const listEvents = events.map((event) => {
    return (
      <TableRow key={event.id_evento}>
        <TableCell align="center">{event.nome}</TableCell>
        <TableCell align="center">{event.descricao}</TableCell>
        <TableCell align="center">{event.data_hora}</TableCell>
        <TableCell align="center">{event.local}</TableCell>
        <TableCell align="center">{event.fk_id_organizador}</TableCell>
        <TableCell align="center">
          {event.imagem?<img src={`http://localhost:5000/api/v1/evento/img/${event.id_evento}`}
          alt="Imagem do evento"
          style={{width:"80px", height:"80px", objectFit:"cover"}}
          />:"Nenhuma Imagem"}
        </TableCell>
        <TableCell align="center">{event.tipoImagem?event.tipoImagem:"Nenhum"}</TableCell> 
        <TableCell align="center">
          <IconButton onClick={() => deleteEvent(event.id_evento)}>
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => abrirModalIngresso(event)}>
            <AddIcon color="success"/>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  useEffect(() => {
    getEvents();
  }, []);

  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModalIngresso = (evento) => {
    setEventoSelecionado(evento);
    setModalOpen(true);
  };

  const fecharModalIngresso = () => {
    setModalOpen(false);
    setEventoSelecionado("");
  };

  return (
    <div>
      {events==[]?(<Text>Carregando</Text>):
      <Snackbar
        open={alert.open}
        autoHideDuration={1500}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={hideAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>}
      {events.lenght === 0 ? (
        <h1>Carregando Eventos</h1>
      ) : (
        <div>
          <h5>Lista de Eventos</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "#Bece18", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data e Hora</TableCell>
                  <TableCell align="center">Local</TableCell>
                  <TableCell align="center">Id Organizador</TableCell>
                  <TableCell align="center">Imagem</TableCell>
                  <TableCell align="center">Tipo Imagem</TableCell>
                  <TableCell align="center">Ações</TableCell>
                  <TableCell align="center">Criar ingresso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listEvents}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" onClick={logout}>
            SAIR
          </Button>
        </div>
      )}
      <ModalCriarIngresso
        open={modalOpen}
        onClose={fecharModalIngresso}
        eventoSelecionado={eventoSelecionado}
      />
    </div>
  );
}
export default listEvents;
