import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Button from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { colors, ROUTES, screenSize } from "../../constants";
import HeroImage from "../../assets/pngs/hero-image.png";
import {
  FaChalkboardUser,
  FaCheck,
  FaGraduationCap,
  FaUserGraduate,
  FaUsers,
  FaUserTie,
} from "react-icons/fa6";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";

type Props = {};

const Landing = (props: Props) => {
  const { user } = useAuth();
  const isLoggedIn = !!user?.userId;
  const navigate = useNavigate();
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const isPcAndAbove = useMediaQuery(`(min-width:${screenSize.pc})`);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isLoggedIn, navigate]);

  const features = [
    {
      icon: <FaUserTie />,
      title: "Admins",
      descriptions: [
        "Comprehensive dashboard with real-time analytics",
        "Streamlined communication management tool",
      ],
    },
    {
      icon: <FaChalkboardUser />,
      title: "Teachers",
      descriptions: [
        "Digital gradebook and attendance tracking",
        "Instant parent-teacher communication portal",
      ],
    },
    {
      icon: <FaUsers />,
      title: "Parents",
      descriptions: [
        "Real-time updates on child's progress",
        "Easy scheduling for parent-teacher meetings",
      ],
    },
    {
      icon: <FaUserGraduate />,
      title: "Students",
      descriptions: [
        "Interactive learning modules and assignments",
        "Peer collaboration and study groups",
      ],
    },
  ];

  return (
    <>
      <Box
        py={5}
        px={4}
        sx={{
          background:
            "linear-gradient(135deg, #e0e7ff 0%, #eef2ff 50%, #f5f7ff 100%)",
        }}
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
            <Stack
              gap={2.5}
              direction={isTablet ? "column" : "row"}
              mb={isTablet ? 5 : 0}
            >
              <Button
                buttonText="Get Started - It's Free"
                onClick={() => navigate(ROUTES.REGISTER)}
              />
              <Button
                buttonText="Book a Live Demo"
                priority="secondary"
                onClick={() => navigate(ROUTES.DEMO)}
                styles={{
                  "&:hover": {
                    bgcolor: colors.primaryLight,
                    boxShadow: "none",
                  },
                }}
              />
            </Stack>
          </Stack>
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: "450px" },
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
        </Stack>
      </Box>
      <Box py={5} px={4} bgcolor={colors.white}>
        <Box
          sx={{
            maxWidth: "1300px",
            ...(isPcAndAbove && { width: "100%" }),
            margin: isTablet ? "0" : "0 auto",
            pt: 2,
          }}
        >
          <Stack gap={6} mb={10}>
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                mb={1}
              >
                Built for Every School Stakeholder
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
              >
                Empowering connection across your entire educational ecosystem
              </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center">
              {features.map((feature, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  sx={{ height: "100%" }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 4,
                      pb: 2,
                      height: "100%",
                      borderRadius: 3,
                      textAlign: "left",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "rgba(0, 0, 0, 0.09) 0px 16px 26px",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor:
                          index % 2 === 0
                            ? colors.primaryLight
                            : colors.orangeLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        color={index % 2 === 0 ? colors.primary : colors.orange}
                      >
                        {feature.icon}
                      </Box>
                    </Box>

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>

                    {feature.descriptions.map((desc) => (
                      <Stack direction={"row"} gap={1} mb={1}>
                        <FaCheck
                          color={colors.orange}
                          style={{ marginTop: "4px" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {desc}
                        </Typography>
                      </Stack>
                    ))}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Box>
      </Box>
      <Box
        py={3}
        bgcolor={colors.lightGrey}
        borderTop={`1px solid ${colors.lightGrey}`}
        display={isTablet ? "block" : "flex"}
        height={"100%"}
      >
        <Stack
          sx={{
            maxWidth: "1300px",
            ...(isPcAndAbove && { width: "100%" }),
            margin: isTablet ? "0" : "0 auto",
          }}
          direction={isTablet ? "column" : "row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display="flex" alignItems="center" gap={1} mb={isTablet ? 1 : 0}>
            <FaGraduationCap size={16} color={colors.primary} />
            <Typography
              fontSize={"16px"}
              fontWeight="bold"
              color={colors.primary}
            >
              SkoolSynch
            </Typography>
          </Box>
          <Stack
            gap={isTablet ? 1 : 2}
            direction={isTablet ? "column" : "row"}
            alignItems={"center"}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} SkoolSynch. All rights reserved.
            </Typography>
            <Stack direction={"row"} gap={2}>
              <Typography variant="body2" color="text.secondary">
                Privacy Policy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Terms of Service
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Landing;
