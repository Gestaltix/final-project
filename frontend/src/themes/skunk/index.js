import { createMuiTheme } from '@material-ui/core/styles'
import Yellow from '@material-ui/core/colors/yellow'
import Grey from '@material-ui/core/colors/grey'

const theme = createMuiTheme({
    palette: {
        primary: Yellow,
        secondary: Grey,
        contrastThreshold: 3,
    }
})

export default theme;