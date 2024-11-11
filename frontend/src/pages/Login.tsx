import { Box, Button, Typography } from '@mui/material'
import CustomizedInput from '../components/shared/CustomizedInput'
import {IoIosLogIn} from "react-icons/io"
const Login = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget as HTMLFormElement).email.value;
    const password = (e.currentTarget as HTMLFormElement).password.value;
    console.log(email, password);
  };
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"row"} alignItems={"center"}>
      <Box padding={8} mt={8} display={{ xs: "none", md: "flex", sm: "none" }}>
        <img src="airobot.png" alt="Robot" style={{width: "400px"}} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
        onSubmit={handleSubmit}  style={{
          margin: "auto",
          padding: "30px",
          boxShadow: "10px 10px 20px #000",
          borderRadius: "10px",
          border: "none",
        }}>
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Typography variant="h4" textAlign={"center"} padding={2} fontWeight={600}>Login</Typography>
            <CustomizedInput type='email' name='email' label='Email'/>
            <CustomizedInput type='password' name='password' label='Password' />
            <Button type="submit"
              sx={{
              px:2, py:1,
              mt: 2, width: "400px", borderRadius: 2, bgcolor: "#00cccc",
              "&:hover": { bgcolor: "white", color: "black" }
              }}
              endIcon={<IoIosLogIn />}
            >Login</Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login