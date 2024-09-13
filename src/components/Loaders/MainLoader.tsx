import { Box, Grid, styled } from "@mui/material";

const Loader = ({
  big,
  spinner: spinner,
}: {
  big?: string;
  spinner?: boolean;
}) => {
  let LoaderBodyDiv;
  if (spinner) {
    LoaderBodyDiv = styled(Box)({
      width: "20px",
      aspectRatio: 1,
      "--_c": "no-repeat linear-gradient(orange 0 0) 50%",
      background: `var(--_c)/100% 50%,
        var(--_c)/50% 100%`,
      borderRadius: "50%",
      animation: "upload-loader 2s infinite linear",
      "@keyframes upload-loader": {
        "100%": { transform: "rotate(1turn)" },
      },
    });
  } else {
    LoaderBodyDiv = styled(Box)({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      aspectRatio: "1.154",
      clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
      "--c": "no-repeat linear-gradient(#703bf7 0 0)",
      background: "var(--c), var(--c), var(--c), var(--c), var(--c)",
      backgroundSize: "100% calc(100% / 5 + 1px)",
      animation: "main-loader 2s infinite",
      "@keyframes main-loader": {
        "0%": {
          backgroundPosition:
            "0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4)",
        },
        "20%": {
          backgroundPosition:
            "0 calc(4 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4)",
        },
        "40%": {
          backgroundPosition:
            "0 calc(4 * 100% / 4), 0 calc(3 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4)",
        },
        "60%": {
          backgroundPosition:
            "0 calc(4 * 100% / 4), 0 calc(3 * 100% / 4), 0 calc(2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4)",
        },
        "80%": {
          backgroundPosition:
            "0 calc(4 * 100% / 4), 0 calc(3 * 100% / 4), 0 calc(2 * 100% / 4), 0 calc(1 * 100% / 4), 0 calc(-2 * 100% / 4)",
        },
        "100%": {
          backgroundPosition:
            "0 calc(4 * 100% / 4), 0 calc(3 * 100% / 4), 0 calc(2 * 100% / 4), 0 calc(1 * 100% / 4), 0 calc(0 * 100% / 4)",
        },
      },
    });
  }

  return (
    <Grid container justifyContent="center" alignItems="center" height="100%">
      <LoaderBodyDiv width={big ? { xs: big, sm: "15%" } : "15%"} />
    </Grid>
  );
};

export default Loader;
