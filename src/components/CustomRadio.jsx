import { Box, useRadio } from "@chakra-ui/react";

function CustomRadio(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        _checked={{
          borderBottom: "2px",
          borderColor: "red.500",
        }}
        px={2}
        py={1}
      >
        <label>{props.names}</label>
        {props.children}
      </Box>
    </Box>
  );
}

export default CustomRadio;
