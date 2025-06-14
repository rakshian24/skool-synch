import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import HeroImage from "../assets/pngs/hero-image.png";
import { colors, screenSize } from "../constants";

type Props = {
  children: React.ReactNode;
};

const CommonAuthPage = ({ children }: Props) => {
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const isPcAndAbove = useMediaQuery(`(min-width:${screenSize.pc})`);
  return (
    <Box
      py={isTablet ? 3 : 10}
      px={2}
      pb={6}
      sx={{
        background:
          "linear-gradient(135deg, #e0e7ff 0%, #eef2ff 50%, #f5f7ff 100%)",
      }}
      height={"100vh"}
    >
      <Stack
        sx={{
          maxWidth: "1300px",
          ...(isPcAndAbove && { width: "100%" }),
          margin: isTablet ? "0" : "0 auto",
        }}
        direction={isTablet ? "column" : "row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
          <Typography
            fontSize={isTablet ? "32px" : "50px"}
            fontWeight={"600"}
            mb={2}
            lineHeight={1.2}
          >
            Real-time <br /> Connection for Your <br />
            <span style={{ color: colors.primary }}>
              Entire School Community
            </span>
          </Typography>
          <Typography fontSize={"16px"} mb={3}>
            Bridge the gap between admins, teachers, parents, and <br />
            students with our comprehensive Ed-Tech platform designed <br />
            for modern Indian schools.
          </Typography>
          {!isTablet && (
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "450px" },
                alignSelf: "center",
              }}
            >
              <img
                src={HeroImage}
                alt="hero-image"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  boxShadow:
                    "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
                }}
              />
            </Box>
          )}
        </Stack>
        <Box
          bgcolor={colors.white}
          sx={{
            boxShadow:
              "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
            borderRadius: "16px",
          }}
          px={3}
          py={5}
          width={{ xs: "85%", sm: 360, md: 420, lg: 480 }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  );
};

export default CommonAuthPage;
