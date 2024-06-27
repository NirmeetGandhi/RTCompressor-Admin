import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// Apps
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './RTCompressor/assets/css/style.rtl.css'
 **/
import './RTCompressor/assets/sass/style.scss'
import './RTCompressor/assets/sass/plugins.scss'
import './RTCompressor/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic RTCompressor mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject RTCompressor interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)
Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  )
}
