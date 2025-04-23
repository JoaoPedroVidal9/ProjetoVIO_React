import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";

function ConfirmDelete({open, onClose, onConfirm, userName}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar exclusão</DialogTitle>
      <DialogContent>
        <Typography>Deseja mesmo excluir este usuário:<p>{userName} ?</p></Typography>
        
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onConfirm} color="error">Excluir</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDelete;
