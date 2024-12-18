import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

interface CountdownProgressProps {
  redirectTo: string;
  seconds?: number;
}

const CountdownProgress = ({
  redirectTo,
  seconds = 2,
}: CountdownProgressProps) => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState<number>(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 1 ? seconds : prevProgress - 1
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  useEffect(() => {
    if (progress === 0) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo, progress]);

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.tooltip + 1 }}
      open={progress > 0}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ position: "relative" }}>
          <CircularProgress
            variant="determinate"
            value={(100 / seconds) * progress}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {progress}
            </Typography>
          </Box>
        </Box>
        <Typography variant="caption" component="div" color="text.secondary">
          Redirecting you to {redirectTo} page in {progress} seconds!
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default CountdownProgress;
