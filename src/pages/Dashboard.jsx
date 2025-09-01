import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import sheets from "../axios/axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
);

function Dashboard() {
    const [eventos, setEventos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(()=>{
        async function getDados() {
            try{
                const responseEventos = await sheets.getEvents();
                const responseUsuarios = await sheets.getUsers();
                setEventos(responseEventos.data.eventos);
                setUsuarios(responseUsuarios.data.users);
            }catch(error){
                console.log(error);
            }
        }
        getDados();
    },[])

    //processar os dados para o gráfico de eventos por organizador
    const eventosPorOrganizador = {};
    eventos.forEach(evento => {
        //Liga o id do organizador do evento atual a orgId
        const orgId = evento.fk_id_organizador;
        //para cada id no objeto, adicione 1 ao guardado, ou 1 a 0 se não existir
        eventosPorOrganizador[orgId] = (eventosPorOrganizador[orgId]||0) + 1;
    })

    const barData = {
        labels:Object.keys(eventosPorOrganizador),
        datasets:[
            {
                label:"Eventos Por Organizador",
                data:Object.values(eventosPorOrganizador),
                backgroundColor:"rgba(190,206,24, 0.6)"
            }
        ]
    }

    return(
        <div style={{padding:20}}> 
            <h2>Dashboards:</h2>
            <div style={{width:"600px", marginBottom:40}}>{/* Grafico de Barras */}
                <Bar
                data={barData}

                />
            {/* </div>
            <div>Grafico de Pizza */}

            </div>
        </div>
    )
}

export default Dashboard;