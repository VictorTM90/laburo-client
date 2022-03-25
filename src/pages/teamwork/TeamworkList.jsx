import React, { useContext, useState, useEffect } from "react";
import {
  deleteTeamworkService,
  getAllTeamworkService,
} from "../../services/teamwork.services";
import { Link, useNavigate } from "react-router-dom";

import { CircularProgress, ThemeProvider } from "@mui/material";
import styles from "./TeamworkList.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {ThemeContext} from "../../context/theme.context"

function TeamworkList() {
  const [allTeamwork, setAllTeamwork] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    getAllTeamworks();
  }, []);

  const getAllTeamworks = async () => {
    try {
      const response = await getAllTeamworkService();
      setAllTeamwork(response);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleDeleteTeamwork = async (id) => {
    const filtTeamworks = allTeamwork.filter((team) => team._id !== id);
    await deleteTeamworkService(id);
    setAllTeamwork(filtTeamworks);
  };

  if (!allTeamwork) {
    return (
      <h3>
        <CircularProgress />;
      </h3>
    );
  }

  return (
    <div>
      <div className={styles.div}>
        <h2>Estos son tus equipos</h2>
        <span>
          Para ver los detalles de cada uno solo tienes que hacer click sobre el
          nombre.
        </span>
      </div>

      <section>
        {allTeamwork.map((eachTeam) => {
          return (
            <div key={eachTeam._id}>
            <ThemeProvider theme={theme}>
              <Card   sx={{ minWidth: 275, maxWidth: 500 }} >
                <CardContent >
                  <Link to={`/teamwork/${eachTeam._id}`} >
                    <Typography variant='h5' component='div' color ="primary">
                      {eachTeam.name}
                    </Typography>
                    {eachTeam.members.map((members) => {
                      return <p key={members._id}>{members.name}</p>;
                    })}
                  </Link>
                </CardContent>

                <CardActions>
                  <Button
                    size='small'
                    onClick={() => handleDeleteTeamwork(eachTeam._id)}>
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
              </ThemeProvider>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default TeamworkList;
