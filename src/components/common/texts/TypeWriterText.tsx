import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material";
import Typewriter from "typewriter-effect";

interface TypeWriterTextProps {
  texts: string[];
  styles?: SxProps<Theme>;
}

const TypeWriterText = ({ texts, styles }: TypeWriterTextProps) => (
  <Paper
    elevation={3}
    sx={{
      color: (theme) => theme.palette.primary.main,
      p: 2,
      textAlign: "center",
      ...styles,
    }}
  >
    <Typography variant="h4" component="div">
      <Typewriter options={{ strings: texts, autoStart: true, loop: true }} />
    </Typography>
  </Paper>
);

export default TypeWriterText;
