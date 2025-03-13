import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import CustomBtn from "./CustomBtn";

const Form = ({
  type,
  register,
  formData,
  handleImageChange,
  handleUpload,
  handleSubmit,
}) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Property
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="property-name"
              color="info"
              variant="outlined"
              {...register("title", {
                required: true,
              })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter Description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="write a description"
              color="info"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                fontSize: 16,
                borderColor: "rgba(0, 0, 0, 0.23)",
                borderRadius: 6,
                padding: 10,
                color: "#919191",
              }}
              {...register("description", {
                required: true,
              })}
            />
          </FormControl>
          <Stack
            gap={4}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
                xl: "row",
              },
            }}
          >
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Select Property Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{
                  "aria-label": "Without label",
                }}
                value={formData.propertytype}
                {...register("propertytype", {
                  required: true,
                })}
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="house">House</MenuItem>
                <MenuItem value="office">Office</MenuItem>
                <MenuItem value="land">Land</MenuItem>
                <MenuItem value="warehouse">Warehouse</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Enter Price
              </FormHelperText>
              <TextField
                fullWidth
                required
                id="price"
                color="info"
                type="number"
                variant="outlined"
                {...register("price", {
                  required: true,
                })}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter Location
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="location"
              color="info"
              variant="outlined"
              {...register("location", {
                required: true,
              })}
            />
          </FormControl>
          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography
                color="#11142d"
                fontWeight={500}
                fontSize={16}
                my="10px"
              >
                Property Image
              </Typography>
              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
                onClick={handleUpload}
              >
                Upload *
                <input
                  id="file"
                  type="file"
                  onChange={handleImageChange}
                  accept=".png, .jpg, .jpeg"
                  hidden
                />
              </Button>
            </Stack>
            <CustomBtn
              handleClick={handleSubmit}
              type="submit"
              title="Submit"
              backgroundColor="#475be8"
              color="#fcfcfc"
            />
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Form;
