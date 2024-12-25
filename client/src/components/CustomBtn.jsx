import { Button } from "@mui/material"

const CustomBtn = ({type, title, handleClick, backgroundColor, color, icon, fullwidth}) => {
  return (
    <Button
        sx={{
            flex: fullwidth ? 1 : 'unset',
            padding: '10px 15px',
            width: fullwidth ? '100%' : 'fit-content',
            minWidth: 130,
            backgroundColor,
            color,  
            fontSize: 16,
            fontWeight: 600,
            gap: '10px',
            cursor: 'pointer',
            textTransform: 'capitalize',
            '&:hover': {
                backgroundColor,
                opacity: 0.9
            }
        }}
        onClick={handleClick}
    >
        {icon}
        {title}
    </Button>
  )
}

export default CustomBtn