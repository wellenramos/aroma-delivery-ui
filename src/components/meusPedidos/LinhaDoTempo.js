import {Box, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import React from "react";

const LinhaDoTempo = ({etapas}) => {
  return (
      <Box mt={2}>
        {etapas.map((etapa, index) => (
            <Box key={index} display="flex" alignItems="flex-start" mb={1}>
              <Box sx={{marginRight: 2}}>
                {etapa.completo ? (
                    <CheckCircleIcon sx={{color: "green"}}/>
                ) : (
                    <RadioButtonUncheckedIcon sx={{color: "#CCC"}}/>
                )}
              </Box>
              <Box>
                <Typography
                    variant="body1"
                    sx={{color: etapa.completo ? "#333" : "#AAA"}}
                >
                  {etapa.etapa}
                </Typography>
                {etapa.hora && (
                    <Typography variant="body2" color="textSecondary">
                      {etapa.hora}
                    </Typography>
                )}
              </Box>
            </Box>
        ))}
      </Box>
  )
}

export default LinhaDoTempo;