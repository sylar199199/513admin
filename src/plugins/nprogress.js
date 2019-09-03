import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const config = {
  minimum: 0.1,
  template: "<div class='bar' role='bar'>...</div>",
  ease: 'ease',
  speed: 500,
}

Nprogress.configure(config)

export default Nprogress
